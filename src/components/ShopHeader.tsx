import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShopHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  productsCount: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
  productsCount,
  sortBy,
  setSortBy
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All Products",
    "Fashion Street",
    "Healthy Kitchen",
    "Natural Care Zone",
    "Gift Corner",
    "Kids Zone",
    "Service Zone",
    "Pack Corner"
  ];

  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Arrivals"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-16 sm:top-20 z-[60] bg-white border-b border-gray-100 w-full mb-4 sm:mb-8">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center w-full px-4 py-3 gap-4">
        
        {/* 1. Mobile-Only Scrollable Categories */}
        <div className="flex md:hidden overflow-x-auto gap-3 py-1 no-scrollbar scroll-smooth flex-1 [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-[10px] tracking-widest font-medium border uppercase whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-black text-white border-black shadow-sm"
                  : "bg-white text-black border-gray-100 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2. Desktop-Only Static Categories */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center flex-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat
                  ? "text-black"
                  : "text-gray-300 hover:text-black font-semibold"
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div 
                  layoutId="activeShopCat"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 3. Unified Sorting & Counter */}
        <div className="flex-shrink-0 flex items-center gap-4 ml-4">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 whitespace-nowrap tracking-widest uppercase">
            {productsCount} TREASURES
          </span>

          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-100 rounded-full hover:border-black transition-all group shadow-sm bg-white"
            >
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black">
                {sortBy === "Featured" ? "SORT BY" : sortBy.toUpperCase()}
              </span>
              <ChevronDown size={10} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute top-full right-0 mt-2 z-50 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl p-2 min-w-[200px]"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                        sortBy === option
                          ? "bg-gray-50 text-black shadow-sm"
                          : "text-gray-400 hover:text-black hover:bg-gray-50/50"
                      }`}
                    >
                      {option}
                      {sortBy === option && <Check size={12} strokeWidth={3} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};
