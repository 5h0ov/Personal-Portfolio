'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import PillboxNav from '@/components/PillboxNav';
import { DotBackground } from '@/components/DotBackground';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // prevent scrolling while the welcome screen is visible
      document.body.style.overflow = 'auto';
    }, 3000); // duration of welcome screen (hardcoded lol)

    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto'; // this restores scroll on unmount
    };
  }, []);

  // memoize the main content to prevent unnecessary re-renders
  const mainContent = useMemo(() => (
    <DotBackground className="min-h-screen">
      {/* <BackgroundAnimation /> */}
      <PillboxNav />
      <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </DotBackground>
  ), []);

  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {loading && <WelcomeScreen />}
      </AnimatePresence>

      {!loading && mainContent}
    </div>
  );
}
