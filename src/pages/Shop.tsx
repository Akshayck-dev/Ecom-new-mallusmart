import React, { useState, useMemo, useEffect } from "react";
import { CATEGORIES } from "../constants";
import { useProductStore } from "../store/productStore";
import { AtelierProductCard } from "../components/AtelierProductCard";
import { ModernSort } from "../components/ModernSort";
import { ShopSidebar } from "../components/ShopSidebar";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Shop() {
  const { products } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Featured");

  // Sync scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, sortBy]);

  // Helper check for "Healthy Kitchen" family logic (Persistent for card labels)
  const isHealthySearch = useMemo(() => {
    if (selectedCategory === "Healthy Kitchen") return true;
    const healthyKitchenSubcategories = CATEGORIES.find(c => c.name === "Healthy Kitchen")?.subcategories || [];
    return healthyKitchenSubcategories.includes(selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...products].filter((product) => {
      const matchesCategory = 
        selectedCategory === "All Products" || 
        product.category === selectedCategory ||
        product.parentCategory === selectedCategory;
        
      return matchesCategory;
    });

    // Apply Sorting
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest Arrivals":
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen text-primary">
      {/* Sidebar Navigation */}
      <ShopSidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen lg:pl-64">
        
        {/* Page Content */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-2 lg:py-4 w-full space-y-8 sm:space-y-12 lg:space-y-16">
          
          {/* Dynamic Category Section Title & Sorting - Desktop Only */}
          <div className="hidden lg:flex items-center justify-between mb-10 mt-10 border-b border-primary/5 pb-6">
            <h2 className="text-[10px] sm:text-xs text-primary font-bold tracking-[0.4em] uppercase">
              {selectedCategory === "All Products" ? "All Collections" : selectedCategory}
            </h2>

            {/* Modern Sorting Interface */}
            <div className="flex items-center gap-4">
              <ModernSort 
                options={[
                  "Featured", 
                  "Price: Low to High", 
                  "Price: High to Low", 
                  "Newest Arrivals"
                ]}
                value={sortBy}
                onChange={setSortBy}
                label="Sort By"
              />
            </div>
          </div>

          {/* Bento-style Grid (Responsive Columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AtelierProductCard 
                    product={product} 
                    showCategory={isHealthySearch} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-20 sm:py-32 text-center space-y-8">
              <div className="w-20 h-20 bg-surface rounded-2xl border border-primary/5 flex items-center justify-center mx-auto text-primary/10 shadow-premium">
                <Sparkles size={28} />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight uppercase">No curated items found.</h2>
                <p className="text-sm font-medium italic text-on-surface-variant max-w-xs mx-auto">Try another collection or refine your search criteria.</p>
              </div>
              <button 
                onClick={() => setSelectedCategory("All Products")}
                className="btn-luxury px-10 py-4"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Space */}
        <footer className="mt-auto py-8 px-4 sm:px-8 lg:px-12 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-on-surface-variant/40">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">© 2026 Mallu's Mart • Heritage Protocols</span>
          <div className="flex gap-8 sm:gap-12">
            <a className="text-[9px] uppercase tracking-[0.4em] font-bold hover:text-primary transition-colors font-medium italic" href="#">Privacy Protocol</a>
            <a className="text-[9px] uppercase tracking-[0.4em] font-bold hover:text-primary transition-colors font-medium italic" href="#">Service Terms</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
