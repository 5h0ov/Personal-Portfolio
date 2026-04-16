"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PillboxNav from "@/components/PillboxNav";
import ScrollProgress from "@/components/ScrollProgress";
import { DotBackground } from "@/components/DotBackground";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  const handleTerminalDone = useCallback(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const mainContent = useMemo(
    () => (
      <DotBackground className="min-h-screen">
        <ScrollProgress />
        <PillboxNav />
        <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </DotBackground>
    ),
    []
  );

  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {loading && <WelcomeScreen onDone={handleTerminalDone} />}
      </AnimatePresence>
      {!loading && mainContent}
    </div>
  );
}
