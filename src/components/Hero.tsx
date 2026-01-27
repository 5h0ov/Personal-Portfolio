'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import {
  CodeIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import GradientText from './GradientText';

const Hero = () => {
return (
    <section id="about" className="min-h-screen py-20 flex items-center justify-center">
      <BentoGrid className="max-w-4xl mx-auto px-4">
        {/* Main Title Tile */}
        <BentoGridItem
          className="md:col-span-7 row-span-2 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm"
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 flex-col p-4 justify-end">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-neutral-200 mb-2 font-heading tracking-normal">
                        I build <span className="text-neutral-500 dark:text-neutral-500">robust</span> web applications.
                    </h1>
                     <GradientText
                        colors={['#ff6b35', '#f7931e', '#ff6b35', '#f7931e', '#ff6b35']}
                        animationSpeed={4}
                        className="text-3xl md:text-4xl font-bold font-heading"
                      >
                        Shuvadipta Das
                      </GradientText>
                </motion.div>
            </div>
          }
          title={<span className="text-xl font-heading text-neutral-900 dark:text-neutral-200">Full Stack Developer</span>}
          description={<span className="text-neutral-600 dark:text-neutral-400">Transforming ideas into seamless digital experiences with modern web technologies.</span>}
          icon={<RocketIcon className="h-4 w-4 text-neutral-500" />}
        />

        {/* Profile Image Tile */}
        <BentoGridItem
            className="md:col-span-5 row-span-2 min-h-[200px]"
            header={
                <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden transition duration-500">
                    <Image
                        src="/profile.jpg"
                        alt="Shuvadipta Das"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            }
        />

        {/* Tech Stack Tile */}
        <BentoGridItem
          className="md:col-span-6 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm"
          title={<span className="text-xl font-heading text-neutral-900 dark:text-neutral-200">Tech Stack</span>}
          description={(
             <div className="flex flex-wrap gap-2 mt-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700">
                        {tech}
                    </span>
                ))}
             </div>
          )}
          icon={<CodeIcon className="h-4 w-4 text-neutral-500" />}
        />

        {/* Socials - LinkedIn */}
        <BentoGridItem
          className="md:col-span-3 bg-[#0077b5] border-transparent cursor-pointer transition-colors hover:bg-[#00669c]"
          title={<span className="text-white font-heading font-bold">LinkedIn</span>}
          description={<span className="text-blue-50 text-xs">Connect professionally.</span>}
          header={<LinkedInLogoIcon className="h-8 w-8 text-white mb-auto" />}
           /* Add link logic here later */
        />

        {/* Socials - GitHub */}
        <BentoGridItem
          className="md:col-span-3 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
          title={<span className="text-neutral-900 dark:text-neutral-200">GitHub</span>}
          description={<span className="text-neutral-600 dark:text-neutral-400">Code.</span>}
          header={<GitHubLogoIcon className="h-8 w-8 text-neutral-900 dark:text-neutral-200 mb-auto" />}
           /* Add link logic here later */
        />

          {/* Contact Tile */}
          <BentoGridItem
            className="md:col-span-12 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm"
            title={<span className="font-heading text-neutral-900 dark:text-neutral-200">Let's work together</span>}
            description={<span className="text-neutral-600 dark:text-neutral-400">Open to new opportunities and interesting projects.</span>}
            header={<div className="h-full min-h-[4rem] flex items-center justify-center text-neutral-500 text-sm border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">Status: Open to Work</div>}
            icon={<EnvelopeClosedIcon className="h-4 w-4 text-neutral-500" />}
          />
      </BentoGrid>
    </section>
  );
};

export default Hero;