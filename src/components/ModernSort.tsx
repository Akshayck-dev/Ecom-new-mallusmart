import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModernSortProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function ModernSort({ 
  options, 
  value, 
  onChange, 
  label = "Sort", 
  className = "" 
}: ModernSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 bg-surface-container-low border border-primary/5 px-4 py-2 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface hover:bg-surface-container hover:border-primary/20 transition-all active:scale-95"
      >
        <span className="text-on-surface/40 font-black">{label}:</span>
        <span className="text-primary">{value}</span>
        <ChevronDown 
          size={14} 
          className={`text-on-surface/40 group-hover:text-primary transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-premium z-[100] overflow-hidden py-2"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-between group ${
                  value === option 
                    ? "text-primary bg-primary/5" 
                    : "text-on-surface/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {option}
                {value === option && (
                  <motion.div 
                    layoutId="active-sort-dot"
                    className="w-1.5 h-1.5 rounded-full bg-secondary shadow-sm"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
