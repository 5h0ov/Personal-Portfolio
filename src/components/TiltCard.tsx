"use client";

import { useTilt } from "@/lib/hooks/useTilt";
import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

const TiltCard = ({
  children,
  className,
  maxTilt = 6,
  scale = 1.02,
}: TiltCardProps) => {
  const { ref, style, glareStyle, handleMouseMove, handleMouseLeave } = useTilt(
    {
      maxTilt,
      scale,
    }
  );

  return (
    <div
      ref={ref}
      className={`relative h-full ${className || ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={glareStyle}
      />
    </div>
  );
};

export default TiltCard;
