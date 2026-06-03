import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { SERVICES } from '../utils/constants';

const CITIES = {
  ahmedabad: { name: 'Ahmedabad', desc: 'the largest city in Gujarat', keywords: ['website development ahmedabad', 'web designer ahmedabad', 'branding agency ahmedabad', 'digital solutions ahmedabad', 'restaurant website ahmedabad'] },
  mehsana: { name: 'Mehsana', desc: 'a growing business hub in North Gujarat', keywords: ['website development mehsana', 'web designer mehsana', 'branding agency mehsana', 'digital solutions mehsana', 'restaurant website mehsana'] },
  visnagar: { name: 'Visnagar', desc: 'our home town in North Gujarat', keywords: ['website development visnagar', 'web designer visnagar', 'branding agency visnagar', 'digital solutions visnagar', 'restaurant website visnagar'] },
};

const SERVICE_ICONS = { 'web-dev': '◈', restaurant: '◉', branding: '✦', social: '◎', print: '◆', 'digital-presence': '⟐' };

function getServiceLabel(service, cityName) {
  return `${service.title} in ${cityName}`;
}

function getServicePath(slug, cityKey) {
  return `/${slug}-in-${cityKey}`;
}

export default function ServiceCityPage({ city, serviceId }) {
  const data = CITIES[city];
  const service = serviceId ? SERVICES.find(s => s.id === serviceId) : null;
  if (!data) return null;

  const cityName = data.name;
  const pageTitle = service
    ? `${service.title} in ${cityName}`
    : `Web & Branding Services in ${cityName}`;
  const pageDesc = service
    ? `Professional ${service.title.toLowerCase()} services in ${cityName}, ${data.desc}. ${service.description}`
    : `Manhar Creatives provides professional website development, branding, restaurant solutions, and digital presence services in ${cityName}, ${data.desc}. We help local businesses build strong digital foundations that drive growth.`;

  return (
    <section style={{ background: 'var(--bg)', minHeight: '100vh', padding: '160px 0 80px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              {cityName.toUpperCase()}{service ? ` / ${service.title.toUpperCase()}` : ''}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.1, color: '#fff', marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            {service ? service.title : 'Web & Branding Services'}<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              in {cityName}
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, maxWidth: '640px', marginBottom: '64px',
          }}>
            {pageDesc}
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {SERVICES.map((s, i) => {
            const label = getServiceLabel(s, cityName);
            const isActive = service && service.id === s.id;
            return (
              <FadeIn key={s.id} delay={0.2 + i * 0.07}>
                <motion.a
                  href={isActive ? '#' : getServicePath(s.id.replace('-', '-'), city)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: isActive ? 'rgba(34,197,94,0.06)' : 'var(--bg)',
                    padding: '40px 32px', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    textDecoration: 'none', cursor: isActive ? 'default' : 'pointer',
                    border: isActive ? '1px solid rgba(34,197,94,0.15)' : 'none',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.08)',
                    border: isActive ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(34,197,94,0.15)',
                    marginBottom: '20px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.2rem', color: 'var(--color-primary)',
                  }}>
                    {SERVICE_ICONS[s.id] || '◈'}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                    fontWeight: 600, color: isActive ? 'var(--color-primary)' : '#fff',
                    marginBottom: '12px', lineHeight: 1.3,
                  }}>
                    {label}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.7, flex: 1,
                  }}>
                    {isActive
                      ? s.description
                      : `Professional ${s.title.toLowerCase()} services tailored for businesses in ${cityName}. We understand the local market and deliver results that matter.`
                    }
                  </p>
                </motion.a>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4}>
          <div style={{ marginTop: '64px', padding: '48px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 600, color: '#fff', marginBottom: '16px',
            }}>
              {service
                ? `${service.title} Services in ${cityName}`
                : `Why Businesses in ${cityName} Choose Manhar Creatives`
              }
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.0625rem' }}>
              {service
                ? `We provide ${service.title.toLowerCase()} services in ${cityName} and across Gujarat. ${service.description} Our team understands the local market and delivers solutions that help businesses grow.`
                : `We serve clients across ${cityName}, Ahmedabad, Mehsana, Visnagar, and all of Gujarat with professional digital solutions. Whether you need a new website, a complete brand identity, restaurant QR menu system, or digital presence setup, our team delivers professional results that help your business grow.`
              }
            </p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {data.keywords.map(kw => (
                <span key={kw} style={{
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                  padding: '4px 12px', borderRadius: '40px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
