import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCcw, ShieldAlert, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

interface ConnectivityGuardProps {
  children: React.ReactNode;
}

const isNativeApp = Capacitor.isNativePlatform();

export default function ConnectivityGuard({ children }: ConnectivityGuardProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!isNativeApp) return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Anti-Flicker Logic
  useEffect(() => {
    if (!isNativeApp) return;

    let timer: NodeJS.Timeout;

    if (!isOnline) {
      // Delay showing the "No Internet" overlay to prevent flickers
      timer = setTimeout(() => {
        setShowOverlay(true);
      }, 500);
    } else {
      // Immediately hide the overlay when back online
      setShowOverlay(false);
    }

    return () => clearTimeout(timer);
  }, [isOnline]);

  if (!isNativeApp) {
    return <>{children}</>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[20000] bg-[#111111] flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Immersive Background Grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-100">
               <div className="absolute inset-0 bg-repeat bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] animate-grain" />
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vibrant-orange/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div variants={itemVariants} className="mb-10 relative">
              <div className="w-28 h-28 bg-vibrant-orange/10 rounded-full flex items-center justify-center border border-vibrant-orange/20 shadow-glow shadow-vibrant-orange/10 relative group overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 cursor-default">
                <WifiOff className="text-vibrant-orange w-10 h-10 relative z-10" strokeWidth={1.5} />
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0, 0.1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-vibrant-orange rounded-full"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 mb-12">
              <h2 className="text-3xl font-black uppercase tracking-[0.4em] text-white leading-tight">
                No Internet
              </h2>
              <div className="h-0.5 w-16 bg-vibrant-orange/40 mx-auto rounded-full" />
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] leading-loose max-w-xs mx-auto">
                Mallu's Mart requires a persistent connection to synchronize your artisanal catalog.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => window.location.reload()}
                className="group relative flex items-center gap-4 bg-vibrant-orange text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-700 hover:shadow-2xl hover:shadow-vibrant-orange/40 active:scale-95 shadow-xl shadow-vibrant-orange/20"
              >
                <RefreshCcw size={18} className="transition-transform duration-700 group-hover:rotate-180" />
                Retry Sync
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="absolute bottom-12 flex flex-col items-center gap-3 opacity-20"
            >
              <ShieldAlert size={18} className="text-white" />
              <p className="text-[8px] font-bold text-white uppercase tracking-[0.4em]">Capacitor Network Core v2.4</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {children}
    </>
  );
}
