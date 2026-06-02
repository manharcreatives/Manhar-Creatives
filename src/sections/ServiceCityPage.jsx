import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const CITIES = {
  ahmedabad: {
    name: 'Ahmedabad',
    desc: 'the largest city in Gujarat',
    services: ['Website Development in Ahmedabad', 'Restaurant Solutions in Ahmedabad', 'Branding & Identity in Ahmedabad', 'Social Media Design in Ahmedabad', 'Print Branding in Ahmedabad', 'Digital Presence in Ahmedabad'],
    keywords: ['website development ahmedabad', 'web designer ahmedabad', 'branding agency ahmedabad', 'digital solutions ahmedabad', 'restaurant website ahmedabad'],
  },
  mehsana: {
    name: 'Mehsana',
    desc: 'a growing business hub in North Gujarat',
    services: ['Website Development in Mehsana', 'Restaurant Solutions in Mehsana', 'Branding & Identity in Mehsana', 'Social Media Design in Mehsana', 'Print Branding in Mehsana', 'Digital Presence in Mehsana'],
    keywords: ['website development mehsana', 'web designer mehsana', 'branding agency mehsana', 'digital solutions mehsana', 'restaurant website mehsana'],
  },
  visnagar: {
    name: 'Visnagar',
    desc: 'our home town in North Gujarat',
    services: ['Website Development in Visnagar', 'Restaurant Solutions in Visnagar', 'Branding & Identity in Visnagar', 'Social Media Design in Visnagar', 'Print Branding in Visnagar', 'Digital Presence in Visnagar'],
    keywords: ['website development visnagar', 'web designer visnagar', 'branding agency visnagar', 'digital solutions visnagar', 'restaurant website visnagar'],
  },
};

export default function ServiceCityPage({ city }) {
  const data = CITIES[city];
  if (!data) return null;

  return (
    <section style={{ background: 'var(--bg)', minHeight: '100vh', padding: '160px 0 80px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              {data.name.toUpperCase()}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.1, color: '#fff',
            marginBottom: '24px', letterSpacing: '-0.02em',
          }}>
            Web & Branding Services<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              in {data.name}
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, maxWidth: '640px', marginBottom: '64px',
          }}>
            Manhar Creatives provides professional website development, branding, restaurant solutions,
            and digital presence services in {data.name}, {data.desc}. We help local businesses build
            strong digital foundations that drive growth.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {data.services.map((s, i) => (
            <FadeIn key={s} delay={0.2 + i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--bg)', padding: '40px 32px', height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
                  marginBottom: '20px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.2rem', color: 'var(--color-primary)',
                }}>
                  {['◈', '◇', '○', '◎', '✦', '◆'][i]}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                  fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.3,
                }}>
                  {s}
                </h3>
                <p style={{
                  fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7, flex: 1,
                }}>
                  Professional {s.toLowerCase()} services tailored for businesses in {data.name}.
                  We understand the local market and deliver results that matter.
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div style={{ marginTop: '64px', padding: '48px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 600, color: '#fff', marginBottom: '16px',
            }}>
              Why Businesses in {data.name} Choose Manhar Creatives
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.0625rem' }}>
              We serve clients across {data.name}, Ahmedabad, Mehsana, Visnagar, and all of Gujarat with
              professional digital solutions. Whether you need a new website, a complete brand identity,
              restaurant QR menu system, or digital presence setup, our team delivers professional results
              that help your business grow.
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
