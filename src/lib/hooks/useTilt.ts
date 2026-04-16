"use client";

import { useRef, useCallback, useState } from "react";

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
  maxGlare?: number;
}

export function useTilt(options: TiltOptions = {}) {
  const { maxTilt = 8, scale = 1.02, speed = 400, maxGlare = 0.15 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [glareAngle, setGlareAngle] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) {
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
      setGlareAngle(
        Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90
      );
      setGlareOpacity(maxGlare);
    },
    [maxTilt, scale, maxGlare]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    setGlareOpacity(0);
  }, []);

  const style: React.CSSProperties = {
    transform,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: "preserve-3d",
    willChange: "transform",
  };

  const glareStyle: React.CSSProperties = {
    background: `linear-gradient(${glareAngle}deg,
     rgba(255,255,255,0) 0%, 
     rgba(255,255,255,${glareOpacity}) 50%,
      rgba(255,255,255,0) 100%)`,
    opacity: glareOpacity > 0 ? 1 : 0,
    transition: "opacity 300ms ease",
  };

  return { ref, style, glareStyle, handleMouseMove, handleMouseLeave };
}
