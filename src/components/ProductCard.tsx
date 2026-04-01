import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Star, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useOrderStore } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  index?: number;
  searchQuery?: string;
}

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-brand-gold/20 text-brand-green font-black rounded-sm px-0.5">{part}</mark>
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
}) => {
  const openOrderModal = useOrderStore((state) => state.openOrderModal);
  const addItem = useCartStore((state) => state.addItem);
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openOrderModal('single', product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1800);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-brand-green-100/10 shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col h-full"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-brand-offwhite aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.1em] text-white shadow-lg ${
              product.tag === 'BEST SELLER' || product.tag === 'Best Seller' ? 'bg-brand-gold' : 'bg-brand-green'
            }`}>
              {(product.tag === 'BEST SELLER' || product.tag === 'Best Seller') && <Star size={8} className="fill-white" />}
              {(product.tag === 'KERALA SPECIAL' || product.tag === 'Kerala Special') && <Sparkles size={8} />}
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick cart button — top right on hover */}
        {product.inStock && (
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.9 }}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 ${
                cartAdded ? 'bg-brand-gold text-white' : 'bg-white/90 text-brand-green backdrop-blur-sm hover:bg-brand-green hover:text-white'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {cartAdded ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={14} />
                  </motion.div>
                ) : (
                  <motion.div key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <ShoppingCart size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}

        {/* Sold Out Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-gray bg-white shadow-xl px-4 py-2 rounded-full border border-gray-100">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow bg-white">
        {/* Category + Rating row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8px] font-bold uppercase tracking-widest text-brand-green/40 truncate max-w-[70%]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={8} className="fill-brand-gold text-brand-gold" />
            <span className="text-[9px] font-black text-brand-gray/60">{product.rating}</span>
          </div>
        </div>

        {/* Product name */}
        <Link to={`/product/${product.id}`} className="block mb-1 group-hover:text-brand-green transition-colors">
          <h3 className="text-xs sm:text-sm font-black text-brand-gray tracking-tight leading-[1.3] line-clamp-2 uppercase min-h-[2.4em]">
            <Highlight text={product.name} query={searchQuery} />
          </h3>
        </Link>

        {/* Artisan name */}
        {product.artisan && (
          <p className="text-[8px] font-medium text-gray-300 uppercase tracking-widest mb-2 truncate">
            by {product.artisan}
          </p>
        )}

        {/* Price + Buttons row */}
        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between gap-2">
          <p className="text-sm sm:text-base font-black text-brand-green tracking-tighter">
            ₹{product.price.toLocaleString()}
          </p>

          {product.inStock ? (
            <button
              onClick={handleAddToOrder}
              className="btn-luxury !px-3 !py-2 sm:!px-4 sm:!py-2.5 flex items-center gap-1.5 group/btn shrink-0"
            >
              <MessageCircle size={11} className="text-brand-gold group-hover/btn:scale-110 transition-transform" />
              <span className="text-[9px] sm:text-[10px]">Order</span>
            </button>
          ) : (
            <div className="text-[8px] font-black uppercase tracking-widest text-gray-300">Waitlist</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
