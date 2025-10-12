'use client';
import { motion } from 'motion/react';

export const WelcomeScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">

      {/* simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        className="relative z-10 text-center"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-black text-foreground mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Portfolio Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}; 