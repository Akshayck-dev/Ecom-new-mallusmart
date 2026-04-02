import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight, TrendingUp, Sparkles, History, ShoppingBag } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { useHistoryStore } from '../store/historyStore';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import Logo from './Logo';

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
          className="fixed inset-0 z-[1000] bg-white flex flex-col"
        >
          {/* Header */}
          <header className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-16 flex items-center justify-between border-b border-primary/5 bg-white">
            <div className="flex items-center gap-10">
              <Link to="/" onClick={closeSearch} className="transition-opacity hover:opacity-70">
                <Logo />
              </Link>
              <div className="hidden sm:flex items-center gap-4 text-secondary bg-secondary/5 px-8 py-3 rounded-2xl border border-secondary/10">
                <Sparkles size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Global Discovery Protocol v1.0</span>
              </div>
            </div>
            <button
              onClick={closeSearch}
              className="w-14 h-14 rounded-full bg-surface hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-500 border border-primary/5 hover:rotate-180"
            >
              <X size={24} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-full flex flex-col">
              {/* Search Input Area */}
              <div className="relative mb-20 sm:mb-32 group">
                <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/10 group-focus-within:text-secondary transition-all duration-700" size={48} />
                <input
                  autoFocus
                  type="text"
                  placeholder="In search of excellence..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-primary/5 focus:border-secondary outline-none py-10 pl-20 text-4xl sm:text-6xl lg:text-8xl font-semibold tracking-tighter placeholder:text-primary/5 transition-all duration-700 uppercase"
                />
                <div className="absolute bottom-0 left-0 h-px bg-secondary w-0 group-focus-within:w-full transition-all duration-1000" />
              </div>

              {/* Discovery Area */}
              <div className="flex-1 pb-20">
                {query ? (
                  <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="flex items-center justify-between mb-12 sm:mb-16 pb-8 border-b border-primary/5">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary/40 italic">
                        Archival Matches • {results.length} Treasures Found
                      </h3>
                    </div>
                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                        {results.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={closeSearch}
                            className="flex gap-8 group p-6 rounded-[2.5rem] bg-surface hover:bg-white transition-all duration-500 border border-transparent hover:border-primary/5 hover:shadow-premium"
                          >
                            <div className="w-28 h-28 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-primary/5">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            </div>
                            <div className="flex flex-col justify-center space-y-2">
                              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary">
                                {product.category}
                              </p>
                              <h4 className="font-bold text-lg leading-tight text-primary uppercase tracking-tight group-hover:text-secondary transition-colors italic">
                                {product.name}
                              </h4>
                              <p className="font-semibold text-xl text-primary tracking-tighter">₹{product.price.toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-48 text-center space-y-8">
                        <p className="text-3xl sm:text-4xl font-bold text-primary uppercase tracking-tighter italic">No Treasures Identified</p>
                        <p className="text-primary/40 text-[10px] uppercase tracking-[0.4em] font-bold">
                          Suggestion: Explore "Kasavu", "Spices", or "Wellness"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 sm:gap-32 lg:gap-40">
                    {/* Recently Viewed */}
                    {recentProducts.length > 0 && (
                      <div className="space-y-12">
                        <div className="flex items-center gap-4">
                          <History size={18} className="text-secondary" />
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary italic">
                            Recently Explored
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                          {recentProducts.map((product) => (
                            <Link
                              key={product?.id}
                              to={`/product/${product?.id}`}
                              onClick={closeSearch}
                              className="flex items-center gap-8 p-6 rounded-3xl bg-surface hover:bg-white border border-transparent hover:border-primary/5 transition-all duration-500 group"
                            >
                              <img src={product?.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm border border-primary/5" />
                              <div className="flex-1 space-y-1">
                                <p className="text-[9px] font-bold text-secondary uppercase tracking-[0.3em]">{product?.category}</p>
                                <p className="text-lg font-bold text-primary uppercase tracking-tight italic">{product?.name}</p>
                              </div>
                              <ArrowRight size={20} className="text-primary/10 group-hover:text-secondary group-hover:translate-x-2 transition-all duration-500" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Categories */}
                    <div className="space-y-12">
                      <div className="flex items-center gap-4">
                        <TrendingUp size={18} className="text-secondary" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary italic">
                          Primary Archives
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-6 sm:gap-8">
                        {CATEGORIES.slice(0, 4).map((cat) => (
                          <Link
                            key={cat.name}
                            to="/shop"
                            onClick={closeSearch}
                            className="relative h-48 rounded-[3rem] overflow-hidden group border border-primary/5 shadow-sm"
                          >
                            <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s]" />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/60 transition-all duration-700 flex items-end p-8">
                              <span className="text-white font-bold uppercase tracking-[0.4em] text-[10px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                Discovery {cat.name}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
