import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, MessageCircle, Sparkles, ShieldCheck, Utensils, Palette, Gift, Baby, UserCheck, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { resolveMedia, resolveBrandAsset } from '../utils/mediaUtils';
import artisanHero from '../assets/kerala_artisanal_flatlay.png';
import wellnessHero from '../assets/kerala_skincare_lifestyle.png';

const CATEGORIES_DATA = [
  { id: 'Food', name: 'Traditional Food', icon: Utensils, image: 'kitchen_mural_atelier.png', count: '12+ Items' },
  { id: 'Handmade', name: 'Handmade Art', icon: Palette, image: 'kerala_artisanal_flatlay.png', count: '8+ Items' },
  { id: 'Beauty', name: 'Natural Care', icon: Sparkles, image: 'kerala_skincare_lifestyle.png', count: '15+ Items' },
  { id: 'Gifts', name: 'Curated Gifts', icon: Gift, image: 'gift_mural_atelier.png', count: '10+ Items' },
  { id: 'Kids', name: 'Kids Zone', icon: Baby, image: 'kids_mural_atelier.png', count: '6+ Items' },
];

const TRUST_DATA = [
  { icon: Heart, title: '100% Homemade', desc: 'Crafted with love by real Kerala homepreneurs' },
  { icon: UserCheck, title: 'Local Sellers', desc: 'Supporting heritage and direct artisan livelihoods' },
  { icon: ShieldCheck, title: 'Natural & Safe', desc: 'Chemical-free and trusted ingredients used' },
  { icon: MessageCircle, title: 'Direct WhatsApp', desc: 'Order directly from sellers in one tap' },
];

const isNativeApp = Capacitor.isNativePlatform();

function NativeHome({ featuredProducts }: { featuredProducts: any[] }) {
  return (
    <main className="bg-surface min-h-screen pb-24">
      {/* Compact Native Header */}
      <section className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Welcome Back</p>
            <h1 className="text-2-5xl font-bold tracking-tight text-primary uppercase">Mallu's Mart</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-primary/5">
            <Sparkles size={18} className="text-secondary" />
          </div>
        </div>

        {/* Quick Search Bar */}
        <Link to="/shop" className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl border border-primary/5 shadow-sm active-scale">
          <Zap size={16} className="text-secondary" />
          <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">Search artisanal goods...</span>
        </Link>
      </section>

      {/* Horizontal Category Scroller */}
      <section className="py-4">
        <div className="px-5 mb-4 flex items-center justify-between">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Discover Zones</h2>
          <Link to="/shop" className="text-[9px] font-bold text-secondary uppercase tracking-widest">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 no-scrollbar snap-x touch-pan-x">
          {CATEGORIES_DATA.map((cat) => (
            <Link 
              key={cat.id} 
              to="/shop" 
              className="flex-shrink-0 flex flex-col items-center gap-3 snap-start active-scale"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src={resolveBrandAsset(cat.image)} className="w-full h-full object-cover" alt="" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">{cat.id}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Dense Product Grid (2 Columns) */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Handpicked for You</h2>
          <Sparkles size={14} className="text-secondary animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {featuredProducts.map((p) => (
            <div key={p.id} className="active-scale h-full">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Micro-Banner */}
      <section className="px-5 py-10 my-4 bg-primary rounded-[2.5rem] mx-5 text-center">
         <ShieldCheck size={24} className="text-secondary mx-auto mb-4" />
         <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">100% Authentic Kerala</h3>
         <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.2em]">Verified by local homepreneurs</p>
      </section>
    </main>
  );
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);

  const HERO_SLIDES = [
    {
      id: 0,
      src: artisanHero,
      title: 'Local Hands',
      subtitle: 'From Heritage Makers to Your Home'
    },
    {
      id: 1,
      src: wellnessHero,
      title: 'Artisan Souls',
      subtitle: 'Supporting Kerala Homepreneurs'
    },
    {
      id: 2,
      src: resolveBrandAsset('hero_artisan.png'),
      title: 'Pure Origins',
      subtitle: 'Handmade with Absolute Trust'
    }
  ];

  useEffect(() => {
    if (isNativeApp || isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, slideIndex]);

  const featuredProducts = useMemo(() => PRODUCTS.slice(0, 8), []);

  if (isNativeApp) {
    return <NativeHome featuredProducts={featuredProducts} />;
  }

  return (
    <main className="overflow-x-hidden w-full bg-surface">
      {/* Warm Artisan Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-surface"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <motion.img
              src={HERO_SLIDES[slideIndex].src}
              alt=""
              className="w-full h-full object-cover bg-center grayscale-[20%] brightness-[0.85]"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 w-full max-w-screen-xl mx-auto px-10 sm:px-12 lg:px-20 text-center flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-4 sm:space-y-6"
          >
            <p className="text-xs uppercase tracking-widest text-secondary font-bold">
              100% Locally Sourced
            </p>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-semibold text-white leading-tight uppercase tracking-tight">
              From Local <span className="text-secondary italic font-serif lowercase">Hands</span> to Your Home.
            </h1>

            <p className="text-sm sm:text-base text-gray-200 max-w-md mx-auto font-medium">
              Supporting local Kerala artisans. Authentic, handmade, and trusted products.
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
              <Link
                to="/shop"
                className="w-full bg-secondary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest text-center shadow-lg active-scale"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="w-full border border-white/30 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest text-center hover:bg-white hover:text-primary transition-all duration-300 active-scale"
              >
                Become a Seller
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-1.5 transition-all duration-700 rounded-full ${
                i === slideIndex ? 'w-12 bg-secondary' : 'w-6 bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Symmetrical Grid Categories */}
      <section className="section-spacing px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto border-t border-primary/5">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 sm:mb-16 gap-6 sm:gap-8 text-center md:text-left">
          <div className="space-y-3 sm:space-y-4 w-full md:w-auto">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Archive Discovery</h2>
            <h3 className="text-display-md uppercase">
              The Heritage <br className="sm:hidden" /> <span className="text-secondary italic font-serif lowercase">Zones.</span>
            </h3>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed font-semibold italic mx-auto md:mx-0">
            Curated by precise standards, harvested with care, and authenticated by Kerala's leading homepreneurs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-primary/5 shadow-premium active-scale"
            >
              <Link to={`/shop`} className="block w-full h-full">
                <img 
                  src={resolveBrandAsset(cat.image)} 
                  alt={cat.name} 
                  className="block w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] text-secondary mb-1.5 sm:mb-2">{cat.count}</span>
                  <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                    {cat.name}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="section-spacing px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto border-t border-primary/5">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 sm:mb-16 gap-6 text-center md:text-left">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Curated Masterpieces</span>
              <div className="hidden sm:block w-12 h-px bg-primary/10" />
            </div>
            <h2 className="text-display-md uppercase">
              Discover <br className="sm:hidden" /> <span className="text-secondary italic font-serif lowercase">Authenticity.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-secondary transition-colors w-full sm:w-auto justify-center py-4 border border-border rounded-full sm:border-none sm:py-0 active-scale">
            View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((p, i) => (
            <div key={p.id} className="active-scale h-full">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="section-spacing px-4 sm:px-6 lg:px-8 border-t border-primary/5 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary">Institutional Standard</h2>
            <h3 className="text-display-md uppercase leading-tight">Why Trust Us?</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_DATA.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 sm:p-10 bg-white rounded-2xl border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-500 active-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-[10px] font-bold text-primary mb-3 uppercase tracking-[0.2em]">{item.title}</h3>
                <p className="text-[10px] font-semibold text-on-surface-variant leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-15">
          <img
            src={resolveBrandAsset('hero_delivery.png')}
            alt=""
            className="block w-full h-full object-cover grayscale brightness-50"
          />
        </div>

        <div className="relative z-10 w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6 sm:gap-10">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.8em] text-white/50">Heritage Protocol</span>
              <div className="w-8 h-px bg-white/20" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl lg:text-7xl font-semibold text-white tracking-tighter uppercase leading-[0.9]"
            >
              Experience <br />
              <span className="text-secondary italic font-serif lowercase">Genuine Luxury.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-xs mx-auto"
          >
            <a
              href="https://wa.me/919562854999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-white text-primary px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-premium active-scale"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
