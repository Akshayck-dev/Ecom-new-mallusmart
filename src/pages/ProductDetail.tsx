import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Minus, 
  Plus, 
  Star, 
  ChevronRight, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  CheckCircle,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { useProductStore } from "../store/productStore";
import { ProductCard } from "../components/ProductCard";
import { useHistoryStore } from "../store/historyStore";
import { useOrderStore } from "../store/orderStore";
import { useCartStore } from "../store/cartStore";
import { ProductDetailSkeleton } from "../components/Skeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProductStore();
  
  const product = useMemo(() => {
    return products.find(p => p.id === id) || products[0];
  }, [products, id]);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const { addViewed } = useHistoryStore();
  const openOrderModal = useOrderStore((state) => state.openOrderModal);
  const addItem = useCartStore((state) => state.addItem);

  // Dynamic Asset Resolver for Vite
  const getProductImage = (imagePath: string) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    if (imagePath.startsWith('http')) return imagePath;
    try {
      return new URL(`../assets/products/${imagePath}`, import.meta.url).href;
    } catch {
      return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    }
  };

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

  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.id !== product.id && (p.category === product.category || p.parentCategory === product.parentCategory))
      .slice(0, 4);
  }, [products, product]);

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

  if (isLoading) return <div className="pt-32"><ProductDetailSkeleton /></div>;

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28 pb-16 lg:pb-24">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
          <Link className="hover:text-secondary transition-colors" to="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link className="hover:text-secondary transition-colors" to="/shop">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary truncate max-w-[150px] font-medium">{product.name}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container-lowest border border-on-surface/5 shadow-premium"
            >
              <img 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                src={getProductImage(productImages[activeImageIndex])} 
              />
              {product.tag && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md text-on-surface rounded-full text-[10px] font-bold uppercase tracking-widest border border-on-surface/5 shadow-sm">
                  {product.tag}
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
              {productImages.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-surface-container-lowest transition-all border-2 ${
                    activeImageIndex === i ? 'border-secondary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img alt={`v${i}`} className="w-full h-full object-cover" src={getProductImage(img)} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col space-y-6 sm:space-y-10">
            <header className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
                  {product.category} • Handcrafted
                </span>
                <div className="flex items-center space-x-1.5 text-on-surface/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] sm:text-xs font-bold">4.9 (124 reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-on-surface leading-[1.1] tracking-tighter uppercase">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl sm:text-4xl font-bold text-on-surface">₹{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-lg sm:text-xl text-on-surface/30 line-through font-medium">₹{product.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </header>

            <p className="text-sm sm:text-lg leading-relaxed text-on-surface/70 italic font-medium">
              {product.description}
            </p>

            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest flex items-center space-x-4 border border-on-surface/5 shadow-premium">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-sm">
                <img 
                  alt="Seller" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
                />
              </div>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-[0.4em] text-on-surface/40 font-bold mb-1">Artisan</p>
                <p className="font-bold text-sm text-primary uppercase tracking-tight">{product.maker || 'Artisan Collective'}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-secondary" />
            </div>

            {/* Selectors */}
            <div className="space-y-6 pt-6 border-t border-on-surface/10">
              {/* Quantity */}
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-on-surface/60">Quantity Selection</h4>
                <div className="flex items-center w-32 justify-between p-1.5 bg-surface-container-lowest rounded-xl border border-on-surface/5 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container transition-all active:scale-90"
                  >
                    <Minus className="w-3.5 h-3.5 text-on-surface" />
                  </button>
                  <span className="font-bold text-base text-on-surface">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container transition-all active:scale-90"
                  >
                    <Plus className="w-3.5 h-3.5 text-on-surface" />
                  </button>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all hover:bg-secondary"
                >
                  <MessageCircle size={18} />
                  <span>Direct WhatsApp Order</span>
                </button>

                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] border-2 transition-all active:scale-[0.98] ${
                    isAdded ? 'bg-secondary border-secondary text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? 'Added to bag' : 'Add to selection'}</span>
                </button>
              </div>

              {/* Secondary Meta */}
              <div className="pt-6 flex flex-wrap gap-6 sm:gap-10">
                <div className="flex items-center space-x-2.5 text-on-surface/40">
                  <Truck size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Institutional Shipping</span>
                </div>
                <div className="flex items-center space-x-2.5 text-on-surface/40">
                  <ShieldCheck size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Verified Artisan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Features */}
        <section className="mt-20 sm:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-8 sm:space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-secondary">Heritage Standards</span>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold text-on-surface leading-tight tracking-tighter uppercase">
                Meticulously <br /> Crafted By Hand.
              </h2>
            </div>
            <div className="space-y-6 sm:space-y-8 text-on-surface/70">
              <p className="text-base sm:text-xl leading-relaxed italic font-medium">
                Every product in our collection is curated with absolute precision, sourced directly from the finest homepreneurs of Kerala. We ensure each piece reflects our heritage of excellence.
              </p>
              <ul className="space-y-5 sm:space-y-6">
                {[
                  "Sustainably sourced authentic ingredients.",
                  "Traditional small-batch processing.",
                  "Chemical-free and verified safe."
                ].map((feature, i) => (
                  <li key={i} className="flex items-start space-x-4 text-sm sm:text-lg">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="font-bold text-primary uppercase tracking-tight leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-square sm:aspect-video lg:aspect-square shadow-premium border border-on-surface/5">
              <motion.img 
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2 }}
                alt="Crafting Process" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="mt-24 sm:mt-40 border-t border-on-surface/10 pt-16 sm:pt-24">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-12 sm:mb-16 gap-8 text-center sm:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-secondary">Discovery Archive</h2>
              <h3 className="text-4xl sm:text-6xl font-semibold text-primary tracking-tighter leading-none uppercase">
                Curated <span className="text-secondary italic font-serif">Suggestions.</span>
              </h3>
            </div>
            <Link to="/shop" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:text-secondary transition-all w-full sm:w-auto justify-center py-5 border border-primary/10 rounded-full sm:border-none sm:py-0">
              View All Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
