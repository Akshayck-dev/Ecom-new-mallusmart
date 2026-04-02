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
  Plus
} from "lucide-react";
import { CATEGORIES } from "../constants";

interface ShopSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ICON_MAP: Record<string, any> = {
  "Fashion Street": Armchair, // Mapping to reference categories
  "Healthy Kitchen": Utensils,
  "Natural Care Zone": Flower2,
  "Gift Corner": Layers,
  "Kids Zone": Sprout,
  "Service Zone": Lightbulb,
  "Pack Corner": Layers,
};

export function ShopSidebar({ selectedCategory, setSelectedCategory }: ShopSidebarProps) {
  return (
    <aside className="
      lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:border-r lg:border-stone-200/30 lg:py-8 lg:px-6 
      sticky top-16 md:top-20 bg-surface z-40 w-full border-b border-stone-100 flex flex-col lg:overflow-y-auto
    ">
      {/* Mobile Category Picker */}
      <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-4 px-4 py-3 items-center">
        <button 
          onClick={() => setSelectedCategory("All Products")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
            selectedCategory === "All Products" ? "bg-on-surface text-surface" : "bg-surface-container text-on-surface/60"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              selectedCategory === cat.name || cat.subcategories?.includes(selectedCategory)
                ? "bg-on-surface text-surface" 
                : "bg-surface-container text-on-surface/60"
            }`}
          >
            {cat.name}
          </button>
        ))}
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
              {/* Active Indicator Accent */}
              {isActive && (
                <div className="absolute -left-6 top-1.5 w-1 h-5 bg-secondary rounded-r-full" />
              )}
              
              <button 
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-3 px-2 mb-2 w-full text-left transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Icon size={18} className={isActive ? "text-secondary" : "text-on-surface-variant"} />
                <span className="text-[11px] uppercase tracking-widest font-bold">{cat.name}</span>
              </button>
              
              <div className="ml-9 space-y-2">
                {cat.subcategories?.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedCategory(sub)}
                    className={`block text-xs w-full text-left transition-colors ${
                      selectedCategory === sub ? "text-primary font-medium" : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
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
