import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, MessageCircle, ArrowLeft, Check, ShoppingBag, ChevronLeft, ChevronRight, X, Maximize2, ZoomIn, ZoomOut, ChevronDown, Star, ArrowRight, Heart } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { toast } from 'sonner';
import Skeleton, { ProductDetailSkeleton } from '../components/Skeleton';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[3];
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Bone White');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>('description');
  
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const relatedProducts = useMemo(() => {
    // Filter products in the same category, excluding the current one
    const sameCategory = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
    
    // Products with the same tag
    const sameTag = PRODUCTS.filter(p => 
      p.tag === product.tag && 
      p.id !== product.id && 
      !sameCategory.find(sc => sc.id === p.id)
    );

    // Products with the same material
    const sameMaterial = PRODUCTS.filter(p => 
      p.material === product.material && 
      p.id !== product.id && 
      !sameCategory.find(sc => sc.id === p.id) &&
      !sameTag.find(st => st.id === p.id)
    );
    
    const combined = [...sameCategory, ...sameTag, ...sameMaterial];
    if (combined.length >= 4) return combined.slice(0, 4);
    
    // Finally, fill with any other products to ensure we have 4
    const others = PRODUCTS.filter(p => 
      p.id !== product.id && 
      !combined.find(c => c.id === p.id)
    );
    
    return [...combined, ...others].slice(0, 4);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (isModalOpen) {
      setModalZoom(1);
      setModalPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight' && isModalOpen) nextImage();
      if (e.key === 'ArrowLeft' && isModalOpen) prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const sizes = ['30ml', '50ml', '100ml'];
  const colors = [
    { name: 'Natural', hex: '#fdf5e6' },
    { name: 'Rose', hex: '#ffe4e1' },
    { name: 'Honey', hex: '#f5deb3' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    for(let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    toast.success(`${quantity} x ${product.name} added to cart`, {
      description: "Curated selection updated.",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart'
      }
    });

    setTimeout(() => setIsAdding(false), 2000);
  };

  const productImages = product.images || [product.image];

  const nextImage = () => {
    setDirection(1);
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleModalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalZoom === 1) return;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX / width - 0.5) * 2;
    const y = (e.clientY / height - 0.5) * 2;
    setModalPosition({ x: -x * 50, y: -y * 50 });
  };

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 mb-16">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="w-1 h-1 bg-outline-variant/30 rounded-full" />
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        {product && (
          <>
            <span className="w-1 h-1 bg-outline-variant/30 rounded-full" />
            <span className="text-on-surface-variant/40">{product.category}</span>
            <span className="w-1 h-1 bg-outline-variant/30 rounded-full" />
            <span className="text-primary font-bold truncate max-w-[150px]">{product.name}</span>
          </>
        )}
      </nav>

      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
            <>
              {/* Product Gallery */}
              <div className="flex flex-col-reverse lg:flex-row gap-8">
                {/* Thumbnails */}
                {productImages.length > 1 && (
                  <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:w-24 shrink-0 pb-4 lg:pb-0">
                    {productImages.map((img, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          setDirection(i > activeImageIndex ? 1 : -1);
                          setActiveImageIndex(i);
                        }}
                        className={`relative aspect-square rounded-2xl overflow-hidden bg-surface-container-low cursor-pointer transition-all border-2 shrink-0 w-20 lg:w-full ${
                          activeImageIndex === i ? 'border-primary ring-4 ring-primary/10' : 'border-transparent hover:opacity-80'
                        }`}
                      >
                        <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image Display */}
                <div className="flex-1 relative group">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-surface-container-low relative shadow-premium">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div 
                        key={activeImageIndex}
                        custom={direction}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="w-full h-full cursor-zoom-in relative"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onClick={() => setIsModalOpen(true)}
                      >
                        <img 
                          src={productImages[activeImageIndex]} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-300 ease-out" 
                          style={{ 
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
                          }}
                          referrerPolicy="no-referrer" 
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Image Counter */}
                    <div className="absolute top-8 left-8 px-4 py-2 bg-black/10 backdrop-blur-xl rounded-2xl text-white text-[10px] font-mono font-bold tracking-[0.2em] uppercase z-10 border border-white/10">
                      {activeImageIndex + 1} / {productImages.length}
                    </div>

                    {/* Zoom Hint */}
                    <div className="absolute bottom-8 left-8 flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-2xl text-white text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 border border-white/10">
                      <ZoomIn size={16} /> Hover to Zoom
                    </div>

                    {/* Maximize Icon */}
                    <div className="absolute bottom-8 right-8 p-4 rounded-3xl bg-white/90 backdrop-blur-md text-on-surface opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl z-10 cursor-pointer border border-outline-variant/10 hover:bg-primary hover:text-white" onClick={() => setIsModalOpen(true)}>
                      <Maximize2 size={24} />
                    </div>

                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white z-10 border border-outline-variant/10"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white z-10 border border-outline-variant/10"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-black bg-[#FDCB58] px-4 py-1.5 rounded-full">{product.category}</span>
                <div className="h-px w-12 bg-outline-variant/20" />
                <div className="flex items-center gap-1 text-[10px] font-mono text-on-surface-variant/60">
                  <Star size={12} className="fill-current text-[#FDCB58]" />
                  <span>{product.rating || '4.8'} (24 Reviews)</span>
                </div>
              </div>
              
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-serif italic mb-6">{product.name}</h1>
              <div className="flex items-baseline gap-4 mb-12">
                <p className="text-3xl font-mono font-light text-on-surface">${product.price.toFixed(2)}</p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40">Tax included</span>
              </div>
              
              <div className="space-y-2 mb-16">
                {/* Description Accordion */}
                <div className="border-b border-outline-variant/10">
                  <button 
                    onClick={() => setOpenSection(openSection === 'description' ? null : 'description')}
                    className="w-full py-6 flex items-center justify-between group"
                  >
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-black transition-colors">The Narrative</h3>
                    <motion.div
                      animate={{ rotate: openSection === 'description' ? 180 : 0 }}
                      className="text-on-surface-variant/40 group-hover:text-black transition-colors"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === 'description' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-on-surface-variant leading-relaxed font-light text-base">
                          {product.description} Crafted from the finest materials, this piece redefines effortless elegance. Features a relaxed silhouette, dropped shoulders, and mother-of-pearl buttons. Each piece is pre-washed for a signature soft feel from the very first wear.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shade Accordion */}
                <div className="border-b border-outline-variant/10">
                  <button 
                    onClick={() => setOpenSection(openSection === 'color' ? null : 'color')}
                    className="w-full py-6 flex items-center justify-between group"
                  >
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-black transition-colors">Shade: {selectedColor}</h3>
                    <motion.div
                      animate={{ rotate: openSection === 'color' ? 180 : 0 }}
                      className="text-on-surface-variant/40 group-hover:text-black transition-colors"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === 'color' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 flex gap-5">
                          {colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => setSelectedColor(color.name)}
                              className={`w-10 h-10 rounded-full border-2 transition-all relative ${selectedColor === color.name ? 'border-primary scale-110 shadow-lg shadow-primary/20' : 'border-outline-variant/10'}`}
                              style={{ backgroundColor: color.hex }}
                            >
                              {selectedColor === color.name && (
                                <motion.div layoutId="activeColorDot" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Size Accordion */}
                <div className="border-b border-outline-variant/10">
                  <button 
                    onClick={() => setOpenSection(openSection === 'size' ? null : 'size')}
                    className="w-full py-6 flex items-center justify-between group"
                  >
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-black transition-colors">Size: {selectedSize}</h3>
                    <motion.div
                      animate={{ rotate: openSection === 'size' ? 180 : 0 }}
                      className="text-on-surface-variant/40 group-hover:text-black transition-colors"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === 'size' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 flex gap-4">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`w-20 py-4 rounded-2xl text-xs font-mono font-bold transition-all border ${
                                selectedSize === size 
                                  ? 'bg-on-background text-white border-on-background shadow-xl scale-105' 
                                  : 'bg-surface-container-low text-on-surface-variant border-outline-variant/10 hover:border-primary/30 hover:text-primary'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quantity Accordion */}
                <div className="border-b border-outline-variant/10">
                  <button 
                    onClick={() => setOpenSection(openSection === 'quantity' ? null : 'quantity')}
                    className="w-full py-6 flex items-center justify-between group"
                  >
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-black transition-colors">Volume: {quantity}</h3>
                    <motion.div
                      animate={{ rotate: openSection === 'quantity' ? 180 : 0 }}
                      className="text-on-surface-variant/40 group-hover:text-black transition-colors"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === 'quantity' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 flex items-center bg-surface-container-low rounded-2xl w-fit border border-outline-variant/5">
                          <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-5 hover:text-primary transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-16 text-center font-mono font-bold text-lg">{quantity.toString().padStart(2, '0')}</span>
                          <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-5 hover:text-primary transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <motion.button 
                  onClick={handleAddToCart}
                  disabled={isAdding || !product.inStock}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-6 rounded-3xl font-bold shadow-2xl transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] ${
                    !product.inStock 
                      ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed' 
                      : isAdding 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#FDCB58] text-black hover:bg-[#FDCB58]/90'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {!product.inStock ? (
                      <motion.div
                        key="soldout"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Currently Unavailable
                      </motion.div>
                    ) : isAdding ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={20} /> Added to Selection
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={20} /> Add to Selection
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      toast.success('Removed from wishlist');
                    } else {
                      addToWishlist(product);
                      toast.success('Added to wishlist');
                    }
                  }}
                  className={`w-full sm:w-20 h-20 rounded-3xl flex items-center justify-center transition-all shadow-premium border border-outline-variant/10 ${
                    isInWishlist(product.id)
                      ? 'bg-[#FDCB58] text-black'
                      : 'bg-white text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Heart size={24} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                </motion.button>

                {product.inStock && (
                  <button className="w-full bg-surface-container-low text-on-surface py-6 rounded-3xl font-bold flex items-center justify-center gap-4 hover:bg-surface-container-high transition-all border border-outline-variant/10 text-xs uppercase tracking-[0.2em]">
                    <MessageCircle size={20} /> Inquire via WhatsApp
                  </button>
                )}
              </div>
            </motion.div>
          </>
        </div>
      )}

      {/* Related Products */}
      <section className="border-t border-outline-variant/10 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif italic mb-4">You may also <span className="text-primary not-italic font-headline font-light">Appreciate.</span></h2>
            <p className="text-on-surface-variant font-light leading-relaxed">Hand-picked pieces from the same category or similar materials, curated to complement your selection.</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-primary font-bold text-xs tracking-[0.2em] uppercase">
            View Collection
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {relatedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-on-background/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-16"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 p-4 rounded-3xl bg-white/10 text-white hover:bg-white/20 transition-all z-10 border border-white/10"
            >
              <X size={28} />
            </button>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/10 backdrop-blur-xl p-3 rounded-[2rem] border border-white/10 z-10 shadow-2xl">
              <button 
                onClick={() => setModalZoom(Math.max(1, modalZoom - 0.5))}
                className="p-4 rounded-2xl hover:bg-white/10 text-white transition-all"
              >
                <ZoomOut size={24} />
              </button>
              <span className="text-white font-mono text-sm w-16 text-center font-bold">{(modalZoom * 100).toFixed(0)}%</span>
              <button 
                onClick={() => setModalZoom(Math.min(4, modalZoom + 0.5))}
                className="p-4 rounded-2xl hover:bg-white/10 text-white transition-all"
              >
                <ZoomIn size={24} />
              </button>
            </div>

            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
              onMouseMove={handleModalMouseMove}
            >
              <motion.img 
                src={productImages[activeImageIndex]} 
                alt={product.name}
                animate={{ 
                  scale: modalZoom,
                  x: modalPosition.x,
                  y: modalPosition.y
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="max-w-full max-h-full object-contain shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                referrerPolicy="no-referrer"
              />
            </div>

            {productImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-10 top-1/2 -translate-y-1/2 p-6 rounded-3xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <ChevronLeft size={40} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-6 rounded-3xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
