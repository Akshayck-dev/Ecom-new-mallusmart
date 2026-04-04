import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { useLoadingStore } from '../store/loadingStore';

const isNativeApp = Capacitor.isNativePlatform();

export default function AppLoader() {
  const { isLoading, message } = useLoadingStore();

  // ONLY show on native platforms to hide heavy processing lag
  if (!isNativeApp || !isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#111111]/80 backdrop-blur-md pointer-events-auto"
      >
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer Glowing Ring */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-32 h-32 rounded-full border-2 border-vibrant-orange/20 shadow-[0_0_40px_rgba(249,115,22,0.1)]"
          />
          
          {/* Inner Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-20 h-20 rounded-full border-[3px] border-transparent border-t-vibrant-orange border-r-vibrant-orange/10"
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
            className="w-12 h-12 bg-vibrant-orange rounded-full shadow-2xl flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-2">
            {message}
          </p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 bg-vibrant-orange rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
