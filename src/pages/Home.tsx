import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, ChevronRight, ShoppingBag, ArrowLeft, Clock } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { useHistoryStore } from '../store/historyStore';
import { Product } from '../types';

const HERO_SLIDES = [
  {
    id: 1,
    subtitle: "Introducing",
    title: "OFFBEAT",
    description: "A scent that defies the ordinary. Bold, mysterious, and unapologetically unique.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
    accent: "#F27D26",
    bg: "radial-gradient(circle at 50% 50%, #3a1510 0%, #0a0502 100%)"
  },
  {
    id: 2,
    subtitle: "The New",
    title: "ESSENCE",
    description: "Pure, refined, and timeless. The ultimate expression of modern elegance.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
    accent: "#0059c6",
    bg: "radial-gradient(circle at 50% 50%, #101a3a 0%, #02050a 100%)"
  }
];

export default function Home() {
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];
  const { viewedIds } = useHistoryStore();

  const recentlyViewed = useMemo(() => {
    return viewedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is Product => !!p)
      .slice(0, 5);
  }, [viewedIds]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <main className="overflow-hidden bg-[#F9F9F9]">
      {/* Editorial Hero Section */}
      <section 
        ref={heroRef} 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden transition-colors duration-1000"
        style={{ background: slide.bg }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center px-8 md:px-24"
          >
            {/* Background Glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] opacity-30 rounded-full"
              style={{ background: slide.accent }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
              {/* Product Image Side */}
              <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                <motion.div
                  initial={{ scale: 2, y: 100, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                  }}
                  className="relative w-full max-w-[500px] aspect-[4/5]"
                >
                  {/* Stylized "Rock" Base */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-black/40 blur-2xl rounded-[100%] -z-10" />
                  
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              {/* Text Side */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-serif italic text-2xl md:text-4xl text-white/80 mb-2"
                >
                  {slide.subtitle}
                </motion.p>
                
                <motion.h1
                  initial={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.6
                  }}
                  className="font-display text-[15vw] lg:text-[12vw] leading-[0.85] text-white tracking-tighter mb-8"
                  style={{ 
                    textShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                    background: `linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.4) 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.8 }}
                  className="text-white text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-10 font-light leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-2xl"
                  >
                    Shop Collection <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-12 left-0 right-0 px-8 md:px-24 flex items-center justify-between z-20">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Curated Verticals (Bento Grid) */}
      <section className="section-spacing bg-surface-container-lowest px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-primary/40" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">The Collection</span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-black tracking-tight text-on-background">Beauty Essentials.</h2>
              <p className="text-on-surface-variant mt-4 text-xl font-medium">Discover our hand-picked categories, designed to enhance your natural glow and simplify your routine.</p>
            </div>
            <Link to="/shop" className="group flex items-center gap-4 px-8 py-4 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-on-background hover:text-white transition-all">
              View All Collections <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-10 h-[1200px] md:h-[800px]">
            {/* Large Bento Item */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] shadow-2xl"
            >
              <img src={CATEGORIES[0].image} alt={CATEGORIES[0].name} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/50 mb-4">Featured Category</p>
                  <h3 className="text-4xl font-black text-white mb-8">{CATEGORIES[0].name}</h3>
                  <Link to="/shop" className="inline-flex items-center gap-4 px-8 py-4 bg-[#FDCB58] text-on-background rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                    Explore Collection <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Medium Bento Item */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] shadow-xl"
            >
              <img src={CATEGORIES[1].image} alt={CATEGORIES[1].name} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12">
                <h3 className="text-3xl font-black text-white mb-4">{CATEGORIES[1].name}</h3>
                <Link to="/shop" className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:text-white transition-colors group/link">
                  Explore Collection 
                  <span className="w-8 h-px bg-white/20 group-hover/link:w-12 group-hover/link:bg-white transition-all" />
                </Link>
              </div>
            </motion.div>

            {/* Small Bento Items */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] shadow-lg"
            >
              <img src={CATEGORIES[2].image} alt={CATEGORIES[2].name} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-black text-white mb-3">{CATEGORIES[2].name}</h3>
                <Link to="/shop" className="text-white/60 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                  Explore <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] shadow-lg"
            >
              <img src={CATEGORIES[3].image} alt={CATEGORIES[3].name} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-black text-white mb-3">{CATEGORIES[3].name}</h3>
                <Link to="/shop" className="text-white/60 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                  Explore <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean Beauty Section */}
      <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Clean beauty</h2>
          <Link 
            to="/shop" 
            className="px-6 py-2 bg-[#FFD966] text-gray-900 font-medium rounded-full hover:scale-105 transition-transform text-sm"
          >
            see more
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRODUCTS.slice(4, 9).map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={i} 
              isActive={i === 1}
            />
          ))}
        </div>
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto border-t border-outline-variant/10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                <Clock size={16} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Recently Viewed</h2>
                <p className="text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-widest mt-1">Your browsing history</p>
              </div>
            </div>
            <Link 
              to="/shop" 
              className="px-6 py-2 bg-surface-container text-on-surface font-medium rounded-full hover:bg-on-background hover:text-white transition-all text-sm"
            >
              Shop All
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentlyViewed.map((product, i) => (
              <ProductCard 
                key={`recent-${product.id}`} 
                product={product} 
                index={i} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Hall of Classics */}
      <section className="section-spacing bg-surface-container-low px-6 md:px-12 relative overflow-hidden">
        {/* Abstract Background Shape */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-primary/40" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Heritage Pieces</span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-black tracking-tight text-on-background">Hall of Classics.</h2>
              <p className="text-on-surface-variant mt-4 text-xl font-medium">Timeless beauty icons that have defined our brand and earned a permanent spot on your vanity.</p>
            </div>
            <Link to="/shop" className="group flex items-center gap-4 px-8 py-4 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-on-background hover:text-white transition-all shadow-sm">
              View All Classics <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRODUCTS.slice(0, 5).map((product, i) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Star size={28} />, title: "Clean Beauty", desc: "Formulated without harmful chemicals, focusing on pure, skin-loving ingredients." },
            { icon: <Shield size={28} />, title: "Dermatologist Tested", desc: "Every product is rigorously tested for safety and efficacy on all skin types." },
            { icon: <Truck size={28} />, title: "Global Shipping", desc: "Eco-friendly shipping to over 45 countries with real-time tracking." }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col items-center text-center p-16 rounded-[2.5rem] bg-surface-container-lowest border border-outline-variant/5 hover:border-primary/20 hover:shadow-premium transition-all group relative overflow-hidden"
            >
              <div className="w-20 h-20 bg-[#FDCB58]/10 rounded-[2rem] flex items-center justify-center text-on-background mb-10 group-hover:scale-110 group-hover:bg-[#FDCB58] transition-all duration-700 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-on-surface-variant text-base leading-relaxed font-medium">{feature.desc}</p>
              
              {/* Decorative background number */}
              <span className="absolute -bottom-4 -right-4 text-[12rem] font-black text-on-background/5 select-none pointer-events-none group-hover:text-on-background/10 transition-colors">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <QuickViewModal 
        productId={quickViewId} 
        onClose={() => setQuickViewId(null)} 
      />
    </main>
  );
}
