import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  Check,
  Plus,
  Filter,
  ArrowUpDown,
  UtensilsCrossed,
  Shirt,
  Sparkles,
  Baby,
  Handshake,
  Package,
  Gift,
  Leaf,
  ShieldCheck,
  MessageCircle,
  MapPin,
  Award
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_ITEMS = 6;
const LOAD_MORE_COUNT = 3;

// Category UI Configuration
const CATEGORY_UI = [
  { id: 'All', label: 'All', icon: LayoutGrid },
  { id: 'Healthy Kitchen', label: 'Food', icon: UtensilsCrossed },
  { id: 'Fashion Street', label: 'Fashion', icon: Shirt },
  { id: 'Natural Care Zone', label: 'Beauty', icon: Sparkles },
  { id: 'Kids Zone', label: 'Kids', icon: Baby },
  { id: 'Service Zone', label: 'Services', icon: Handshake },
  { id: 'Pack Corner', label: 'Packaging', icon: Package },
  { id: 'Gift Corner', label: 'Gifts', icon: Gift },
];

const Shop = () => {
  const { category: urlCategory } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setVisibleCount(INITIAL_ITEMS);
  }, [searchQuery, selectedCategory, sortBy]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' ||
        product.parentCategory === selectedCategory ||
        product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOAD_MORE_COUNT);
  };

  const sortOptions = [
    { id: 'featured', label: 'Recommended' },
    { id: 'rating', label: 'Top Rated' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className="min-h-screen bg-brand-offwhite">
      
      {/* ── Page Header & Trust Line ─────────────────────────────── */}
      <section className="bg-white border-b border-gray-50 overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-offwhite/50 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 md:gap-8"
          >
            {/* Label */}
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-brand-gold/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Heritage Marketplace</span>
              <span className="w-12 h-px bg-brand-gold/20" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-gray tracking-tighter uppercase leading-[0.85] font-headline">
              The <span className="text-brand-green">Kerala</span>{' '}
              <span className="italic font-light text-brand-gray/30 lowercase font-serif border-b-2 border-brand-gold/20">Collection</span>
            </h1>
            
            <p className="max-w-xl text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-gray/40 leading-relaxed">
              Discover a curated selection of authentic handcrafted treasures, 
              sourced directly from local homepreneurs across the heart of Kerala.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-2">
              {[
                { icon: Award, text: 'Artisan Crafted' },
                { icon: MapPin, text: 'Direct Source' },
                { icon: ShieldCheck, text: 'Secure Heritage' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-2 bg-white border border-brand-green-100/10 px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-gray/60 shadow-premium"
                >
                  <item.icon size={11} className="text-brand-gold" />
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Controls Row ────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-2xl border-b border-brand-green-100/10 sticky top-[60px] md:top-[76px] z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">

            {/* Category Pills */}
            <div className="w-full lg:w-auto flex-1 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              <div className="flex items-center gap-2.5 pb-0.5">
                {CATEGORY_UI.map((cat, i) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2.5 whitespace-nowrap py-3 px-6 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                        isActive
                          ? 'bg-brand-green text-white border-brand-green shadow-xl shadow-green-900/10 scale-105'
                          : 'bg-white text-brand-gray/40 border-brand-green-100/10 hover:border-brand-green/30 hover:text-brand-green hover:bg-brand-offwhite'
                      }`}
                    >
                      <Icon size={13} className={isActive ? 'text-brand-gold animate-pulse' : 'text-gray-300'} />
                      {cat.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Search + Sort */}
            <div className="w-full lg:w-auto flex items-center gap-3 shrink-0">
              <div className="relative group flex-1 lg:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-green transition-colors" size={13} />
                <input
                  type="text"
                  placeholder="SEARCH THE CATALOG..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-offwhite/50 border border-brand-green-100/10 rounded-full pl-11 pr-5 py-3 text-[10px] font-black text-brand-gray focus:outline-none focus:ring-4 focus:ring-brand-green/5 focus:border-brand-green/20 transition-all placeholder:text-gray-300 tracking-widest h-12 uppercase"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-3 px-5 py-3 bg-white border border-brand-green-100/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-gray/50 hover:border-brand-green/20 hover:text-brand-green transition-all h-12 shadow-sm active:scale-95"
                >
                  <ArrowUpDown size={14} className="text-brand-gold" />
                  <span>Sort</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="absolute right-0 mt-3 w-56 bg-white border border-brand-green-100/10 rounded-[1.5rem] shadow-2xl overflow-hidden z-50 p-2 origin-top-right backdrop-blur-3xl"
                    >
                      {sortOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                          className={`w-full px-4 py-4 text-left text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-between group ${
                            sortBy === opt.id ? 'bg-brand-green text-white shadow-lg' : 'text-brand-gray/40 hover:bg-brand-offwhite hover:text-brand-green'
                          }`}
                        >
                          {opt.label}
                          {sortBy === opt.id ? (
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          ) : (
                            <ArrowUpDown size={10} className="text-gray-200 group-hover:text-brand-green/30" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Catalog Area ───────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        
        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gray/30">
              {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
            </h2>
            <div className="h-px w-10 bg-brand-gold/20" />
            <span className="inline-flex items-center gap-2 bg-brand-green/5 border border-brand-green-100/10 text-brand-green text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Sparkles size={10} className="text-brand-gold" />
              {filteredProducts.length} Results
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProductCard
                  product={product}
                  index={i}
                  searchQuery={searchQuery}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 md:py-40 text-center bg-white rounded-[3rem] border border-brand-green-100/5 shadow-premium">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 md:w-28 md:h-28 bg-brand-offwhite rounded-[2rem] flex items-center justify-center mb-10 shadow-inner"
            >
              <Search className="text-brand-gold/30" size={32} />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-black text-brand-gray mb-4 uppercase tracking-tighter">No Treasures Found</h3>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
              Our artisans are working hard. Try adjusting your search criteria.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-16 md:mt-24 flex flex-col items-center gap-5">
            <button
              onClick={handleLoadMore}
              className="group relative flex items-center gap-4 bg-brand-green text-white px-12 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/40 active:scale-95"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              <Plus size={14} className="transition-transform group-hover:rotate-180 duration-500" />
              Load More Masterpieces
            </button>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
              Discovered <span className="text-brand-gold">{visibleCount}</span> of {filteredProducts.length}
            </p>
          </div>
        )}
      </main>

    </div>
  );
};

export default Shop;
