import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { CATEGORIES } from "../constants";
import { motion, AnimatePresence } from "motion/react";

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
    <nav className="sticky top-20 z-40 bg-white border-b border-gray-100 flex items-center w-full px-2 py-4 relative mb-12">
      <div className="max-w-screen-2xl mx-auto w-full flex justify-between items-center gap-4">
        
        {/* Left side: Maximized Category Navigation (Single Line - No Scroll) */}
        <div className="flex-1 flex items-center gap-3 md:gap-5 pr-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("All Products")}
            className={`relative px-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 min-w-max pb-1 ${
              selectedCategory === "All Products" 
                ? "text-black" 
                : "text-gray-400 hover:text-black"
            }`}
          >
            All Products
            {selectedCategory === "All Products" && (
              <motion.div 
                layoutId="activeUnderlineClient" 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-black z-10"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            )}
          </button>

          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="relative group flex items-center">
              <button
                onClick={() => setSelectedCategory(cat.name)}
                className={`relative px-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1 min-w-max pb-1 ${
                  selectedCategory === cat.name 
                    ? "text-black" 
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {cat.name}
                {cat.subcategories.length > 0 && (
                  <ChevronDown size={8} strokeWidth={1.5} className={`transition-transform duration-500 group-hover:rotate-180 ${selectedCategory === cat.name ? "text-black" : "text-gray-300"}`} />
                )}
                {selectedCategory === cat.name && (
                  <motion.div 
                    layoutId="activeUnderlineClient" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black z-10"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
              </button>

              {/* Modern & Premium Mega-Menu Dropdown */}
              {cat.subcategories.length > 0 && (
                <div className="absolute top-full left-0 hidden group-hover:block z-50 pt-3 -translate-x-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl p-6 min-w-[220px]"
                  >
                    <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
                    
                    <div className="flex flex-col gap-3">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedCategory(sub)}
                          className={`text-left px-4 py-3 rounded-lg text-[11px] font-medium uppercase tracking-wider transition-all duration-300 ${
                            selectedCategory === sub
                              ? "bg-gray-50 text-black border-l-2 border-black pl-3"
                              : "text-gray-400 hover:text-black hover:bg-gray-50"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side: Compact Custom Sorting Dropdown */}
        <div className="flex-shrink-0 relative">
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-3 border border-gray-100 rounded-full px-5 py-2 hover:border-black transition-all group cursor-pointer shadow-sm bg-white min-w-[150px] justify-between"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest text-black">
                {sortBy === "Featured" ? "FEATURED" : sortBy.toUpperCase()}
              </span>
              <ChevronDown size={10} strokeWidth={1.5} className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Custom Floating Sorting Menu */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 mt-3 z-50 bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl p-4 min-w-[240px]"
                >
                  <div className="flex flex-col gap-1">
                    {[
                      "Featured",
                      "Price: Low to High",
                      "Price: High to Low",
                      "Newest Arrivals",
                      "Top Rated",
                      "A-Z"
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                          sortBy === option
                            ? "bg-gray-50 text-black shadow-sm"
                            : "text-gray-400 hover:text-black hover:bg-gray-50/50"
                        }`}
                      >
                        {option}
                        {sortBy === option && <Check size={10} strokeWidth={3} className="text-black" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};
