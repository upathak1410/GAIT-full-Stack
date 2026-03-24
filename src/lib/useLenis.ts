import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Initialises Lenis smooth scroll once, globally.
 * Returns nothing — side-effect only.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}
