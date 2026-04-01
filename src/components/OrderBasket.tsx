import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBasket, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  MessageCircle,
  Package,
  CheckCircle2
} from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';

export const OrderBasket = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    totalPrice, 
    totalItems,
    setCartIconRef,
  } = useCartStore();
  
  const basketRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (basketRef.current) {
      setCartIconRef(basketRef as any);
    }
  }, [setCartIconRef]);

  const isDrawerOpenStore = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const openOrderModal = useOrderStore((state) => state.openOrderModal);

  const total = totalPrice();
  const count = totalItems();

  const handleWhatsAppOrder = () => {
    openOrderModal('basket');
    closeDrawer();
  };

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            ref={basketRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openDrawer}
            className="fixed bottom-8 right-8 z-[100] bg-brand-green text-white p-4 rounded-full shadow-premium hover:shadow-premium-hover flex items-center justify-center group"
          >
            <div className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {count}
            </div>
            <ShoppingBasket size={24} className="group-hover:animate-bounce" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold uppercase tracking-widest text-[10px] ml-0 group-hover:ml-3">
              View Order
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDrawerOpenStore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-brand-gray/40 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-brand-offwhite">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-luxury text-brand-green mb-1">Your Order Basket</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{count} Items Selected</p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-brand-green border border-gray-100 shadow-sm transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-brand-offwhite rounded-3xl flex items-center justify-center mb-6">
                      <Package size={32} className="text-gray-200" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your basket is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group flex gap-4 bg-white border border-gray-50 p-4 rounded-2xl hover:border-brand-green/20 transition-all hover:shadow-premium"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-offwhite flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-brand-gray truncate pr-2">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs font-black text-brand-green mb-3">₹{item.price.toLocaleString()}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-brand-offwhite rounded-lg p-1 border border-gray-100">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-brand-green"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-brand-green"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Total: ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-8 border-t border-gray-100 bg-brand-offwhite">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-luxury text-gray-400">Grand Total</span>
                  <span className="text-2xl font-black text-brand-gray">₹{total.toLocaleString()}</span>
                </div>
                
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={items.length === 0}
                  className="w-full relative py-5 bg-brand-green text-white rounded-2xl font-bold text-xs uppercase tracking-luxury flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:bg-brand-green-deep transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
                  Order on WhatsApp
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] pointer-events-none" />
                </button>
                
                <div className="mt-6 flex items-center gap-2 justify-center py-3 bg-white/50 rounded-xl border border-white">
                  <CheckCircle2 size={12} className="text-brand-green" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-green/60">Fast & Direct Delivery</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
