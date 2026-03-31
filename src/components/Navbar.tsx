import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useSearchStore } from '../store/searchStore';
import logo from '../assets/logo.png';

const WHATSAPP_NUMBER = '919400000000'; // Replace with real number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20place%20an%20order%20from%20Mallu's%20Mart!`;

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/shop', hasDropdown: false },
  { name: 'Products', path: '/shop', hasDropdown: false },
  { name: 'About Us', path: '/about', hasDropdown: false },
  { name: 'Contact', path: '/contact', hasDropdown: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = useCartStore((state) => state.totalItems());
  const openSearch = useSearchStore((state) => state.openSearch);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const setCartIconRef = useCartStore((state) => state.setCartIconRef);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { scrollY } = useScroll();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartRef.current) setCartIconRef(cartRef);
  }, [setCartIconRef]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const direction = latest > lastScrollY ? 'down' : 'up';
    setIsScrolled(latest > 60);
    if (latest < 60) {
      setIsVisible(true);
    } else if (direction === 'down' && latest > 200) {
      setIsVisible(false);
    } else if (direction === 'up') {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };


  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-[90px] md:h-[110px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex-shrink-0 group">
              <motion.img
                src={logo}
                alt="Mallu's Mart"
                className="h-[80px] md:h-[90px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))',
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group text-[13px] font-semibold tracking-wide transition-colors duration-300 ${isActive(link.path)
                    ? 'text-[#1a6b2f]'
                    : 'text-gray-700 hover:text-[#1a6b2f]'
                    }`}
                >
                  {link.name}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#FFA500] transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </Link>
              ))}
            </nav>

            {/* ── Desktop Right Actions ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search */}
              <button
                onClick={openSearch}
                className="p-2 rounded-full transition-all duration-300 hover:bg-black/10 text-gray-600 hover:text-gray-900"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-full transition-all duration-300 hover:bg-black/10 text-gray-600 hover:text-gray-900"
              >
                <Heart size={18} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FFA500] text-white text-[8px] font-black flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openDrawer}
                className="relative p-2 rounded-full transition-all duration-300 hover:bg-black/10"
              >
                <div ref={cartRef} className="text-gray-600">
                  <ShoppingBag size={18} />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1a6b2f] text-white text-[8px] font-black flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-[12px] font-bold rounded-full hover:bg-[#20b958] transition-all duration-300 shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
              >
                <MessageCircle size={14} />
                Order on WhatsApp
              </a>
            </div>

            {/* ── Mobile Right ── */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={openSearch}
                className="text-gray-700"
              >
                <Search size={20} />
              </button>
              <button
                onClick={openDrawer}
                className="relative text-gray-700"
              >
                <div ref={cartRef}><ShoppingBag size={20} /></div>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1a6b2f] text-white text-[8px] font-black flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 text-gray-700"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Slide-In Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[90] md:hidden"
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[80vw] max-w-[340px] bg-white z-[100] flex flex-col md:hidden shadow-2xl"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img src={logo} alt="Mallu's Mart" className="h-10 w-auto object-contain" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors ${isActive(link.path)
                        ? 'bg-[#1a6b2f]/8 text-[#1a6b2f]'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b2f]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Footer */}
              <div className="p-6 border-t border-gray-50 space-y-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-[13px] font-bold rounded-xl hover:bg-[#20b958] transition-colors"
                >
                  <MessageCircle size={16} />
                  Order on WhatsApp
                </a>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Heart size={15} />
                  Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
                </Link>
                <p className="text-center text-[10px] text-gray-400 font-medium tracking-widest uppercase pt-1">
                  Kerala HomePreneurs United
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
