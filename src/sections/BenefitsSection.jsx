import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const BENEFITS = [
  {
    icon: '◈',
    title: 'Credibility & Authority',
    description: 'Professional branding and digital systems help businesses establish credibility and create stronger first impressions.',
    image: '/images/cards/benefit-credibility.png',
  },
  {
    icon: '◇',
    title: 'Brand Recognition',
    description: 'Consistent branding helps businesses communicate clearly, stand out from competitors, and remain memorable.',
    image: '/images/cards/benefit-recognition.png',
  },
  {
    icon: '○',
    title: 'Customer Trust',
    description: 'Clear communication, professional presentation, and reliable experiences help customers feel confident choosing your business.',
    image: '/images/cards/benefit-trust.png',
  },
  {
    icon: '◎',
    title: 'Online Visibility',
    description: 'A strong digital presence improves discoverability and helps potential customers find your business more easily.',
    image: '/images/cards/benefit-visibility.jpg',
  },
  {
    icon: '✦',
    title: 'Consistent Communication',
    description: 'Unified communication channels help businesses respond faster, maintain professionalism, and improve customer interactions.',
    image: '/images/cards/benefit-communication.jpg',
  },
  {
    icon: '◆',
    title: 'Scalable Foundation',
    description: 'Structured systems and scalable digital infrastructure support long-term growth without requiring constant rebuilding.',
    image: '/images/cards/benefit-scalable.png',
  },
];

export default function BenefitsSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(/images/backgrounds/benefits-bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.2,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 1,
        background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              RESULTS & BENEFITS
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em', color: '#fff',
            maxWidth: '700px',
          }}>
            Designed to deliver{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              real business value.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '540px',
            lineHeight: 1.7,
            marginBottom: '80px',
          }}>
            Every solution is designed to strengthen credibility, improve customer experience, and support long-term business growth.
          </p>
        </FadeIn>

        <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {BENEFITS.map((benefit, i) => (
            <FadeIn key={benefit.title} delay={0.1 + i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="benefit-card"
                style={{
                  background: 'var(--bg)',
                  padding: '48px 40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img className="benefit-image"
                  src={benefit.image}
                  alt={`${benefit.title} — ${benefit.description.slice(0, 60)}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    marginBottom: '24px',
                  }}
                />
                <div className="benefit-icon" style={{
                  width: '48px', height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.15)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  color: 'var(--color-primary)',
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  flex: 1,
                }}>
                  {benefit.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
          .benefit-card { padding: 32px 24px !important; }
          .benefit-image { height: 200px !important; margin-bottom: 0 !important; margin-top: 24px !important; order: 10 !important; }
          .benefit-icon {
            width: 28px !important;
            height: 28px !important;
            font-size: 0.75rem !important;
            margin-bottom: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
