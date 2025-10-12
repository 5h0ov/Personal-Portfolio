'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const emojis = ['☕', '💻', '💖'];

const Footer = () => {
   const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentEmojiIndex((prev) => (prev + 1) % emojis.length);
      }, 2000);

      return () => clearInterval(interval);
   }, []);

   return (
      <footer className="pb-8 pt-6 bg-transparent">
         <div className="container mx-auto px-6">
            <p className="text-center text-muted-foreground flex items-center justify-center gap-2">
               Made with
               <AnimatePresence mode="wait">
                  <motion.span
                     key={currentEmojiIndex}
                     initial={{ opacity: 0, y: 20, scale: 0 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -20, scale: 0 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                     className="inline-block text-lg"
                  >
                     {emojis[currentEmojiIndex]}
                  </motion.span>
               </AnimatePresence>
               by Shuvadipta Das
            </p>
         </div>
      </footer>
   );
};

export default Footer;

