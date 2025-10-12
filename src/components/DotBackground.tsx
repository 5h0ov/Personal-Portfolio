import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function DotBackground({ children, className }: GridBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
        animate={{
          opacity: isHovering ? 0.8 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.3)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.25)_1px,transparent_1px)]",
          )}
          style={{
            maskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
          }}
        />
      </motion.div>

      {/* slightly animated grid lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:120px_120px]",
            "[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.15)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,hsl(16_100%_57%_/_0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(16_100%_57%_/_0.12)_1px,transparent_1px)]",
          )}
        />
      </motion.div>

      {/* a gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black opacity-50"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
