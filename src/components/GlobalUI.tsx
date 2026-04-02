import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { OrderModal } from './OrderModal';
import { QuickViewModal } from './QuickViewModal';
import { useQuickViewStore } from '../store/quickViewStore';

export default function GlobalUI() {
  const { scrollYProgress } = useScroll();
  const { selectedProductId, closeQuickView } = useQuickViewStore();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <CartDrawer />
      <SearchModal />
      <OrderModal />
      <QuickViewModal productId={selectedProductId} onClose={closeQuickView} />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] contrast-150 brightness-100">
        <div className="absolute inset-0 bg-repeat bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] animate-grain" />
      </div>
    </>
  );
}
