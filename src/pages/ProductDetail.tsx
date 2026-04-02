import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Minus, 
  Plus, 
  MessageCircle, 
  ChevronDown, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Zap, 
  CheckCircle2, 
  Info, 
  Beaker, 
  Check, 
  ShoppingBag
} from "lucide-react";
import { PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { useHistoryStore } from "../store/historyStore";
import { useOrderStore } from "../store/orderStore";
import { useCartStore } from "../store/cartStore";
import { ProductDetailSkeleton } from "../components/Skeleton";

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
  const [isAdded, setIsAdded] = useState(false);
  const [viewerCount] = useState(Math.floor(Math.random() * 15) + 12);
  
  // Accordion State
  const [openAccordion, setOpenAccordion] = useState<string | null>("specs");
  
  // Dynamic Asset Resolver for Vite
  const getProductImage = (imagePath: string) => {
    try {
      return new URL(`../assets/products/${imagePath}`, import.meta.url).href;
    } catch {
      return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000"; // Fallback
    }
  };

  const { addViewed } = useHistoryStore();
  const openOrderModal = useOrderStore((state) => state.openOrderModal);
  const addItem = useCartStore((state) => state.addItem);

  // Derived content for premium feel
  const productInfo = useMemo(() => {
    const parts = product.description.split(".");
    const summary = parts[0] + ".";
    
    // Detailed Specs Grid Data - Dynamic from Catalog
    const specsData = [
      { label: "Origin", value: "Kerala, India" },
      { label: "Maker", value: product.maker || "Heritage Maker" },
      { label: "Category", value: product.category },
      { label: "Certification", value: "Authentic Homepreneur" },
      { label: "Sustainability", value: product.category === "Pack Corner" ? "Eco-conscious" : "Natural Sourcing" },
      { label: "Batch Size", value: "Small Batch Curation" }
    ];
    
    // Use technicalSpecs from JSON if available, otherwise use defaults
    const highlights = product.technicalSpecs && product.technicalSpecs.length > 0 
      ? product.technicalSpecs 
      : [
          "100% Sourced from Kerala Homepreneurs",
          "Traditional Hand-crafted process",
          "Zero Artificial Preservatives",
          "Fair Trade & Sustainable Sourcing"
        ];

    const usage = product.category === "Healthy Kitchen"
      ? "Store in a cool, dry place. Best consumed within the recommended period for peak Kerala freshness."
      : "Handle with care to preserve the artisanal quality. Keep away from direct sunlight and moisture.";

    return { summary, highlights, usage, specsData };
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

  const handleWhatsAppOrder = () => {
    openOrderModal("single", product, quantity);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Synchronize Gallery and Main Image
  const productImages = useMemo(() => {
    const imgs = [];
    if (product.image) imgs.push(product.image);
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        if (!imgs.includes(img)) imgs.push(img);
      });
    }
    return imgs.length > 0 ? imgs : [product.image];
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (isLoading) return <div className="pt-32"><ProductDetailSkeleton /></div>;

  return (
    <main className="pt-12 pb-40 px-6 md:px-12 max-w-7xl mx-auto overflow-x-hidden bg-[#fcfcfc]">
      {/* Institutional Breadcrumbs */}
      <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-black/30 mb-20">
        <Link to="/" className="hover:text-black transition-colors">Origins</Link>
        <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
        <Link to="/shop" className="hover:text-black transition-colors">Archive</Link>
        <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
        <span className="text-black truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-48">
        
        {/* Product Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="flex lg:flex-col gap-5 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:w-28 shrink-0 px-2 lg:px-0">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeImageIndex ? 1 : -1);
                  setActiveImageIndex(i);
                }}
                className={`relative aspect-[3/4] w-24 lg:w-full rounded-[2rem] overflow-hidden border-2 transition-all duration-700 shrink-0 ${
                  activeImageIndex === i ? "border-black shadow-2xl scale-105" : "border-transparent opacity-30 hover:opacity-100 hover:scale-110"
                }`}
              >
                <img src={getProductImage(img)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Visual */}
          <div className="flex-1 relative group rounded-[4rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.12)] bg-white border border-gray-50">
            <div className="aspect-[4/5] relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  key={activeImageIndex}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full cursor-zoom-in relative"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onClick={() => setIsModalOpen(true)}
                >
                  <motion.img 
                    src={getProductImage(productImages[activeImageIndex])} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                    style={{ 
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: isZoomed ? "scale(2.2)" : "scale(1)"
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 100 }}
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Institutional Labels */}
              <div className="absolute top-10 left-10 flex flex-col gap-4 pointer-events-none z-10 transition-transform duration-[1s] group-hover:-translate-y-4">
                <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] px-8 py-3.5 rounded-full shadow-2xl backdrop-blur-xl border border-white/20">
                  Authentic Archivist
                </span>
                {viewerCount > 10 && (
                  <span className="bg-white/90 backdrop-blur-xl text-black text-[10px] font-black uppercase tracking-[0.4em] px-8 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-gray-100">
                    <Zap size={12} className="fill-brand-gold text-brand-gold animate-bounce" /> {viewerCount} Viewing
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Informational Architecture */}
        <div className="flex flex-col pt-4">
          
          <div className="mb-12 lg:mb-20">
            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-black leading-[0.95] mb-8 pr-12">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-4xl font-black text-black tracking-tighter">₹{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-xl text-black/20 line-through tracking-tighter font-bold">₹{product.oldPrice.toLocaleString()}</span>
              )}
            </div>

            <div className="flex wrap items-center gap-10 py-8 border-y border-gray-100">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "fill-brand-gold text-brand-gold" : "text-black/10 fill-black/10"} />
                ))}
                <span className="text-[12px] font-black text-black ml-3 uppercase tracking-widest">4.9 Masterpiece</span>
              </div>
              <div className="h-6 w-px bg-gray-100 hidden sm:block" />
              <span className="text-[11px] font-black text-black/60 uppercase tracking-widest flex items-center gap-3">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
                </div>
                Artisan Registry #2026-KL
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 mb-24">
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="flex items-center bg-gray-50 border-2 border-gray-50 rounded-[2rem] h-20 w-full md:w-48 overflow-hidden group hover:border-black transition-all duration-700">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="w-full h-full flex items-center justify-center text-black/30 hover:text-black transition-colors"
                >
                  <Minus size={22} strokeWidth={3} />
                </button>
                <span className="w-12 text-center font-black text-black text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="w-full h-full flex items-center justify-center text-black/30 hover:text-black transition-colors"
                >
                  <Plus size={22} strokeWidth={3} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className={`flex-1 min-h-[5rem] px-12 w-full rounded-[2rem] flex items-center justify-center gap-4 transition-all duration-700 shadow-2xl relative overflow-hidden uppercase tracking-[0.4em] text-[11px] font-black hover:scale-[1.03] active:scale-[0.97] ${
                  isAdded 
                    ? "bg-black text-white" 
                    : "bg-black text-white hover:bg-neutral-900"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div key="check" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
                      <Check className="w-6 h-6" strokeWidth={3.5} />
                      Archived to Bag
                    </motion.div>
                  ) : (
                    <motion.div key="cart" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
                      <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
                      Add to Selection
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <button 
              onClick={handleWhatsAppOrder}
              className="group relative w-full min-h-[5rem] px-12 rounded-[2rem] flex items-center justify-center gap-4 bg-[#25D366] text-white uppercase tracking-[0.4em] text-[11px] font-black hover:shadow-[0_30px_70px_rgba(37,211,102,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse-luxury opacity-0 group-hover:opacity-100 z-0" />
              <div className="relative z-10 flex items-center justify-center gap-4">
                <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.5} />
                Order on WhatsApp Official
              </div>
            </button>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-6 mb-32">
            <div className="border-2 border-gray-50 rounded-[3rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700">
              <button 
                onClick={() => setOpenAccordion(openAccordion === "specs" ? null : "specs")}
                className="w-full px-12 py-10 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[13px] font-black uppercase tracking-[0.4em] text-black">Product Specification Registry</h4>
                </div>
                <ChevronDown size={16} className={`text-black/10 transition-transform duration-700 ${openAccordion === "specs" ? "rotate-180 text-black" : ""}`} strokeWidth={3} />
              </button>
              <AnimatePresence>
                {openAccordion === "specs" && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="px-12 pb-14 pt-4">
                      {/* Data Grid */}
                      <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-14">
                        {productInfo.specsData.map((spec, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">{spec.label}</span>
                            <span className="text-[13px] font-black text-black uppercase tracking-widest">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="h-px w-full bg-gray-100 mb-10" />
                      
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {productInfo.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-6 group">
                            <div className="bg-green-50 rounded-full p-3 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                              <CheckCircle2 size={18} className="text-[#25D366] group-hover:text-white" />
                            </div>
                            <span className="text-[11px] font-black text-black uppercase tracking-widest leading-tight">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Artisan Notes */}
            <div className="border-2 border-gray-50 rounded-[3rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700">
              <button 
                onClick={() => setOpenAccordion(openAccordion === "notes" ? null : "notes")}
                className="w-full px-12 py-10 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700">
                    <Info size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[13px] font-black uppercase tracking-[0.4em] text-black">Artisan Curator Notes</h4>
                </div>
                <ChevronDown size={16} className={`text-black/10 transition-transform duration-700 ${openAccordion === "notes" ? "rotate-180 text-black" : ""}`} strokeWidth={3} />
              </button>
              <AnimatePresence>
                {openAccordion === "notes" && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="px-12 pb-14 pt-4">
                      <div className="bg-[#FAF9F6] p-12 rounded-[3.5rem] border border-gray-100 shadow-inner">
                        <p className="text-[16px] font-serif italic text-black/60 leading-relaxed text-center">
                           "{productInfo.usage}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, text: "Authentic Source" },
              { icon: UserCheck, text: "Verified Maker" },
              { icon: Zap, text: "Direct Shipping" },
              { icon: Beaker, text: "Natural Process" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:border-black transition-all duration-700 group">
                <item.icon className="w-6 h-6 text-black/10 group-hover:text-brand-green transition-colors" strokeWidth={2.5} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black/40 group-hover:text-black transition-colors">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="pt-32 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-black/20 mb-6">Discovery Collective</h2>
            <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-black leading-none">Similar Treasures.</h3>
          </div>
          <Link to="/shop" className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-black">
            Full Discovery Archive <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform duration-700" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {relatedProducts.map((p) => (
            <div key={p.id} className="h-full">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Modal Gallery */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8"
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-12 right-12 p-6 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white hover:text-black transition-all duration-500"><X size={36} /></button>
            <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center">
              <motion.img 
                src={getProductImage(productImages[activeImageIndex])} 
                animate={{ scale: modalZoom }}
                transition={{ type: "spring", damping: 30 }}
                className="max-w-full max-h-[70vh] object-contain rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-20 flex items-center gap-16 px-16 py-10 bg-white/5 rounded-full border border-white/5 backdrop-blur-3xl">
                <button onClick={() => setModalZoom(Math.max(1, modalZoom - 0.5))} className="text-white/40 hover:text-white transition-colors duration-500"><ZoomOut size={36} /></button>
                <div className="flex gap-6">
                  {productImages.map((_, i) => (
                    <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-20 h-2.5 rounded-full transition-all duration-1000 ${activeImageIndex === i ? "bg-[#25D366] w-32" : "bg-white/10"}`} />
                  ))}
                </div>
                <button onClick={() => setModalZoom(Math.min(3, modalZoom + 0.5))} className="text-white/40 hover:text-white transition-colors duration-500"><ZoomIn size={36} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-luxury {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse-luxury {
          animation: pulse-luxury 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
