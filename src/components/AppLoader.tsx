import React from 'react';
import { motion } from 'framer-motion';

export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/10 backdrop-blur-sm pointer-events-auto">
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 rounded-full border-2 border-vibrant-orange/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        />
        
        {/* Inner Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-16 h-16 rounded-full border-[3px] border-transparent border-t-vibrant-orange border-r-vibrant-orange/30"
        />
        
        {/* Central Brand Pulse */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-10 h-10 bg-vibrant-orange rounded-full shadow-lg flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </motion.div>
      </div>
    </div>
  );
}
