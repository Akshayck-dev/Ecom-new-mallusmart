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
  { icon: UserCheck, title: 'Local Sellers', desc: 'Supporting heritage and direct artisan livelihoods' },
  { icon: ShieldCheck, title: 'Natural & Safe', desc: 'Chemical-free and trusted ingredients used' },
  { icon: MessageCircle, title: 'Direct WhatsApp', desc: 'Order directly from sellers in one tap' },
];

const CategoryCard = ({ cat }: { cat: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-premium transition-all duration-700"
  >
    <Link to={`/shop/${cat.id}`} className="block w-full h-full">
      <img 
        src={cat.image} 
        alt={cat.name} 
        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end items-start text-left">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <cat.icon size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">{cat.count}</span>
        </div>
        <h4 className="text-2xl md:text-3xl font-serif text-white italic tracking-tighter leading-none mb-3 group-hover:translate-x-2 transition-transform duration-700">
          {cat.name}
        </h4>
        <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] group-hover:text-white transition-colors">Explore Collection</p>
      </div>
    </Link>
  </motion.div>
);

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
    <main className="overflow-x-hidden w-full bg-[#fcfcfc]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
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
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-16 h-px bg-brand-gold/60" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-gold drop-shadow-2xl">
                Kerala Homepreneurs United
              </span>
              <div className="w-16 h-px bg-brand-gold/60" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif italic text-white tracking-tighter leading-[0.9] mb-8 select-none">
              {HERO_SLIDES[slideIndex].title.split(' ')[0]} <br />
              <span className="text-brand-gold not-italic font-sans font-black uppercase text-4xl md:text-6xl tracking-widest opacity-90">{HERO_SLIDES[slideIndex].title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
              Connecting you directly to Kerala's finest artisans. Authentic, handmade, and delivered with absolute trust.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/shop"
                className="group relative px-16 py-7 bg-white text-black rounded-full overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_rgba(255,255,255,0.2)] active:scale-95"
              >
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                  Shop Curation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              </Link>
              <Link
                to="/about"
                className="px-16 py-7 border-2 border-white/20 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-md bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-700"
              >
                Our Heritage
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-16 left-12 flex flex-col gap-4 z-30">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-1 transition-all duration-700 ${
                i === slideIndex ? 'h-12 bg-brand-gold' : 'h-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Symmetrical Grid Categories */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-black/30 mb-6">Archive Discovery</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-black italic tracking-tighter leading-none">
              The Heritage <br /> <span className="text-brand-green not-italic">Zones.</span>
            </h3>
          </div>
          <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.3em] max-w-xs leading-relaxed">
            Curated by precise standards, harvested with care, and authenticated by Kerala's leading homepreneurs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-5 mb-6">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/40">Curated Masterpieces</span>
              <div className="w-16 h-px bg-black/10" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-black italic tracking-tighter leading-none">
              Discover <br /> <span className="text-brand-green not-italic lowercase">Kerala's best.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.4em] text-black">
            View Full Catalog <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.map((p, i) => (
            <motion.div 
              key={p.id} 
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-24 md:py-40 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-black/30 mb-8">The Institutional Standard</h2>
            <h3 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter leading-none">Why Trust <span className="not-italic text-brand-green">Mallu Smart?</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {TRUST_DATA.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-8 text-black group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm group-hover:shadow-2xl">
                  <item.icon size={30} strokeWidth={1.5} />
                </div>
                <h3 className="text-[13px] font-black text-black mb-4 uppercase tracking-[0.3em]">{item.title}</h3>
                <p className="text-[11px] font-bold text-black/40 leading-relaxed uppercase tracking-[0.2em]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroDelivery}
            alt="Authentic Kerala"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center gap-10">
          <div className="flex items-center gap-8">
            <div className="w-16 h-px bg-black/20" />
            <span className="text-[11px] font-black uppercase tracking-[0.8em] text-black/40">Heritage Protocol</span>
            <div className="w-16 h-px bg-black/20" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-black tracking-tighter leading-[0.85] select-none"
          >
            Experience the <br />
            <span className="text-brand-green not-italic">Genuine.</span>
          </motion.h2>

          <motion.a
            href="https://wa.me/919562854999"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative px-16 py-7 bg-black text-white rounded-full overflow-hidden transition-all duration-700 shadow-2xl active:scale-95"
          >
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-4">
              <MessageCircle size={20} className="fill-white" />
              Order on WhatsApp
            </span>
            <div className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
          </motion.a>
        </div>
      </section>
    </main>
  );
}
