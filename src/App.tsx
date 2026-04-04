import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Capacitor } from '@capacitor/core';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Admin Pages & Layout
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';

import ScrollToTopButton from './components/ScrollToTopButton';
import GlobalUI from './components/GlobalUI';

const isNativeApp = Capacitor.isNativePlatform();

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
        transition={{ 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className={`flex-grow ${!isHome ? 'pt-16 sm:pt-20' : ''} ${isNativeApp ? 'pb-20 md:pb-0' : ''}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalUI />
      <Toaster position="bottom-right" richColors closeButton />
      
      <Routes>
        {/* Admin Login - No Sidebar/Header */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Dashboard - Nested with Sidebar/Header */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>

        {/* Main Storefront Routes */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col relative overflow-x-hidden">
              <Navbar />
              <PageWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </PageWrapper>
              <Footer />
              {isNativeApp && <MobileNav />}
              <ScrollToTopButton />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
