import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Leaf } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 1000); // Wait for fade out
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10001] bg-[#111111] flex flex-col items-center justify-center p-8 selection:bg-vibrant-orange/10 selection:text-vibrant-orange"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vibrant-orange/10 blur-[100px] rounded-full" />
          
          <div className="relative flex flex-col items-center text-center">
            {/* Minimal Brand Symbol */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 bg-vibrant-orange rounded-3xl flex items-center justify-center shadow-2xl shadow-vibrant-orange/20 mb-8"
            >
              <Leaf className="text-white" size={40} strokeWidth={2.5} />
            </motion.div>
            
            {/* Brand Identity */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-white font-headline">
                Mallu's Mart
              </h1>
              <div className="h-0.5 w-12 bg-vibrant-orange/40 mx-auto rounded-full" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 leading-loose">
                From Local Hands to Your Home
              </p>
            </motion.div>
          </div>

          {/* Institutional Integrity Stamp */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute bottom-12 flex flex-col items-center gap-3"
          >
            <ShieldCheck size={20} className="text-white" />
            <p className="text-[8px] font-bold text-white uppercase tracking-[0.4em]">Operational Unity v4.8</p>
          </motion.div>
          
          {/* Bottom Progress Indicatior */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-vibrant-orange/30"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
