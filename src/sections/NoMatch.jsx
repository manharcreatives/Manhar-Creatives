import { motion } from 'framer-motion';

export default function NoMatch() {
  return (
    <section style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0B0F0E',
      padding: '40px', textAlign: 'center',
    }}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600, lineHeight: 1,
            color: '#22C55E', marginBottom: '16px',
          }}>
            404
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 600, color: '#fff',
            marginBottom: '16px',
          }}>
            Page not found
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '1.0625rem', lineHeight: 1.7,
            maxWidth: '440px', margin: '0 auto 32px',
          }}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block', padding: '16px 40px',
              borderRadius: '40px', border: '1px solid #22C55E',
              color: '#22C55E', textDecoration: 'none',
              fontSize: '1rem', fontFamily: 'var(--font-body)',
              fontWeight: 600,
            }}
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    </section>
  );
}
