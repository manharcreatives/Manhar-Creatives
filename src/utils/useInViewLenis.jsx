import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export function useInViewLenis({ once = false, margin = '0px 0px 0px 0px' } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parts = margin.split(' ');
    const parse = (v) => v.endsWith('%') ? (parseFloat(v) / 100) * window.innerHeight : parseFloat(v);
    let topM = 0, rightM = 0, bottomM = 0, leftM = 0;
    if (parts.length === 1) { const v = parse(parts[0]); topM = rightM = bottomM = leftM = v; }
    else if (parts.length === 2) { topM = bottomM = parse(parts[0]); rightM = leftM = parse(parts[1]); }
    else if (parts.length === 3) { topM = parse(parts[0]); rightM = leftM = parse(parts[1]); bottomM = parse(parts[2]); }
    else if (parts.length >= 4) { topM = parse(parts[0]); rightM = parse(parts[1]); bottomM = parse(parts[2]); leftM = parse(parts[3]); }

    let rafId;
    let prev = false;
    let triggered = false;

    const check = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const inView = r.top < vh + bottomM && r.bottom > -topM && r.left < vw + leftM && r.right > -rightM;

      if (once && triggered) {
        rafId = requestAnimationFrame(check);
        return;
      }

      if (inView !== prev) {
        prev = inView;
        if (inView) triggered = true;
        setIsInView(inView);
      }

      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [margin, once]);

  return [ref, isInView];
}

export function ViewAnimator({ children, initial, whileInView, viewport, transition, style, className, ...props }) {
  const [ref, isInView] = useInViewLenis({
    once: viewport?.once ?? false,
    margin: viewport?.margin ?? '0px 0px',
  });

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      initial={initial}
      animate={isInView ? whileInView : initial}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
