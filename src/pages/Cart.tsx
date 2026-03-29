import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Minus, Plus, ShieldCheck, Truck, ArrowRight, X, Bookmark, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, savedItems, updateQuantity, removeItem, saveForLater, moveToCart, removeSavedItem } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.0824;
  const total = subtotal + shipping + tax;

  const handleQuantityUpdate = (id: string, delta: number, currentQty: number) => {
    setAnimatingId(id);
    updateQuantity(id, currentQty + delta);
    setTimeout(() => setAnimatingId(null), 300);
  };

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h1 className="text-display-lg mb-4">Your Selection.</h1>
          <p className="text-on-surface-variant max-w-md">
            Review your curated pieces before we prepare them for their journey to your home.
          </p>
        </div>
        <Link to="/shop" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: animatingId === item.id ? 1.02 : 1,
                    borderColor: animatingId === item.id ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--outline-variant), 0.1)'
                  }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white p-6 rounded-2xl border flex gap-6 items-center shadow-sm"
                >
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{item.category}</p>
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-surface-container-low rounded-md">
                        <button 
                          onClick={() => handleQuantityUpdate(item.id, -1, item.quantity)} 
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <motion.span 
                          key={item.quantity}
                          initial={{ scale: 1.2, color: 'var(--primary)' }}
                          animate={{ scale: 1, color: 'inherit' }}
                          className="w-8 text-center font-bold text-sm"
                        >
                          {item.quantity}
                        </motion.span>
                        <button 
                          onClick={() => handleQuantityUpdate(item.id, 1, item.quantity)} 
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => saveForLater(item.id)}
                          className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <Bookmark size={14} /> SAVE FOR LATER
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} /> REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">${item.price.toFixed(2)} / unit</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <div className="text-center py-20 bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/20">
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-on-surface-variant">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                <p className="text-on-surface-variant mb-8">Looks like you haven't added any curated pieces yet.</p>
                <Link to="/shop" className="bg-primary text-white px-8 py-4 rounded-md font-bold shadow-lg hover:shadow-primary/20 transition-all">
                  Browse Collection
                </Link>
              </div>
            )}
          </div>

          {/* Saved for Later Section */}
          {savedItems.length > 0 && (
            <div className="pt-12 border-t border-outline-variant/20">
              <div className="flex items-center gap-3 mb-8">
                <Bookmark className="text-primary" size={20} />
                <h2 className="text-2xl font-bold">Saved for Later</h2>
                <span className="text-sm font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                  {savedItems.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {savedItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-4 rounded-2xl border border-outline-variant/10 flex gap-4 items-center"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-on-surface-variant mb-3">${item.price.toFixed(2)}</p>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => moveToCart(item.id)}
                            className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
                          >
                            Move to Cart
                          </button>
                          <button 
                            onClick={() => removeSavedItem(item.id)}
                            className="text-[10px] font-bold text-on-surface-variant hover:text-red-500 uppercase tracking-widest"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low p-8 rounded-2xl sticky top-32">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">SUBTOTAL</span>
                <span className="font-bold">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">STANDARD SHIPPING</span>
                <span className="font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">ESTIMATED TAX</span>
                <span className="font-bold">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="pt-6 border-t border-outline-variant/20 mb-8">
              <p className="text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Total Amount</p>
              <p className="text-4xl font-black text-on-background">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              disabled={items.length === 0}
              className="w-full bg-primary text-white py-5 rounded-md font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
            <p className="text-[10px] text-center font-bold text-on-surface-variant uppercase tracking-widest mb-8">Secure SSL Encrypted Checkout</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                <Truck size={16} className="text-primary" />
                <span>Free worldwide shipping on all orders</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                <ShieldCheck size={16} className="text-primary" />
                <span>30-day effortless returns policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 bg-surface-container-low p-10 max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl font-bold mb-8">Order Summary</h3>
                <div className="space-y-6 mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-on-surface-variant">Qty {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-6 border-t border-outline-variant/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Shipping</span>
                    <span className="font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 p-10 relative">
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-bold mb-8">Checkout Details</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-none focus:ring-1 focus:ring-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Phone Number</label>
                    <input type="text" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-none focus:ring-1 focus:ring-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Delivery Address</label>
                    <input type="text" placeholder="Street name..." className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-none focus:ring-1 focus:ring-primary/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Pincode</label>
                      <input type="text" defaultValue="600001" className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-none focus:ring-1 focus:ring-primary/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">City</label>
                      <input type="text" defaultValue="Kochi" className="w-full px-4 py-3 rounded-lg bg-surface-container-high border-none focus:ring-1 focus:ring-primary/30" />
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]">
                    Order via WhatsApp
                  </button>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="w-full text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Return to Cart
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
