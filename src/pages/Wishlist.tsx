import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Heart, ArrowRight, ShoppingBag, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import logo from '../assets/logo.png';

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
    <main className="pt-8 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[80vh] bg-brand-offwhite rounded-b-[4rem]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-bold tracking-tighter text-brand-gray mb-6">
            Your <span className="text-brand-green italic font-serif">Wishlist.</span>
          </h1>
          <p className="text-gray-500 max-w-md font-medium leading-relaxed">
            A curated sanctuary for the heritage pieces that caught your eye. Keep them close until you're ready to make them yours.
          </p>
        </div>
        <Link to="/shop" className="group flex items-center gap-3 text-brand-green font-bold text-[10px] tracking-[0.25em] uppercase hover:text-brand-gold transition-colors">
          Continue Shopping
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {items.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex flex-col h-full bg-white p-6 rounded-[2.5rem] border border-brand-green-100/10 shadow-premium hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-surface-container-low relative shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => removeItem(product.id)}
                  className="absolute top-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md text-on-surface-variant hover:text-red-500 transition-all shadow-sm border border-outline-variant/10"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-green/60 mb-2">{product.category}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-green transition-colors leading-tight text-brand-gray">{product.name}</h3>
                <p className="text-lg font-bold text-brand-green/80 mb-6 font-mono tracking-tighter">₹{product.price.toLocaleString()}</p>
                
                <button 
                  onClick={() => handleMoveToCart(product)}
                  className="btn-luxury w-full group"
                >
                  <ShoppingBag size={16} className="transition-transform group-hover:scale-110" /> Move to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="text-center py-40 bg-surface-container-low rounded-[4rem] border border-outline-variant/10 relative overflow-hidden group shadow-inner"
        >
          {/* Spotlight effect */}
          <motion.div 
            style={{ 
              background: useTransform(
                [spotlightX, spotlightY],
                ([x, y]) => `radial-gradient(800px circle at ${x}% ${y}%, rgba(212, 175, 55, 0.08), transparent 70%)`
              )
            }}
            className="absolute inset-0 pointer-events-none transition-opacity"
          />

          {/* Parallax Layers */}
          <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute top-20 left-20 w-32 h-32 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
          <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />
          
          <motion.div 
            style={{ x: layer2X, y: layer1Y }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 text-brand-gold/10 pointer-events-none"
          >
            <Heart size={120} strokeWidth={0.5} />
          </motion.div>

          <div className="relative z-10">
            <div className="relative w-64 h-64 mx-auto mb-12">
              <motion.div 
                style={{ x: layer3X, y: layer3Y }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-gold/5 rounded-full blur-[80px]"
              />
              
              <motion.div 
                style={{ x: layer1X, y: layer1Y }}
                className="absolute inset-4 border border-brand-gold/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]"
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
                    <img 
                      src={logo} 
                      alt="Mallu's Mart Logo" 
                      className="w-24 h-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
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
                  className="absolute w-2 h-2 bg-brand-gold/30 rounded-full pointer-events-none"
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-brand-gray">
                Your heart hasn't <span className="text-brand-green italic font-serif">spoken.</span>
              </h3>
              <p className="text-gray-500 mb-14 max-w-sm mx-auto leading-relaxed text-lg font-medium italic">
                A wishlist without heritage is just a page. Explore our artisan collection and find your match.
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
    </main>
  );
}
