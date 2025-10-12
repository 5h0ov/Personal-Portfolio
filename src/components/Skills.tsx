'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import skillsData from '@/lib/data/skills.json';
import { useInView } from '@/lib/hooks/useInView';

const Skills = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-16 text-center text-4xl font-bold text-foreground">My Tech Stack</h2>
        <div ref={ref} className="grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-8">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              className="group cursor-none flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
              transition={{
                duration: 0.5,
                delay: isInView ? index * 0.1 : 0,
                ease: "easeOut"
              }}
              whileHover={{
                y: -10,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="relative w-16 h-16 md:w-20 md:h-20 mb-3"
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={skill.image}
                  alt={skill.name}
                  fill
                  className="rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
              </motion.div>

              <motion.h3
                className="text-xs md:text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isInView ? index * 0.1 + 0.3 : 0 }}
              >
                {skill.name}
              </motion.h3>

              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0
                    }}
                    whileHover={{
                      x: (Math.random() - 0.5) * 40,
                      y: (Math.random() - 0.5) * 40,
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                      }
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 