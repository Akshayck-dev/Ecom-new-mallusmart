import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, Heart, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { resolveMedia } from '../utils/mediaUtils';
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
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
            className="relative w-full max-w-5xl bg-white rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-xl border border-primary/5 active:scale-90"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
            
            <div className="aspect-square md:aspect-auto bg-surface-container-lowest overflow-hidden border-b md:border-b-0 md:border-r border-primary/5">
              <img 
                src={resolveMedia(product.image)} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">
                  {product.category}
                </span>
                <div className="w-1 h-1 bg-primary/10 rounded-full" />
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                  <Star size={10} className="fill-current text-secondary" />
                  <span>{product.rating || 4.8} Certified</span>
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter uppercase leading-tight text-primary">
                {product.name}
              </h2>
              
              <p className="text-on-surface-variant text-sm sm:text-base font-medium leading-relaxed italic">
                {product.description || "A meticulously crafted piece designed for longevity and aesthetic harmony in your daily life."}
              </p>
              
              <div className="flex items-end justify-between border-b border-primary/5 pb-6 sm:pb-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-on-surface-variant/40 mb-1.5 sm:mb-2">Investment</span>
                  <span className="text-3xl sm:text-4xl font-bold tracking-tighter text-primary">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-on-surface-variant/40 mb-1.5 sm:mb-2">Archive Status</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                    {product.inStock ? 'Available' : 'Sold Out'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className="flex-1 bg-primary text-white py-4 sm:py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-secondary transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 active:scale-[0.98]"
                >
                  {isAdding ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
                  )}
                  {isAdding ? 'Securing...' : (product.inStock ? 'Add to Collection' : 'Sold Out')}
                </button>
                <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
                  <button 
                    onClick={handleWishlist}
                    className={`flex-1 sm:w-14 sm:h-14 border rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-95 ${isInWishlist(product.id) ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'border-primary/5 hover:bg-surface-container'}`}
                  >
                    <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                  </button>
                  <Link 
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex-1 sm:w-14 sm:h-14 border border-primary/5 rounded-2xl flex items-center justify-center hover:bg-surface-container transition-all shadow-sm active:scale-95"
                  >
                    <ArrowRight size={20} className="text-primary" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
