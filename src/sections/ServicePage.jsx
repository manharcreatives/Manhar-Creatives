import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { SERVICES, COLORS } from '../utils/constants';

const SERVICE_ICONS = { 'web-dev': '◈', restaurant: '◉', branding: '✦', social: '◎', print: '◆', 'digital-presence': '⟐' };
const RELATED_CITIES = ['Ahmedabad', 'Mehsana', 'Visnagar'];

export default function ServicePage({ serviceId }) {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) return null;

  return (
    <section style={{ background: 'var(--bg)', minHeight: '100vh', padding: '160px 0 80px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              {service.title.toUpperCase()}
            </span>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          <div>
            <FadeIn delay={0.1}>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600, lineHeight: 1.1, color: '#fff', marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}>
                {service.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                color: 'var(--color-primary)', marginBottom: '24px', fontStyle: 'italic',
              }}>
                {service.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{
                fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8, marginBottom: '48px',
              }}>
                {service.description}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.25} direction="right">
            <div style={{
              background: 'rgba(255,255,255,0.02)', borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.06)', padding: '40px',
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: 'var(--radius-sm)',
                background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
                marginBottom: '24px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '2rem', color: 'var(--color-primary)',
              }}>
                {SERVICE_ICONS[service.id] || '◈'}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                fontWeight: 600, color: '#fff', marginBottom: '20px',
              }}>
                What We Deliver
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {service.features.map((f, i) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>✦</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.35}>
          <div style={{
            marginTop: '80px', padding: '48px', background: 'rgba(255,255,255,0.02)',
            borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 600, color: '#fff', marginBottom: '16px',
            }}>
              Available in Your City
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.0625rem', marginBottom: '24px' }}>
              We provide {service.title.toLowerCase()} services across Gujarat. Whether you are in 
              {RELATED_CITIES.slice(0, -1).join(', ')}, or {RELATED_CITIES.slice(-1)}, our team delivers 
              professional solutions tailored to your local market.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {RELATED_CITIES.map(city => (
                <a
                  key={city}
                  href={`/${city.toLowerCase()}`}
                  style={{
                    fontSize: '0.875rem', color: 'var(--color-primary)',
                    padding: '8px 20px', borderRadius: '40px',
                    border: '1px solid rgba(34,197,94,0.25)',
                    textDecoration: 'none', transition: 'all 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.1)'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.25)'; }}
                >
                  {city} ↗
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div style={{
            marginTop: '40px', padding: '48px', background: 'rgba(34,197,94,0.04)',
            borderRadius: '4px', border: '1px solid rgba(34,197,94,0.12)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.75rem',
              fontWeight: 600, color: '#fff', marginBottom: '12px',
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '28px', fontSize: '1.0625rem' }}>
              Book a discovery call and let us discuss how we can help your business grow.
            </p>
            <a href="#contact" style={{
              display: 'inline-block', padding: '14px 40px',
              background: 'var(--color-primary)', color: '#0B0F0E',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem',
              borderRadius: '4px', textDecoration: 'none', letterSpacing: '0.02em',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#16A34A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; }}
            >
              Start Your Project
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
