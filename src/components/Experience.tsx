'use client';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import experienceData from '@/lib/data/experience.json';
import { useInView } from '@/lib/hooks/useInView';

const Experience = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section id="experience" className=" py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-16 text-center text-4xl font-bold text-foreground">My Journey</h2>
        <div ref={ref} className="relative">

          {/* the main line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 md:-translate-x-1/2 bg-primary"></div>

          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative mb-12 flex w-full items-center ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'
                }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{
                duration: 0.6,
                delay: isInView ? index * 0.2 : 0,
                ease: "easeOut"
              }}
            >
              <div
                className={`w-full md:w-1/2 pl-12 text-left md:pl-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  }`}
              >
                <p className="mb-1 text-sm font-semibold text-accent">{exp.date}</p>
                <h3 className="mb-2 text-2xl font-bold text-foreground">{exp.title}</h3>
                <h4 className="mb-3 text-lg font-medium text-muted-foreground">{exp.company}</h4>
                <div className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-strong:text-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                  <ReactMarkdown>{exp.description}</ReactMarkdown>
                </div>
              </div>

              {/* a dot on the timeline */}
              <div className="absolute left-4 md:left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-lg">
                  <Briefcase className="text-primary-foreground" size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 