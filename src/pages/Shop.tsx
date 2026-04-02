import React, { useState, useMemo, useEffect } from "react";
import { PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { ShopHeader } from "../components/ShopHeader";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = 
        selectedCategory === "All Products" || 
        product.category === selectedCategory ||
        product.parentCategory === selectedCategory;
        
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.maker?.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Newest Arrivals":
          return b.id.localeCompare(a.id); // Assuming p12 is newer than p1
        case "Top Rated":
          return (b.rating || 0) - (a.rating || 0);
        case "A-Z":
          return a.name.localeCompare(b.name);
        default:
          return 0; // Featured / Default
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="pt-8 pb-32 px-6 md:px-12 max-w-7xl mx-auto bg-[#fcfcfc] min-h-screen">
      {/* Institutional Header: Cinematic Curation */}
      <header className="mb-20 text-center">
        <h1 className="text-7xl md:text-9xl font-serif italic text-black tracking-tighter leading-none mb-4">
          Shop
        </h1>
      </header>

      {/* Persistent Technical Navigation Header */}
      <ShopHeader 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        productsCount={filteredProducts.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Responsive Institutional Grid: 4-Column Curation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-40 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 text-black/10">
            <Sparkles size={40} />
          </div>
          <h3 className="text-2xl font-serif italic text-black mb-6">No treasures found in this zone.</h3>
          <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em]">Try another category or refine your search.</p>
          <button 
            onClick={() => setSelectedCategory("All Products")}
            className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-black underline underline-offset-8 hover:text-brand-green transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </main>
  );
}