import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, X, ArrowRight, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import Logo from './Logo';

export const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { openOrderModal } = useOrderStore();

  const handleCheckout = () => {
    closeDrawer();
    openOrderModal('basket');
  };

  const handleWhatsAppCheckout = () => {
    const message = encodeURIComponent(`Hi! I'd like to place an order for:\n\n${items.map(item => `- ${item.name} (x${item.quantity})`).join('\n')}\n\nTotal: ₹${totalPrice().toLocaleString()}`);
    window.open(`https://wa.me/919562854999?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-brand-gray/60 backdrop-blur-md z-[100]"
          />

          {/* Drawer: Absolute White with Black Typography */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header & Progress: High-Contrast Markers */}
            <div className="p-8 pb-6 border-b border-neutral-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-sm font-black tracking-[0.2em] text-black uppercase">Your Selection</h2>
                  <p className="text-[9px] text-black font-bold tracking-widest mt-1 uppercase">
                    {items.length} {items.length === 1 ? 'Archetype' : 'Archetypes'}
                  </p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 rounded-full transition-all group"
                >
                  <X size={18} className="text-black opacity-40 group-hover:opacity-100 transition-colors" />
                </button>
              </div>

              {/* Free Shipping Progress: Monochrome Balance */}
              {items.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                    <span className={totalPrice() >= 500 ? "text-brand-green" : "text-black/60"}>
                      {totalPrice() >= 500 ? 'Complimentary Shipping Unlocked' : `₹${(500 - totalPrice()).toLocaleString()} more for free delivery`}
                    </span>
                    <span className="text-black">₹500.00</span>
                  </div>
                  <div className="h-[2px] w-full bg-neutral-100 relative overflow-hidden">
                    <motion.div 
                      className="absolute left-0 top-0 h-full bg-black"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((totalPrice() / 500) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Item List: Bold Metadata */}
            <div className="flex-1 overflow-y-auto px-8 space-y-10 py-5 no-scrollbar bg-white">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200">
                    <ShoppingBag size={48} strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-black font-black uppercase tracking-widest text-xs">Basket is empty</p>
                    <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest leading-relaxed">Discover Kerala's handcrafted masterpieces</p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="px-10 py-5 border-2 border-black rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg active:scale-95"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs font-black text-black uppercase tracking-wide leading-relaxed pr-4 line-clamp-2">{item.name}</h3>
                          <p className="text-[9px] text-black/60 mt-1.5 uppercase font-bold tracking-[0.15em]">{item.category || 'Kerala Artisan'}</p>
                        </div>
                        <p className="text-sm font-black text-black tracking-tighter">₹{item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border-2 border-gray-100 rounded-full bg-gray-50/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 text-black/40 hover:text-black transition-colors font-black"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-xs font-black text-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-2 text-black/40 hover:text-black transition-colors font-black"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-black/20 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Remove item"
                        >
                          <Trash2 size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total Valuation: Monochrome Institutional Finish */}
            {items.length > 0 && (
              <div className="p-8 bg-white border-t border-neutral-100">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-black tracking-widest text-black/40 uppercase">
                    <span>Selection Subtotal</span>
                    <span className="text-black">₹{totalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black tracking-widest text-black/40 uppercase">
                    <span>Shipping</span>
                    <span className={totalPrice() >= 500 ? "text-brand-green font-black" : "text-black"}>
                      {totalPrice() >= 500 ? 'Complimentary' : 'Calculated at checkout'}
                    </span>
                  </div>
                  <div className="pt-6 flex justify-between items-baseline border-t border-neutral-100">
                    <span className="text-[11px] font-black text-black uppercase tracking-[0.25em]">Total Valuation</span>
                    <span className="text-3xl font-black text-black tracking-tighter">₹{totalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black flex justify-center items-center gap-3 hover:bg-neutral-800 transition-all shadow-2xl shadow-black/20 active:scale-[0.98] group uppercase tracking-[0.2em] text-[11px]"
                  >
                    <ShieldCheck size={18} strokeWidth={2.5} />
                    Secure Checkout
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
                
                <div className="mt-12 text-center">
                  <p className="text-[8px] font-black tracking-[0.4em] text-black uppercase">
                    Institutional Standard • Authentic Kerala
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
