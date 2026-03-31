import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Loader2, Check, ShoppingCart, History } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
  searchQuery?: string;
  isActive?: boolean;
  isRecentlyViewed?: boolean;
}

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-gray-900 font-bold rounded-sm px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

// Badge styling based on tag value
const getBadgeStyle = (tag?: string) => {
  if (!tag) return null;
  const lower = tag.toLowerCase();
  if (['bestseller', 'premium', 'luxury', 'couture', 'new season'].includes(lower)) {
    return { label: tag, className: 'bg-white/90 backdrop-blur-sm text-gray-900' };
  }
  if (['limited', 'limited edition', 'unique', 'heirloom', 'bespoke'].includes(lower)) {
    return { label: 'Limited', className: 'bg-black text-white' };
  }
  return { label: tag, className: 'bg-white/90 backdrop-blur-sm text-gray-900' };
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  searchQuery = '',
  isActive = false,
  isRecentlyViewed = false
}) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [flyingImage, setFlyingImage] = React.useState<{ url: string; x: number; y: number } | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const cartIconRef = useCartStore((state) => state.cartIconRef);
  const triggerBounce = useCartStore((state) => state.triggerBounce);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const badge = getBadgeStyle(product.tag);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageRef.current && cartIconRef?.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();
      setFlyingImage({ url: product.image, x: rect.left, y: rect.top });

      setTimeout(() => {
        const flyingEl = document.getElementById(`flying-image-${product.id}`);
        if (flyingEl) {
          flyingEl.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          flyingEl.style.left = `${cartRect.left}px`;
          flyingEl.style.top = `${cartRect.top}px`;
          flyingEl.style.width = '20px';
          flyingEl.style.height = '20px';
          flyingEl.style.opacity = '0';
          flyingEl.style.transform = 'scale(0.1)';
        }
      }, 10);

      setTimeout(() => {
        setFlyingImage(null);
        triggerBounce();
      }, 800);
    }

    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    addItem(product);
    setShowSuccess(true);
    toast.success(`${product.name} added to cart`, {
      description: 'Your selection has been updated.',
      action: { label: 'View Cart', onClick: () => window.location.href = '/cart' }
    });
    setIsAdding(false);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)] hover:-translate-y-1 ${
        isActive ? 'ring-2 ring-black/10 shadow-lg' : ''
      }`}
    >
      {/* Product Image Area */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* Flying Image Portal */}
        {flyingImage && createPortal(
          <div
            id={`flying-image-${product.id}`}
            style={{
              position: 'fixed',
              left: `${flyingImage.x}px`,
              top: `${flyingImage.y}px`,
              width: `${imageRef.current?.offsetWidth || 100}px`,
              height: `${imageRef.current?.offsetHeight || 100}px`,
              zIndex: 9999,
              pointerEvents: 'none',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <img src={flyingImage.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>,
          document.body
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {/* Tag badge */}
          {badge && (
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tight rounded-full ${badge.className}`}>
              {badge.label}
            </span>
          )}
          {/* Recently viewed */}
          {isRecentlyViewed && (
            <span className="ml-auto flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-500">
              <History size={9} />
              Viewed
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-sm"
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.4, 0.9, 1.1, 1], rotate: [0, 15, -15, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Heart
              size={14}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </motion.div>
        </button>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 bg-white/80 px-4 py-2 rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4 flex-1">
          <p className="text-xs text-gray-400 mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-black transition-colors">
              <Highlight text={product.name} query={searchQuery} />
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            ${product.price.toFixed(0)}
          </span>
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              disabled={isAdding || showSuccess}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 disabled:opacity-50 ${
                showSuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-white hover:bg-yellow-500 active:scale-90'
              }`}
              title="Add to Cart"
            >
              {isAdding ? (
                <Loader2 size={15} className="animate-spin" />
              ) : showSuccess ? (
                <Check size={15} />
              ) : (
                <ShoppingBag size={15} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
