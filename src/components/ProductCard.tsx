import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star, Eye, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
  searchQuery?: string;
  onQuickView?: (product: Product) => void;
  isAdding?: boolean;
  onAddToCart?: (product: Product) => void;
}

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#FDCB58]/20 text-black font-bold rounded-sm px-0.5">{part}</mark>
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
  onQuickView,
  isAdding: isAddingProp,
  onAddToCart
}) => {
  const [isAddingInternal, setIsAddingInternal] = React.useState(false);
  const isAdding = isAddingProp || isAddingInternal;
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    setIsAddingInternal(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: "Your beauty selection has been updated.",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart'
      }
    });
    setIsAddingInternal(false);
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

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative border border-outline-variant/5"
    >
      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className="absolute top-6 left-6 z-20 p-2 rounded-full transition-all duration-300"
      >
        <Heart 
          size={20} 
          className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-on-surface-variant/30 group-hover:text-red-500'}`} 
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square mb-8 overflow-hidden rounded-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        
        {/* Quick View Overlay */}
        {onQuickView && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <button 
              onClick={handleQuickView}
              className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:scale-110 active:scale-95"
            >
              <Eye size={20} className="text-on-background" />
            </button>
          </div>
        )}

        {product.tag && (
          <div className="absolute top-0 right-0 bg-[#FDCB58] px-3 py-1 rounded-bl-xl text-[8px] font-black uppercase tracking-widest text-black z-10">
            {product.tag}
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Sold Out</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        <p className="text-[#FDCB58] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
          <Highlight text={product.category} query={searchQuery} />
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-on-background font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
            <Highlight text={product.name} query={searchQuery} />
          </h3>
        </Link>
        <p className="text-on-surface-variant text-xs mb-6 line-clamp-2 font-medium">
          {product.description}
        </p>

        {/* Footer: Price and Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div className="bg-surface-container-lowest border border-outline-variant/10 px-5 py-2.5 rounded-full shadow-sm">
            <span className="text-on-background font-black text-sm">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {product.inStock && (
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-[#FDCB58] p-3 rounded-2xl text-black hover:scale-110 active:scale-95 transition-all shadow-lg shadow-yellow-500/10 disabled:opacity-50 disabled:scale-100 flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              {isAdding ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <ShoppingBag size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
