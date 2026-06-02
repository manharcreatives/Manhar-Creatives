import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';

const ARTICLES = [
  {
    slug: 'website-importance-business-ahmedabad',
    title: 'Why Every Business in Ahmedabad Needs a Professional Website in 2026',
    excerpt: 'In a competitive market like Ahmedabad, a professional website is no longer optional. Learn why digital presence is critical for local business growth.',
    date: 'June 2, 2026',
    readTime: '4 min read',
    tags: ['Website Development', 'Ahmedabad'],
  },
  {
    slug: 'restaurant-qr-menu-system-gujarat',
    title: 'How a QR Menu System Can Transform Your Restaurant Business in Gujarat',
    excerpt: 'Restaurants across Gujarat are adopting QR menu systems to improve customer experience and streamline operations. Here\'s what you need to know.',
    date: 'May 28, 2026',
    readTime: '5 min read',
    tags: ['Restaurant Solutions', 'Gujarat'],
  },
  {
    slug: 'branding-strategy-for-small-business',
    title: 'The Complete Branding Strategy Guide for Small Businesses in 2026',
    excerpt: 'Consistent branding builds trust and recognition. This guide walks through the essential elements every small business brand needs.',
    date: 'May 20, 2026',
    readTime: '6 min read',
    tags: ['Branding', 'Small Business'],
  },
  {
    slug: 'digital-presence-for-clinics-mehsana',
    title: 'Digital Presence for Clinics: Why Mehsana Healthcare Providers Need Online Visibility',
    excerpt: 'Patients search for clinics online before booking appointments. Discover how a strong digital presence helps healthcare providers in Mehsana attract more patients.',
    date: 'May 15, 2026',
    readTime: '4 min read',
    tags: ['Digital Presence', 'Mehsana'],
  },
  {
    slug: 'cost-effective-website-development-visnagar',
    title: 'Cost-Effective Website Development in Visnagar: Quality Without Compromise',
    excerpt: 'Affordable doesn\'t have to mean cheap. Learn how businesses in Visnagar can get professional websites without breaking their budget.',
    date: 'May 10, 2026',
    readTime: '3 min read',
    tags: ['Website Development', 'Visnagar'],
  },
];

export default function BlogPage() {
  return (
    <section style={{ background: 'var(--bg)', minHeight: '100vh', padding: '160px 0 80px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
              INSIGHTS
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.1, color: '#fff',
            marginBottom: '16px', letterSpacing: '-0.02em',
          }}>
            Insights &<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              Resources
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, maxWidth: '540px', marginBottom: '64px',
          }}>
            Articles, guides, and insights about website development, branding, digital presence,
            and business growth in Gujarat.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.04)' }}>
          {ARTICLES.map((article, i) => (
            <FadeIn key={article.slug} delay={0.2 + i * 0.07}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--bg)', padding: '48px 40px', height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {article.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '0.7rem', color: 'var(--color-primary)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
                    }}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.375rem',
                  fontWeight: 600, color: '#fff', marginBottom: '16px',
                  lineHeight: 1.3,
                }}>
                  {article.title}
                </h2>

                <p style={{
                  fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7, flex: 1, marginBottom: '24px',
                }}>
                  {article.excerpt}
                </p>

                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '24px',
                }}>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
                    {article.date} · {article.readTime}
                  </span>
                  <motion.a
                    href={`/blog/${article.slug}`}
                    style={{ color: 'var(--color-primary)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}
                    whileHover={{ x: 4 }}
                  >
                    Read →
                  </motion.a>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
