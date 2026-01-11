import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function DotBackground({ children, className }: GridBackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // disable mouse tracking on mobile/tablet to save resources
    if (typeof window === 'undefined') return;

    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <div className={cn("relative overflow-hidden", className)}>

      <div
        className={cn(
          "absolute inset-0",
          "[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]",
        )}
      />

      {/* slightly animated grid overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.3)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.25)_1px,transparent_1px)]",
          )}
        />
      </motion.div>

      {/* static grid lines */}
      <div
        className="absolute inset-0 opacity-[0.1]"
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:120px_120px]",
            "[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.15)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.12)_1px,transparent_1px)]",
          )}
        />
      </div>

      {/* a gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black opacity-50"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
