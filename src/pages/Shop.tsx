import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { 
  Filter, 
  ChevronRight, 
  X, 
  Search, 
  ChevronDown, 
  Grid, 
  List, 
  ArrowUpDown,
  ShoppingBag,
  Clock,
  Heart,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  LayoutGrid,
  Zap,
  Star,
  Leaf
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { useHistoryStore } from '../store/historyStore';

const Shop = () => {
  const { category: urlCategory } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { viewedIds } = useHistoryStore();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.parentCategory === selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesBrand = !selectedBrand || product.artisan === selectedBrand;
      const matchesMaterial = !selectedMaterial || product.material === selectedMaterial;
      const matchesColor = !selectedColor || product.color === selectedColor;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesMaterial && matchesColor;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const productsGrouped = useMemo(() => {
    const grouped: Record<string, typeof PRODUCTS> = {};
    
    if (selectedCategory === 'All') {
      CATEGORIES.forEach(cat => {
        const items = filteredProducts.filter(p => p.parentCategory === cat.name);
        if (items.length > 0) grouped[cat.name] = items;
      });
    } else {
      // Group by subcategory within the selected parent category
      const subcats = Array.from(new Set(filteredProducts.map(p => p.category)));
      subcats.forEach(sub => {
        const items = filteredProducts.filter(p => p.category === sub);
        if (items.length > 0) grouped[sub as string] = items;
      });
    }
    return grouped;
  }, [selectedCategory, filteredProducts]);

  const recentlyViewed = useMemo(() => {
    return viewedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(p => p !== undefined)
      .slice(0, 5);
  }, [viewedIds]);

  const activeCategoryData = useMemo(() => {
    return CATEGORIES.find(c => c.name === selectedCategory);
  }, [selectedCategory]);

  const brands = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.artisan))).filter(Boolean), []);
  const materials = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.material))).filter(Boolean), []);
  const colors = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.color))).filter(Boolean), []);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestions: { type: 'product' | 'category', value: string, id?: string }[] = [];
    
    // Category suggestions
    CATEGORIES.forEach(cat => {
      if (cat.name.toLowerCase().includes(query)) {
        suggestions.push({ type: 'category', value: cat.name });
      }
    });
    
    // Product suggestions
    PRODUCTS.forEach(product => {
      if (product.name.toLowerCase().includes(query)) {
        suggestions.push({ type: 'product', value: product.name, id: product.id });
      }
    });
    
    return suggestions.slice(0, 8);
  }, [searchQuery]);

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 200 });
    setSelectedBrand(null);
    setSelectedMaterial(null);
    setSelectedColor(null);
    setSortBy('featured');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFCFB] pt-20">
      {/* Immersive Category Hero */}
      <section className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-brand-green">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={activeCategoryData?.image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1920"} 
              alt={selectedCategory}
              className="w-full h-full object-cover grayscale-[0.2] brightness-[0.6]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-green/60 via-transparent to-[#FDFCFB]" />
            
            {/* Animated Floating Elements */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/10 rounded-full blur-3xl bg-brand-yellow/5"
            />
            <motion.div 
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/10 rounded-full blur-3xl bg-brand-green/10"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-px bg-brand-yellow/50" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] text-brand-yellow">
                {selectedCategory === 'All' ? 'The Master Collection' : `Collection / ${selectedCategory}`}
              </span>
              <span className="w-12 h-px bg-brand-yellow/50" />
            </div>
            
            <h1 className="text-7xl md:text-[12rem] font-serif text-white mb-10 tracking-tighter leading-[0.85] select-none">
              {selectedCategory === 'All' ? 'Aura' : selectedCategory} <br />
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="italic font-light text-brand-yellow"
              >
                {selectedCategory === 'All' ? 'Beauty.' : 'Refined.'}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-white/60 text-sm md:text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Discover our curated selection of premium {selectedCategory.toLowerCase()} essentials, 
              crafted with botanical precision for your unique radiance.
            </motion.p>

            <div className="flex items-center justify-center gap-6 text-white/40 text-[9px] font-mono font-bold uppercase tracking-[0.4em]">
              <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-2">
                <Zap size={10} /> Home
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white">Shop</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-brand-yellow/60 via-brand-yellow/20 to-transparent" />
          <span className="text-[8px] font-mono font-bold uppercase tracking-[0.6em] text-white/40 rotate-90 origin-left translate-x-1">Explore</span>
        </motion.div>
      </section>

      {/* Sticky Aesthetic Navigation */}
      <nav className="sticky top-20 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-24">
          <div className="flex items-center gap-10 overflow-x-auto no-scrollbar flex-1 mr-12 py-2">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`group flex flex-col items-center gap-2 transition-all ${selectedCategory === 'All' ? 'text-brand-gray' : 'text-gray-300 hover:text-brand-gray'}`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap`}>
                All Pieces
              </span>
              <motion.div 
                layoutId="nav-underline"
                className={`h-0.5 bg-brand-yellow transition-all ${selectedCategory === 'All' ? 'w-full' : 'w-0 group-hover:w-1/2'}`} 
              />
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group flex flex-col items-center gap-2 transition-all ${selectedCategory === cat.name ? 'text-brand-gray' : 'text-gray-300 hover:text-brand-gray'}`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap`}>
                  {cat.name}
                </span>
                {selectedCategory === cat.name && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="h-0.5 w-full bg-brand-yellow" 
                  />
                )}
                {selectedCategory !== cat.name && (
                  <div className="h-0.5 w-0 group-hover:w-1/2 bg-brand-yellow transition-all" />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative hidden lg:flex items-center bg-gray-50/50 rounded-full px-6 py-2 border border-gray-100 focus-within:border-brand-yellow/30 transition-all">
              <Search className="text-gray-300" size={14} />
              <input 
                type="text" 
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-transparent border-none py-1 pl-4 text-xs focus:outline-none w-40 focus:w-64 transition-all placeholder:text-gray-300 text-brand-gray font-medium"
              />
              
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-[60]"
                  >
                    <div className="p-4 border-b border-gray-50 bg-gray-50/30">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400">Suggestions</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto no-scrollbar">
                      {searchSuggestions.map((suggestion, idx) => (
                        <button
                          key={`${suggestion.type}-${suggestion.value}-${idx}`}
                          onClick={() => {
                            if (suggestion.type === 'category') {
                              setSelectedCategory(suggestion.value);
                              setSearchQuery('');
                            } else {
                              setSearchQuery(suggestion.value);
                            }
                            setIsSearchFocused(false);
                          }}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left"
                        >
                          <div className="flex items-center gap-4">
                            {suggestion.type === 'category' ? (
                              <LayoutGrid size={12} className="text-brand-yellow" />
                            ) : (
                              <Sparkles size={12} className="text-brand-yellow" />
                            )}
                            <span className="text-xs font-medium text-brand-gray group-hover:text-brand-yellow transition-colors">
                              {suggestion.value}
                            </span>
                          </div>
                          <span className="text-[8px] font-mono uppercase tracking-widest text-gray-300 group-hover:text-gray-400">
                            {suggestion.type}
                          </span>
                        </button>
                      ))}
                    </div>
                    {searchSuggestions.length === 8 && (
                      <div className="p-4 bg-gray-50/30 text-center border-t border-gray-50">
                        <p className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">Keep typing for more results</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray bg-brand-offwhite px-6 py-3 rounded-full hover:bg-brand-yellow hover:text-white transition-all shadow-sm"
            >
              <SlidersHorizontal size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Curation</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
        <AnimatePresence mode="wait">
          <motion.section
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProducts.length > 0 ? (
              <div className="space-y-32">
                {(Object.entries(productsGrouped) as [string, typeof PRODUCTS][]).map(([group, products], idx) => (
                  <div key={group} className="space-y-16">
                    <div className="flex items-center gap-6">
                      <h2 className="text-3xl font-serif text-brand-gray whitespace-nowrap">{group}</h2>
                      <div className="h-px w-full bg-gray-100" />
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{products.length} Pieces</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                      {products.map((product, i) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          index={i} 
                          isRecentlyViewed={viewedIds.includes(product.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-10"
                >
                  <Search className="text-gray-200" size={48} />
                </motion.div>
                <h2 className="text-3xl font-serif text-brand-gray mb-4">No pieces found</h2>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed">
                  Our current curation doesn't match your search. Try adjusting your filters or exploring another collection.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange({ min: 0, max: 200 });
                  }}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gray bg-white border border-gray-200 px-10 py-4 rounded-full hover:bg-brand-gray hover:text-white hover:border-brand-gray transition-all shadow-sm"
                >
                  Reset Curation
                </button>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="mt-32 flex justify-center">
            <button className="group relative px-12 py-5 overflow-hidden rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gray group-hover:text-white transition-colors">
                Load More Pieces
              </span>
            </button>
          </div>
        )}
        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-48 pt-32 border-t border-gray-50"
          >
            <div className="flex items-center justify-between mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-yellow" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-yellow">Your History</span>
                </div>
                <h2 className="text-4xl font-serif italic">Recently <span className="text-brand-gray not-italic font-headline font-light">Viewed.</span></h2>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-gray-200" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{recentlyViewed.length} Pieces</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentlyViewed.map((product, i) => (
                <ProductCard 
                  key={`recent-${product!.id}`} 
                  product={product!} 
                  index={i} 
                  isRecentlyViewed={true}
                />
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Aesthetic Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-brand-green/20 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-[70] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-12 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-brand-gray mb-1">Curation</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Refine your selection</p>
                </div>
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-gray hover:bg-gray-100 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-12 space-y-16 no-scrollbar">
                {/* Price Range */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Price Range</h4>
                    <span className="text-[10px] font-mono text-brand-yellow font-bold">${priceRange.min} — ${priceRange.max}</span>
                  </div>
                  <div className="relative h-12 flex items-center">
                    <div className="absolute w-full h-1 bg-gray-100 rounded-full" />
                    <motion.div 
                      className="absolute h-1 bg-brand-yellow rounded-full"
                      style={{ 
                        left: `${(priceRange.min / 200) * 100}%`,
                        right: `${100 - (priceRange.max / 200) * 100}%`
                      }}
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer opacity-0 h-full z-10"
                    />
                    <motion.div 
                      className="absolute w-4 h-4 bg-white border-2 border-brand-yellow rounded-full shadow-md"
                      style={{ left: `calc(${(priceRange.max / 200) * 100}% - 8px)` }}
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Sort By</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'featured', label: 'Featured Selection', icon: Star },
                      { id: 'newest', label: 'Latest Artifacts', icon: Zap },
                      { id: 'price-low', label: 'Price: Low to High', icon: ChevronDown },
                      { id: 'price-high', label: 'Price: High to Low', icon: Heart }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id as any)}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                          sortBy === option.id 
                            ? 'border-brand-yellow bg-brand-yellow/5 text-brand-gray' 
                            : 'border-gray-100 hover:border-gray-200 text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <option.icon size={14} className={sortBy === option.id ? 'text-brand-yellow' : ''} />
                          <span className="text-xs font-medium">{option.label}</span>
                        </div>
                        {sortBy === option.id && <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Brand</h4>
                  <div className="flex flex-wrap gap-3">
                    {brands.map(brand => (
                      <button 
                        key={brand} 
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`px-5 py-2.5 rounded-full border transition-all text-[10px] font-medium ${
                          selectedBrand === brand 
                            ? 'bg-brand-yellow border-brand-yellow text-brand-gray' 
                            : 'border-gray-100 text-gray-400 hover:border-brand-yellow hover:text-brand-gray'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Material</h4>
                  <div className="flex flex-wrap gap-3">
                    {materials.map(material => (
                      <button 
                        key={material} 
                        onClick={() => setSelectedMaterial(selectedMaterial === material ? null : material)}
                        className={`px-5 py-2.5 rounded-full border transition-all text-[10px] font-medium ${
                          selectedMaterial === material 
                            ? 'bg-brand-yellow border-brand-yellow text-brand-gray' 
                            : 'border-gray-100 text-gray-400 hover:border-brand-yellow hover:text-brand-gray'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                      <button 
                        key={color} 
                        onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                        className={`px-5 py-2.5 rounded-full border transition-all text-[10px] font-medium ${
                          selectedColor === color 
                            ? 'bg-brand-yellow border-brand-yellow text-brand-gray' 
                            : 'border-gray-100 text-gray-400 hover:border-brand-yellow hover:text-brand-gray'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Quick Filters</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Organic', 'Vegan', 'Cruelty Free', 'Bestseller', 'Limited Edition'].map(tag => (
                      <button key={tag} className="px-5 py-2.5 rounded-full border border-gray-100 text-[10px] font-medium text-gray-400 hover:border-brand-yellow hover:text-brand-gray transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recently Viewed */}
                {recentlyViewed.length > 0 && (
                  <div className="space-y-8 pt-8 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Recently Viewed</h4>
                      <Clock size={12} className="text-gray-300" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {recentlyViewed.slice(0, 3).map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="group space-y-3">
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <p className="text-[9px] font-medium text-gray-400 truncate group-hover:text-brand-gray transition-colors">{product.name}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-12 border-t border-gray-50 bg-gray-50/30 flex gap-4">
                <button 
                  onClick={resetFilters}
                  className="flex-1 border border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] py-5 rounded-2xl hover:bg-gray-100 transition-all"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-[2] bg-brand-gray text-white text-[10px] font-bold uppercase tracking-[0.4em] py-5 rounded-2xl hover:bg-brand-yellow transition-all shadow-lg shadow-brand-gray/10 active:scale-[0.98]"
                >
                  Apply Selection
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;


