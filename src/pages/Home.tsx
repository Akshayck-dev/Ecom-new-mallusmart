import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { useHistoryStore } from '../store/historyStore';
import { Product } from '../types';
import logoImg from '../assets/logo.png';

export default function Home() {
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);
  const { viewedIds } = useHistoryStore();

  const HERO_SLIDES = [
    {
      id: 0,
      src: 'https://images.unsplash.com/photo-1596797882870-8c33c4ee4e58?auto=format&fit=crop&q=75&w=1920',
      alt: 'Kerala spices and food — authentic homemade products'
    },
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=75&w=1920',
      alt: 'Fashion and clothing from Kerala homepreneurs'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=75&w=1920',
      alt: 'Natural beauty and cosmetic products'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=75&w=1920',
      alt: 'Gifts and lifestyle products from Kerala'
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, slideIndex]);

  const recentlyViewed = useMemo(() => {
    return viewedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is Product => !!p)
      .slice(0, 5);
  }, [viewedIds]);

  return (
    <main className="overflow-hidden bg-[#F9F9F9]">
      {/* ── Hero Carousel Section ─────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[65vh] md:h-[75vh] min-h-[500px] md:min-h-[560px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Background Slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Image with zoom */}
            <motion.img
              src={HERO_SLIDES[slideIndex].src}
              alt={HERO_SLIDES[slideIndex].alt}
              className="w-full h-full object-cover"
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay — brown/green tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2b12]/65 via-[#111a0a]/60 to-[#0d2b12]/80 z-10" />
        {/* Horizontal vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 z-10" />

        {/* Green accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a6b2f]/15 blur-[100px] rounded-full pointer-events-none z-10" />

        {/* ── Fixed Hero Content (animates once, not per slide) ── */}
        <div className="relative z-20 text-center px-6 md:px-12 max-w-4xl mx-auto -mt-8">

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-4"
          >
            <img
              src={logoImg}
              alt="Mallu's Mart"
              className="h-[58px] w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.5)) drop-shadow(0 6px 24px rgba(0,0,0,0.7))',
              }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <span className="w-10 h-px bg-[#FFA500]/60" />
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#FFA500]/90">
              Kerala Homepreneurs United
            </span>
            <span className="w-10 h-px bg-[#FFA500]/60" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-3"
            style={{ textShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
          >
            Authentic Products
            <br />
            <span className="italic font-light text-[#FFA500]">from Kerala</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-6 leading-relaxed font-light"
          >
            From homemade foods to fashion, beauty, and more — crafted with love by Kerala's finest homepreneurs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-10 py-4 bg-[#1a6b2f] text-white text-[13px] font-bold uppercase tracking-widest rounded-full hover:bg-[#145a27] transition-all duration-300 shadow-xl shadow-green-900/30 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Shop Now <ArrowRight size={15} />
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-10 py-4 border-2 border-white/30 text-white text-[13px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Categories
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
          >
            {['🌿 100% Organic', '🏠 Homemade Quality', '🚀 Fast Delivery', '💬 WhatsApp Support'].map(b => (
              <span key={b} className="text-[11px] font-semibold text-white/50 tracking-wide">{b}</span>
            ))}
          </motion.div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`rounded-full transition-all duration-500 ${
                i === slideIndex
                  ? 'w-6 h-1.5 bg-[#FFA500]'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── Explore Our Products ───────────────────────────────────── */}
      <section className="bg-[#F9F9F9] px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <span className="w-8 h-px bg-[#1a6b2f]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a6b2f]">
                Kerala Homepreneurs
              </span>
              <span className="w-8 h-px bg-[#1a6b2f]/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3"
            >
              Explore Our <span className="font-light text-gray-400 italic">Products.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-500 text-base font-light max-w-md mx-auto"
            >
              Discover handmade and natural products from Kerala homepreneurs
            </motion.p>
          </div>

          {/* Floating keyframe injected via style tag */}
          <style>{`
            @keyframes floatImg {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-6px) scale(1.01); }
            }
            .product-float img {
              animation: floatImg 5s ease-in-out infinite;
            }
            .product-float:hover img {
              animation: none;
              transform: scale(1.08);
            }
          `}</style>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                name: "Idiyirachi Masala",
                price: "₹180",
                tag: "Best Seller",
                tagColor: "#dc2626",
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Homemade Pickle",
                price: "₹220",
                tag: "Homemade",
                tagColor: "#d97706",
                image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Banana Chips",
                price: "₹150",
                tag: "Fresh",
                tagColor: "#16a34a",
                image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Herbal Hair Oil",
                price: "₹250",
                tag: "Natural",
                tagColor: "#16a34a",
                image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Handmade Soap",
                price: "₹120",
                tag: "Organic",
                tagColor: "#16a34a",
                image: "https://images.unsplash.com/photo-1600857544200-b2f468e4e8d5?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Cotton Kurti",
                price: "₹799",
                tag: "Trending",
                tagColor: "#7c3aed",
                image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Jewellery Set",
                price: "₹499",
                tag: "Handmade",
                tagColor: "#b45309",
                image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Gift Hamper",
                price: "₹999",
                tag: "Premium",
                tagColor: "#1a6b2f",
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
              },
            ].map((product, i) => {
              const waMsg = encodeURIComponent(
                `Hello, I want to order:\nProduct: ${product.name}\nPrice: ${product.price}\nQuantity: 1\n\nPlease share more details.`
              );
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="product-float group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 ease-in-out" />

                    {/* Tag badge */}
                    <span
                      className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full shadow-sm z-10"
                      style={{ backgroundColor: product.tagColor }}
                    >
                      {product.tag}
                    </span>

                    {/* WhatsApp button — slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out p-3 z-10">
                      <a
                        href={`https://wa.me/919400000000?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#25D366] text-white text-[11px] font-bold rounded-xl hover:bg-[#20b958] transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1">{product.name}</h3>
                    <p className="text-base font-bold text-[#1a6b2f]">{product.price}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-9 py-3.5 border-2 border-[#1a6b2f] text-[#1a6b2f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#1a6b2f] hover:text-white transition-all duration-300"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="bg-white px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#1a6b2f]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a6b2f]">
                Handpicked
              </span>
              <span className="w-8 h-px bg-[#1a6b2f]/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
              Featured <span className="font-light text-gray-400 italic">Products.</span>
            </h2>
            <p className="text-gray-500 text-base font-light">
              Handpicked from Kerala Homepreneurs
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                name: "Idiyirachi Masala",
                category: "Healthy Kitchen",
                price: "₹180",
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
                badge: "Best Seller",
                badgeColor: "#dc2626",
              },
              {
                name: "Homemade Mango Pickle",
                category: "Healthy Kitchen",
                price: "₹220",
                image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600",
                badge: "Homemade",
                badgeColor: "#d97706",
              },
              {
                name: "Kerala Banana Chips",
                category: "Healthy Kitchen",
                price: "₹150",
                image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600",
                badge: "Fresh",
                badgeColor: "#16a34a",
              },
              {
                name: "Herbal Hair Oil",
                category: "Natural Care Zone",
                price: "₹250",
                image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
                badge: "Natural",
                badgeColor: "#16a34a",
              },
              {
                name: "Handmade Soap Pack",
                category: "Natural Care Zone",
                price: "₹120",
                image: "https://images.unsplash.com/photo-1600857544200-b2f468e4e8d5?auto=format&fit=crop&q=80&w=600",
                badge: "Organic",
                badgeColor: "#16a34a",
              },
              {
                name: "Cotton Kurti",
                category: "Fashion Street",
                price: "₹799",
                image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
                badge: "Trending",
                badgeColor: "#7c3aed",
              },
              {
                name: "Handmade Jewellery Set",
                category: "Fashion Street",
                price: "₹499",
                image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&q=80&w=600",
                badge: "Handcrafted",
                badgeColor: "#b45309",
              },
              {
                name: "Gift Hamper Box",
                category: "Gift Corner",
                price: "₹999",
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
                badge: "Premium",
                badgeColor: "#1a6b2f",
              },
            ].map((product, i) => {
              const waMsg = encodeURIComponent(
                `Hello, I want to order:\nProduct: ${product.name}\nPrice: ${product.price}\nQuantity: 1\n\nPlease share more details.`
              );
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Badge */}
                    <span
                      className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white"
                      style={{ backgroundColor: product.badgeColor }}
                    >
                      {product.badge}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-[#1a6b2f] mb-3">{product.price}</p>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/919400000000?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#25D366] text-white text-[11px] font-bold rounded-xl hover:bg-[#20b958] active:scale-95 transition-all duration-200"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Order on WhatsApp
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#1a6b2f] text-[#1a6b2f] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#1a6b2f] hover:text-white transition-all duration-300"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Trust / Why Choose Us ─────────────────────────────── */}
      <section className="bg-[#F4FAF6] px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Why Shop with <span className="text-[#1a6b2f]">Mallu's Mart?</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🏠",
                title: "100% Homemade Products",
                desc: "Every item is crafted at home by real Kerala sellers — no factories, no middlemen.",
              },
              {
                icon: "🌴",
                title: "Kerala Local Sellers",
                desc: "Supporting local families and homepreneurs from every corner of Kerala.",
              },
              {
                icon: "🌿",
                title: "Natural & Safe Ingredients",
                desc: "Chemical-free, trusted ingredients that are safe for your family.",
              },
              {
                icon: "💬",
                title: "Direct WhatsApp Ordering",
                desc: "Order directly from sellers in one tap. No app, no login required.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 text-center border border-[#1a6b2f]/8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final WhatsApp CTA ────────────────────────────────── */}
      <section
        className="cta-wrapper relative px-6 md:px-12 overflow-hidden flex items-center"
        style={{
          height: "52vh",
          background: "radial-gradient(ellipse at 50% 0%, #1a4d2a 0%, #0d2b12 55%, #071a0b 100%)",
        }}
      >
        {/* Subtle top glow line */}
        <div
          className="absolute inset-x-0 top-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #25D366, transparent)" }}
        />

        {/* Glow + responsive height */}
        <style>{`
          @keyframes waGlow {
            0%, 100% { box-shadow: 0 0 20px 4px rgba(37,211,102,0.25), 0 4px 24px rgba(0,0,0,0.4); }
            50%       { box-shadow: 0 0 36px 12px rgba(37,211,102,0.45), 0 4px 32px rgba(0,0,0,0.4); }
          }
          .wa-glow { animation: waGlow 2.6s ease-in-out infinite; }
          @media (min-width: 768px) {
            .cta-wrapper { height: 62vh; }
          }
        `}</style>

        {/* Content — shifted above center with padding-top bias */}
        <div className="w-full max-w-2xl mx-auto text-center relative z-10 -mt-6">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-2"
          >
            Start Shopping from<br />
            <span className="text-[#FFA500]">Kerala's Best Homepreneurs</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-white/50 text-sm md:text-base font-light mb-6"
          >
            Order authentic homemade products directly via WhatsApp
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <a
              href="https://wa.me/919400000000?text=Hi%2C%20I%20want%20to%20shop%20from%20Mallu's%20Mart!"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-glow inline-flex items-center gap-3 px-10 py-4 bg-[#25D366] text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#20b958] hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20"
          >
            100% Homemade &nbsp;•&nbsp; No Hidden Charges &nbsp;•&nbsp; Direct from Sellers
          </motion.p>

        </div>
      </section>

      <QuickViewModal
        productId={quickViewId}
        onClose={() => setQuickViewId(null)}
      />
    </main>
  );
}
