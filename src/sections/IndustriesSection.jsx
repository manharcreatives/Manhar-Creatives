import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const INDUSTRIES_DATA = [
  { letter: 'R', name: 'Restaurants', challenge: 'Delivering a consistent customer experience while managing reservations, menus, and daily operations efficiently.', solution: 'Integrated restaurant systems combining websites, QR menus, reservations, and digital branding into one seamless customer journey.' },
  { letter: 'C', name: 'Cafés', challenge: 'Standing out in competitive local markets while encouraging repeat visits and customer loyalty.', solution: 'Strong visual branding, professional websites, and digital presence strategies designed to attract and retain customers.' },
  { letter: 'H', name: 'Hotels', challenge: 'Building trust online while managing guest inquiries, bookings, and service expectations across multiple channels.', solution: 'Professional hospitality websites, booking-focused experiences, and brand systems that strengthen guest confidence.' },
  { letter: 'Cl', name: 'Clinics', challenge: 'Establishing credibility and simplifying appointment-related communication for patients.', solution: 'Professional healthcare websites, appointment systems, and digital communication tools designed to improve patient experience.' },
  { letter: 'RS', name: 'Retail & Service Businesses', challenge: 'Building trust, generating enquiries, and standing out in increasingly competitive local markets.', solution: 'Professional websites, branding systems, and digital foundations that help businesses attract and convert customers.' },
  { letter: 'St', name: 'Startups', challenge: 'Launching with limited market recognition while building credibility and attracting early customers.', solution: 'Scalable branding, websites, and digital systems built to support growth from day one.' },
];

export default function IndustriesSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '550px', zIndex: 0,
        backgroundImage: 'url(https://files.catbox.moe/5nd0x0.png)',
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
              INDUSTRIES WE SERVE
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
            Designed around{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              real business challenges
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
            Different industries operate differently. Our solutions are adapted to specific business models, customer expectations, and operational requirements.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {INDUSTRIES_DATA.map((industry, i) => (
            <FadeIn key={industry.name} delay={0.1 + i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--bg)',
                  padding: '40px 36px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
                    background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                      {industry.letter}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: '#fff',
                  }}>
                    {industry.name}
                  </h3>
                </div>

                <div style={{
                  padding: '16px', background: 'rgba(255,255,255,0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  marginBottom: '16px',
                  flex: 1,
                }}>
                  <span style={{
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px',
                  }}>
                    Challenge
                  </span>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    {industry.challenge}
                  </p>
                </div>

                <div style={{
                  padding: '16px', background: 'rgba(34,197,94,0.04)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(34,197,94,0.1)',
                }}>
                  <span style={{
                    fontSize: '0.65rem', color: 'var(--color-primary)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px',
                  }}>
                    Our Solution
                  </span>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {industry.solution}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
