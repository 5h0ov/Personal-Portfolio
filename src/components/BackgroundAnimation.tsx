'use client';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useInView } from '@/lib/hooks/useInView';

const BackgroundAnimation = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  // memoize grid lines to avoid recalculation
  const gridLines = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: (i*7) % 100, // increased spacing between lines
      y: (i*7) % 100,
      delay: Math.random() * 3,
    }));
  }, []);

  // this will get overlayed on the dot background
  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0">
        {/* vertical lines */}
        {gridLines.map((line) => (
          <motion.div
            key={`v-${line.id}`}
            className="absolute top-0 w-px h-full bg-border/20"
            style={{
              left: `${line.x}%`,
            }}
            animate={isInView ? {
              opacity: [0.1, 0.4, 0.1],
              scaleY: [0.7, 1, 0.7],
            } : {
              opacity: 0.1,
              scaleY: 0.7,
            }}
            transition={{
              duration: 6,
              repeat: isInView ? Infinity : 0,
              delay: line.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* horizontal lines */}
        {gridLines.map((line) => (
          <motion.div
            key={`h-${line.id}`}
            className="absolute left-0 h-px w-full bg-border/20"
            style={{
              top: `${line.y}%`,
            }}
            animate={isInView ? {
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.7, 1, 0.7],
            } : {
              opacity: 0.1,
              scaleX: 0.7,
            }}
            transition={{
              duration: 6,
              repeat: isInView ? Infinity : 0,
              delay: line.delay + 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/*  some floating dots idk */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-accent/30 rounded-full"
          style={{
            left: `${15 + (i * 12)}%`,
            top: `${25 + (i * 8)}%`,
          }}
          animate={isInView ? {
            y: [0, -40, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1.2, 0],
          } : {
            y: 0,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 8,
            repeat: isInView ? Infinity : 0,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* some geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-12 h-12 border border-accent/20"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={isInView ? {
          rotate: [0, 360],
        } : {
          rotate: 0,
        }}
        transition={{
          duration: 15,
          repeat: isInView ? Infinity : 0,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-10 h-10 border border-muted-foreground/20 rounded-full"
        animate={isInView ? {
          scale: [1, 1.3, 1],
        } : {
          scale: 1,
        }}
        transition={{
          duration: 10,
          repeat: isInView ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-8 h-8 border border-accent/15"
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
        animate={isInView ? {
          rotate: [0, -360],
          y: [0, -20, 0],
        } : {
          rotate: 0,
          y: 0,
        }}
        transition={{
          duration: 18,
          repeat: isInView ? Infinity : 0,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/3 w-6 h-6 border border-muted-foreground/15"
        style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
        animate={isInView ? {
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        } : {
          rotate: 0,
          scale: 1,
        }}
        transition={{
          duration: 12,
          repeat: isInView ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;