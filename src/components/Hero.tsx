"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  CodeIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  RocketIcon,
  DiscordLogoIcon,
} from "@radix-ui/react-icons";
import GradientText from "./GradientText";
import socialLinks from "@/lib/data/social-links.json";
import TiltCard from "./TiltCard";

const Hero = () => {
  return (
    <section
      id="about"
      className="flex min-h-screen items-center justify-center py-20"
    >
      <BentoGrid className="mx-auto max-w-4xl px-4">
        <TiltCard className="row-span-2 md:col-span-7">
          <BentoGridItem
            className="border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            header={
              <div className="flex h-full min-h-[6rem] w-full flex-1 flex-col justify-end rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 p-4 dark:from-neutral-900 dark:to-neutral-800">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="mb-2 font-heading text-4xl font-black tracking-normal text-neutral-900 dark:text-neutral-200 md:text-5xl">
                    I build{" "}
                    <span className="text-neutral-500 dark:text-neutral-500">
                      robust
                    </span>{" "}
                    web applications.
                  </h1>
                  <GradientText
                    colors={[
                      "#ff6b35",
                      "#f7931e",
                      "#ff6b35",
                      "#f7931e",
                      "#ff6b35",
                    ]}
                    animationSpeed={4}
                    className="font-heading text-3xl font-bold md:text-4xl"
                  >
                    Shuvadipta Das
                  </GradientText>
                </motion.div>
              </div>
            }
            title={
              <span className="font-heading text-xl text-neutral-900 dark:text-neutral-200">
                Full Stack Developer
              </span>
            }
            description={
              <span className="text-neutral-600 dark:text-neutral-400">
                Transforming ideas into seamless digital experiences with modern
                web technologies.
              </span>
            }
            icon={<RocketIcon className="h-4 w-4 text-neutral-500" />}
          />
        </TiltCard>

        <TiltCard className="row-span-2 min-h-[200px] md:col-span-5">
          <BentoGridItem
            header={
              <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-xl transition duration-500">
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
        </TiltCard>

        <TiltCard className="md:col-span-6">
          <BentoGridItem
            className="border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            title={
              <span className="font-heading text-xl text-neutral-900 dark:text-neutral-200">
                Tech Stack
              </span>
            }
            description={
              <div className="mt-2 flex flex-wrap gap-2">
                {["Next.js", "React", "TypeScript", "Tailwind", "Node.js"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            }
            icon={<CodeIcon className="h-4 w-4 text-neutral-500" />}
          />
        </TiltCard>

        <a
          href={socialLinks.find((link) => link.label === "LinkedIn")?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-3"
        >
          <TiltCard maxTilt={4} scale={1.03}>
            <BentoGridItem
              className="cursor-pointer border-transparent bg-[#0077b5] transition-colors hover:bg-[#00669c]"
              title={
                <span className="font-heading font-bold text-white">
                  LinkedIn
                </span>
              }
              description={
                <span className="text-xs text-blue-50">
                  Connect professionally.
                </span>
              }
              header={<LinkedInLogoIcon className="mb-auto h-8 w-8 text-white" />}
            />
          </TiltCard>
        </a>

        <a
          href={socialLinks.find((link) => link.label === "GitHub")?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-3"
        >
          <TiltCard maxTilt={4} scale={1.03}>
            <BentoGridItem
              className="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
              title={
                <span className="text-neutral-900 dark:text-neutral-200">
                  GitHub
                </span>
              }
              description={
                <span className="text-neutral-600 dark:text-neutral-400">
                  Code.
                </span>
              }
              header={
                <GitHubLogoIcon className="mb-auto h-8 w-8 text-neutral-900 dark:text-neutral-200" />
              }
            />
          </TiltCard>
        </a>

        <TiltCard className="md:col-span-7">
          <BentoGridItem
            className="border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            title={
              <span className="font-heading text-neutral-900 dark:text-neutral-200">
                Let&apos;s work together
              </span>
            }
            description={
              <span className="text-neutral-600 dark:text-neutral-400">
                Open to new opportunities and interesting projects.
              </span>
            }
            header={
              <div className="flex h-full min-h-[4rem] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/50">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Status: Open to Work
              </div>
            }
            icon={<EnvelopeClosedIcon className="h-4 w-4 text-neutral-500" />}
          />
        </TiltCard>

        <TiltCard className="md:col-span-5">
          <BentoGridItem
            className="border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            title={
              <span className="font-heading text-neutral-900 dark:text-neutral-200">
                What am I upto?
              </span>
            }
            description={
              <a
                href="https://discordapp.com/users/shoob#3531"
                target="_blank"
                rel="noopener noreferrer"
                title="Discord: shoob#3531"
                className="block w-full"
              >
                <img
                  src="https://discord.c99.nl/widget/theme-2/340577779051528192.png"
                  alt="Discord status"
                  className="h-auto w-full opacity-80 transition-opacity hover:opacity-100"
                />
              </a>
            }
            header={<DiscordLogoIcon className="h-8 w-8 text-neutral-500" />}
          />
        </TiltCard>
      </BentoGrid>
    </section>
  );
};

export default Hero;
