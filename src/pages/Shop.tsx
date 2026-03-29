import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronRight, X, ShoppingCart, ArrowRight, Check, Clock, Star, Eye, Plus, Minus, Heart } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { useLocation, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { toast } from 'sonner';
import { ProductCardSkeleton } from '../components/Skeleton';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { QuickViewModal } from '../components/QuickViewModal';

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/10 text-primary font-bold rounded-sm px-0.5 transition-colors group-hover:bg-primary/20">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const Marquee = ({ text }: { text: string }) => (
  <div className="overflow-hidden whitespace-nowrap bg-on-background text-white py-2 mb-12 -mx-12">
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 items-center"
    >
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">{text}</span>
          <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortBy, setSortBy] = useState('Popularity');
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  // Handle category query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  // Handle scroll for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToRecentSearches = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when category changes
  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 800);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToCart = (product: any) => {
    setAddingId(product.id);
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: "Curated selection updated.",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart'
      }
    });
    setTimeout(() => setAddingId(null), 1500);
  };

  const categories = useMemo(() => [
    { name: 'All Products', count: PRODUCTS.length },
    ...CATEGORIES.map(cat => ({
      name: cat.name,
      count: PRODUCTS.filter(p => p.category === cat.name).length
    }))
  ].filter(cat => cat.count > 0 || cat.name === 'All Products'), []);

  const handleStockToggle = () => {
    setIsLoading(true);
    setOnlyInStock(!onlyInStock);
    setTimeout(() => setIsLoading(false), 400);
  };

  const clearAllFilters = () => {
    setIsLoading(true);
    setSelectedCategory('All Products');
    setSelectedSubcategory(null);
    setPriceRange([0, 1500]);
    setMinRating(0);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('Popularity');
    setTimeout(() => setIsLoading(false), 800);
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All Products' || product.parentCategory === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || product.category === selectedSubcategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = (product.rating || 0) >= minRating;
      const matchesStock = !onlyInStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sorting
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        result.sort((a, b) => (b.id > a.id ? 1 : -1));
        break;
      case 'Newest Arrivals':
        result.sort((a, b) => (a.id > b.id ? 1 : -1));
        break;
      case 'Popularity':
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategory, priceRange, minRating, onlyInStock, sortBy]);

  const suggestionsData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    // If no query but focused, show recent searches
    if (!query) {
      return { 
        items: recentSearches.map(s => ({ type: 'recent', name: s })), 
        hasMore: false 
      };
    }
    
    const recentMatches = recentSearches
      .filter(s => s.toLowerCase().includes(query))
      .map(s => ({ type: 'recent', name: s }));
      
    const productMatches = PRODUCTS
      .filter(p => p.name.toLowerCase().includes(query))
      .map(p => ({ type: 'product', id: p.id, name: p.name, category: p.category, image: p.image }));
      
    const categoryMatches = categories
      .filter(c => c.name.toLowerCase().includes(query) && c.name !== 'All Products')
      .map(c => ({ type: 'category', name: c.name }));

    const allMatches = [...recentMatches, ...categoryMatches, ...productMatches];
    const hasMore = allMatches.length > 5;
    const items = allMatches.slice(0, 5);

    return { items, hasMore, total: allMatches.length };
  }, [searchQuery, categories, recentSearches]);

  const suggestions = suggestionsData.items;
  const hasMoreSuggestions = suggestionsData.hasMore;

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <Marquee text="Limited Edition Artisan Curation • New Arrivals Weekly • Worldwide Shipping Available • Heritage Quality Guaranteed" />
      
      <header className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary/30" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary">The Curation</span>
            </div>
            <h1 className="text-[clamp(3rem,6vw,5rem)] leading-[1.1] font-black text-on-background mb-8 tracking-tight">
              Curated <span className="text-primary relative">
                Essentials
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="absolute -bottom-2 left-0 h-2 bg-primary/5 -z-10"
                />
              </span>
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed font-light max-w-xl">
              A deliberate collection of artisan goods and daily necessities, selected for their quality, heritage, and timeless design.
            </p>
          </motion.div>
        </div>
        
        <div className="relative w-full lg:w-[450px]" ref={searchRef}>
          <div className="group relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-all duration-500" size={20} />
            <input 
              type="text" 
              placeholder="Search our collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addToRecentSearches(searchQuery);
                  setIsSearchFocused(false);
                }
              }}
              className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] py-6 pl-16 pr-16 text-sm focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 shadow-premium transition-all placeholder:text-on-surface-variant/30 font-light"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors p-2 bg-surface-container rounded-full"
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[3rem] shadow-2xl border border-outline-variant/10 p-10 z-50 backdrop-blur-xl bg-white/95"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">Recent Discoveries</h4>
                      <button 
                        onClick={() => setRecentSearches([])}
                        className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {recentSearches.length > 0 ? recentSearches.map((term, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setSearchQuery(term);
                            setIsSearchFocused(false);
                          }}
                          className="px-6 py-3 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl text-xs font-light hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center gap-3 group"
                        >
                          <Search size={12} className="text-on-surface-variant/30 group-hover:text-primary" />
                          {term}
                        </button>
                      )) : (
                        <p className="text-xs text-on-surface-variant/40 font-light italic">Your search history will appear here.</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-6">Curated Collections</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.slice(1, 5).map((cat) => (
                        <button 
                          key={cat.name}
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/5 hover:border-primary/20 hover:bg-primary/5 transition-all group text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xs font-mono font-bold text-primary">{cat.count}</span>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {searchQuery && suggestions.length > 0 && (
                  <div className="mt-12 pt-10 border-t border-outline-variant/10">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-6">Matching Pieces</h4>
                    <div className="space-y-4">
                      {suggestions.map((item: any, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            if (item.type === 'product') {
                              window.location.href = `/product/${item.id}`;
                            } else {
                              setSearchQuery(item.name);
                              setIsSearchFocused(false);
                            }
                          }}
                          className="w-full flex items-center gap-6 p-4 rounded-2xl hover:bg-surface-container transition-all group text-left"
                        >
                          {item.type === 'product' ? (
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                              <Search size={16} className="text-on-surface-variant/40" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                              <Highlight text={item.name} query={searchQuery} />
                            </p>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40">
                              {item.type === 'product' ? item.category : 'Search Suggestion'}
                            </p>
                          </div>
                          <ArrowRight size={16} className="text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <nav className="flex items-center justify-between mb-20">
        <div className="flex items-center gap-4 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={10} className="text-outline-variant/30" />
          <button 
            onClick={() => setSelectedCategory('All Products')}
            className={`hover:text-primary transition-colors ${selectedCategory === 'All Products' ? 'text-primary' : ''}`}
          >
            Shop
          </button>
          {selectedCategory !== 'All Products' && (
            <>
              <ChevronRight size={10} className="text-outline-variant/30" />
              <span className="text-primary">{selectedCategory}</span>
            </>
          )}
        </div>
        
        <button 
          onClick={() => setIsFilterDrawerOpen(true)}
          className="lg:hidden flex items-center gap-3 px-6 py-3 bg-surface-container rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-primary shadow-sm"
        >
          <Filter size={12} />
          Filters
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-16">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
                <Filter size={14} className="text-primary" />
              </div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface">Refine Selection</h3>
            </div>
            {(selectedCategory !== 'All Products' || priceRange[0] > 0 || priceRange[1] < 1500 || minRating > 0 || onlyInStock || searchQuery) && (
              <button 
                onClick={clearAllFilters}
                className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary hover:text-on-background transition-all underline underline-offset-8"
              >
                Reset
              </button>
            )}
          </div>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Collections</h3>
              <div className="flex-1 h-px border-t border-dashed border-outline-variant/20" />
            </div>
            <ul className="space-y-5">
              {categories.map((cat) => (
                <li key={cat.name} className="space-y-4">
                  <div 
                    onClick={() => {
                      handleCategoryChange(cat.name);
                      setSelectedSubcategory(null);
                    }}
                    className={`flex justify-between items-center group cursor-pointer transition-all ${selectedCategory === cat.name ? 'translate-x-2' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${selectedCategory === cat.name ? 'bg-primary scale-125 shadow-[0_0_15px_rgba(0,89,198,0.6)]' : 'bg-outline-variant/20 group-hover:bg-primary/40'}`} />
                      <span className={`text-sm transition-all duration-500 ${selectedCategory === cat.name ? 'font-bold text-on-surface' : 'text-on-surface-variant group-hover:text-primary font-light'}`}>
                        {cat.name}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono transition-colors ${selectedCategory === cat.name ? 'text-primary font-bold' : 'text-outline-variant/30'}`}>
                      {cat.count.toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Subcategories */}
                  <AnimatePresence>
                    {selectedCategory === cat.name && cat.name !== 'All Products' && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 space-y-3 overflow-hidden"
                      >
                        {CATEGORIES.find(c => c.name === cat.name)?.subcategories?.map(sub => (
                          <li 
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub === selectedSubcategory ? null : sub)}
                            className={`text-xs cursor-pointer transition-colors flex items-center gap-2 ${selectedSubcategory === sub ? 'text-primary font-bold' : 'text-on-surface-variant/60 hover:text-primary'}`}
                          >
                            <div className={`w-1 h-1 rounded-full ${selectedSubcategory === sub ? 'bg-primary' : 'bg-transparent'}`} />
                            {sub}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Price Threshold</h3>
              <div className="flex-1 h-px border-t border-dashed border-outline-variant/20" />
            </div>
            <div className="space-y-8 p-8 rounded-[3rem] bg-surface-container-lowest border border-outline-variant/5 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl" />
              <div className="relative h-1 bg-surface-container-highest rounded-full">
                <motion.div 
                  initial={false}
                  animate={{ width: `${(priceRange[1] / 1500) * 100}%` }}
                  className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(0,89,198,0.4)]"
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1500" 
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setPriceRange([priceRange[0], val]);
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
                <motion.div 
                  animate={{ left: `${(priceRange[1] / 1500) * 100}%` }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-xl pointer-events-none"
                />
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono uppercase text-on-surface-variant/40 mb-1">Min</span>
                  <span className="text-xs font-mono font-bold">$000</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-mono uppercase text-on-surface-variant/40 mb-1">Max</span>
                  <span className="text-sm font-mono font-bold text-primary">${priceRange[1].toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Availability</h3>
              <div className="flex-1 h-px border-t border-dashed border-outline-variant/20" />
            </div>
            <button 
              onClick={handleStockToggle}
              className="flex items-center justify-between w-full group cursor-pointer p-6 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/5 hover:border-primary/20 transition-all shadow-sm"
            >
              <span className={`text-xs font-bold uppercase tracking-widest transition-all ${onlyInStock ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-primary'}`}>
                In Stock Only
              </span>
              <div className={`relative w-12 h-6 rounded-full transition-all duration-700 ${onlyInStock ? 'bg-primary shadow-[0_0_20px_rgba(0,89,198,0.3)]' : 'bg-surface-container-highest'}`}>
                <motion.div 
                  animate={{ x: onlyInStock ? 22 : 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                />
              </div>
            </button>
          </section>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-16 border-b border-outline-variant/10 pb-10">
            <div className="text-lg font-light text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{filteredProducts.length}</span> curated pieces
              {searchQuery && <span> for "<span className="italic font-medium text-primary">{searchQuery}</span>"</span>}
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Sort by</span>
              <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-8 py-3 pr-12 text-[10px] font-bold uppercase tracking-widest focus:ring-4 focus:ring-primary/5 cursor-pointer transition-all hover:border-primary/20 shadow-sm"
                >
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Newest Arrivals</option>
                </select>
                <ChevronRight size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none rotate-90" />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map((product, i) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={i} 
                  searchQuery={searchQuery}
                  onQuickView={(p) => setQuickViewId(p.id)}
                  onAddToCart={handleAddToCart}
                  isAdding={addingId === product.id}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-48 text-center bg-surface-container-low rounded-[4rem] border border-outline-variant/10 relative overflow-hidden"
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#FDCB58]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FDCB58]/5 blur-[100px] translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="w-40 h-40 bg-white rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-[#FDCB58] shadow-premium border border-outline-variant/5">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Search size={64} strokeWidth={1} />
                  </motion.div>
                </div>
                <h3 className="text-4xl font-serif italic mb-6 tracking-tight">No pieces found <span className="text-[#FDCB58] not-italic font-headline font-light">in this Curation.</span></h3>
                <p className="text-on-surface-variant font-light max-w-md mx-auto leading-relaxed text-lg">
                  Our curation is limited and intentional. Try adjusting your search or filters to find another timeless piece.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                  <button 
                    onClick={clearAllFilters}
                    className="px-12 py-5 bg-on-background text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#FDCB58] hover:text-black transition-all shadow-2xl active:scale-95"
                  >
                    Reset all filters
                  </button>
                  <Link 
                    to="/"
                    className="px-12 py-5 border border-outline-variant/20 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-surface-container transition-all active:scale-95"
                  >
                    Back to Gallery
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-48 flex flex-col items-center gap-12">
              <div className="w-full h-px bg-outline-variant/10 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "33%" }}
                  className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(0,89,198,0.4)]"
                />
              </div>
              <div className="flex justify-center items-center gap-8">
                <button className="w-16 h-16 rounded-[2rem] flex items-center justify-center border border-outline-variant/10 hover:bg-surface-container hover:border-primary/20 transition-all group shadow-sm">
                  <ChevronRight size={24} className="text-on-surface-variant group-hover:text-primary transition-colors rotate-180" />
                </button>
                <div className="flex items-center gap-4">
                  <button className="w-16 h-16 rounded-[2rem] flex items-center justify-center bg-on-background text-white font-mono font-bold shadow-2xl scale-110">01</button>
                  <button className="w-16 h-16 rounded-[2rem] flex items-center justify-center hover:bg-surface-container transition-all font-mono text-on-surface-variant hover:text-primary">02</button>
                  <button className="w-16 h-16 rounded-[2rem] flex items-center justify-center hover:bg-surface-container transition-all font-mono text-on-surface-variant hover:text-primary">03</button>
                </div>
                <button className="w-16 h-16 rounded-[2rem] flex items-center justify-center border border-outline-variant/10 hover:bg-surface-container hover:border-primary/20 transition-all group shadow-sm">
                  <ChevronRight size={24} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                </button>
              </div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-on-surface-variant/30">End of Curation</p>
            </div>
          )}
        </div>
      </div>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-12 left-12 z-[90] w-16 h-16 bg-white border border-outline-variant/10 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary hover:text-white transition-all group"
          >
            <ChevronRight size={24} className="-rotate-90 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Cart Summary */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-12 right-12 z-[90]"
          >
            <Link 
              to="/cart"
              className="flex items-center gap-6 bg-on-background text-white pl-2 pr-4 py-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-primary transition-all group"
            >
              <div className="flex -space-x-4 overflow-hidden ml-2">
                {cartItems.slice(0, 4).map((item, i) => (
                  <motion.img 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={`${item.id}-${i}`}
                    src={item.image} 
                    alt="" 
                    className="w-12 h-12 rounded-full border-4 border-on-background object-cover ring-1 ring-white/10"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 mb-0.5">Your Collection</span>
                <span className="text-xs font-bold uppercase tracking-widest">{cartItems.length} {cartItems.length === 1 ? 'Piece' : 'Pieces'}</span>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ShoppingCart size={20} />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-[110] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl p-10 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-xl font-serif italic">Refine Selection</h3>
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-16">
                {/* Reusing Sidebar Sections - In a real app, these would be extracted components */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Collections</h3>
                    <div className="flex-1 h-px border-t border-dashed border-outline-variant/20" />
                  </div>
                  <ul className="space-y-5">
                    {categories.map((cat) => (
                      <li 
                        key={cat.name} 
                        onClick={() => {
                          handleCategoryChange(cat.name);
                          setIsFilterDrawerOpen(false);
                        }}
                        className={`flex justify-between items-center group cursor-pointer transition-all ${selectedCategory === cat.name ? 'translate-x-2' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${selectedCategory === cat.name ? 'bg-primary scale-125 shadow-[0_0_15px_rgba(0,89,198,0.6)]' : 'bg-outline-variant/20 group-hover:bg-primary/40'}`} />
                          <span className={`text-sm transition-all duration-500 ${selectedCategory === cat.name ? 'font-bold text-on-surface' : 'text-on-surface-variant group-hover:text-primary font-light'}`}>
                            {cat.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono transition-colors ${selectedCategory === cat.name ? 'text-primary font-bold' : 'text-outline-variant/30'}`}>
                          {cat.count.toString().padStart(2, '0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Price Threshold</h3>
                    <div className="flex-1 h-px border-t border-dashed border-outline-variant/20" />
                  </div>
                  <div className="space-y-8 p-8 rounded-[3rem] bg-surface-container-lowest border border-outline-variant/5 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl" />
                    <div className="relative h-1 bg-surface-container-highest rounded-full">
                      <motion.div 
                        initial={false}
                        animate={{ width: `${(priceRange[1] / 1500) * 100}%` }}
                        className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(0,89,198,0.4)]"
                      />
                      <input 
                        type="range" 
                        min="0" 
                        max="1500" 
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setPriceRange([priceRange[0], val]);
                        }}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                      />
                      <motion.div 
                        animate={{ left: `${(priceRange[1] / 1500) * 100}%` }}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-xl pointer-events-none"
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase text-on-surface-variant/40 mb-1">Min</span>
                        <span className="text-xs font-mono font-bold">$000</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-mono uppercase text-on-surface-variant/40 mb-1">Max</span>
                        <span className="text-sm font-mono font-bold text-primary">${priceRange[1].toString().padStart(4, '0')}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">Availability</h3>
                    <div className="flex-1 h-px border-t border-dashed border-outline-variant/20" />
                  </div>
                  <button 
                    onClick={handleStockToggle}
                    className="flex items-center justify-between w-full group cursor-pointer p-6 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/5 hover:border-primary/20 transition-all shadow-sm"
                  >
                    <span className={`text-xs font-bold uppercase tracking-widest transition-all ${onlyInStock ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-primary'}`}>
                      In Stock Only
                    </span>
                    <div className={`relative w-12 h-6 rounded-full transition-all duration-700 ${onlyInStock ? 'bg-primary shadow-[0_0_20px_rgba(0,89,198,0.3)]' : 'bg-surface-container-highest'}`}>
                      <motion.div 
                        animate={{ x: onlyInStock ? 22 : 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                      />
                    </div>
                  </button>
                </section>
              </div>
              
              <div className="mt-16 pt-10 border-t border-outline-variant/10">
                <button 
                  onClick={() => {
                    clearAllFilters();
                    setIsFilterDrawerOpen(false);
                  }}
                  className="w-full py-6 bg-on-background text-white rounded-[2rem] font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-2xl"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <QuickViewModal 
        productId={quickViewId} 
        onClose={() => setQuickViewId(null)} 
      />
    </main>
  );
}
