import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, X, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
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

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-green-100/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Logo size={42} className="shrink-0" />
                <div>
                  <h2 className="text-lg font-black tracking-tight uppercase text-brand-gray">Your Basket</h2>
                  <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] mt-0.5">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'} selected
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-10 h-10 rounded-full bg-brand-offwhite hover:bg-brand-green/10 flex items-center justify-center transition-all duration-300 transform hover:rotate-90"
                aria-label="Close cart"
              >
                <X size={20} className="text-brand-gray" />
              </button>
            </div>
            
            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="px-8 py-5 bg-brand-offwhite border-b border-brand-green-100/10">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-green">
                    {totalPrice() >= 1500 
                      ? "Complimentary Shipping Earned" 
                      : `Add ₹${(1500 - totalPrice()).toLocaleString()} for Complimentary Shipping`}
                  </p>
                  <p className="text-[10px] font-black text-brand-gold">
                    {Math.min(100, (totalPrice() / 1500) * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-brand-green-100/10 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (totalPrice() / 1500) * 100)}%` }}
                    className="h-full bg-brand-gold relative overflow-hidden"
                  >
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-white/50">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-brand-offwhite rounded-full flex items-center justify-center text-brand-green/10 border border-brand-green-100/5">
                    <ShoppingBag size={48} />
                  </div>
                  <div>
                    <p className="text-brand-gray font-black uppercase tracking-widest text-xs mb-2">Basket is empty</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">Discover Kerala's handcrafted masterpieces</p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="text-brand-green font-black text-[10px] uppercase tracking-[0.3em] px-8 py-4 border-2 border-brand-green/20 rounded-full hover:bg-brand-green hover:text-white transition-all duration-500"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-brand-offwhite rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-brand-green-100/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-[11px] md:text-xs leading-relaxed uppercase tracking-tight text-brand-gray line-clamp-2 pr-2">{item.name}</h3>
                        <p className="font-black text-xs md:text-sm text-brand-green">₹{item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Sparkles size={8} /> {item.category || 'Kerala Artisan'}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5 bg-brand-offwhite px-4 py-2 rounded-full border border-brand-green-100/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-brand-gray/40 hover:text-brand-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[11px] font-black w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-brand-gray/40 hover:text-brand-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-brand-gray/20 hover:text-red-500 transition-all duration-300 p-2 hover:bg-red-50 rounded-full"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-brand-green-100/10 bg-brand-offwhite/80 backdrop-blur-xl">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <span>Selection Subtotal</span>
                    <span className="text-brand-gray">₹{totalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <span>Premium Shipping</span>
                    <span className={totalPrice() >= 1500 ? "text-brand-green" : "text-brand-gold"}>
                      {totalPrice() >= 1500 ? "Complimentary" : "₹49.00"}
                    </span>
                  </div>
                  <div className="pt-5 flex justify-between items-end border-t border-brand-green-100/10">
                    <div>
                      <span className="font-black text-[10px] uppercase tracking-[0.4em] text-brand-gold block mb-1">Total Valuation</span>
                      <span className="text-3xl font-black text-brand-green tracking-tighter">₹{(totalPrice() + (totalPrice() >= 1500 ? 0 : 49)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleCheckout}
                    className="btn-luxury w-full py-5 flex items-center justify-center gap-3 text-[10px] shadow-2xl shadow-green-900/10 active:scale-[0.98]"
                  >
                    Secure Checkout <ArrowRight size={16} />
                  </button>
                  
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 flex items-center justify-center gap-3 bg-[#25D366] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#20c75a] transition-all duration-300 shadow-xl shadow-green-500/10 active:scale-[0.98]"
                  >
                    <MessageCircle size={16} />
                    Consult on WhatsApp
                  </button>
                </div>
                <p className="text-center text-[8px] text-gray-400 font-extrabold uppercase tracking-[0.3em] mt-6">
                  Authentic Heritage • Delivered with Trust
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
