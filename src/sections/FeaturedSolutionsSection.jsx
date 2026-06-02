import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const SOLUTIONS = [
  {
    title: 'Digital Presence',
    tagline: 'Your digital headquarters.',
    description: 'Professionally designed websites that help businesses build trust, showcase their services, and create a stronger online presence.',
    benefits: ['Builds business credibility', 'Accessible 24/7', 'Supports customer enquiries'],
    features: ['Custom design', 'Mobile-first', 'Fast performance', 'CMS integration'],
    useCases: ['Local Businesses', 'Professional Services', 'Startups', 'Growing Brands'],
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(74,222,128,0.05))',
  },
  {
    title: 'Brand Identity',
    tagline: 'Clarity, consistency, trust.',
    description: 'Strategic brand systems that help businesses present themselves professionally and communicate with confidence across every customer touchpoint.',
    benefits: ['Stronger brand recognition', 'Consistent communication', 'Increased customer trust'],
    features: ['QR code menus', 'Online ordering', 'Table reservations', 'Analytics dashboard'],
    useCases: ['New Businesses', 'Rebranding Projects', 'Expanding Brands', 'Established Companies'],
    gradient: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(34,197,94,0.05))',
  },
  {
    title: 'Business Systems',
    tagline: 'Operations made simpler.',
    description: 'Practical digital systems that help businesses improve communication, customer experience, and day-to-day operations through structured digital tools and workflows.',
    benefits: ['Improved customer experience', 'More efficient operations', 'Better business communication'],
    features: ['Logo & identity', 'Brand guidelines', 'Color systems', 'Typography'],
    useCases: ['QR Menu Systems', 'Digital Setup', 'Business Communication', 'Workflow Solutions'],
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(22,163,74,0.05))',
  },
];

export default function FeaturedSolutionsSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780202156/ChatGPT_Image_May_31_2026_10_05_38_AM_yc8kdw.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.1,
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
              FEATURED SOLUTIONS
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
            Solutions built for{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              business growth.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '500px',
            lineHeight: 1.7,
            marginBottom: '80px',
          }}>
            The solutions most commonly chosen by businesses looking to strengthen their digital presence, improve credibility, and support long-term growth.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {SOLUTIONS.map((solution, i) => (
            <FadeIn key={solution.title} delay={0.2 + i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--bg)',
                  padding: '48px 40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="fs-icon" style={{
                  width: '48px', height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  background: solution.gradient,
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: 'var(--color-primary)',
                }}>
                  {['◈', '◉', '✦'][i]}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}>
                  {solution.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}>
                  {solution.tagline}
                </p>

                <p style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                  flex: 1,
                }}>
                  {solution.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Benefits</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {solution.benefits.map(b => (
                      <span key={b} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {solution.useCases.map(uc => (
                    <span key={uc} style={{
                      fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                      padding: '4px 12px', borderRadius: '40px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      {uc}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .fs-icon {
            width: 32px !important;
            height: 32px !important;
            font-size: 1rem !important;
            margin-bottom: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
