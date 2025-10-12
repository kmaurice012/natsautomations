'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const mouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', mouseMove);
    document.body.addEventListener('mouseleave', mouseLeave);

    // Add hover effect to interactive elements
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button, .card-interactive, input, textarea');

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorVariant('hover'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(addHoverEffect, 1000);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.body.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 2.5,
    },
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor with enhanced visibility */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 opacity-30 blur-md animate-pulse" />

        {/* Main cursor ring */}
        <div className="w-full h-full rounded-full border-3 border-white mix-blend-difference shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* Enhanced cursor trail with glow */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-sm opacity-70" />
        {/* Core */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
      </motion.div>

      {/* Additional trailing particles */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999] bg-primary-400 rounded-full blur-[1px] opacity-60"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.2,
        }}
      />
    </>
  );
}
