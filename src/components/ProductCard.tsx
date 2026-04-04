import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useQuickViewStore } from '../store/quickViewStore';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { resolveMedia } from '../utils/mediaUtils';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCategory = true }) => {
  const addItem = useCartStore((state) => state.addItem);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to choice`, {
      description: "Available in your artisanal basket.",
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-700 h-full flex flex-col border border-primary/5 active-scale"
    >
      {/* Product Image & Interaction Layer */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface rounded-xl mx-2 mt-2 sm:mx-3 sm:mt-3">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={resolveMedia(product.image)}
            alt={product.name}
            className="block w-full h-full object-cover transition-transform duration-[2.5s] ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Institutional Tags */}
        {product.tag && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 animate-in fade-in slide-in-from-left-4 duration-1000">
            <span className="bg-white/95 backdrop-blur-md text-primary text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary/5 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Top-Right Action Stack - Optimized for Mobile Discovery */}
        <div className="absolute top-3 right-3 sm:top-4 right-4 flex flex-col gap-2.5 sm:gap-3 z-30 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:translate-x-4 transition-all duration-700">
          <button 
            onClick={handleAddToCart}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-md rounded-full shadow-premium flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95 border border-primary/5"
            title="Add to Selection"
          >
            <ShoppingBag size={14} className="sm:w-4 sm:h-4 text-primary group-hover/btn:text-white" />
          </button>
          <button 
            onClick={handleQuickView}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-md rounded-full shadow-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 hover:scale-110 active:scale-95 border border-primary/5"
            title="Quick View"
          >
            <Eye size={14} className="sm:w-4 sm:h-4 text-primary group-hover/btn:text-white" />
          </button>
        </div>
      </div>

      {/* Information Layer - Structured for Readability */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 bg-white">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          {showCategory && (
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-secondary font-bold truncate pr-2">
              {product.category}
            </p>
          )}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={10} className="text-secondary fill-secondary" />
            <span className="text-[10px] font-bold text-primary">4.9</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="block group/title">
          <h3 className="text-sm sm:text-base font-semibold text-primary leading-tight line-clamp-2 group-hover/title:text-secondary transition-colors duration-500 tracking-tight mb-3">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-primary/5">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-primary/30 uppercase tracking-widest leading-none mb-1">Premium</span>
            <p className="text-base sm:text-lg font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-primary/40 hover:text-secondary transition-colors group/details">
            Details
            <ArrowRight size={10} className="transition-transform group-hover/details:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
