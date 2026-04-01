import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, MessageCircle, Sparkles, ShieldCheck, Utensils, Palette, Gift, Baby, UserCheck, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import logoImg from '../assets/logo.png';
import heroProducts from '../assets/hero_products.png';
import heroArtisan from '../assets/hero_artisan.png';
import heroDelivery from '../assets/hero_delivery.png';

const CATEGORIES_DATA = [
  { id: 'Food', name: 'Traditional Food', icon: Utensils, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', count: '12+ Items' },
  { id: 'Handmade', name: 'Handmade Art', icon: Palette, image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&q=80&w=600', count: '8+ Items' },
  { id: 'Beauty', name: 'Natural Care', icon: Sparkles, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600', count: '15+ Items' },
  { id: 'Gifts', name: 'Curated Gifts', icon: Gift, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', count: '10+ Items' },
  { id: 'Kids', name: 'Kids Zone', icon: Baby, image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&q=80&w=600', count: '6+ Items' },
];

const TRUST_DATA = [
  { icon: Heart, title: '100% Homemade', desc: 'Crafted with love by real Kerala homepreneurs' },
  { icon: UserCheck, title: 'Kerala Local Sellers', desc: 'Supporting heritage and direct artisan livelihoods' },
  { icon: ShieldCheck, title: 'Natural & Safe', desc: 'Chemical-free and trusted ingredients used' },
  { icon: MessageCircle, title: 'Direct WhatsApp', desc: 'Order directly from sellers in one tap' },
];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);

  const HERO_SLIDES = [
    {
      id: 0,
      src: heroProducts,
      title: 'Handmade Treasures',
      subtitle: 'Authentic Kerala Origins'
    },
    {
      id: 1,
      src: heroArtisan,
      title: 'Expert Hands',
      subtitle: 'Supporting Homepreneurs'
    },
    {
      id: 2,
      src: heroDelivery,
      title: 'Trusted Delivery',
      subtitle: 'Straight from the Source'
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slideIndex]);

  const featuredProducts = useMemo(() => PRODUCTS.slice(0, 8), []);

  return (
    <main className="overflow-x-hidden w-full bg-brand-offwhite">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.img
              src={HERO_SLIDES[slideIndex].src}
              alt=""
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-brand-gray/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/20 via-transparent to-brand-gray/80 z-10" />

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-brand-gold/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold drop-shadow-lg">
                Kerala Homepreneurs United
              </span>
              <div className="w-12 h-px bg-brand-gold/50" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 uppercase font-headline break-words">
              {HERO_SLIDES[slideIndex].title.split(' ')[0]} <br />
              <span className="italic font-light text-brand-gold lowercase opacity-90">{HERO_SLIDES[slideIndex].title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-bold">
              Connecting you directly to Kerala's finest artisans. Authentic, handmade, and delivered with trust.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="btn-luxury !px-12 !py-5 flex items-center gap-3 text-sm shadow-2xl"
              >
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="px-12 py-5 border-2 border-white/20 text-white text-[11px] font-black uppercase tracking-widest rounded-full backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all"
              >
                Our Heritage
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === slideIndex ? 'w-10 bg-brand-gold' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-10 md:py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green/60 mb-2">Explore Origins</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-gray tracking-tighter uppercase font-headline">The Heritage <span className="text-brand-green italic font-light lowercase">Zones.</span></h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
          {CATEGORIES_DATA.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <Link to={`/shop/${cat.id}`} className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-premium group-hover:shadow-premium-hover transition-all duration-500 group-hover:-translate-y-2">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray/90 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brand-gold mb-3 group-hover:scale-110 transition-transform">
                    <cat.icon size={20} />
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1 truncate w-full">{cat.name}</h4>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">{cat.count}</p>
                </div>
                {/* Hover Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-10 md:py-16 px-4 md:px-12 max-w-7xl mx-auto border-t border-brand-green-100/10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green/60">Curated Masterpieces</span>
              <div className="w-10 h-px bg-brand-gold/30" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-gray tracking-tighter uppercase leading-none font-headline">
              Discover <br /> <span className="text-brand-green italic font-light lowercase">Kerala's best.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-green">
            View Full Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Trust Banner / Features Section */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-12 border-t border-brand-green-100/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green/60 mb-2">The Standard</h2>
            <h3 className="text-3xl md:text-5xl font-black text-brand-gray tracking-tighter uppercase font-headline">Why Trust <span className="text-brand-green italic font-light lowercase">Mallu Smart?</span></h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRUST_DATA.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-offwhite p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-premium hover:shadow-2xl transition-all group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-green/5 border border-brand-green/10 flex items-center justify-center mx-auto mb-6 text-brand-green group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xs font-black text-brand-gray mb-3 uppercase tracking-widest">{item.title}</h3>
                <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Optimized Hero CTA */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Full-width Kerala background */}
        <div className="absolute inset-0">
          <img
            src={heroDelivery}
            alt="Authentic Kerala"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d1f]/80 to-[#1a6b2f]/90" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center gap-5 md:gap-6">
          
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[#D4AF37]/60" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Kerala Homepreneurs United</span>
            <div className="w-8 h-px bg-[#D4AF37]/60" />
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.05] font-headline"
          >
            Experience the Genuine<br />
            <span className="text-[#D4AF37]">Kerala</span> Heritage
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/75 text-sm md:text-lg font-medium leading-relaxed max-w-md"
          >
            Authentic handmade products from Kerala's most trusted homepreneurs — straight to your door.
          </motion.p>

          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/919562854999"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-black/30 hover:bg-[#20c75a] transition-colors duration-200 w-full sm:w-auto"
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </motion.a>

          {/* Compact Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8 mt-1">
            {[
              { icon: ShieldCheck, label: 'Quality Verified' },
              { icon: Zap, label: 'Fast Delivery' },
              { icon: Star, label: 'Top Rated' }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                <badge.icon size={13} className="text-[#D4AF37] shrink-0" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint — bottom fade so next section peeks through */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-brand-offwhite/60 to-transparent pointer-events-none" />
      </section>
    </main>
  );
}
