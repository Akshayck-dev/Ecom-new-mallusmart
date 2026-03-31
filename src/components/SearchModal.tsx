import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = useState('');
  
  // Reset query on close
  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = query.toLowerCase().split(' ');
    return PRODUCTS.filter(product => 
      searchTerms.every(term => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      )
    ).slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-white"
        >
          {/* Header */}
          <div className="max-w-7xl mx-auto px-8 md:px-12 py-12 flex flex-col h-full">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-8">
                <Link to="/" onClick={closeSearch}>
                  <img 
                    src={logo} 
                    alt="Mallu's Mart Logo" 
                    className="h-10 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="flex items-center gap-4 text-primary bg-primary/5 px-6 py-2 rounded-full">
                  <Sparkles size={18} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Global Search v1.0</span>
                </div>
              </div>
              <button
                onClick={closeSearch}
                className="w-12 h-12 rounded-full hover:bg-surface-container flex items-center justify-center transition-all hover:rotate-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search Input Area */}
            <div className="relative mb-20 group">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={40} />
              <input
                autoFocus
                type="text"
                placeholder="Search for perfection..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-surface-container focus:border-primary outline-none py-8 pl-16 text-4xl md:text-6xl font-black tracking-tight placeholder:text-surface-dim transition-all"
              />
            </div>

            {/* Results Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
              {query ? (
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                      Search Results ({results.length})
                    </h3>
                  </div>
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={closeSearch}
                          className="flex gap-6 group p-4 rounded-3xl hover:bg-surface-container/50 transition-all border border-transparent hover:border-outline-variant/10"
                        >
                          <div className="w-24 h-24 bg-surface-container rounded-2xl overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-1">
                              {product.category}
                            </p>
                            <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h4>
                            <p className="font-black text-sm">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-2xl font-bold text-on-surface-variant mb-4">No results found for "{query}"</p>
                      <p className="text-on-surface-variant/60">Try searching for "Serum", "Lipstick", or "Fragrance"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  {/* Trending Categories */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <TrendingUp size={16} className="text-primary" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                        Trending Categories
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {CATEGORIES.slice(0, 4).map((cat) => (
                        <Link
                          key={cat.name}
                          to="/shop"
                          onClick={closeSearch}
                          className="relative h-32 rounded-3xl overflow-hidden group"
                        >
                          <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                            <span className="text-white font-bold uppercase tracking-widest text-xs">{cat.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Featured Collections */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-8">
                      Featured Collections
                    </h3>
                    <div className="space-y-4">
                      {['Clean Beauty Essentials', 'The Fragrance Gallery', 'Midnight Bloom Series'].map((collection) => (
                        <Link
                          key={collection}
                          to="/shop"
                          onClick={closeSearch}
                          className="flex items-center justify-between p-6 rounded-3xl bg-surface-container/30 hover:bg-surface-container transition-all group"
                        >
                          <span className="font-bold">{collection}</span>
                          <ArrowRight size={18} className="-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
