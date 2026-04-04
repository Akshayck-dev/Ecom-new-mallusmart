import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { resolveMedia } from '../utils/mediaUtils';

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
            className="fixed bottom-8 right-8 z-[100] bg-primary text-white p-5 rounded-full shadow-premium hover:shadow-premium-hover flex items-center justify-center group"
          >
            <div className="absolute -top-1 -right-1 bg-secondary text-white text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {count}
            </div>
            <ShoppingBasket size={24} className="group-hover:scale-110 transition-transform" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-700 font-bold uppercase tracking-[0.3em] text-[9px] ml-0 group-hover:ml-4">
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
              className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[120] shadow-premium flex flex-col"
            >
              <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-surface">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Your Order Basket</h3>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em]">{count} Items Selected</p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary/40 hover:text-secondary border border-primary/5 shadow-sm transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center border border-primary/5">
                      <Package size={32} className="text-primary/10" />
                    </div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.4em]">Your basket is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group flex gap-4 bg-white border border-primary/5 p-4 rounded-[2rem] hover:shadow-premium transition-all duration-500"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface flex-shrink-0 shadow-sm">
                        <img src={resolveMedia(item.image)} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-[11px] font-bold text-primary uppercase truncate pr-2 tracking-tight">{item.name}</h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-primary/20 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">₹{item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-surface rounded-xl p-1 border border-primary/5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:text-secondary text-primary/40 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-xs font-bold text-primary italic">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:text-secondary text-primary/40 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-8 border-t border-primary/5 bg-surface">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-on-surface-variant">Grand Total</span>
                  <span className="text-3xl font-semibold text-primary tracking-tighter">₹{total.toLocaleString()}</span>
                </div>
                
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={items.length === 0}
                  className="btn-luxury w-full py-6 flex items-center justify-center gap-4 shadow-xl disabled:opacity-50"
                >
                  <MessageCircle size={20} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Order on WhatsApp</span>
                </button>
                
                <div className="mt-8 flex items-center gap-3 justify-center py-4 bg-white rounded-2xl border border-primary/5">
                  <CheckCircle2 size={16} className="text-secondary" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Heritage Protocol Support</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
;
