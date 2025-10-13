'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, Grid3X3, Monitor } from 'lucide-react';
import projectsData from '@/lib/data/projects.json';
import { useInView } from '@/lib/hooks/useInView';
import { Card, CardContent } from '@/components/ui/Card';

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [viewMode, setViewMode] = useState<'slideshow' | 'grid'>('slideshow');
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const selectedProject = selectedIndex !== null ? projectsData[selectedIndex] : null;
  const { ref, isInView } = useInView({ threshold: 0.1 });

  // detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode('grid');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // auto-rotate carousel only when isAutoScrolling is true AND in view
  useEffect(() => {
    if (!isAutoScrolling || !isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoScrolling, isInView]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    setIsAutoScrolling(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // resume auto-scroll after 10 seconds of manual interaction
    timeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setIsAutoScrolling(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  return (
    <section ref={ref} id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 md:mb-16">
          <h2 className="text-4xl font-bold text-foreground">My Creations</h2>

          {/* view toggle buttons */}
          <div className="hidden md:flex items-center gap-2 p-1 rounded-full bg-card/50 backdrop-blur-sm border border-border/20">
            <motion.button
              onClick={() => setViewMode('slideshow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${viewMode === 'slideshow'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Monitor size={16} />
              Slideshow
            </motion.button>
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${viewMode === 'grid'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3X3 size={16} />
              Grid
            </motion.button>
          </div>
        </div>

        {/* conditional rendering based on view mode */}
        <AnimatePresence mode="wait">
          {viewMode === 'slideshow' && !isMobile ? (
            <motion.div
              key="slideshow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative h-[800px] w-[1000px] flex items-center justify-center perspective-1000 mx-auto"
            >
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-none p-4 rounded-full bg-card/90 backdrop-blur-md border border-border hover:bg-card transition-colors shadow-lg"
              >
                <ChevronLeft size={32} className="text-foreground" />
              </button>

              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-none p-4 rounded-full bg-card/90 backdrop-blur-md border border-border hover:bg-card transition-colors shadow-lg"
              >
                <ChevronRight size={32} className="text-foreground" />
              </button>

              {/* carousel items */}
              <div className="relative flex items-center justify-center">
                {projectsData.map((project, index) => {
                  const distance = (index - currentIndex + projectsData.length) % projectsData.length;
                  const isActive = distance === 0;

                  return (
                    <motion.div
                      key={index}
                      className="absolute cursor-none"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                      animate={{
                        rotateY: distance * 60,
                        z: distance === 0 ? 0 : distance === 1 ? -600 : -1200,
                        x: distance === 0 ? 0 : distance === 1 ? 800 : -800,
                        scale: distance === 0 ? 1 : distance === 1 ? 0.8 : 0.6,
                        opacity: distance <= 1 ? 1 : 0.3,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                      onClick={() => setSelectedIndex(index)}
                      whileHover={isActive ? { scale: 1.01 } : {}}
                    >
                      <Card className="relative w-[800px] h-[500px] overflow-hidden p-0 shadow-2xl">
                        <div className="relative w-full h-full">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-contain"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          <CardContent className="absolute bottom-0 left-0 right-0 p-10 text-white bg-transparent border-0">
                            <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
                            <p className="text-2xl opacity-90 mb-5">{project.category}</p>
                            <p className="text-xl opacity-75 line-clamp-2 mb-5">{project.description}</p>
                            <div className="flex flex-wrap gap-4">
                              {project.tech.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-full text-lg font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* carousel indicators */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-4">
                {projectsData.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`w-6 h-6 rounded-full transition-colors ${index === currentIndex ? 'bg-accent' : 'bg-muted-foreground/30'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-none"
                  onClick={() => setSelectedIndex(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="relative w-full aspect-square overflow-hidden p-0 border-border/20 group-hover:shadow-xl transition-shadow duration-300 sm:w-80 md:w-96 lg:w-[420px] mx-auto">
                    <div className="relative w-full h-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:from-black/90 md:via-black/20" />

                      <CardContent className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white bg-transparent border-0 hidden md:block">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{project.category}</p>
                        <p className="text-sm opacity-75 line-clamp-2 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 2 && (
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                              +{project.tech.length - 2}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* modal */}
        <AnimatePresence>
          {selectedIndex !== null && selectedProject && (
            <motion.div
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              {/* backdrop without blur to avoid interfering with pillbox */}
              <motion.div
                className="absolute inset-0 bg-black/70 z-[99998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="relative w-full max-w-6xl z-[99999] max-h-[90vh] flex flex-col"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="w-full h-full overflow-hidden shadow-2xl border-0">
                  <motion.button
                    onClick={() => setSelectedIndex(null)}
                    className="cursor-none absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full glass transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>

                  <div className="grid md:grid-cols-2 h-full">
                    <motion.div
                      className="relative h-64 md:h-full"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Image
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

                      <motion.div
                        className="absolute top-6 left-6 px-4 py-2 rounded-full glass text-sm font-medium"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {selectedProject.category}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="p-8 md:p-12 flex flex-col justify-between overflow-y-auto"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <motion.h2
                            className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            {selectedProject.title}
                          </motion.h2>

                          <motion.div
                            className="text-lg text-muted-foreground leading-relaxed prose prose-lg dark:prose-invert max-w-none prose-p:my-3 prose-strong:text-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-ul:my-3 prose-li:my-1"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            <ReactMarkdown>{selectedProject.longDescription ?? selectedProject.description}</ReactMarkdown>
                          </motion.div>
                        </div>

                        <motion.div
                          className="space-y-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedProject.tech.map((tech, index) => (
                              <motion.span
                                key={tech}
                                className="px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--accent) / 0.15)" }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        className="flex flex-row gap-4 mt-8"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        {selectedProject.liveUrl && selectedProject.liveUrl.trim() !== '' && (
                          <motion.button
                            onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                            className={`cursor-none flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-white relative overflow-hidden group ${selectedProject.githubUrl && selectedProject.githubUrl.trim() !== '' ? 'flex-1' : 'w-full'
                              }`}
                            style={{ background: 'hsl(16 100% 57%)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <ExternalLink size={18} />
                              <span>View Live</span>
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                            />
                          </motion.button>
                        )}

                        {selectedProject.githubUrl && selectedProject.githubUrl.trim() !== '' && (
                          <motion.button
                            onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                            className={`cursor-none flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium border-2 border-border bg-card/50 hover:bg-card transition-colors ${selectedProject.liveUrl && selectedProject.liveUrl.trim() !== '' ? 'flex-1' : 'w-full'
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: (selectedProject.liveUrl && selectedProject.liveUrl.trim() !== '') ? 0.9 : 0.8 }}
                          >
                            <Github size={18} />
                            <span>View on GitHub</span>
                          </motion.button>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 