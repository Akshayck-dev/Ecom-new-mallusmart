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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-md border-b border-gray-50 py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full flex items-center justify-between gap-8">
          
          {/* Logo: Premium Expansion & Hover Scale */}
          <Link to="/" className="flex-shrink-0 group relative z-10 transition-transform duration-500 hover:scale-105">
            <Logo size={scrolled ? 48 : 64} className="transition-all duration-700" />
          </Link>

          {/* Desktop Navigation: High-Contrast Monochrome (text-black) */}
          <nav className="hidden md:flex items-center gap-14">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${
                    active ? 'text-black' : 'text-black hover:opacity-70'
                  }`}
                >
                  {link.name}
                  {/* Luxury Underline Animation */}
                  <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-black origin-left transition-transform duration-700 ${
                    active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Action Icons: ABSOLUTE BLACK Profile */}
          <div className="flex items-center gap-6 md:gap-9 relative z-10">
            {/* Search */}
            <button
              onClick={openSearch}
              className="p-1.5 text-black hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="hidden md:flex relative p-1.5 text-black hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <Heart size={20} strokeWidth={2.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[8px] font-black flex items-center justify-center rounded-full shadow-sm border border-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Icon with Premium 'Deep Green' Badge */}
            <button
              onClick={openCartDrawer}
              className="relative p-1.5 text-black hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <ShoppingBag size={20} strokeWidth={2.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1A3A34] text-white text-[8px] font-black flex items-center justify-center rounded-full shadow-lg border border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>


            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-black hover:opacity-70 transition-all active:scale-90"
            >
              <Menu size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] overflow-hidden md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-xl"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-[400px] bg-white z-[210] flex flex-col shadow-2xl p-8 pt-12"
            >
              <div className="flex items-center justify-between mb-16">
                <Logo size={48} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all transform active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 flex-1">
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
                      className={`text-5xl font-serif italic tracking-tighter transition-all active:translate-x-2 block ${
                        isActive(link.path) ? 'text-black' : 'text-gray-100 hover:text-black'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-10 border-t border-gray-100 flex flex-col gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-black uppercase tracking-[0.3em]">Institutional Grade</p>
                  <p className="text-xs text-black/60">Secure Digital Commerce</p>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-4 py-6 bg-black text-white text-[11px] font-black rounded-full shadow-2xl uppercase tracking-[0.3em] active:scale-95"
                >
                  <MessageCircle size={20} />
                  Official WhatsApp Channel
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
