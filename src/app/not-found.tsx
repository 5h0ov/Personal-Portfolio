"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="mb-6 font-heading text-[8rem] font-black leading-none text-accent md:text-[10rem]"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.div>
        <h1 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
