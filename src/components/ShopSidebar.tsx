import React from "react";
import { 
  Armchair, 
  Lightbulb, 
  Layers, 
  Flower2, 
  Utensils, 
  Sprout, 
  Settings, 
  HelpCircle,
  Plus,
  ChevronDown
} from "lucide-react";
import { ModernSort } from "./ModernSort";
import { CATEGORIES } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

interface ShopSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy?: string;
  setSortBy?: (sort: string) => void;
}

const ICON_MAP: Record<string, any> = {
  "Fashion Street": Armchair,
  "Healthy Kitchen": Utensils,
  "Natural Care Zone": Flower2,
  "Gift Corner": Layers,
  "Kids Zone": Sprout,
  "Service Zone": Lightbulb,
  "Pack Corner": Layers,
};

export function ShopSidebar({ 
  selectedCategory, 
  setSelectedCategory,
  sortBy,
  setSortBy 
}: ShopSidebarProps) {
  return (
    <aside className="
      lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:border-r lg:border-stone-200/30 lg:py-8 lg:px-6 
      sticky top-16 md:top-20 bg-surface z-40 w-full border-b border-stone-100 flex flex-col lg:overflow-y-auto
    ">
      {/* Mobile Tiered Navigation (Horizontal Scroll) */}
      <div className="lg:hidden bg-surface border-b border-primary/5 py-4">
        <div className="flex flex-col gap-4">
          
          {/* Header Area: Category Title & Sort */}
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-0.5">Browsing</span>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {selectedCategory === "All Products" ? "All Collections" : selectedCategory}
              </h2>
            </div>

            {/* Sticky Sort Dropdown for Mobile */}
            <div className="flex items-center gap-2">
              <ModernSort 
                options={["Featured", "Price: Low to High", "Price: High to Low", "Newest"]}
                value={sortBy || "Featured"}
                onChange={(val) => setSortBy?.(val)}
                label="Sort"
              />
              <button 
                onClick={() => setSelectedCategory("All Products")}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container border border-primary/5 text-primary/40 active:scale-95 transition-all"
              >
                <Plus size={16} className="rotate-45" />
              </button>
            </div>
          </div>
          
          {/* Primary Collections Scroll */}
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory items-center gap-3 px-4 pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name || cat.subcategories?.includes(selectedCategory);
              return (
                <button 
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex-none snap-center px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                      : "bg-surface-container-low text-on-surface/60 border-primary/5"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sub-categories Scroll (Conditional) */}
          <AnimatePresence>
            {CATEGORIES.map((cat) => {
              const isActiveParent = selectedCategory === cat.name || cat.subcategories?.includes(selectedCategory);
              if (!isActiveParent || !cat.subcategories || cat.subcategories.length === 0) return null;

              return (
                <motion.div 
                  key={`${cat.name}-subs`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory items-center gap-2 px-4 pt-1"
                >
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedCategory(sub)}
                      className={`flex-none snap-center px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap ${
                        selectedCategory === sub
                          ? "bg-secondary/10 text-secondary border-secondary/20 font-extrabold"
                          : "bg-surface text-on-surface/40 border-primary/5 hover:border-primary/10"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block space-y-8 mt-4 pt-16">
        <button 
          onClick={() => setSelectedCategory("All Products")}
          className={`flex items-center gap-3 px-2 mb-2 w-full text-left transition-colors ${
            selectedCategory === "All Products" ? "text-on-surface font-semibold" : "text-on-surface/60 hover:text-on-surface"
          }`}
        >
          <span className="text-[11px] uppercase tracking-widest font-extrabold">All Collections</span>
        </button>

        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.name] || Layers;
          const isActive = selectedCategory === cat.name || cat.subcategories?.includes(selectedCategory);

          return (
            <div key={cat.name} className="relative">
              {isActive && (
                <motion.div 
                  layoutId="sidebar-accent"
                  className="absolute -left-6 top-1.5 w-1 h-5 bg-secondary rounded-r-full" 
                />
              )}
              
              <button 
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-3 px-2 mb-2 w-full text-left transition-colors ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Icon size={18} className={isActive ? "text-secondary" : "text-on-surface-variant"} />
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold">{cat.name}</span>
              </button>
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="ml-9 space-y-2 overflow-hidden mb-6"
                  >
                    {cat.subcategories?.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedCategory(sub)}
                        className={`block text-xs w-full text-left transition-colors py-1.5 ${
                          selectedCategory === sub ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block mt-auto pt-8 border-t border-stone-200/50">
        <div className="space-y-4">
          <a className="flex items-center gap-3 px-2 text-on-surface/40 hover:text-on-surface transition-colors" href="#">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </a>
          <a className="flex items-center gap-3 px-2 text-on-surface/40 hover:text-on-surface transition-colors" href="#">
            <HelpCircle size={18} />
            <span className="text-sm font-medium">Support</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
