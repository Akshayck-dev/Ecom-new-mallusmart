import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  X,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Clock,
  Heart,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  Zap,
  Star,
  Check
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { useHistoryStore } from '../store/historyStore';

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const { category: urlCategory } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { viewedIds } = useHistoryStore();

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [urlCategory]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy, selectedBrand, selectedMaterial]);

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
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesBrand = !selectedBrand || product.artisan === selectedBrand;
      const matchesMaterial = !selectedMaterial || product.material === selectedMaterial;
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesMaterial;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy, selectedBrand, selectedMaterial]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const recentlyViewed = useMemo(() => {
    return viewedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(p => p !== undefined)
      .slice(0, 5);
  }, [viewedIds]);

  const brands = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.artisan))).filter(Boolean), []);
  const materials = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.material))).filter(Boolean), []);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const suggestions: { type: 'product' | 'category'; value: string; id?: string }[] = [];
    CATEGORIES.forEach(cat => {
      if (cat.name.toLowerCase().includes(query))
        suggestions.push({ type: 'category', value: cat.name });
    });
    PRODUCTS.forEach(product => {
      if (product.name.toLowerCase().includes(query))
        suggestions.push({ type: 'product', value: product.name, id: product.id });
    });
    return suggestions.slice(0, 8);
  }, [searchQuery]);

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 10000 });
    setSelectedBrand(null);
    setSelectedMaterial(null);
    setSortBy('featured');
    setCurrentPage(1);
  };

  const sortOptions = [
    { id: 'featured', label: 'Featured Selection' },
    { id: 'rating', label: 'Top Rated' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ];

  const allCategories = ['All', ...CATEGORIES.map(c => c.name)];

  return (
    <div className="min-h-screen bg-[#f8f9fb] pt-20">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gray-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
              {selectedCategory === 'All' ? 'The Master Collection' : `Collection / ${selectedCategory}`}
            </span>
          </div>
          <h1 className="text-5xl md:text-[3.5rem] font-bold text-gray-900 tracking-tight mb-4 leading-tight">
            {selectedCategory === 'All' ? 'The Essentials' : selectedCategory}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            A meticulously curated selection of timeless pieces and artisanal craftsmanship,
            designed for the modern curator.
          </p>
        </motion.div>

        {/* ── Filter & Sorting Bar ───────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 py-6 border-y border-gray-100">

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-900 mr-1">Filters:</span>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'All' ? 'All Items' : cat}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-6 self-end md:self-auto shrink-0">
            {/* Search bar */}
            <div className="relative hidden lg:flex items-center bg-white border border-gray-100 rounded-full px-4 py-2 focus-within:border-gray-300 transition-all shadow-sm">
              <Search className="text-gray-400 shrink-0" size={14} />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-transparent border-none py-0 pl-3 text-xs focus:outline-none w-36 focus:w-52 transition-all placeholder:text-gray-300 text-gray-700"
              />
              {/* Autocomplete */}
              <AnimatePresence>
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-[60]"
                  >
                    <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Suggestions</span>
                    </div>
                    {searchSuggestions.map((s, idx) => (
                      <button
                        key={`${s.type}-${s.value}-${idx}`}
                        onClick={() => {
                          if (s.type === 'category') {
                            setSelectedCategory(s.value);
                            setSearchQuery('');
                          } else {
                            setSearchQuery(s.value);
                          }
                          setIsSearchFocused(false);
                        }}
                        className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group/sug text-left"
                      >
                        <div className="flex items-center gap-3">
                          {s.type === 'category' ? (
                            <LayoutGrid size={11} className="text-gray-400" />
                          ) : (
                            <Sparkles size={11} className="text-gray-400" />
                          )}
                          <span className="text-xs font-medium text-gray-700 group-hover/sug:text-gray-900">
                            {s.value}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-gray-300">{s.type}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 group cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sort By
                <ChevronDown
                  size={15}
                  className={`text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    {sortOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                        className={`w-full px-4 py-3 flex items-center justify-between text-xs font-medium transition-colors ${
                          sortBy === opt.id
                            ? 'text-gray-900 bg-gray-50'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                        {sortBy === opt.id && <Check size={12} className="text-gray-900" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Curation Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-sm"
            >
              <SlidersHorizontal size={13} />
              Refine
            </button>
          </div>
        </div>

        {/* ── Product Grid ────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.section
            key={selectedCategory + searchQuery + currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedProducts.length > 0 ? (
              <>
                <div className="text-xs text-gray-400 mb-8 font-medium">
                  Showing <span className="text-gray-700 font-semibold">{filteredProducts.length}</span> pieces
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {paginatedProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      searchQuery={searchQuery}
                      isRecentlyViewed={viewedIds.includes(product.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8"
                >
                  <Search className="text-gray-300" size={36} />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">No pieces found</h2>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed">
                  Our current curation doesn't match your search. Try adjusting your filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); resetFilters(); }}
                  className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 bg-white border border-gray-200 px-10 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {/* ── Pagination ─────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-24 flex items-center justify-center space-x-3">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                  currentPage === page
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {String(page).padStart(2, '0')}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ── Recently Viewed ────────────────────────────────────── */}
        {recentlyViewed.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 pt-16 border-t border-gray-100"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={14} className="text-gray-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your History</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Recently <span className="font-light text-gray-400">Viewed.</span>
                </h2>
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                {recentlyViewed.length} pieces
              </span>
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

      {/* ── Curation Filter Drawer ──────────────────────────────── */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900 mb-0.5">Refine</h3>
                  <p className="text-xs text-gray-400">Curate your selection</p>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-10">

                {/* Sort Options */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Sort By</h4>
                  <div className="space-y-2">
                    {sortOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-sm ${
                          sortBy === option.id
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-100 hover:border-gray-300 text-gray-500'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        {sortBy === option.id && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Brand</h4>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`px-4 py-2 rounded-full border transition-all text-xs font-medium ${
                          selectedBrand === brand
                            ? 'bg-gray-900 border-gray-900 text-white'
                            : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Material</h4>
                  <div className="flex flex-wrap gap-2">
                    {materials.map(material => (
                      <button
                        key={material}
                        onClick={() => setSelectedMaterial(selectedMaterial === material ? null : material)}
                        className={`px-4 py-2 rounded-full border transition-all text-xs font-medium ${
                          selectedMaterial === material
                            ? 'bg-gray-900 border-gray-900 text-white'
                            : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Tags */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Quick Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Bestseller', 'Organic', 'Premium', 'Limited', 'Luxury', 'Ethical'].map(tag => (
                      <button
                        key={tag}
                        className="px-4 py-2 rounded-full border border-gray-200 text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recently Viewed in Drawer */}
                {recentlyViewed.length > 0 && (
                  <div className="space-y-5 pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Recently Viewed</h4>
                      <Clock size={12} className="text-gray-300" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {recentlyViewed.slice(0, 3).map(product => (
                        <Link key={product!.id} to={`/product/${product!.id}`} className="group space-y-2">
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                            <img
                              src={product!.image}
                              alt={product!.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <p className="text-[9px] font-medium text-gray-400 truncate group-hover:text-gray-700 transition-colors">
                            {product!.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-100 transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-[2] bg-gray-900 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-black transition-all shadow-lg"
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
