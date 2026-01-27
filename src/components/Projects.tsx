'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { X, Github, ExternalLink } from 'lucide-react';
import projectsData from '@/lib/data/projects.json';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedProject = selectedIndex !== null ? projectsData[selectedIndex] : null;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-neutral-100 dark:bg-neutral-900/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12 text-center">Selected Works</h2>
        
        <BentoGrid className="max-w-7xl mx-auto">
            {projectsData.map((project, index) => {
                const isLarge = index % 3 === 0 || index % 6 === 0; // Simple logic to vary sizes: 0, 3, 6... are large
                return (
                    <BentoGridItem
                        key={index}
                        className={isLarge ? "md:col-span-8" : "md:col-span-4"}
                        title={project.title}
                        description={project.description}
                        header={
                            <div 
                                className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden cursor-pointer group"
                                onClick={() => setSelectedIndex(index)}
                            >
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        }
                        icon={
                             <div className="flex flex-wrap gap-2 mt-2">
                                {project.tech.slice(0, 3).map((t) => (
                                    <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
                                        {t}
                                    </span>
                                ))}
                             </div>
                        }
                    />
                );
            })}
        </BentoGrid>

        {/* Modal Logic (Preserved) */}
        <AnimatePresence>
          {selectedIndex !== null && selectedProject && (
            <motion.div
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[99998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="relative w-full max-w-5xl z-[99999] max-h-[90vh] flex flex-col bg-card rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="absolute right-4 top-4 z-50 p-2 rounded-full bg-black/80 hover:bg-black/40 text-white transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <div className="grid md:grid-cols-2 h-full">
                    <div className="relative h-64 md:h-full bg-neutral-900">
                      <Image
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="p-8 md:p-10 flex flex-col overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 w-fit">
                            {selectedProject.category}
                        </span>

                        <div className="prose dark:prose-invert max-w-none text-muted-foreground mb-8">
                             <ReactMarkdown>{selectedProject.longDescription ?? selectedProject.description}</ReactMarkdown>
                        </div>

                        <div className="mt-auto space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tech.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
                                    >
                                        <ExternalLink size={18} /> Visit Live
                                    </a>
                                )}
                                {selectedProject.githubUrl && (
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                                    >
                                        <Github size={18} /> GitHub
                                    </a>
                                )}
                            </div>
                        </div>
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