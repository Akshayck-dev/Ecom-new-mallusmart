import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Trash2, Minus, Plus, ShieldCheck, Truck, ArrowRight, X, Bookmark, ShoppingBag, MessageCircle, Loader2 } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import Logo from '../components/Logo';

export default function Cart() {
  const { items, savedItems, updateQuantity, removeItem, saveForLater, moveToCart, removeSavedItem } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transforms for different layers
  const layer1X = useTransform(xSpring, [-0.5, 0.5], [-30, 30]);
  const layer1Y = useTransform(ySpring, [-0.5, 0.5], [-30, 30]);
  const layer2X = useTransform(xSpring, [-0.5, 0.5], [50, -50]);
  const layer2Y = useTransform(ySpring, [-0.5, 0.5], [50, -50]);
  const layer3X = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);
  const layer3Y = useTransform(ySpring, [-0.5, 0.5], [-15, 15]);

  // Magnetic button transforms
  const btnX = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const btnY = useTransform(ySpring, [-0.5, 0.5], [-10, 10]);

  // Spotlight effect
  const spotlightX = useTransform(xSpring, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(ySpring, [-0.5, 0.5], [0, 100]);

  // Icon rotation (look at cursor)
  const iconRotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const iconRotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);

  // Particle transforms
  const p1X = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const p1Y = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);
  const p2X = useTransform(xSpring, [-0.5, 0.5], [15, -15]);
  const p2Y = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const p3X = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const p3Y = useTransform(ySpring, [-0.5, 0.5], [10, -10]);

  // Dynamic Asset Resolver for Vite
  const getProductImage = (imagePath: string) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    if (imagePath.startsWith('http')) return imagePath;
    try {
      return new URL(`../assets/products/${imagePath}`, import.meta.url).href;
    } catch {
      return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000"; // Fallback
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.0824;
  const total = subtotal + shipping + tax;

  const handleQuantityUpdate = async (id: string, delta: number, currentQty: number) => {
    if (processingIds.has(id)) return;

    setProcessingIds(prev => new Set(prev).add(id));
    setAnimatingId(id);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 600));

    updateQuantity(id, currentQty + delta);
    setAnimatingId(null);
    setProcessingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleRemoveItem = async (id: string) => {
    if (processingIds.has(id)) return;
    setProcessingIds(prev => new Set(prev).add(id));

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 600));

    removeItem(id);
    setProcessingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSaveForLater = async (id: string) => {
    if (processingIds.has(id)) return;
    setProcessingIds(prev => new Set(prev).add(id));

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 600));

    saveForLater(id);
    setProcessingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleMoveToCart = async (id: string) => {
    if (processingIds.has(id)) return;
    setProcessingIds(prev => new Set(prev).add(id));

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 600));

    moveToCart(id);
    setProcessingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleRemoveSavedItem = async (id: string) => {
    if (processingIds.has(id)) return;
    setProcessingIds(prev => new Set(prev).add(id));

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 600));

    removeSavedItem(id);
    setProcessingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <main className="bg-white min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20 gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-primary">
            Your <span className="text-secondary italic font-serif">Selection.</span>
          </h1>
          <p className="text-on-surface-variant max-w-md font-medium leading-relaxed text-sm sm:text-base">
            Review your curated pieces before we prepare them for their journey to your home. Each item is inspected for quality and artisan integrity.
          </p>
        </div>
        <Link to="/shop" className="group flex items-center gap-3 text-primary font-bold text-[10px] tracking-[0.25em] uppercase hover:text-secondary transition-colors">
          Continue Shopping
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-16">
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: processingIds.has(item.id) ? 0.6 : 1,
                    y: 0,
                    scale: animatingId === item.id ? 1.02 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-outline-variant/10 flex flex-col sm:flex-row gap-8 items-center shadow-premium hover:shadow-premium-hover transition-all duration-500 relative overflow-hidden"
                >
                  {/* Loading Overlay */}
                  <AnimatePresence>
                    {processingIds.has(item.id) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center"
                      >
                        <Loader2 size={32} className="text-secondary animate-spin" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="w-40 h-40 rounded-3xl overflow-hidden bg-surface-container-low flex-shrink-0 shadow-inner">
                    <img src={getProductImage(item.image)} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-secondary mb-2">{item.category}</p>
                        <h3 className="text-2xl font-headline font-medium leading-tight">{item.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-light">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-[10px] font-mono text-on-surface-variant/40 mt-1 uppercase tracking-widest">${item.price.toFixed(2)} / unit</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
                      <div className="flex items-center bg-surface-container-low rounded-2xl border border-outline-variant/5 p-1">
                        <button
                          onClick={() => handleQuantityUpdate(item.id, -1, item.quantity)}
                          disabled={processingIds.has(item.id)}
                          className="p-3 hover:text-primary transition-colors disabled:opacity-30"
                        >
                          <Minus size={16} />
                        </button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 1.2, color: 'var(--primary)' }}
                          animate={{ scale: 1, color: 'inherit' }}
                          className="w-10 text-center font-mono font-bold text-base"
                        >
                          {item.quantity.toString().padStart(2, '0')}
                        </motion.span>
                        <button
                          onClick={() => handleQuantityUpdate(item.id, 1, item.quantity)}
                          disabled={processingIds.has(item.id)}
                          className="p-3 hover:text-primary transition-colors disabled:opacity-30"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-8">
                        <button
                          onClick={() => handleSaveForLater(item.id)}
                          disabled={processingIds.has(item.id)}
                          className="group flex items-center gap-2 text-[10px] font-mono font-bold text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-[0.2em] disabled:opacity-30"
                        >
                          <Bookmark size={14} className="group-hover:fill-current" /> Save for Later
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={processingIds.has(item.id)}
                          className="group flex items-center gap-2 text-[10px] font-mono font-bold text-on-surface-variant/60 hover:text-red-500 transition-colors uppercase tracking-[0.2em] disabled:opacity-30"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="text-center py-40 bg-surface-container-low rounded-[4rem] border border-outline-variant/10 relative overflow-hidden group shadow-inner"
              >
                {/* Spotlight effect that follows mouse */}
                <motion.div
                  style={{
                    background: useTransform(
                      [spotlightX, spotlightY],
                      ([x, y]) => `radial-gradient(800px circle at ${x}% ${y}%, rgba(249, 115, 22, 0.08), transparent 70%)`
                    )
                  }}
                  className="absolute inset-0 pointer-events-none"
                />

                {/* Interactive Parallax Background Layers */}
                <motion.div
                  style={{ x: layer1X, y: layer1Y }}
                  className="absolute top-20 left-20 w-32 h-32 rounded-full bg-secondary/5 blur-3xl pointer-events-none"
                />
                <motion.div
                  style={{ x: layer2X, y: layer2Y }}
                  className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-secondary/5 blur-[100px] pointer-events-none"
                />

                {/* Floating Decorative Elements */}
                <motion.div
                  style={{ x: layer2X, y: layer1Y }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/4 right-1/4 text-secondary/10 pointer-events-none"
                >
                  <Bookmark size={120} strokeWidth={0.5} />
                </motion.div>

                <motion.div
                  style={{ x: layer1X, y: layer2Y }}
                  className="absolute bottom-1/4 left-1/4 text-secondary/10 pointer-events-none"
                >
                  <ShoppingBag size={120} strokeWidth={0.5} />
                </motion.div>

                <div className="relative z-10">
                  <div className="relative w-64 h-64 mx-auto mb-12">
                    {/* Multi-layered animated illustration */}
                    <motion.div
                      style={{ x: layer3X, y: layer3Y }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-secondary/10 rounded-full blur-[80px]"
                    />

                    <motion.div
                      style={{ x: layer1X, y: layer1Y }}
                      className="absolute inset-4 border border-secondary/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]"
                    />

                    <motion.div
                      style={{
                        x: layer3X,
                        y: layer3Y,
                        rotateX: iconRotateX,
                        rotateY: iconRotateY,
                        perspective: 1000
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-40 h-40 bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/10 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-700">
                        <motion.div
                          animate={{ y: [0, -12, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Logo size="64px" />
                        </motion.div>

                        <motion.div
                          animate={{ x: [-150, 250] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 pointer-events-none"
                        />
                      </div>
                    </motion.div>

                    {/* Floating particles */}
                    {[
                      { top: '10%', left: '20%', x: p1X, y: p1Y, delay: 0 },
                      { top: '80%', left: '15%', x: p2X, y: p2Y, delay: 0.5 },
                      { top: '30%', left: '85%', x: p3X, y: p3Y, delay: 1 },
                      { top: '70%', left: '75%', x: p1X, y: p3Y, delay: 1.5 },
                      { top: '15%', left: '70%', x: p2X, y: p1Y, delay: 2 },
                      { top: '85%', left: '60%', x: p3X, y: p2Y, delay: 2.5 },
                    ].map((p, i) => (
                      <motion.div
                        key={i}
                        style={{ x: p.x, y: p.y, top: p.top, left: p.left }}
                        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: p.delay }}
                        className="absolute w-2 h-2 bg-secondary/30 rounded-full pointer-events-none"
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-6 text-primary">Your selection is <span className="text-secondary italic font-serif">Empty.</span></h3>
                    <p className="text-on-surface-variant mb-14 max-w-sm mx-auto leading-relaxed text-base sm:text-lg font-medium italic">
                      Every great selection starts with a single piece. Discover yours in our curated gallery.
                    </p>
                    <motion.div style={{ x: btnX, y: btnY }}>
                      <Link
                        to="/shop"
                        className="btn-luxury group inline-flex items-center gap-4"
                      >
                        Explore the Gallery
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Saved for Later Section */}
          {savedItems.length > 0 && (
            <div className="pt-20 border-t border-outline-variant/10">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-primary/5 rounded-2xl text-primary">
                  <Bookmark size={24} className="fill-current" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif italic">Saved for <span className="text-primary not-italic font-headline font-light">Later.</span></h2>
                  <p className="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest mt-1">{savedItems.length} items in your archive</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {savedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: processingIds.has(item.id) ? 0.6 : 1,
                        scale: 1
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-6 rounded-[2rem] border border-outline-variant/10 flex gap-6 items-center shadow-premium hover:shadow-premium-hover transition-all duration-500 relative overflow-hidden"
                    >
                      {/* Loading Overlay */}
                      <AnimatePresence>
                        {processingIds.has(item.id) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center"
                          >
                            <Loader2 size={24} className="text-primary animate-spin" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-container-low flex-shrink-0 shadow-inner">
                        <img src={getProductImage(item.image)} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-headline font-medium text-lg truncate mb-1">{item.name}</h4>
                        <p className="font-mono text-sm text-on-surface-variant mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex gap-6">
                          <button
                            onClick={() => handleMoveToCart(item.id)}
                            disabled={processingIds.has(item.id)}
                            className="text-[10px] font-mono font-bold text-primary hover:underline uppercase tracking-[0.2em] disabled:opacity-30"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => handleRemoveSavedItem(item.id)}
                            disabled={processingIds.has(item.id)}
                            className="text-[10px] font-mono font-bold text-on-surface-variant/40 hover:text-red-500 uppercase tracking-[0.2em] disabled:opacity-30"
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
          <div className="bg-surface-container-low p-10 rounded-[3rem] sticky top-32 border border-outline-variant/5 shadow-inner">
            <h2 className="text-3xl font-semibold tracking-tighter mb-10 text-primary">Order <span className="text-secondary italic font-serif">Summary.</span></h2>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-xs font-mono tracking-widest uppercase">
                <span className="text-on-surface-variant/60 font-bold">Subtotal</span>
                <span className="font-bold text-primary">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs font-mono tracking-widest uppercase">
                <span className="text-on-surface-variant/60 font-bold">Shipping</span>
                <span className="font-bold text-secondary">Complimentary</span>
              </div>
              <div className="flex justify-between text-xs font-mono tracking-widest uppercase">
                <span className="text-on-surface-variant/60 font-bold">Estimated Tax</span>
                <span className="font-bold text-primary">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="pt-8 border-t border-primary/5 mb-10">
              <p className="text-[10px] font-mono font-bold text-on-surface-variant/40 mb-3 uppercase tracking-[0.3em]">Total Investment</p>
              <p className="text-5xl font-mono font-bold text-primary tracking-tighter">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <motion.button
              onClick={() => setShowCheckout(true)}
              disabled={items.length === 0}
              className="btn-luxury w-full group mb-8"
            >
              Proceed to Checkout
            </motion.button>
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mb-10">
              <ShieldCheck size={14} className="text-secondary" /> Secure SSL Encrypted
            </div>

            <div className="space-y-5 pt-10 border-t border-primary/5">
              <div className="flex items-start gap-4 text-sm text-on-surface-variant font-medium leading-relaxed">
                <Truck size={18} className="text-secondary shrink-0" />
                <span>Free priority shipping on all orders.</span>
              </div>
              <div className="flex items-start gap-4 text-sm text-on-surface-variant font-medium leading-relaxed">
                <ShieldCheck size={18} className="text-secondary shrink-0" />
                <span>30-day effortless returns policy.</span>
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
              className="absolute inset-0 bg-on-background/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              <div className="lg:w-[40%] bg-surface-container-low p-12 overflow-y-auto no-scrollbar border-r border-outline-variant/10">
                <div className="mb-12">
                  <Logo size="40px" />
                </div>
                <h3 className="text-3xl font-serif italic mb-10">Order <span className="text-primary not-italic font-headline font-light">Summary.</span></h3>
                <div className="space-y-8 mb-10">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white flex-shrink-0 shadow-sm">
                        <img src={getProductImage(item.image)} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-headline font-medium text-base leading-tight mb-1">{item.name}</p>
                        <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">Quantity {item.quantity}</p>
                      </div>
                      <p className="font-mono font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 pt-8 border-t border-outline-variant/10">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                    <span className="text-on-surface-variant/60">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                    <span className="text-on-surface-variant/60">Shipping</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-3xl font-mono font-light pt-6 border-t border-outline-variant/5">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-12 relative overflow-y-auto no-scrollbar">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="absolute top-8 right-8 p-4 hover:bg-surface-container rounded-3xl transition-all border border-outline-variant/10 text-on-surface-variant hover:text-primary"
                >
                  <X size={24} />
                </button>
                <h3 className="text-3xl font-serif italic mb-10">Checkout <span className="text-primary not-italic font-headline font-light">Details.</span></h3>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Full Name</label>
                      <input type="text" defaultValue="John Doe" className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-light" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Phone Number</label>
                      <input type="text" placeholder="+1 (555) 000-0000" className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-light" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Delivery Address</label>
                    <input type="text" placeholder="Street name, apartment, suite..." className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-light" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Pincode</label>
                      <input type="text" defaultValue="600001" className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-light" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">City</label>
                      <input type="text" defaultValue="Kochi" className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-light" />
                    </div>
                  </div>
                  <div className="pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-luxury w-full flex items-center justify-center gap-4 bg-primary text-white"
                    >
                      <MessageCircle size={20} className="text-secondary" /> Order via WhatsApp
                    </motion.button>
                  </div>
                  <p className="text-[10px] text-center font-mono font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
                    By placing an order, you agree to our <span className="underline cursor-pointer hover:text-primary">Terms of Service</span>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
