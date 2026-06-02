// GSAP Animation Presets for Manhar Creatives
// Used with GSAP ScrollTrigger throughout the site

export const REVEAL_UP = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const REVEAL_DOWN = {
  initial: { y: -40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export const REVEAL_LEFT = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const REVEAL_RIGHT = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const SCALE_IN = {
  initial: { scale: 0.85, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const staggerChildren = (stagger = 0.1) => ({
  animate: {
    transition: { staggerChildren: stagger },
  },
});

export const staggerItem = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

// Magnetic button utility
export const magneticConfig = {
  strength: 0.3,
  radius: 120,
};

// Cursor config
export const cursorConfig = {
  size: 20,
  hoverSize: 60,
  color: 'rgba(34, 197, 94, 0.4)',
};
