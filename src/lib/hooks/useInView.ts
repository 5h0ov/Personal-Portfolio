import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// this is a custom hook to check if an element is in view
export const useInView = <T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasBeenInView]);

  return {
    ref,
    isInView: triggerOnce ? hasBeenInView : isInView,
    hasBeenInView,
  };
};
