import { motion } from 'framer-motion';
import { useInViewLenis } from '../utils/useInViewLenis';

export default function TextReveal({ children, className = '', style = {}, delay = 0, once = false }) {
  const [ref, isInView] = useInViewLenis({ once, margin: '-10% 0px -10% 0px' });

  // Split text into words for staggered reveal
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  if (!text) {
    // For non-string children, just do a simple reveal
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ ...style, overflow: 'hidden' }}
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <span ref={ref} className={className} style={{ ...style, display: 'inline' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Simple line reveal component
export function LineReveal({ children, className = '', style = {}, delay = 0, once = false }) {
  const [ref, isInView] = useInViewLenis({ once, margin: '-5% 0px' });

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }} className={className}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Fade in component
export function FadeIn({ children, className = '', style = {}, delay = 0, direction = 'up', once = false }) {
  const [ref, isInView] = useInViewLenis({ once, margin: '-5% 0px' });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };

  const dir = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x, y: dir.y }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
