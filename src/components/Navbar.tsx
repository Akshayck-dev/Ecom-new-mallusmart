import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useSearchStore } from '../store/searchStore';
import Logo from './Logo';

const WHATSAPP_NUMBER = '919562854999';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20place%20an%20order%20from%20Mallu's%20Mart!`;

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
            ? 'bg-white/70 backdrop-blur-md border-b border-gray-50 py-2 sm:py-3' 
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4 md:gap-8 text-on-surface">
          
          {/* Logo: Premium Expansion & Hover Scale */}
          <Link to="/" className="flex-shrink-0 group relative z-10 transition-transform duration-500 hover:scale-105">
            <Logo size={scrolled ? 40 : 48} className="transition-all duration-700" />
          </Link>

          {/* Desktop Navigation: High-Contrast Monochrome (text-on-surface) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative text-sm font-semibold uppercase tracking-widest transition-all duration-500 ${
                    active ? 'text-on-surface' : 'text-on-surface/60 hover:text-on-surface'
                  }`}
                >
                  {link.name}
                  {/* Luxury Underline Animation */}
                  <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-on-surface origin-left transition-transform duration-700 ${
                    active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-6 relative z-10">
            {/* Search */}
            <button
              onClick={openSearch}
              className="p-2 text-on-surface hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="hidden sm:flex relative p-2 text-on-surface hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <Heart size={20} strokeWidth={2} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-on-surface text-surface text-[8px] font-black flex items-center justify-center rounded-full border border-surface">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 text-on-surface hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[8px] font-black flex items-center justify-center rounded-full border border-surface">
                  {cartItemsCount}
                </span>
              )}
            </button>


            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-on-surface hover:opacity-70 transition-all active:scale-90"
            >
              <Menu size={24} strokeWidth={2} />
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-surface z-[210] flex flex-col p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <Logo size={42} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all transform active:scale-90"
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
                      className={`text-3xl font-semibold tracking-tight transition-all active:translate-x-2 block ${
                        isActive(link.path) ? 'text-on-surface' : 'text-on-surface/40 hover:text-on-surface'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-8 border-t border-surface-container-high flex flex-col gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-on-surface/40 uppercase tracking-widest">Customer Support</p>
                  <p className="text-sm text-on-surface/60">Connect with an artisan via WhatsApp</p>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-3 bg-on-surface text-surface text-sm font-semibold rounded-lg shadow-lg active:scale-95 transition-transform"
                >
                  <MessageCircle size={18} />
                  Contact Support
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
