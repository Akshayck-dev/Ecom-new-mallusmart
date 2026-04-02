import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, Heart, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { toast } from 'sonner';

interface QuickViewModalProps {
  productId: string | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ productId, onClose }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const product = PRODUCTS.find(p => p.id === productId);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product && productId) return null;

  const handleAddToCart = async () => {
    if (product) {
      setIsAdding(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      addItem(product);
      toast.success(`${product.name} added to cart`, {
        description: "Curated selection updated.",
        action: {
          label: "View Cart",
          onClick: () => window.location.href = '/cart'
        }
      });
      setIsAdding(false);
      onClose();
    }
  };

  const handleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        toast.success('Removed from wishlist');
      } else {
        addToWishlist(product);
        toast.success('Added to wishlist');
      }
    }
  };

  return (
    <AnimatePresence>
      {productId && product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[4rem] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-xl"
            >
              <X size={20} />
            </button>
            
            <div className="aspect-square md:aspect-auto bg-surface-container-lowest overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-secondary">
                  {product.category}
                </span>
                <div className="w-1 h-1 bg-outline-variant/30 rounded-full" />
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant/40">
                  <Star size={10} className="fill-current text-secondary" />
                  <span>{product.rating || 4.8} Rating</span>
                </div>
              </div>
              
              <h2 className="text-5xl font-serif italic mb-6 leading-tight">
                {product.name}
              </h2>
              
              <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-10">
                {product.description || "A meticulously crafted piece designed for longevity and aesthetic harmony in your daily life."}
              </p>
              
              <div className="flex items-end justify-between mb-12 border-b border-outline-variant/10 pb-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono uppercase text-on-surface-variant/40 mb-2">Price</span>
                  <span className="text-4xl font-mono font-light">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-mono uppercase text-on-surface-variant/40 mb-2">Availability</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className="flex-1 bg-primary text-white py-6 rounded-[2rem] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
                  )}
                  {isAdding ? 'Adding...' : (product.inStock ? 'Add to Collection' : 'Sold Out')}
                </button>
                <button 
                  onClick={handleWishlist}
                  className={`w-20 h-20 border rounded-[2rem] flex items-center justify-center transition-all shadow-sm ${isInWishlist(product.id) ? 'bg-red-50 border-red-100 text-red-500' : 'border-outline-variant/20 hover:bg-surface-container'}`}
                >
                  <Heart size={24} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                </button>
                <Link 
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-20 h-20 border border-outline-variant/20 rounded-[2rem] flex items-center justify-center hover:bg-surface-container transition-all shadow-sm"
                >
                  <ArrowRight size={24} className="text-on-surface-variant" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
