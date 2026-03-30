import React, { useState, useMemo, useEffect } from 'react';
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
  ShoppingCart
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { useHistoryStore } from '../store/historyStore';

const Shop = () => {
  const { category: urlCategory } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [sortBy, setSortBy] = useState('featured');
  const [showCount, setShowCount] = useState(12);
  const { viewedIds } = useHistoryStore();

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
      
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const recentlyViewed = useMemo(() => {
    return viewedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(p => p !== undefined)
      .slice(0, 5);
  }, [viewedIds]);

  return (
    <div className="min-h-screen bg-brand-offwhite pt-20">
      {/* Header Banner (Dark Section) */}
      <section className="w-full bg-brand-green py-16 md:py-24 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left z-10 flex-1">
            <h2 className="text-4xl md:text-6xl font-serif text-brand-yellow mb-6 leading-tight">
              Bath & Body cosmetics just for you!
            </h2>
            <nav className="flex items-center gap-3 text-brand-yellow/60 text-sm font-medium">
              <Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-brand-yellow">Shop</span>
              {selectedCategory !== 'All' && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-brand-yellow">{selectedCategory}</span>
                </>
              )}
            </nav>
          </div>
          
          <div className="relative flex items-center justify-center md:justify-end flex-1 w-full">
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex items-center justify-center gap-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" 
                  alt="Product Bottle 1" 
                  className="w-1/2 h-auto object-contain drop-shadow-2xl -rotate-6 translate-y-4"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=400" 
                  alt="Product Bottle 2" 
                  className="w-1/2 h-auto object-contain drop-shadow-2xl rotate-6 -translate-y-4"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-[120px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar (Filters and Categories) */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-12">
            {/* Price Selector */}
            <div className="bg-white p-8 rounded-[12px] shadow-sm border border-gray-100">
              <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-8 text-left">Select Price</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-2 block text-left">Min</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="w-full bg-brand-offwhite border-none rounded-lg px-4 py-3 text-sm font-bold text-brand-gray focus:ring-2 focus:ring-brand-yellow"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                    </div>
                  </div>
                  <div className="w-6 h-[2px] bg-brand-yellow mt-8" />
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-2 block text-left">Max</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-full bg-brand-offwhite border-none rounded-lg px-4 py-3 text-sm font-bold text-brand-gray focus:ring-2 focus:ring-brand-yellow"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                    </div>
                  </div>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-brand-offwhite rounded-full appearance-none cursor-pointer accent-brand-yellow"
                  />
                </div>
              </div>
            </div>

            {/* Category Lists */}
            <div className="space-y-10 px-2">
              <div>
                <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-6 text-left border-b border-gray-100 pb-2">Skincare</h3>
                <ul className="space-y-4 text-left">
                  {['All Skincare', 'Cleansers', 'Moisturizers', 'Serums'].map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat === 'All Skincare' ? 'Skincare' : cat)}
                        className={`text-sm transition-all duration-300 flex items-center gap-2 ${
                          selectedCategory === cat || (cat === 'All Skincare' && selectedCategory === 'Skincare')
                            ? 'text-brand-gray font-bold translate-x-1' 
                            : 'text-gray-500 hover:text-brand-gray hover:translate-x-1'
                        }`}
                      >
                        <div className={`w-1 h-1 rounded-full ${selectedCategory === cat || (cat === 'All Skincare' && selectedCategory === 'Skincare') ? 'bg-brand-yellow' : 'bg-transparent'}`} />
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-6 text-left border-b border-gray-100 pb-2">Make-up</h3>
                <ul className="space-y-4 text-left">
                  {['All Makeup', 'Face', 'Eyes', 'Lips'].map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat === 'All Makeup' ? 'Makeup' : cat)}
                        className={`text-sm transition-all duration-300 flex items-center gap-2 ${
                          selectedCategory === cat || (cat === 'All Makeup' && selectedCategory === 'Makeup')
                            ? 'text-brand-gray font-bold translate-x-1' 
                            : 'text-gray-500 hover:text-brand-gray hover:translate-x-1'
                        }`}
                      >
                        <div className={`w-1 h-1 rounded-full ${selectedCategory === cat || (cat === 'All Makeup' && selectedCategory === 'Makeup') ? 'bg-brand-yellow' : 'bg-transparent'}`} />
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-6 text-left border-b border-gray-100 pb-2">Mens</h3>
                <ul className="space-y-4 text-left">
                  {['Shaving', 'Body Care', 'Fragrance'].map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-sm transition-all duration-300 flex items-center gap-2 ${
                          selectedCategory === cat 
                            ? 'text-brand-gray font-bold translate-x-1' 
                            : 'text-gray-500 hover:text-brand-gray hover:translate-x-1'
                        }`}
                      >
                        <div className={`w-1 h-1 rounded-full ${selectedCategory === cat ? 'bg-brand-yellow' : 'bg-transparent'}`} />
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recently Viewed (Sidebar) */}
            {recentlyViewed.length > 0 && (
              <div className="pt-12 border-t border-gray-100">
                <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-8 text-left flex items-center gap-2">
                  <Clock size={14} className="text-brand-yellow" /> Recently Viewed
                </h3>
                <div className="space-y-6">
                  {recentlyViewed.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-white rounded-xl p-3 border border-gray-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-all">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-left flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-brand-yellow uppercase tracking-wider mb-1">{product.category}</p>
                        <p className="text-xs font-semibold text-brand-gray line-clamp-2 group-hover:text-brand-yellow transition-colors leading-snug">{product.name}</p>
                        <p className="text-[10px] font-bold text-brand-gray mt-1">{product.price.toFixed(2)}€</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Grid Area */}
          <div className="flex-1">
            {/* Toolbar (Above the Grid) */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search our premium collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-offwhite border-none rounded-full pl-14 pr-8 py-3 text-sm focus:ring-2 focus:ring-brand-yellow transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select 
                      value="brands"
                      className="bg-brand-offwhite border-none rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest text-brand-gray focus:ring-2 focus:ring-brand-yellow cursor-pointer appearance-none pr-12"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '0.8rem' }}
                    >
                      <option value="brands">Brands</option>
                      <option value="brand1">Glow Lab</option>
                      <option value="brand2">Velvet Muse</option>
                    </select>
                  </div>

                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-brand-offwhite border-none rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest text-brand-gray focus:ring-2 focus:ring-brand-yellow cursor-pointer appearance-none pr-12"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '0.8rem' }}
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <select 
                    value={showCount}
                    onChange={(e) => setShowCount(Number(e.target.value))}
                    className="bg-brand-offwhite border-none rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest text-brand-gray focus:ring-2 focus:ring-brand-yellow cursor-pointer appearance-none pr-12"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '0.8rem' }}
                  >
                    <option value={12}>Show: 12</option>
                    <option value={24}>Show: 24</option>
                    <option value={48}>Show: 48</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.slice(0, showCount).map((product, i) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={i} 
                    searchQuery={searchQuery}
                    isActive={i === 0} // First card in grid shows active state
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[32px] border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-brand-offwhite rounded-full flex items-center justify-center mb-8 text-gray-200">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-brand-gray mb-3">No products found</h3>
                <p className="text-gray-400 max-w-xs text-center leading-relaxed">We couldn't find any products matching your current filters. Try adjusting your search or price range.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange({ min: 0, max: 200 });
                  }}
                  className="mt-10 px-10 py-4 bg-brand-yellow text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination / Load More */}
            {filteredProducts.length > showCount && (
              <div className="mt-20 flex justify-center">
                <button 
                  onClick={() => setShowCount(prev => prev + 12)}
                  className="px-12 py-4 border-2 border-brand-yellow text-brand-gray font-bold rounded-full hover:bg-brand-yellow hover:text-white transition-all duration-300"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
