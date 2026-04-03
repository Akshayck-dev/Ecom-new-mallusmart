import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

/**
 * HeroWithNavbar - A premium, high-density Hero section with a coordinated transparent Navbar.
 * Designed for "Mallu's Mart" with an institutional, minimalist aesthetic.
 */
export default function HeroWithNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-surface selection:bg-secondary/30">
      
      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-4 sm:px-8 lg:px-12 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-primary/5 py-3 shadow-premium" 
            : "bg-transparent py-6 sm:py-8"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="relative z-10 hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-3">
              <Logo size={scrolled ? 36 : 48} className="transition-all duration-700" />
              <div className={`hidden sm:block transition-all duration-500 overflow-hidden ${scrolled ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}>
                <h1 className="font-headline font-bold text-lg tracking-tighter text-white uppercase">
                  Mallu's <span className="text-secondary italic font-serif lowercase">Mart.</span>
                </h1>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Optional expansion for premium feel) */}
          <div className={`hidden md:flex items-center gap-8 lg:gap-12 transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white'}`}>
            {['Shop', 'Categories', 'Atelier', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-secondary transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className={`flex items-center gap-2 sm:gap-6 relative z-10 transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white'}`}>
            <button className="p-2 hover:opacity-70 transition-all hover:scale-110 active:scale-90">
              <Search size={20} strokeWidth={2} />
            </button>
            <button className="relative p-2 hover:opacity-70 transition-all hover:scale-110 active:scale-90">
              <ShoppingBag size={20} strokeWidth={2} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-secondary text-white text-[7px] font-black flex items-center justify-center rounded-full border border-white">
                0
              </span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:opacity-70 transition-all active:scale-90"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-16">
                <Logo size={42} variant="invert" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-8">
                {['Shop', 'Categories', 'Atelier', 'Impact', 'About'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    href="#"
                    className="block text-4xl font-headline font-bold text-white tracking-tighter"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900/40 z-10" /> {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFCF0]/10 z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1604908176997-4317c57c7f98?auto=format&fit=crop&q=80&w=2600"
            className="w-full h-full object-cover bg-center grayscale-[10%] brightness-[0.85]"
            alt="Mallu's Mart Heritage Artisan"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-20 w-full max-w-screen-xl mx-auto px-6 lg:px-24 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-8"
          >
            {/* Subtle Label */}
            <div className="flex items-center gap-4 text-secondary font-bold uppercase tracking-[0.5em] text-[10px]">
              <div className="w-8 h-px bg-secondary/30" />
              <span className="flex items-center gap-2">
                <Sparkles size={12} className="animate-pulse" />
                100% Locally Sourced
              </span>
              <div className="w-8 h-px bg-secondary/30" />
            </div>

            {/* Main Headline */}
            <h2 className="text-white text-4xl sm:text-6xl lg:text-8xl font-headline font-bold leading-tight sm:leading-[0.95] tracking-tighter uppercase max-w-4xl px-6">
              From Local <span className="text-secondary italic font-serif lowercase">hands</span> <br className="hidden sm:block" />
              To Your Home.
            </h2>

            {/* Supportive Copy */}
            <p className="text-white/80 max-w-lg mx-auto leading-relaxed text-sm sm:text-lg font-medium italic opacity-90 px-6">
              Supporting the heritage makers of Kerala. Discover authentic, artisan-crafted pieces that bring history to your modern dwelling.
            </p>

            {/* Call to Actions (Responsive buttons) */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-none">
              <button className="btn-luxury w-full sm:w-auto sm:px-12 py-6 bg-secondary text-white hover:bg-secondary/90 shadow-xl flex items-center justify-center gap-4 group">
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase whitespace-nowrap">Explore Products</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full sm:w-auto sm:px-12 py-6 border border-white/20 bg-white/5 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-primary transition-all duration-500 whitespace-nowrap">
                Become a Seller
              </button>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden lg:flex flex-col items-center gap-3 pt-12 absolute -bottom-32"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
              <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.5em] vertical-rl">Scroll</span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ADDITIONAL STYLING (Inlined for standalone ease) */}
      <style>{`
        .btn-luxury {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .btn-luxury:active {
          transform: scale(0.95);
        }
        @media (min-width: 1024px) {
          .vertical-rl {
            writing-mode: vertical-rl;
          }
        }
      `}</style>

    </div>
  );
}
