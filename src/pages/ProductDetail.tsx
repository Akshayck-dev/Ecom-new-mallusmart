import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Minus, Plus, MessageCircle, ChevronRight, X, ZoomIn, ZoomOut, Star, ArrowRight, ShieldCheck, UserCheck, Zap, MapPin, Award, CheckCircle2, Info, Leaf, Sparkles, Beaker, Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useHistoryStore } from '../store/historyStore';
import { useOrderStore } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';
import { ProductDetailSkeleton } from '../components/Skeleton';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [viewerCount] = useState(Math.floor(Math.random() * 15) + 12);
  
  const dragX = useMotionValue(0);
  const mainCTAInViewRef = useRef<HTMLDivElement>(null);
  const { addViewed } = useHistoryStore();
  const openOrderModal = useOrderStore((state) => state.openOrderModal);
  const addItem = useCartStore((state) => state.addItem);

  // Derived content for premium feel
  const productInfo = useMemo(() => {
    const parts = product.description.split('.');
    const summary = parts[0] + '.';
    const rest = parts.slice(1).join('.').trim();
    
    const highlights = [
      "100% Sourced from Kerala Homepreneurs",
      "Traditional Hand-crafted process",
      "Zero Artificial Preservatives",
      "Fair Trade & Sustainable Sourcing"
    ];

    const usage = product.category === 'Food' || product.category === 'Snacks'
      ? "Store in a cool, dry place. Best consumed within 3 months of opening for peak Kerala freshness."
      : "Handle with care to preserve the artisanal quality. Keep away from direct sunlight and moisture.";

    return { summary, rest, highlights, usage };
  }, [product]);
  
  const relatedProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product?.id, addViewed]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainCTAInViewRef.current) {
        const { top } = mainCTAInViewRef.current.getBoundingClientRect();
        setShowStickyBar(top < -50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppOrder = () => {
    openOrderModal('single', product, quantity);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const productImages = product.images || [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (isLoading) return <div className="pt-32"><ProductDetailSkeleton /></div>;

  return (
    <main className="pt-8 pb-12 px-4 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-brand-green-100/10 pb-4">
        <Link to="/" className="hover:text-brand-green">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-brand-green">Shop</Link>
        <ChevronRight size={10} />
        <span className="text-brand-green truncate max-w-[120px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
        {/* Product Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:w-20 shrink-0">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeImageIndex ? 1 : -1);
                  setActiveImageIndex(i);
                }}
                className={`relative aspect-square w-16 lg:w-full rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === i ? 'border-brand-green shadow-premium' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex-1 relative group rounded-[2.5rem] overflow-hidden shadow-premium bg-brand-offwhite">
            <div className="aspect-[4/5] relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  key={activeImageIndex}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full cursor-zoom-in relative"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onClick={() => setIsModalOpen(true)}
                >
                  <img 
                    src={productImages[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300" 
                    style={{ 
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: isZoomed ? 'scale(1.8)' : 'scale(1)'
                    }}
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
                <span className="bg-brand-green text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                  Kerala Origins
                </span>
                {viewerCount > 10 && (
                  <span className="bg-white/90 backdrop-blur-md text-red-500 text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 animate-pulse">
                    <Zap size={10} className="fill-current" /> {viewerCount} people viewing
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < 4 ? "fill-brand-gold text-brand-gold" : "text-gray-200 fill-gray-200"} />
              ))}
              <span className="text-xs font-black text-brand-gray ml-2">4.9 / 5.0</span>
            </div>
            <div className="h-4 w-px bg-gray-200mx-2" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Stock & Ready</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-brand-gray tracking-tighter mb-6 leading-none uppercase font-headline">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-10">
            <p className="text-5xl font-black text-brand-green tracking-tighter">₹{product.price.toLocaleString()}</p>
            <span className="text-lg text-gray-300 line-through font-bold">₹{(product.price * 1.2).toLocaleString()}</span>
            <span className="bg-brand-gold/10 text-brand-gold text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">20% Off</span>
          </div>

          {/* Seller / Maker Badge */}
          <div className="mb-10 p-6 bg-white border-2 border-brand-green/5 rounded-[2rem] flex items-center justify-between group hover:border-brand-green/20 transition-all shadow-premium">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/5 flex items-center justify-center text-brand-green">
                <Leaf size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-brand-gray uppercase tracking-tight">{product.artisan || 'Kerala Homepreneur'}</h4>
                  <span className="bg-brand-gold text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Award size={8} /> Trusted
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={10} className="text-brand-green" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wayanad, Kerala</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black text-brand-green uppercase tracking-widest leading-none">Traditional Maker</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Batch Verified</p>
            </div>
          </div>

          {/* Structured Content */}
          <div className="space-y-8 mb-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-green mb-3">Authenticity Summary</h4>
              <p className="text-lg font-bold text-brand-gray leading-tight italic">
                "{productInfo.summary}"
              </p>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {productInfo.rest}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gray flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-brand-green" /> Premium Features
                </h4>
                <ul className="space-y-2">
                  {productInfo.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-bold text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-brand-gold mt-1.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gray flex items-center gap-2">
                  <Info size={12} className="text-brand-gold" /> Usage Notes
                </h4>
                <p className="text-xs font-medium text-gray-500 leading-relaxed italic border-l-2 border-brand-gold/20 pl-4">
                  {productInfo.usage}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div ref={mainCTAInViewRef} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex items-center bg-brand-offwhite rounded-full p-2 border-2 border-brand-green-100/10">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:text-brand-green transition-colors"><Minus size={18} /></button>
                <span className="w-10 text-center font-black text-brand-gray text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:text-brand-green transition-colors"><Plus size={18} /></button>
              </div>

              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-6 !rounded-full flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl relative overflow-hidden ${
                  isAdded 
                    ? 'bg-brand-gold text-white shadow-gold-900/10' 
                    : 'bg-brand-offwhite text-brand-gray border-2 border-brand-green-100/10 hover:bg-white hover:border-brand-green/30'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={20} className="text-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Added to Cart</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cart"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={20} className="text-brand-green" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Add to Bag</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <button 
                onClick={handleWhatsAppOrder}
                className="btn-luxury flex-1 py-6 !rounded-full flex items-center justify-center gap-3 shadow-2xl shadow-green-900/10"
              >
                <MessageCircle size={24} />
                <span className="text-[10px] uppercase font-black tracking-widest">Quick Order</span>
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, text: "Authentic Sourcing" },
              { icon: UserCheck, text: "Verified Maker" },
              { icon: Zap, text: "Direct Shipping" },
              { icon: Beaker, text: "Natural Process" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-brand-offwhite rounded-2xl border border-transparent hover:border-brand-green/20 transition-all">
                <item.icon size={16} className="text-brand-green shrink-0" />
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-gray">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <section className="pt-24 border-t border-brand-green-100/10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green/60 mb-1">Curation</h2>
            <h3 className="text-4xl font-black text-brand-gray tracking-tighter uppercase font-headline">Similar Treasures</h3>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-green">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {relatedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Sticky Action Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 z-[150] lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-4xl"
          >
            <div className="bg-white/95 backdrop-blur-2xl border border-brand-green-100/20 py-3 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-between gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <img src={product.image} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div className="overflow-hidden">
                  <p className="text-[9px] font-black text-brand-green uppercase tracking-widest truncate">{product.name}</p>
                  <p className="text-xs font-black text-brand-gray tracking-tight">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 flex-1 justify-end">
                <div className="hidden md:flex items-center bg-brand-offwhite rounded-full p-1 border border-gray-100">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center"><Minus size={12} /></button>
                  <span className="w-6 text-center font-black text-xs">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center"><Plus size={12} /></button>
                </div>
                
                <div className="text-right whitespace-nowrap">
                  <span className="text-[8px] font-black text-gray-400 uppercase block leading-none">Subtotal</span>
                  <span className="text-xl font-black text-brand-green tracking-tighter">₹{(product.price * quantity).toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className={`h-12 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isAdded ? 'bg-brand-gold text-white' : 'bg-brand-offwhite text-brand-green border border-brand-green-100/10 hover:bg-white'
                  }`}
                >
                  {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                </button>

                <button 
                  onClick={handleWhatsAppOrder}
                  className="bg-brand-green text-white h-12 px-8 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-[1.03] transition-all"
                >
                  <MessageCircle size={16} /> <span className="hidden sm:inline">Get it on WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Gallery */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-brand-gray/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 p-4 rounded-full bg-white/10 text-white border border-white/10"><X size={28} /></button>
            <div className="max-w-4xl w-full h-full flex flex-col items-center justify-center">
              <motion.img 
                src={productImages[activeImageIndex]} 
                animate={{ scale: modalZoom }}
                className="max-w-full max-h-[70vh] object-contain rounded-3xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-12 flex items-center gap-8 px-8 py-4 bg-white/10 rounded-full border border-white/10">
                <button onClick={() => setModalZoom(Math.max(1, modalZoom - 0.5))} className="text-white hover:text-brand-gold transition-colors"><ZoomOut size={24} /></button>
                <div className="flex gap-3">
                  {productImages.map((_, i) => (
                    <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-12 h-1 rounded-full ${activeImageIndex === i ? 'bg-brand-green' : 'bg-white/20'}`} />
                  ))}
                </div>
                <button onClick={() => setModalZoom(Math.min(3, modalZoom + 0.5))} className="text-white hover:text-brand-gold transition-colors"><ZoomIn size={24} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
