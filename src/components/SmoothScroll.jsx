import { useEffect } from 'react';
import Lenis from 'lenis';

// Detect real touch/mobile devices.
// Lenis applies CSS transforms on touch scroll which breaks position:fixed
// on real Android Chrome (known Chromium bug). Native scroll is smooth enough
// on modern mobile OS, so we skip Lenis entirely on touch devices.
function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Skip Lenis on mobile/touch — native scroll preserves position:fixed
    if (isTouchDevice()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,   // never apply transform on touch
      touchMultiplier: 0,   // no touch interception
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance for ScrollTrigger integration
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
