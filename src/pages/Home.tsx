import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { useState } from 'react';

export default function Home() {
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <main className="overflow-hidden bg-[#F9F9F9]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-8 md:px-12 max-w-7xl mx-auto pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:w-1/2 z-10"
          >
            <motion.h1 variants={itemVariants} className="text-[clamp(3rem,6vw,5rem)] leading-[1.1] font-black tracking-tight text-on-background mb-8">
              The new lineup <br />
              you'll swear by for <br />
              dullness, dryness <br />
              and breakouts.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-on-surface-variant text-lg mb-10 max-w-md leading-relaxed font-medium">
              Morbi quam quam, tincidunt sed tempor in, interdum tempus eros. Proin sed dictum lorem. Fusce porttitor bibendum elementum. Nulla vitae elit placerat augue molestie auctor non non quam.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link to="/shop" className="inline-block px-12 py-4 bg-[#FDCB58] text-on-background rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20">
                see more
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="md:w-1/2 relative flex items-center justify-center">
            {/* Background Circle */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#FDCB58] rounded-full -z-10 translate-x-12 -translate-y-12"
            />
            
            {/* Product Image */}
            <motion.div 
              initial={{ x: 100, opacity: 0, rotate: 10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[600px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000" 
                alt="Skincare Lineup" 
                className="w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]"
                referrerPolicy="no-referrer"
              />
              
              {/* Price Tag Overlay */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute top-1/4 right-0 md:right-12 text-right"
              >
                <p className="text-3xl md:text-4xl font-black text-on-background leading-none">24,99€</p>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">per piece, 30 ml</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#FDCB58]" />
          <div className="w-4 h-4 rounded-full border-2 border-[#FDCB58] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FDCB58]" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#FDCB58]/30" />
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

      {/* New Arrivals */}
      <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary/40" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Just Landed</span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-black tracking-tight text-on-background">New Arrivals.</h2>
            <p className="text-on-surface-variant mt-4 text-xl font-medium">Explore our latest drops, formulated with premium ingredients to elevate your daily beauty rituals.</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-4 px-8 py-4 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-on-background hover:text-white transition-all">
            View Full Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {PRODUCTS.slice(4, 7).map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={i} 
              onQuickView={(p) => setQuickViewId(p.id)}
            />
          ))}
        </div>
      </section>

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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {PRODUCTS.slice(0, 3).map((product, i) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={i} 
                onQuickView={(p) => setQuickViewId(p.id)}
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
