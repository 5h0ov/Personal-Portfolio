'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // throttle mouse move events to reduce GPU usage
  const throttledMouseMove = useCallback(
    (() => {
      let ticking = false;
      return (e: MouseEvent) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            ticking = false;
          });
          ticking = true;
        }
      };
    })(),
    []
  );

  useEffect(() => {
    const handleMouseMove = throttledMouseMove;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // check for interactive elements
      //  TODO: add more
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.onclick || 
          target.closest('button') || 
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.style.cursor === 'pointer' ||
          target.classList.contains('cursor-pointer')) {
        setCursorVariant('pointer');
      } else if (target.tagName === 'INPUT' || 
                 target.tagName === 'TEXTAREA' || 
                 target.contentEditable === 'true') {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [throttledMouseMove]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      scale: 1,
      backgroundColor: 'transparent',
    },
    pointer: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      scale: 1.5,
      backgroundColor: 'hsl(var(--accent))',
    },
    text: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      scale: 0.5,
      backgroundColor: 'transparent',
    },
  };

  return (
    <motion.div 
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-accent mix-blend-difference"
      variants={variants} 
      animate={cursorVariant}
    />
  );
};

export default CustomCursor; 