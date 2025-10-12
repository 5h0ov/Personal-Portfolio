'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useInView } from '@/lib/hooks/useInView';
import GradientText from './GradientText';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.section
      ref={ref}
      id="about"
      className="flex min-h-screen items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto flex flex-col items-center px-6 md:flex-row md:justify-between">
        <motion.div className="mb-10 text-center md:mb-0 md:w-1/2 md:text-left" variants={itemVariants}>
          <motion.div className="mb-4 text-5xl font-black md:text-7xl" variants={itemVariants}>
            <GradientText
              colors={['#ff6b35', '#f7931e', '#ff6b35', '#f7931e', '#ff6b35']}
              animationSpeed={4}
              className="text-5xl md:text-7xl font-black"
            >
              Shuvadipta Das
            </GradientText>
          </motion.div>
          <motion.p className="mb-6 text-xl text-muted-foreground" variants={itemVariants}>
            {/* Based in India */} Full Stack Developer
          </motion.p>
          <motion.p className="max-w-md text-lg leading-relaxed text-muted-foreground/80" variants={itemVariants}>
            I'm a passionate developer creating modern and responsive web applications. I love turning complex problems into simple, beautiful, and intuitive designs.
          </motion.p>
        </motion.div>
        <motion.div className="relative h-80 w-80 md:h-96 md:w-96" variants={imageVariants}>
          <Image
            src="/profile.jpg"
            alt="Shuvadipta Das"
            fill
            className="rounded-full shadow-2xl shadow-accent/20 object-cover"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero; 