import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, MoveRight, ShoppingBag, X, Heart, ShieldCheck, Truck, RefreshCcw, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Logo from './Logo';

export const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, totalPrice } = useCartStore();

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/" onClick={closeDrawer} className="flex items-center">
                  <img 
                    src={logo} 
                    alt="Mallu's Mart Logo" 
                    className="h-10 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
                  <p className="text-[10px] font-mono text-on-surface-variant/50 uppercase tracking-widest mt-0.5">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="px-6 py-4 bg-primary/5 border-b border-primary/10">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {totalPrice() >= 150 
                      ? "You've earned Free Shipping!" 
                      : `Add $${(150 - totalPrice()).toFixed(2)} more for Free Shipping`}
                  </p>
                  <p className="text-[10px] font-mono opacity-50">
                    {Math.min(100, (totalPrice() / 150) * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (totalPrice() / 150) * 100)}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/30">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-on-surface-variant font-medium">Your cart is empty</p>
                  <button
                    onClick={closeDrawer}
                    className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-surface-container rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm leading-tight pr-4 line-clamp-2">{item.name}</h3>
                        <p className="font-black text-sm">${item.price}</p>
                      </div>
                      <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest mb-4">
                        {item.category || 'Beauty'}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-surface-container/50 px-3 py-1.5 rounded-full border border-outline-variant/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-on-surface-variant hover:text-on-background transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-on-surface-variant hover:text-on-background transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1.5"
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
              <div className="p-8 border-t border-surface-container space-y-6 bg-surface-container-lowest/50 backdrop-blur-md">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${totalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-primary font-bold uppercase text-[10px] tracking-tighter">Calculated at checkout</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end border-t border-outline-variant/10">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-2xl font-black">${totalPrice()}</span>
                  </div>
                </div>

                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="w-full py-5 bg-on-background text-white rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-premium"
                >
                  Go To checkout <ArrowRight size={16} />
                </Link>
                <p className="text-center text-[10px] text-on-surface-variant/40 font-mono uppercase tracking-[0.2em]">
                  Secure Payment Guaranteed
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
