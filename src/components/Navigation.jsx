import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../utils/constants';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Escape key to close mobile menu + focus trap
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && mobileOpen) {
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  const toggleMobile = useCallback(() => setMobileOpen(o => !o), []);

  return (
    <>
      <header>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        className="nav-fixed"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)',
          padding: scrolled ? '12px 0' : '20px 0',
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Background blur */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: scrolled
              ? 'rgba(11, 15, 14, 0.8)'
              : 'rgba(11, 15, 14, 0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Top glow line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.2), transparent)',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', zIndex: 2 }}>
            <img
              src="/images/logos/nav-logo.png"
              alt="Manhar Creatives"
              loading="lazy" decoding="async"
              style={{
                width: 120,
                height: 'auto',
              }}
            />
          </a>

          {/* Desktop Nav Links */}
          <div
            className="hide-md"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '4px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>

          {/* CTA & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('contact');
                if (target && window.__lenis) {
                  window.__lenis.scrollTo(target, { duration: 0.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="btn btn-primary nav-cta"
              style={{ padding: '10px 20px', fontSize: '0.8125rem', minHeight: '36px', boxShadow: '0 0 24px rgba(34,197,94,0.25)' }}
            >
              Book a Discovery Call
            </a>

            {/* Mobile Hamburger */}
            <button
              ref={menuButtonRef}
              onClick={toggleMobile}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
              }}
              className="mobile-menu-btn"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: mobileOpen ? 0 : 6, alignItems: 'flex-end' }}>
              <span
                style={{
                  display: 'block',
                  width: mobileOpen ? 24 : 24,
                  height: 2,
                  background: 'var(--text-primary)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  transform: mobileOpen ? 'rotate(45deg) translateY(1px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: mobileOpen ? 0 : 16,
                  height: 2,
                  background: 'var(--text-primary)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: mobileOpen ? 24 : 20,
                  height: 2,
                  background: 'var(--text-primary)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-1px)' : 'none',
                }}
              />
            </div>
          </button>
          </div>
        </div>
      </motion.nav>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(11, 15, 14, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  const targetId = link.href.replace('#', '');
                  const target = document.getElementById(targetId);
                  if (target && window.__lenis) {
                    window.__lenis.scrollTo(target, { duration: 0.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                  } else if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                const target = document.getElementById('contact');
                if (target && window.__lenis) {
                  window.__lenis.scrollTo(target, { duration: 0.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="btn btn-primary"
              style={{ marginTop: '16px', padding: '14px 36px' }}
            >
              Book a Discovery Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .hide-md { display: none !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, label }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target && window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 0.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        background: hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}
    >
      {label}
    </a>
  );
}
