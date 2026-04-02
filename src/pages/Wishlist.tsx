import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, ArrowRight, ShoppingBag, Trash2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import Logo from '../components/Logo';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);
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

  // Parallax transforms
  const layer1X = useTransform(xSpring, [-0.5, 0.5], [-30, 30]);
  const layer1Y = useTransform(ySpring, [-0.5, 0.5], [-30, 30]);
  const layer2X = useTransform(xSpring, [-0.5, 0.5], [50, -50]);
  const layer2Y = useTransform(ySpring, [-0.5, 0.5], [50, -50]);
  const layer3X = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);
  const layer3Y = useTransform(ySpring, [-0.5, 0.5], [-15, 15]);
  const btnX = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const btnY = useTransform(ySpring, [-0.5, 0.5], [-10, 10]);
  const spotlightX = useTransform(xSpring, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(ySpring, [-0.5, 0.5], [0, 100]);
  const iconRotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const iconRotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);

  const p1X = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const p1Y = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);
  const p2X = useTransform(xSpring, [-0.5, 0.5], [15, -15]);
  const p2Y = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const p3X = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const p3Y = useTransform(ySpring, [-0.5, 0.5], [10, -10]);

  const handleMoveToCart = (product: any) => {
    addItemToCart(product);
    removeItem(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto min-h-[80vh] bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 sm:mb-24 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-secondary">Private Curation</span>
            <div className="w-12 h-px bg-primary/10" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-primary uppercase">
            Your <span className="text-secondary italic font-serif lowercase">Wishlist.</span>
          </h1>
          <p className="text-on-surface-variant max-w-md font-medium leading-relaxed text-sm sm:text-base italic">
            A curated sanctuary for the heritage pieces that caught your eye. Keep them close until you're ready to make them yours.
          </p>
        </div>
        <Link to="/shop" className="group flex items-center gap-4 text-primary font-bold text-[10px] tracking-[0.3em] uppercase hover:text-secondary transition-colors">
          Explore The Archive
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {items.map((product, i) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col h-full bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[3rem] border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-500"
            >
              <div className="aspect-[3/4] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden mb-8 bg-surface relative shrink-0 shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => removeItem(product.id)}
                  className="absolute top-4 right-4 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md text-primary/40 hover:text-red-500 transition-all shadow-premium border border-primary/5"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col space-y-4">
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-secondary">{product.category}</p>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-primary uppercase leading-tight group-hover:text-secondary transition-colors">{product.name}</h3>
                </div>
                <p className="text-xl font-semibold text-primary tracking-tighter italic">₹{product.price.toLocaleString()}</p>
                
                <button 
                  onClick={() => handleMoveToCart(product)}
                  className="btn-luxury w-full py-5 flex items-center justify-center gap-3 transition-all"
                >
                  <ShoppingBag size={18} /> <span className="text-[10px] uppercase font-bold tracking-widest">Move to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative text-center py-48 sm:py-64 bg-surface rounded-[4rem] sm:rounded-[6rem] border border-primary/5 overflow-hidden group shadow-premium"
        >
          {/* Spotlight effect */}
          <motion.div 
            style={{ 
              background: useTransform(
                [spotlightX, spotlightY],
                ([x, y]) => `radial-gradient(800px circle at ${x}% ${y}%, rgba(249, 115, 22, 0.08), transparent 70%)`
              )
            }}
            className="absolute inset-0 pointer-events-none transition-opacity"
          />

          {/* Parallax Layers */}
          <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute top-20 left-20 w-32 h-32 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
          <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
          
          <motion.div 
            style={{ x: layer2X, y: layer1Y }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 text-secondary/5 pointer-events-none"
          >
            <Heart size={160} strokeWidth={0.5} />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-72 h-72 mb-16 flex items-center justify-center">
              <motion.div 
                style={{ x: layer3X, y: layer3Y }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-secondary/5 rounded-full blur-[100px]"
              />
              
              <motion.div 
                style={{ x: layer1X, y: layer1Y }}
                className="absolute inset-2 border border-secondary/10 rounded-full border-dashed animate-[spin_30s_linear_infinite]"
              />

              <motion.div 
                style={{ 
                  x: layer3X, 
                  y: layer3Y,
                  rotateX: iconRotateX,
                  rotateY: iconRotateY,
                  perspective: 1200
                }}
                className="relative"
              >
                <div className="w-48 h-48 bg-white rounded-[3rem] shadow-premium border border-primary/5 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-1000">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="scale-125"
                  >
                    <Logo />
                  </motion.div>
                  
                  <motion.div 
                    animate={{ x: [-200, 300] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Floating particles */}
              {[
                { top: '10%', left: '25%', x: p1X, y: p1Y, delay: 0 },
                { top: '80%', left: '20%', x: p2X, y: p2Y, delay: 0.5 },
                { top: '35%', left: '80%', x: p3X, y: p3Y, delay: 1 },
                { top: '75%', left: '85%', x: p1X, y: p3Y, delay: 1.5 },
                { top: '20%', left: '75%', x: p2X, y: p1Y, delay: 2 },
                { top: '85%', left: '65%', x: p3X, y: p2Y, delay: 2.5 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  style={{ x: p.x, y: p.y, top: p.top, left: p.left }}
                  animate={{ y: [0, -25, 0], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: p.delay }}
                  className="absolute w-2 h-2 bg-secondary/20 rounded-full pointer-events-none"
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h3 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-primary uppercase leading-tight">
                Your heart hasn't <br />
                <span className="text-secondary italic font-serif lowercase">spoken yet.</span>
              </h3>
              <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed text-base sm:text-lg font-medium italic">
                A wishlist without heritage is just a page. Explore our artisan archive and find your perfect piece.
              </p>
              <motion.div style={{ x: btnX, y: btnY }} className="pt-6">
                <Link 
                  to="/shop" 
                  className="btn-luxury group inline-flex items-center gap-6 px-16 py-7 shadow-xl"
                >
                  Explore The Collection
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
