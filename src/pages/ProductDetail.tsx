import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, MessageCircle, ArrowLeft, Check, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import Skeleton, { ProductDetailSkeleton } from '../components/Skeleton';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[3];
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Bone White');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const addItem = useCartStore((state) => state.addItem);
  
  const relatedProducts = useMemo(() => {
    // Filter products in the same category, excluding the current one
    const sameCategory = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
    
    // If we have enough in the same category, return them
    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
    
    // Otherwise, add products from the same material or artisan
    const sameMaterial = PRODUCTS.filter(p => 
      p.material === product.material && 
      p.id !== product.id && 
      !sameCategory.find(sc => sc.id === p.id)
    );
    
    const combined = [...sameCategory, ...sameMaterial];
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

  const sizes = ['XS', 'S', 'M', 'L'];
  const colors = [
    { name: 'Bone White', hex: '#ffffff' },
    { name: 'Onyx', hex: '#000000' },
    { name: 'Slate', hex: '#d3dbdd' },
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
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-12 transition-colors">
        <ArrowLeft size={16} /> Back to Collection
      </Link>

      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <>
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative group">
                <motion.div 
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low cursor-zoom-in relative"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img 
                    src={productImages[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-200 ease-out" 
                    style={{ 
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
                    }}
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>

                {productImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-on-surface shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-on-surface shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((img, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveImageIndex(i)}
                      className={`aspect-square rounded-xl overflow-hidden bg-surface-container-low cursor-pointer transition-all border-2 ${activeImageIndex === i ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:opacity-80'}`}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">{product.category}</span>
              <h1 className="text-display-md mb-4">{product.name}</h1>
              <p className="text-2xl font-bold mb-8">${product.price.toFixed(2)}</p>
              
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Description</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {product.description} Crafted from the finest materials, this piece redefines effortless elegance. Features a relaxed silhouette, dropped shoulders, and mother-of-pearl buttons. Each piece is pre-washed for a signature soft feel from the very first wear.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Color: {selectedColor}</h3>
                  <div className="flex gap-4">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-primary scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Select Size</h3>
                  <div className="flex gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-16 py-3 rounded-md text-sm font-bold transition-all ${
                          selectedSize === size ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Quantity</h3>
                  <div className="flex items-center bg-surface-container-high rounded-md w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:text-primary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:text-primary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-5 rounded-md font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                    isAdding ? 'bg-green-500 text-white' : 'bg-on-background text-white hover:bg-primary'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={20} /> Added to Cart
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
                </button>
                <button className="w-full bg-surface-container-high text-on-surface py-5 rounded-md font-bold flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all active:scale-[0.98]">
                  <MessageCircle size={20} /> Buy via WhatsApp
                </button>
              </div>
            </div>
          </>
        </div>
      )}

      {/* Related Products */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-display-md">Related Products</h2>
            <p className="text-on-surface-variant mt-2">Hand-picked pieces from the same category or similar materials.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold text-sm tracking-widest uppercase border-b-2 border-primary">
            View Collection
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <h4 className="font-bold text-sm mb-1">{p.name}</h4>
              <p className="text-on-surface-variant text-xs">${p.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
