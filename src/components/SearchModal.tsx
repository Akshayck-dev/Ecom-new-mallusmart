import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Dynamic Asset Resolver for Vite
  const getProductImage = (imagePath: string) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    if (imagePath.startsWith('http')) return imagePath;
    try {
      return new URL(`../assets/products/${imagePath}`, import.meta.url).href;
    } catch {
      return "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";
    }
  };

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
          <header className="w-full px-4 sm:px-8 lg:px-12 py-5 sm:py-8 flex items-center justify-between border-b border-primary/5 bg-white">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/" onClick={closeSearch} className="transition-opacity hover:opacity-70">
                <Logo size="28px" />
              </Link>
              <div className="hidden md:flex items-center gap-3 text-secondary bg-secondary/5 px-6 py-2.5 rounded-2xl border border-secondary/10">
                <Sparkles size={16} />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Discovery Protocol</span>
              </div>
            </div>
            <button
              onClick={closeSearch}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-500 border border-primary/5 hover:rotate-180"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar py-10 sm:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-full flex flex-col">
              {/* Search Input Area */}
              <div className="relative mb-10 sm:mb-16 group">
                <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/10 group-focus-within:text-secondary transition-all duration-700 w-6 h-6 sm:w-10 sm:h-10" />
                <input
                  autoFocus
                  type="text"
                  placeholder="In search of excellence..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-primary/5 focus:border-secondary outline-none py-4 sm:py-8 pl-10 sm:pl-16 text-xl sm:text-4xl lg:text-7xl font-semibold tracking-tighter placeholder:text-primary/5 transition-all duration-700 uppercase"
                />
                <div className="absolute bottom-0 left-0 h-px bg-secondary w-0 group-focus-within:w-full transition-all duration-1000" />
              </div>

              {/* Discovery Area */}
              <div className="flex-1 pb-16">
                {query ? (
                  <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="flex items-center justify-between mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-primary/5">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/40 italic">
                        Archival Matches • {results.length} Treasures
                      </h3>
                    </div>
                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
                        {results.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={closeSearch}
                            className="flex gap-4 sm:gap-6 group p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-surface hover:bg-white transition-all duration-500 border border-transparent hover:border-primary/5 hover:shadow-premium"
                          >
                            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-primary/5">
                              <img src={getProductImage(product.image)} alt={product.name} className="block w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            </div>
                            <div className="flex flex-col justify-center space-y-1">
                              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-secondary">
                                {product.category}
                              </p>
                              <h4 className="font-bold text-sm sm:text-base leading-tight text-primary uppercase tracking-tight group-hover:text-secondary transition-colors italic line-clamp-1">
                                {product.name}
                              </h4>
                              <p className="font-bold text-base sm:text-lg text-primary tracking-tighter">₹{product.price.toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 sm:py-32 text-center space-y-6">
                        <p className="text-xl sm:text-3xl font-bold text-primary uppercase tracking-tighter italic">No Treasures Identified</p>
                        <p className="text-primary/40 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-bold">
                          Explore "Handmade", "Traditional", or "Beauty"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 lg:gap-32">
                    {/* Recently Viewed */}
                    {recentProducts.length > 0 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-3">
                          <History size={16} className="text-secondary" />
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary italic">
                            Recently Explored
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {recentProducts.map((product) => (
                            <Link
                              key={product?.id}
                              to={`/product/${product?.id}`}
                              onClick={closeSearch}
                              className="flex items-center gap-6 p-5 rounded-2xl bg-surface hover:bg-white border border-transparent hover:border-primary/5 transition-all duration-500 group"
                            >
                              <img src={getProductImage(product?.image || '')} className="block w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm border border-primary/5" />
                              <div className="flex-1 space-y-1">
                                <p className="text-[8px] font-bold text-secondary uppercase tracking-[0.3em]">{product?.category}</p>
                                <p className="text-base font-bold text-primary uppercase tracking-tight italic">{product?.name}</p>
                              </div>
                              <ArrowRight size={18} className="text-primary/10 group-hover:text-secondary group-hover:translate-x-2 transition-all duration-500" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Categories */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <TrendingUp size={16} className="text-secondary" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary italic">
                          Primary Archives
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        {CATEGORIES.slice(0, 4).map((cat) => (
                          <Link
                            key={cat.name}
                            to="/shop"
                            onClick={closeSearch}
                            className="relative h-40 sm:h-48 rounded-2xl sm:rounded-[3rem] overflow-hidden group border border-primary/5 shadow-sm"
                          >
                            <img src={cat.image} alt={cat.name} className="block absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s]" />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/60 transition-all duration-700 flex items-end p-6 sm:p-8">
                              <span className="text-white font-bold uppercase tracking-[0.4em] text-[10px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                {cat.name}
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
