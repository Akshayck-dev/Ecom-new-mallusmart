import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCcw, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

interface ConnectivityGuardProps {
  children: React.ReactNode;
}

const isNativeApp = Capacitor.isNativePlatform();

export default function ConnectivityGuard({ children }: ConnectivityGuardProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // If not a native app, don't enforce the connectivity guard
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

  // Bypass for non-native platforms
  if (!isNativeApp) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[20000] bg-[#111111] flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Background Grain/Noise for Premium Feel */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-100">
               <div className="absolute inset-0 bg-repeat bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] animate-grain" />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="w-24 h-24 bg-vibrant-orange/10 rounded-full flex items-center justify-center mb-8 mx-auto border border-vibrant-orange/20 shadow-glow shadow-vibrant-orange/10">
                <WifiOff className="text-vibrant-orange w-10 h-10" />
              </div>

              <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white mb-4">
                No Internet
              </h2>
              
              <div className="h-0.5 w-12 bg-vibrant-orange/40 mx-auto rounded-full mb-6" />

              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto mb-10">
                Please check your network settings. Mallu's Mart requires an active connection to serve you.
              </p>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-3 bg-white text-[#111111] px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-vibrant-orange hover:text-white transition-all duration-500 active:scale-95 shadow-xl shadow-white/5"
              >
                <RefreshCcw size={16} />
                Retry Connection
              </button>
            </motion.div>

            {/* Platform Integrity Stamp */}
            <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-20">
              <ShieldAlert size={16} className="text-white" />
              <p className="text-[8px] font-bold text-white uppercase tracking-[0.4em]">Capacitor Network Protocol v2.1</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
          If offline, we still render children but behind the overlay.
          This prevents unmounting/mounting issues once connection is restored.
      */}
      {children}
    </>
  );
}
