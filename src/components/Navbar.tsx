import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Globe,
  MapPin,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const DISCOVER_LINKS = ['New Arrivals', 'Best Sellers', 'Artisan Stories', 'Heritage Collection'];
const COMMUNITY_LINKS = ['Our Philosophy', 'Shipping Policy', 'Returns', 'Privacy Protocol'];

import { Capacitor } from '@capacitor/core';

const isNativeApp = Capacitor.isNativePlatform();

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

  const isHome = location.pathname === '/';
  const showSolidNav = scrolled || !isHome;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-700 ease-in-out ${isNativeApp ? 'hidden md:block' : 'block'} ${
          showSolidNav 
            ? "bg-white/80 backdrop-blur-xl border-primary/5 py-0 shadow-premium" 
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 md:gap-8 transition-colors duration-500">
          
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 group relative z-10 transition-transform duration-500 hover:scale-105">
            <Logo size={scrolled ? 40 : 48} className="transition-all duration-700" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-6 lg:gap-8 transition-colors duration-500 ${!showSolidNav ? 'text-white' : 'text-on-surface'}`}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative text-sm font-bold uppercase tracking-widest transition-all duration-500 ${
                    active ? (showSolidNav ? 'text-on-surface' : 'text-white') : (showSolidNav ? 'text-on-surface/60 hover:text-on-surface' : 'text-white/60 hover:text-white')
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1.5 left-0 h-[1.5px] origin-left transition-transform duration-700 ${showSolidNav ? 'bg-on-surface' : 'bg-white'} ${
                    active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className={`flex items-center gap-1 sm:gap-4 relative z-10 transition-colors duration-500 ${!showSolidNav ? 'text-white' : 'text-on-surface'}`}>
            {/* Search - Hidden on small mobile */}
            <button
              onClick={openSearch}
              className="hidden sm:flex p-2 text-on-surface hover:opacity-70 transition-all hover:scale-110 active:scale-90"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            {/* Wishlist Icon - Hidden on small mobile */}
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


            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-on-surface hover:opacity-70 transition-all active:scale-90 flex items-center justify-center"
              aria-label="Toggle Menu"
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
              className="fixed right-0 top-0 bottom-0 w-full bg-surface z-[210] flex flex-col p-6 sm:p-10 overflow-y-auto"
            >
              {/* Header: Icons + Close */}
              <div className="flex items-center justify-between mb-10 shrink-0">
                <Logo size={42} />
                <div className="flex items-center gap-2">
                   <button onClick={openSearch} className="w-10 h-10 flex items-center justify-center text-on-surface/60"><Search size={22} /></button>
                   <button onClick={openCartDrawer} className="w-10 h-10 flex items-center justify-center text-on-surface/60"><ShoppingBag size={22} /></button>
                   <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all transform active:scale-90 ml-2"
                   >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Primary Menu List */}
              <nav className="flex-1 pt-6 space-y-6 sm:space-y-10">
                {navLinks.map((link, i) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="group"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-4xl sm:text-5xl font-black uppercase tracking-[0.2em] transition-all flex items-center gap-6 ${
                          active ? 'text-primary' : 'text-on-surface/30 hover:text-on-surface'
                        }`}
                      >
                        {link.name}
                        <AnimatePresence>
                          {active && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              layoutId="active-dot-mobile"
                              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-secondary shadow-lg shadow-secondary/20"
                            />
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
