import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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

  if (isLoading) return <div className="pt-32"><ProductDetailSkeleton /></div>;

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
          <Link className="hover:text-secondary transition-colors" to="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link className="hover:text-secondary transition-colors" to="/shop">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary truncate max-w-[150px] font-medium">{product.name}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-lowest border border-on-surface/5"
            >
              <img 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                src={getProductImage(productImages[activeImageIndex])} 
              />
              {product.tag && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-on-surface rounded-full text-[10px] font-bold uppercase tracking-widest border border-on-surface/5 shadow-sm">
                  {product.tag}
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {productImages.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-surface-container-lowest transition-all border-2 ${
                    activeImageIndex === i ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img alt={`v${i}`} className="w-full h-full object-cover" src={getProductImage(img)} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col space-y-8">
            <header className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
                  {product.category} • Handcrafted
                </span>
                <div className="flex items-center space-x-1 text-on-surface/60">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold">4.9 (124 reviews)</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-on-surface leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-bold text-on-surface">₹{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-base text-on-surface/30 line-through font-medium">₹{product.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </header>

            <p className="text-sm sm:text-base leading-relaxed text-on-surface/70">
              {product.description}
            </p>

            <div className="p-5 rounded-xl bg-surface-container-lowest flex items-center space-x-3 border border-on-surface/5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                <img 
                  alt="Seller" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
                />
              </div>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-on-surface/40 font-bold">Artisan</p>
                <p className="font-bold text-xs text-primary uppercase tracking-tight">{product.maker || 'Artisan Collective'}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-secondary" />
            </div>

            {/* Selectors */}
            <div className="space-y-6 pt-6 border-t border-on-surface/5 font-primary">
              {/* Quantity */}
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Quantity</h4>
                <div className="flex items-center w-28 justify-between p-1 bg-surface-container-lowest rounded-lg border border-on-surface/5">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors"
                  >
                    <Minus className="w-3 h-3 text-on-surface" />
                  </button>
                  <span className="font-bold text-sm text-on-surface">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors"
                  >
                    <Plus className="w-3 h-3 text-on-surface" />
                  </button>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all hover:bg-secondary"
                >
                  <MessageCircle size={18} />
                  <span>Buy via WhatsApp</span>
                </button>

                <button 
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                    isAdded ? 'bg-secondary border-secondary text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? 'Added to bag' : 'Add to selection'}</span>
                </button>
              </div>

              {/* Secondary Meta */}
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-on-surface/40">
                  <Truck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-on-surface/40">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Features (Asymmetric Layout) */}
        <section className="mt-20 sm:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 md:order-1 space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-on-surface leading-tight">
              Meticulously Crafted <br className="hidden sm:block"/> By Hand in Kerala.
            </h2>
            <div className="space-y-5 text-on-surface/70">
              <p className="text-sm sm:text-base leading-relaxed">
                Every product in our collection is curated with absolute precision, sourced directly from the finest homepreneurs of Kerala. We ensure each piece reflects our heritage of excellence.
              </p>
              <ul className="space-y-4">
                {[
                  "Sustainably sourced authentic ingredients.",
                  "Traditional small-batch processing.",
                  "Chemical-free and verified safe."
                ].map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm sm:text-base">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="font-medium text-primary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl shadow-on-surface/5 border border-on-surface/5">
              <img 
                alt="Crafting Process" 
                className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200" 
              />
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="mt-24 sm:mt-40 border-t border-on-surface/5 pt-16 sm:pt-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Discovery Archive</h2>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-headline uppercase font-bold">
                Curated Suggestions.
              </h3>
            </div>
            <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
              View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
