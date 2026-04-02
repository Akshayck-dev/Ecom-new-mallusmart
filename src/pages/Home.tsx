import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, MessageCircle, Sparkles, ShieldCheck, Utensils, Palette, Gift, Baby, UserCheck, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import Logo from '../components/Logo';

const CATEGORIES_DATA = [
  { id: 'Food', name: 'Traditional Food', icon: Utensils, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', count: '12+ Items' },
  { id: 'Handmade', name: 'Handmade Art', icon: Palette, image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&q=80&w=600', count: '8+ Items' },
  { id: 'Beauty', name: 'Natural Care', icon: Sparkles, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600', count: '15+ Items' },
  { id: 'Gifts', name: 'Curated Gifts', icon: Gift, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', count: '10+ Items' },
  { id: 'Kids', name: 'Kids Zone', icon: Baby, image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&q=80&w=600', count: '6+ Items' },
];

const TRUST_DATA = [
  { icon: Heart, title: '100% Homemade', desc: 'Crafted with love by real Kerala homepreneurs' },
  { icon: UserCheck, title: 'Local Sellers', desc: 'Supporting heritage and direct artisan livelihoods' },
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
      src: "https://images.unsplash.com/photo-1590424753242-f59cdd9f41b2?auto=format&fit=crop&q=80&w=2600", // Kerala Brass Lamp / Nilavilakku vibe
      title: 'Local Hands',
      subtitle: 'From Heritage Makers to Your Home'
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2600", // Spices / Natural Wood vibe
      title: 'Artisan Souls',
      subtitle: 'Supporting Kerala Homepreneurs'
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=2600", // Traditional Crafts
      title: 'Pure Origins',
      subtitle: 'Handmade with Absolute Trust'
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideIndex]);

  const featuredProducts = useMemo(() => PRODUCTS.slice(0, 8), []);

  return (
    <main className="overflow-x-hidden w-full bg-surface">
      {/* Warm Artisan Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-surface-container-low"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Layer */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-[#111111]/30 z-10" />
            <motion.img
              src={HERO_SLIDES[slideIndex].src}
              alt=""
              className="w-full h-full object-cover grayscale-[20%] brightness-[0.85]"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Layer */}
        <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left space-y-10"
          >
            <div className="flex items-center gap-4 text-secondary font-bold uppercase tracking-[0.4em] text-[10px]">
              <div className="w-10 h-px bg-secondary/30" />
              100% Locally Sourced
            </div>

            <h1 className="text-7xl sm:text-8xl lg:text-[10rem] font-semibold text-white leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
              From Local <br /> 
              <span className="italic font-serif text-secondary lowercase font-normal italic">Hands</span> <br />
              to Your Home.
            </h1>

            <p className="text-lg sm:text-xl text-white/90 max-w-lg leading-relaxed font-medium italic drop-shadow-md">
              Supporting 50+ local Kerala artisans. Authentic, handmade, and delivered with absolute trust directly to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto pt-4">
              <Link
                to="/shop"
                className="btn-luxury px-12 py-6 bg-secondary text-white border-none hover:bg-white hover:text-primary transition-all duration-500 w-full sm:min-w-[220px] rounded-full text-center"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="btn-luxury-secondary bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white hover:text-primary px-12 py-6 transition-all duration-500 w-full sm:min-w-[220px] rounded-full text-center"
              >
                Become a Seller
              </Link>
            </div>
          </motion.div>

          {/* Floating Visual Accent (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative aspect-[4/5] w-full max-w-md mx-auto"
          >
            <div className="absolute -inset-4 bg-secondary/20 rounded-[4rem] blur-3xl animate-pulse" />
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden border border-white/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover"
                alt="Kerala Artisan Craft"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-6 sm:left-12 lg:left-20 flex items-center gap-4 z-30">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-1 transition-all duration-700 rounded-full ${
                i === slideIndex ? 'w-20 bg-secondary' : 'w-8 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Symmetrical Grid Categories */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end justify-between mb-20 gap-12">
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-on-surface-variant">Archive Discovery</h2>
            <h3 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-primary tracking-tighter leading-none">
              The Heritage <span className="text-secondary italic font-serif">Zones.</span>
            </h3>
          </div>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-md leading-relaxed font-medium italic">
            Curated by precise standards, harvested with care, and authenticated by Kerala's leading homepreneurs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-primary/5 shadow-premium"
            >
              <Link to={`/shop`} className="block w-full h-full">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-secondary mb-3">{cat.count}</span>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                    {cat.name}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto border-t border-primary/5">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-on-surface-variant">Curated Masterpieces</span>
              <div className="w-16 h-px bg-primary/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-primary tracking-tighter leading-none uppercase">
              Discover <span className="text-secondary italic font-serif">Authenticity.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-secondary transition-colors">
            View All <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((p, i) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-surface py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-primary/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-on-surface-variant">Institutional Standard</h2>
            <h3 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-primary tracking-tighter uppercase">Why Trust Us?</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_DATA.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-white rounded-[2.5rem] border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-bold text-primary mb-4 uppercase tracking-[0.2em]">{item.title}</h3>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20 transition-transform duration-[10s] hover:scale-110">
          <img
            src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-px bg-white/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/40">Heritage Protocol</span>
            <div className="w-16 h-px bg-white/20" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl lg:text-9xl font-semibold text-white tracking-tighter uppercase leading-[0.85]"
          >
            Experience <br />
            <span className="text-secondary italic font-serif lowercase">Genuine Luxury.</span>
          </motion.h2>

          <motion.a
            href="https://wa.me/919562854999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury px-16 py-7 bg-white text-primary border-none hover:bg-secondary hover:text-white flex items-center gap-4 text-xs font-bold"
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </motion.a>
        </div>
      </section>
    </main>
  );
}
