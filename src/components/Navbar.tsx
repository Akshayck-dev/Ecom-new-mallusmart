import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useSearchStore } from '../store/searchStore';
import Logo from './Logo';

const WHATSAPP_NUMBER = '919562854999';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20place%20an%20order%20from%20Mallu%20Smart!`;

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const openSearch = useSearchStore((state) => state.openSearch);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartItemsCount = useCartStore((state) => state.totalItems());
  const openCartDrawer = useCartStore((state) => state.openDrawer);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-brand-green-100/10 py-3 shadow-lg shadow-black/5' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 w-full flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group relative z-10">
            <Logo size={scrolled ? 38 : 52} className="transition-all duration-500" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                    active ? 'text-brand-green' : 'text-brand-gray/50 hover:text-brand-green hover:tracking-[0.35em]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full shadow-gold"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 md:gap-4 relative z-10">
            {/* Search */}
            <button
              onClick={openSearch}
              className="p-2 text-brand-gray/60 hover:text-brand-green transition-all hover:scale-110 active:scale-95"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden md:flex relative p-2 text-brand-gray/60 hover:text-brand-green transition-all hover:scale-110 active:scale-95"
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-gold text-white text-[7px] font-black flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 text-brand-gray/60 hover:text-brand-green transition-all hover:scale-110 active:scale-95"
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-green text-white text-[7px] font-black flex items-center justify-center rounded-full border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-brand-green text-white text-[9px] font-black rounded-full hover:bg-brand-green-deep transition-all duration-500 shadow-xl shadow-green-900/10 hover:shadow-green-900/20 uppercase tracking-widest active:scale-95"
            >
              <MessageCircle size={14} className="animate-pulse" />
              Order
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-brand-gray/80 hover:text-brand-green transition-all active:scale-90"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] overflow-hidden md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-gray/60 backdrop-blur-xl"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-[400px] bg-white z-[210] flex flex-col shadow-2xl p-8 pt-10"
            >
              <div className="flex items-center justify-between mb-16">
                <Logo size={42} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-gray hover:bg-brand-green/10 hover:text-brand-green transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-4xl font-black uppercase tracking-tight transition-all active:translate-x-2 block ${
                        isActive(link.path) ? 'text-brand-green' : 'text-brand-gray/10 hover:text-brand-gray/30'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-10 border-t border-brand-green-100/10 flex flex-col gap-6">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Contact an Artisan</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-5 bg-brand-green text-white text-[11px] font-black rounded-full shadow-2xl shadow-green-900/20 uppercase tracking-[0.2em] active:scale-95"
                >
                  <MessageCircle size={18} />
                  Start WhatsApp Order
                </a>
                <div className="text-center space-y-1">
                  <p className="text-[8px] font-black text-brand-green/40 uppercase tracking-[0.5em]">
                    Heritage • Luxury • Trust
                  </p>
                  <p className="text-[7px] font-bold text-gray-300 uppercase tracking-widest">
                    Mallu Smart Origins
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
