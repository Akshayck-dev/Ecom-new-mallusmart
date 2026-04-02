import React, { useState, useMemo, useEffect } from "react";
import { PRODUCTS } from "../constants";
import { AtelierProductCard } from "../components/AtelierProductCard";
import { ShopSidebar } from "../components/ShopSidebar";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

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
        
      return matchesCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen text-primary">
      {/* Sidebar Navigation */}
      <ShopSidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Page Content */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 w-full space-y-10 sm:space-y-16 lg:space-y-24">
          {/* Section Header */}
          <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-12 pb-10 border-b border-primary/5">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-secondary">Archive Collection</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-primary tracking-tighter leading-none uppercase">
                {selectedCategory === "All Products" ? "All Collections" : selectedCategory}
              </h1>
            </div>
            <p className="text-xs sm:text-sm font-medium italic text-on-surface-variant max-w-xs leading-relaxed">
              Curated by institutional standards, harvested with care, and authenticated by Kerala's leading homepreneurs.
            </p>
          </section>

          {/* Bento-style Grid (Responsive Columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
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
                  <AtelierProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-32 sm:py-48 text-center space-y-10">
              <div className="w-24 h-24 bg-surface rounded-[2rem] border border-primary/5 flex items-center justify-center mx-auto text-primary/10 shadow-premium">
                <Sparkles size={32} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight uppercase">No curated items found.</h2>
                <p className="text-sm font-medium italic text-on-surface-variant max-w-xs mx-auto">Try another collection or refine your search criteria.</p>
              </div>
              <button 
                onClick={() => setSelectedCategory("All Products")}
                className="btn-luxury px-12 py-5"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Space */}
        <footer className="mt-auto py-10 px-4 sm:px-8 lg:px-12 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-on-surface-variant/40">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">© 2026 Mallu's Mart • Authentically Crafted in Kerala</span>
          <div className="flex gap-8 sm:gap-12">
            <a className="text-[9px] uppercase tracking-[0.4em] font-bold hover:text-primary transition-colors" href="#">Privacy Protocol</a>
            <a className="text-[9px] uppercase tracking-[0.4em] font-bold hover:text-primary transition-colors" href="#">Service Terms</a>
          </div>
        </footer>
      </main>
    </div>
  );
}