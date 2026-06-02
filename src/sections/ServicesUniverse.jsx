import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import { ViewAnimator } from '../utils/useInViewLenis';

const SERVICES_DATA = [
  {
    id: 'web-dev',
    category: 'WEB DEV',
    title: 'Website Development',
    tagline: 'Professional websites built for credibility.',
    description: 'Custom websites designed to showcase your business, strengthen trust, and create a professional digital presence. Every website is built with clarity, performance, and user experience in mind.',
    features: ['Business Websites', 'Corporate Websites', 'Landing Pages', 'Portfolio Websites', 'Startup Websites'],
    image: 'https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780216466/1_Web_Services_WEBSITE_BG_tongas.png',
    layout: 'left'
  },
  {
    id: 'restaurant',
    category: 'RESTAURANT',
    title: 'Restaurant Digital Solutions',
    tagline: 'Digital systems for modern restaurants.',
    description: 'Restaurant-focused digital solutions including QR menu systems, restaurant websites, digital menus, and customer-facing experiences designed to improve convenience, efficiency, and brand perception.',
    features: ['Restaurant Websites', 'QR Menu Systems', 'Digital Menus', 'Customer Experience', 'Restaurant Branding'],
    image: 'https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780216467/2_Restaurant_WEBSITE_BG_wuhjae.png',
    layout: 'right'
  },
  {
    id: 'branding',
    category: 'BRANDING',
    title: 'Branding & Identity',
    tagline: 'Professional identities that build trust.',
    description: 'Strategic branding solutions that help businesses establish consistency, improve recognition, and create a strong professional image across digital and physical touchpoints.',
    features: ['Logo Design', 'Brand Identity', 'Brand Guidelines', 'Visual Systems', 'Business Branding'],
    image: 'https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780216467/3_Branding_WEBSITE_BG_zgphph.png',
    layout: 'left'
  },
  {
    id: 'social',
    category: 'SOCIAL',
    title: 'Social Media Design',
    tagline: 'Consistent communication across platforms.',
    description: 'Professional social media creatives designed to strengthen brand presence, maintain consistency, and help businesses communicate effectively with their audience.',
    features: ['Social Media Posts', 'Campaign Creatives', 'Content Visuals', 'Brand Communication', 'Promotional Designs'],
    image: 'https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780216466/4_Social_media_WEBSITE_BG_ajnmft.png',
    layout: 'right'
  },
  {
    id: 'print',
    category: 'PRINT',
    title: 'Print & Offline Branding',
    tagline: 'Professional branding beyond the screen.',
    description: 'High-quality print and offline branding materials designed to reinforce your brand identity and create a consistent experience across every customer touchpoint.',
    features: ['Business Cards', 'Brochures', 'Flyers', 'Signage', 'Marketing Materials'],
    image: 'https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780216467/5_Printing_WEBSITE_BG_xogvad.png',
    layout: 'left'
  },
  {
    id: 'digital-presence',
    category: 'DIGITAL PRESENCE',
    title: 'Digital Presence Setup',
    tagline: 'Build a stronger online presence.',
    description: 'Essential digital setup services that help businesses present a professional image online, improve discoverability, and maintain consistency across key digital platforms.',
    features: ['Google Business Profile', 'Business Email Setup', 'WhatsApp Business', 'Online Presence Setup', 'Digital Optimization'],
    image: 'https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780216467/6_Digital_setup_WEBSITE_BG_isfm5b.png',
    layout: 'right'
  }
];

function ServiceBlock({ service, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const fgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const isLeft = service.layout === 'left';

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        /* Mobile: auto height so content isn't clipped */
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        /* CRITICAL: no overflow:hidden on mobile — it clips text content */
        overflow: isMobile ? 'visible' : 'hidden',
        marginBottom: isMobile ? '48px' : '80px',
        paddingTop: isMobile ? '64px' : '0',
        paddingBottom: isMobile ? '64px' : '0',
      }}
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: isMobile ? 0 : -100,
          zIndex: 0,
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isMobile ? 0.18 : 0.15,
          y: isMobile ? 0 : y,
        }}
      />

      {/* Strong dark overlay on mobile so text is always readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: isMobile
          ? 'rgba(11,15,14,0.82)'
          : (isLeft
            ? 'linear-gradient(to right, var(--bg) 0%, rgba(11,15,14,0.8) 50%, transparent 100%)'
            : 'linear-gradient(to left, var(--bg) 0%, rgba(11,15,14,0.8) 50%, transparent 100%)'),
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {isMobile ? (
          /* ── MOBILE: single column, text ABOVE image, always ltr ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Text block */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', opacity: 0.9 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div style={{ height: '1px', width: '32px', background: 'var(--color-primary)', opacity: 0.5 }} />
                <span className="text-caption" style={{ color: 'var(--text-secondary)' }}>{service.id.replace('-', ' ')}</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 7vw, 2.75rem)',
                fontWeight: 600, lineHeight: 1.1,
                marginBottom: '16px', letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}>
                {service.title}
              </h3>

              <p style={{ fontSize: '1.0625rem', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: 500 }}>
                {service.tagline}
              </p>

              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
                {service.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {service.features.map(f => (
                  <div key={f} style={{
                    padding: '6px 12px', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    fontSize: '0.8125rem', color: 'var(--text-muted)',
                  }}>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Image block */}
            <div style={{
              position: 'relative', paddingBottom: '72%',
              borderRadius: '8px', overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        ) : (
          /* ── DESKTOP: side-by-side grid with parallax ── */
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '48px', alignItems: 'center',
            direction: isLeft ? 'ltr' : 'rtl',
          }}>
            {/* Content Side */}
            <ViewAnimator
              style={{ direction: 'ltr' }}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-20%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', opacity: 0.8 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)', opacity: 0.5 }} />
                <span className="text-caption" style={{ color: 'var(--text-secondary)' }}>{service.id.replace('-', ' ')}</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                {service.title}
              </h3>

              <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 500 }}>
                {service.tagline}
              </p>

              <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '480px' }}>
                {service.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {service.features.map(f => (
                  <div key={f} style={{
                    padding: '8px 16px', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.02)',
                    fontSize: '0.875rem', color: 'var(--text-muted)',
                  }}>
                    {f}
                  </div>
                ))}
              </div>
            </ViewAnimator>

            {/* Visual Side */}
            <ViewAnimator
              style={{ direction: 'ltr' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-20%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                position: 'relative', paddingBottom: '120%',
                borderRadius: '2px', overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              }}>
                <motion.div style={{
                  position: 'absolute', inset: -20,
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  y: fgY,
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </ViewAnimator>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesUniverse() {
  return (
    <section id="services" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Background Image for Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '600px', zIndex: 0,
        backgroundImage: 'url(https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780201825/ChatGPT_Image_May_31_2026_10_00_07_AM_mqqytv.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.12,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '600px', zIndex: 1,
        background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)',
      }} />

      <div style={{ padding: 'var(--space-5xl) 0', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <FadeIn><div className="pill" style={{ margin: '0 auto 24px', width: 'fit-content' }}><span className="pill-dot" />OUR SERVICES</div></FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-heading-1" style={{ maxWidth: '800px', margin: '0 auto 16px' }}>
            Strategic{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>business-building</span>{' '}
            solutions
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '1.0625rem' }}>
            From websites and branding to restaurant systems and digital presence setup, our solutions are designed to help businesses build credibility, improve customer experience, and grow with confidence.
          </p>
        </FadeIn>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SERVICES_DATA.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
