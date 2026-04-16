"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import projectsData from "@/lib/data/projects.json";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import TiltCard from "@/components/TiltCard";

const MAX_VISIBLE_TAGS = 4;

const TechTags = ({ techs }: { techs: string[] }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const visible = techs.slice(0, MAX_VISIBLE_TAGS);
  const remaining = techs.slice(MAX_VISIBLE_TAGS);

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tech) => (
        <span
          key={tech}
          className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
        >
          {tech}
        </span>
      ))}
      {remaining.length > 0 && (
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="inline-flex cursor-default items-center rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            +{remaining.length}
          </span>
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 z-[100003] mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="flex flex-wrap gap-1.5">
                  {remaining.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-neutral-800" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedProject =
    selectedIndex !== null ? projectsData[selectedIndex] : null;

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % projectsData.length);
  }, [selectedIndex]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + projectsData.length) % projectsData.length
    );
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeModal, goNext, goPrev]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-neutral-100 py-24 dark:bg-neutral-900/50"
    >
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-black text-foreground md:text-5xl">
          Selected Works
        </h2>

        <BentoGrid className="mx-auto max-w-7xl">
          {projectsData.map((project, index) => {
            const isLarge = index % 3 === 0 || index % 6 === 0;
            return (
              <TiltCard
                key={index}
                className={isLarge ? "md:col-span-8" : "md:col-span-4"}
                maxTilt={5}
                scale={1.01}
              >
                <BentoGridItem
                  title={project.title}
                  description={project.description}
                  header={
                    <button
                      type="button"
                      className="group relative h-48 w-full cursor-none overflow-hidden rounded-xl md:h-64"
                      onClick={() => setSelectedIndex(index)}
                    >
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-4 left-4 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                          View Project
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white backdrop-blur-md">
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </button>
                  }
                  icon={
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider dark:border-neutral-700 dark:bg-neutral-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  }
                />
              </TiltCard>
            );
          })}
        </BentoGrid>

        <AnimatePresence mode="wait">
          {selectedIndex !== null && selectedProject && (
            <motion.div
              key={selectedIndex}
              className="fixed inset-0 z-[100000] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              />

              {/* Nav arrows - OUTSIDE the card */}
              {projectsData.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-2 z-[100002] top-14 md:-translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-accent hover:scale-110 md:left-45 md:p-3"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-2 z-[100002] top-14 md:-translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-accent hover:scale-110 md:right-45 md:p-3"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Project counter - OUTSIDE the card */}
              <div className="absolute bottom-2 left-1/2 z-[100002] -translate-x-1/2 font-mono text-xs text-white/40 md:-bottom-7">
                {selectedIndex + 1} / {projectsData.length}
              </div>

              <motion.div
                className="relative z-[100001] flex w-full max-w-5xl flex-col rounded-2xl border border-neutral-200 bg-card shadow-2xl dark:border-neutral-800 md:max-h-[85vh] md:flex-row"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button - top right */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-accent"
                >
                  <X size={18} />
                </button>

                {/* Left - Image */}
                <div className="relative h-72 w-full bg-neutral-800 md:h-auto md:w-1/2">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-contain p-4"
                  />

                  {/* Image overlay: category badge */}
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                    <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* Right - Details */}
                <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/2 md:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="mb-3 font-heading text-2xl font-bold md:text-3xl">
                      {selectedProject.title}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="prose-invert mb-6 max-w-none text-sm leading-relaxed text-muted-foreground"
                  >
                    <ReactMarkdown>
                      {selectedProject.longDescription ??
                        selectedProject.description}
                    </ReactMarkdown>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tech Stack
                    </p>
                    <TechTags techs={selectedProject.tech} />
                  </motion.div>

                  {/* Sticky footer with links */}
                  <div className="mt-auto pt-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex gap-3"
                    >
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-accent/25"
                        >
                          <ExternalLink size={15} /> Live Demo
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        >
                          <Github size={15} /> Source
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
