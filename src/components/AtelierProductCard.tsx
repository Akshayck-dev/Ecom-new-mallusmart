import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useQuickViewStore } from '../store/quickViewStore';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface AtelierProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export const AtelierProductCard: React.FC<AtelierProductCardProps> = ({ product, showCategory = true }) => {
  const addItem = useCartStore((state) => state.addItem);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  // Responsive Asset Resolver
  const getProductImage = (imagePath: string) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    if (imagePath.startsWith('http')) return imagePath;
    try {
      return new URL(`../assets/products/${imagePath}`, import.meta.url).href;
    } catch {
      return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} archived`, {
      description: "Added to your bespoke selection.",
      icon: <ShoppingBag className="text-secondary" size={16} />,
      className: "bg-surface border-2 border-primary/5 rounded-[2rem] font-bold text-primary uppercase tracking-[0.2em] text-[10px] shadow-2xl p-6",
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-700 h-full flex flex-col border border-primary/5 p-1.5 sm:p-3"
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface group/img">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={getProductImage(product.image)}
            alt={product.name}
            className="block w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover/img:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Modern Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Floating Action Stack */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:translate-x-4 transition-all duration-700">
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-white rounded-full shadow-premium flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95"
          >
            <ShoppingBag size={16} />
          </button>
          <button 
            onClick={handleQuickView}
            className="w-10 h-10 bg-white rounded-full shadow-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Dynamic Badge */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 transition-transform duration-700 group-hover:translate-x-2">
            <span className="bg-white/95 backdrop-blur-md text-primary text-[8px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-2xl border border-primary/5 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-4 space-y-1.5 flex flex-col flex-1">
        {showCategory && (
          <p className="text-xs uppercase tracking-wide text-secondary font-medium">
            {product.category}
          </p>
        )}

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-base sm:text-lg font-bold text-primary leading-snug line-clamp-2 group-hover:text-secondary transition-colors duration-500">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2">
          <p className="text-lg font-semibold text-primary">
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
