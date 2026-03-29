import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function GlobalUI() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Custom Cursor */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full mix-blend-difference"
          animate={{
            x: mousePos.x - 16,
            y: mousePos.y - 16,
            scale: isHovering ? 2 : 1,
            backgroundColor: isHovering ? 'rgba(0, 89, 198, 0.1)' : 'transparent'
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
        />
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full"
          animate={{
            x: mousePos.x - 3,
            y: mousePos.y - 3,
            scale: isHovering ? 0 : 1
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.2 }}
        />
      </div>
    </>
  );
}
