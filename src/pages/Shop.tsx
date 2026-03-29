import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronRight, X, ShoppingCart, ArrowRight, Check, Clock, Star } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { ProductCardSkeleton } from '../components/Skeleton';

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/5 text-primary font-bold rounded-sm px-0.5 transition-colors group-hover:bg-primary/20">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [selectedColor, setSelectedColor] = useState('All Colors');
  const [selectedArtisan, setSelectedArtisan] = useState('All Artisans');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

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

  const categories = [
    { name: 'All Products', count: PRODUCTS.length },
    { name: 'Home Decor', count: PRODUCTS.filter(p => p.category === 'HOME DECOR').length },
    { name: 'Kitchenware', count: PRODUCTS.filter(p => p.category === 'HEALTHY KITCHEN').length },
    { name: 'Stationery', count: 0 },
    { name: 'Textiles', count: 0 },
    { name: 'Audio Curation', count: PRODUCTS.filter(p => p.category === 'AUDIO CURATION').length },
    { name: 'Timeless Series', count: PRODUCTS.filter(p => p.category === 'TIMELESS SERIES').length },
    { name: 'Living Space', count: PRODUCTS.filter(p => p.category === 'LIVING SPACE').length },
    { name: 'Natural Care', count: PRODUCTS.filter(p => p.category === 'NATURAL CARE').length },
    { name: 'Accessories', count: PRODUCTS.filter(p => p.category === 'ACCESSORIES').length },
    { name: 'Footwear', count: PRODUCTS.filter(p => p.category === 'FOOTWEAR').length },
  ].filter(cat => cat.count > 0 || cat.name === 'All Products');

  const materials = useMemo(() => ['All Materials', ...Array.from(new Set(PRODUCTS.map(p => p.material).filter(Boolean)))], []);
  const colors = useMemo(() => ['All Colors', ...Array.from(new Set(PRODUCTS.map(p => p.color).filter(Boolean)))], []);
  const artisans = useMemo(() => ['All Artisans', ...Array.from(new Set(PRODUCTS.map(p => p.artisan).filter(Boolean)))], []);

  const handleMaterialChange = (material: string) => {
    if (material === selectedMaterial) return;
    setIsLoading(true);
    setSelectedMaterial(material);
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleColorChange = (color: string) => {
    if (color === selectedColor) return;
    setIsLoading(true);
    setSelectedColor(color);
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleArtisanChange = (artisan: string) => {
    if (artisan === selectedArtisan) return;
    setIsLoading(true);
    setSelectedArtisan(artisan);
    setTimeout(() => setIsLoading(false), 600);
  };

  const clearAllFilters = () => {
    setIsLoading(true);
    setSelectedCategory('All Products');
    setSelectedMaterial('All Materials');
    setSelectedColor('All Colors');
    setSelectedArtisan('All Artisans');
    setPriceRange([0, 1500]);
    setMinRating(0);
    setOnlyInStock(false);
    setSearchQuery('');
    setTimeout(() => setIsLoading(false), 800);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All Products' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesMaterial = selectedMaterial === 'All Materials' || product.material === selectedMaterial;
      const matchesColor = selectedColor === 'All Colors' || product.color === selectedColor;
      const matchesArtisan = selectedArtisan === 'All Artisans' || product.artisan === selectedArtisan;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = (product.rating || 0) >= minRating;
      const matchesStock = !onlyInStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesMaterial && matchesColor && matchesArtisan && matchesPrice && matchesRating && matchesStock;
    });
  }, [searchQuery, selectedCategory, selectedMaterial, selectedColor, selectedArtisan, priceRange, minRating, onlyInStock]);

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
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-display-md mb-4">Curated <span className="text-primary">Essentials.</span></h1>
          <p className="text-on-surface-variant max-w-xl leading-relaxed">
            A deliberate collection of artisan goods and daily necessities, selected for their quality, heritage, and timeless design.
          </p>
        </div>
        
        <div className="relative w-full md:w-80" ref={searchRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addToRecentSearches(searchQuery);
                setIsSearchFocused(false);
              }
            }}
            className="w-full bg-surface-container-low border-none rounded-full py-4 pl-12 pr-12 text-sm focus:ring-1 focus:ring-primary/20 shadow-sm transition-all"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isSearchFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50"
              >
                <div className="p-2">
                  {suggestions.map((item: any, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.type === 'category') {
                          setSelectedCategory(item.name);
                          setSearchQuery('');
                        } else {
                          setSearchQuery(item.name);
                          addToRecentSearches(item.name);
                        }
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-surface-container transition-colors text-left group rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:bg-white group-hover:text-primary transition-all overflow-hidden border border-transparent group-hover:border-outline-variant/10">
                        {item.type === 'category' ? (
                          <Filter size={16} />
                        ) : item.type === 'recent' ? (
                          <Clock size={16} />
                        ) : (
                          <Search size={16} />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                          <Highlight text={item.name} query={searchQuery} />
                        </p>
                        {item.type === 'product' ? (
                          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">{item.category}</p>
                        ) : item.type === 'category' ? (
                          <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Category</p>
                        ) : (
                          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Recent Search</p>
                        )}
                      </div>
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        {item.type === 'product' ? (
                          <div className="absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-sm border border-outline-variant/20">
                            <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary/0 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                            <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {hasMoreSuggestions && (
                    <button
                      onClick={() => {
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 p-4 mt-1 border-t border-outline-variant/10 text-primary hover:bg-primary/5 transition-colors font-bold text-[10px] uppercase tracking-widest rounded-b-xl"
                    >
                      View All {suggestionsData.total} Results
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Filters</h3>
            {(selectedCategory !== 'All Products' || selectedMaterial !== 'All Materials' || selectedColor !== 'All Colors' || selectedArtisan !== 'All Artisans' || priceRange[0] > 0 || priceRange[1] < 1500 || minRating > 0 || onlyInStock || searchQuery) && (
              <button 
                onClick={clearAllFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-on-background transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Category</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li 
                  key={cat.name} 
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`flex justify-between items-center group cursor-pointer ${selectedCategory === cat.name ? 'text-primary' : ''}`}
                >
                  <span className={`text-sm transition-colors ${selectedCategory === cat.name ? 'font-bold' : 'text-on-surface-variant group-hover:text-primary'}`}>{cat.name}</span>
                  <span className="text-xs font-bold text-outline-variant">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Material</h3>
            <ul className="space-y-3">
              {materials.map((mat) => (
                <li 
                  key={mat} 
                  onClick={() => handleMaterialChange(mat)}
                  className={`flex items-center gap-2 group cursor-pointer ${selectedMaterial === mat ? 'text-primary' : ''}`}
                >
                  <div className={`w-3 h-3 rounded-full border transition-all ${selectedMaterial === mat ? 'bg-primary border-primary' : 'border-outline-variant group-hover:border-primary'}`}></div>
                  <span className={`text-sm transition-colors ${selectedMaterial === mat ? 'font-bold' : 'text-on-surface-variant group-hover:text-primary'}`}>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    selectedColor === color 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:border-primary hover:text-primary'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Artisan</h3>
            <ul className="space-y-3">
              {artisans.map((art) => (
                <li 
                  key={art} 
                  onClick={() => handleArtisanChange(art)}
                  className={`flex items-center gap-2 group cursor-pointer ${selectedArtisan === art ? 'text-primary' : ''}`}
                >
                  <div className={`w-3 h-3 rounded-full border transition-all ${selectedArtisan === art ? 'bg-primary border-primary' : 'border-outline-variant group-hover:border-primary'}`}></div>
                  <span className={`text-sm transition-colors ${selectedArtisan === art ? 'font-bold' : 'text-on-surface-variant group-hover:text-primary'}`}>{art}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Price Range</h3>
            <div className="space-y-4">
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
                className="w-full accent-primary h-1 bg-surface-container-highest rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                <span>$0</span>
                <span>Up to ${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Minimum Rating</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(star)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
                    minRating === star 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:border-primary hover:text-primary'
                  }`}
                >
                  {star}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Availability</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  onlyInStock ? 'bg-primary border-primary' : 'border-outline-variant group-hover:border-primary'
                }`}
              >
                {onlyInStock && <Check size={12} className="text-white" />}
              </div>
              <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{filteredProducts.length}</span> products
              {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
            </div>
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span className="font-bold text-on-surface">Sort by:</span>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-surface-container-low group/card">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                      {product.tag && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          {product.tag}
                        </div>
                      )}
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={addingId === product.id}
                      className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 ${addingId === product.id ? 'bg-green-500 text-white opacity-100 translate-y-0' : 'bg-white text-on-background hover:bg-primary hover:text-white'}`}
                      title="Add to Cart"
                    >
                      {addingId === product.id ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      <Highlight text={product.category} query={searchQuery} />
                    </p>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                      <Highlight text={product.name} query={searchQuery} />
                    </h3>
                    <p className="text-on-surface font-bold">${product.price.toFixed(2)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-on-surface-variant">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-on-surface-variant">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Products'); }}
                className="mt-8 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-20 flex justify-center items-center gap-4">
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container transition-colors">
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold">1</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors font-bold">2</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors font-bold">3</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
