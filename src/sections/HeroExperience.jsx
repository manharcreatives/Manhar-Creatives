import { useRef } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

const VIDEO_URL = 'https://res.cloudinary.com/dm2hjn5wp/video/upload/v1780312155/0_2_1_1_g89mm5.mp4';

export default function HeroExperience() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Layer 0: Video Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to top, var(--bg), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Hero Content */}
      <div className="container hero-content-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', paddingTop: 'clamp(40px, 10vh, 80px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pill"
          style={{ color: '#4ADE80', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
        >
          <span className="pill-dot" />
          YOUR DIGITAL PRESENCE SPEAKS FIRST
        </motion.div>

        {/* Heading — unchanged */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 9vw, 5.5rem)',
            lineHeight: 1.06, letterSpacing: '-0.03em',
            maxWidth: '900px',
            textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          We <span className="gradient-text">Design</span>, We{' '}
          <span className="gradient-text">Build</span>,{' '}
          <span className="gradient-text">You Grow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.125rem',
            maxWidth: '580px',
            lineHeight: 1.7,
            textShadow: '0 2px 30px rgba(0,0,0,0.9)',
          }}
        >
          We build digital foundations that help businesses strengthen credibility, improve visibility, and create a lasting presence in the market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px', width: '100%' }}
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="btn btn-primary hero-btn"
            style={{ padding: '14px 32px', fontSize: '0.9375rem', boxShadow: '0 0 40px rgba(34,197,94,0.3)' }}
          >
            Let's Discuss Your Project
          </MagneticButton>
          <MagneticButton as="a" href="#projects" className="btn btn-outline hero-btn">
            Explore Our Work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}
        >
          {[
            'Website Development',
            'Branding',
            'Restaurant Solutions',
            'Social Media',
            'Print Solutions',
            'Digital Presence',
          ].map((item, i) => (
            <span key={i} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.6 }} />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .hero-btn { width: 100% !important; justify-content: center; }
          .hero-content-container { padding-top: 20px !important; }
        }
      `}</style>
    </section>
  );
}
