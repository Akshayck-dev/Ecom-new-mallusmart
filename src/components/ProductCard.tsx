import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  // Dynamic Asset Resolver for Vite
  const getProductImage = (imagePath: string) => {
    try {
      return new URL(`../assets/products/${imagePath}`, import.meta.url).href;
    } catch {
      return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000"; // Fallback
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to selection`, {
      description: "Archived in your bespoke collection",
      icon: <ShoppingBag className="text-black" size={18} />,
      className: "bg-white border-2 border-black rounded-[2rem] font-bold text-black uppercase tracking-[0.2em] text-[10px] shadow-2xl p-6 h-24",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#fafafa] rounded-2xl border border-gray-100 overflow-hidden transition-all duration-700 h-full flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Visual Curation */}
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <img
            src={getProductImage(product.image)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Institutional Badging: Custom Tag from JSON */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur-md text-black text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                {product.tag}
              </span>
            </div>
          )}

          {/* Quick Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-20">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl hover:bg-brand-green transition-all duration-500"
            >
              <ShoppingBag size={12} strokeWidth={2.5} />
              Add to Bag
            </button>
          </div>
        </div>

        {/* Informational Architecture */}
        <div className="p-5 flex flex-col items-center text-center flex-1 justify-center bg-white border-t border-gray-50/50">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-1">
            {product.maker || "Heritage Maker"}
          </p>
          <h3 className="text-[12px] font-bold text-black uppercase tracking-[0.1em] mb-1 line-clamp-1 group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] font-medium text-black/60 uppercase tracking-widest">
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
