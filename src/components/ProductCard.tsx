import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Star, Eye, Loader2, Check, Plus, ShoppingCart, History } from 'lucide-react';
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
          <mark key={i} className="bg-brand-yellow/20 text-brand-gray font-bold rounded-sm px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (imageRef.current && cartIconRef?.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();
      
      setFlyingImage({
        url: product.image,
        x: rect.left,
        y: rect.top
      });

      // Trigger the fly animation
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

      // Trigger bounce and cleanup
      setTimeout(() => {
        setFlyingImage(null);
        triggerBounce();
      }, 800);
    }

    setIsAdding(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addItem(product);
    setShowSuccess(true);
    toast.success(`${product.name} added to cart`, {
      description: "Your beauty selection has been updated.",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart'
      }
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
        duration: 0.8,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`group bg-white rounded-2xl p-4 transition-all duration-500 flex flex-col h-full relative shadow-sm hover:shadow-xl border border-gray-100/50 ${
        isActive ? 'ring-2 ring-brand-yellow/50 shadow-lg' : ''
      } ${isRecentlyViewed ? 'bg-brand-yellow/[0.02] ring-1 ring-brand-yellow/10' : ''}`}
    >
      {/* Recently Viewed Indicator */}
      {isRecentlyViewed && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-brand-yellow/20">
          <History size={10} className="text-brand-yellow" />
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-brand-yellow">Viewed</span>
        </div>
      )}

      {/* Heart Icon - Top Left */}
      <button 
        onClick={handleWishlist}
        className="absolute top-4 left-4 z-20 transition-all duration-300 hover:scale-110 active:scale-90"
      >
        <Heart 
          size={18} 
          className={`transition-colors ${
            isWishlisted 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-200 hover:text-red-400'
          }`} 
        />
      </button>

      {/* Product Image Area */}
      <Link to={`/product/${product.id}`} className="block relative h-[220px] mb-6 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50/30">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name} 
          className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-1000 group-hover:scale-110" 
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
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <img 
              src={flyingImage.url} 
              alt="" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>,
          document.body
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 bg-white/80 px-4 py-2 rounded-full shadow-sm">Sold Out</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 text-left">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow mb-2">
          {product.category}
        </span>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-brand-gray font-bold text-sm mb-3 group-hover:text-brand-yellow transition-all line-clamp-2 leading-snug">
            <Highlight text={product.name} query={searchQuery} />
          </h3>
        </Link>

        {/* Bottom Row: Price and Basket Icon */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <span className="text-lg font-black text-brand-gray tracking-tight">
            {product.price.toFixed(2).replace('.', ',')}€
          </span>

          {product.inStock && (
            <button 
              onClick={handleAddToCart}
              disabled={isAdding || showSuccess}
              className={`w-10 h-10 rounded-xl transition-all duration-500 disabled:opacity-50 flex items-center justify-center shadow-sm ${
                showSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-brand-yellow/10 text-brand-yellow hover:bg-brand-yellow hover:text-white active:scale-90'
              }`}
              title="Add to Cart"
            >
              {isAdding ? (
                <Loader2 size={16} className="animate-spin" />
              ) : showSuccess ? (
                <Check size={16} />
              ) : (
                <ShoppingCart size={18} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
