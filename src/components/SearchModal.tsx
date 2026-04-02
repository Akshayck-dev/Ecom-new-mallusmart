import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight, TrendingUp, Sparkles, History, ShoppingBag } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { useHistoryStore } from '../store/historyStore';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useSearchStore();
  const { viewedIds } = useHistoryStore();
  const [query, setQuery] = useState('');

  const recentProducts = useMemo(() => {
    return viewedIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4);
  }, [viewedIds]);
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

            {/* Results Grid / Discovery Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
              {query ? (
                <div>
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-neutral-100">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                      Discovery Results ({results.length})
                    </h3>
                  </div>
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={closeSearch}
                          className="flex gap-6 group p-6 rounded-[2.5rem] bg-neutral-50 hover:bg-white transition-all border border-transparent hover:border-neutral-100 hover:shadow-xl hover:shadow-black/5"
                        >
                          <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#A68900] mb-2">
                              {product.category}
                            </p>
                            <h4 className="font-bold text-base leading-tight mb-2 group-hover:text-black transition-colors uppercase tracking-tight">
                              {product.name}
                            </h4>
                            <p className="font-black text-sm text-black">₹{product.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-32 text-center fade-up">
                      <p className="text-xl font-bold text-black mb-4 uppercase tracking-tighter">No Treasures Found</p>
                      <p className="text-neutral-400 text-[10px] uppercase tracking-widest leading-relaxed">
                        Try searching for "Snacks", "Fashion", or "Honey"
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                  {/* Recently Viewed - Dynamic */}
                  {recentProducts.length > 0 && (
                    <div className="fade-up">
                      <div className="flex items-center gap-3 mb-10">
                        <History size={16} className="text-black" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
                          Recently Explored
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {recentProducts.map((product) => (
                          <Link
                            key={product?.id}
                            to={`/product/${product?.id}`}
                            onClick={closeSearch}
                            className="flex items-center gap-6 p-4 rounded-3xl bg-neutral-50 hover:bg-white border border-transparent hover:border-neutral-100 transition-all group"
                          >
                            <img src={product?.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                            <div className="flex-1">
                              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{product?.category}</p>
                              <p className="text-sm font-bold text-black uppercase tracking-tight">{product?.name}</p>
                            </div>
                            <ArrowRight size={14} className="text-neutral-200 group-hover:text-black group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Categories - Refined */}
                  <div className="fade-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-3 mb-10">
                      <TrendingUp size={16} className="text-black" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
                        Top Collections
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {CATEGORIES.slice(0, 4).map((cat) => (
                        <Link
                          key={cat.name}
                          to="/shop"
                          onClick={closeSearch}
                          className="relative h-40 rounded-[2rem] overflow-hidden group border border-neutral-100"
                        >
                          <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors flex items-end p-6">
                            <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                              Discover {cat.name}
                            </span>
                          </div>
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
