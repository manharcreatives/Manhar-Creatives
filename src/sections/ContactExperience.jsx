import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';

const PROJECT_TYPES = ['Website', 'Branding', 'Restaurant Solutions', 'Print', 'Digital Presence', 'Other'];

export default function ContactExperience() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', address: '', type: '', otherType: '', message: '', contactMethod: 'Email' });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const INITIAL_FORM = { name: '', company: '', email: '', phone: '', address: '', type: '', otherType: '', message: '', contactMethod: 'Email' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(false);
    const payload = { ...formData };
    if (payload.type !== 'Other') delete payload.otherType;
    try {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
      await fetch('https://script.google.com/macros/s/AKfycbyKRyD8W4ppEvbYopADHNoGVzB0fs3lRX5E3jbTrdoDpJo6b4H8FdQzJa8nxs83y_yGIg/exec', {
        method: 'POST',
        body: fd
      });
    } catch (_) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 6000);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData(INITIAL_FORM);
    }, 4000);
  };

  const inputStyle = {
    width: '100%', 
    padding: '20px 0', 
    background: 'transparent', 
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    color: '#fff', 
    fontSize: '1.125rem', 
    fontFamily: 'var(--font-body)',
    outline: 'none', 
    transition: 'border-color 0.3s ease',
  };

  return (
    <section id="contact" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      
      {/* Left: Full Bleed Image */}
      <div className="contact-info-panel" style={{ 
        flex: 1, 
        position: 'relative', 
        backgroundImage: 'url(https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1780201091/ChatGPT_Image_May_31_2026_09_47_54_AM_lmqhuv.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,15,14,0.3), rgba(11,15,14,0.8))' }} />
        
        <div className="contact-info-content" style={{ position: 'absolute', bottom: '80px', left: '80px', right: '40px', zIndex: 2 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            color: '#fff'
          }}>
            Tell Us About <br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>Your Project.</span>
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            marginBottom: '32px',
            maxWidth: '400px'
          }}>
            Share your goals, requirements, and timeline. We'll review your inquiry and get back to you with a clear next step.
          </p>
          <div className="contact-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', color: 'rgba(255,255,255,0.6)', fontSize: '1.0625rem' }}>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>EMAIL</span>
              <a href="mailto:manharcreatives@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>manharcreatives@gmail.com</a>
            </div>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>PHONE</span>
              +91 97145 71522
            </div>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>WEBSITE</span>
              <a href="http://www.manharcreatives.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>www.manharcreatives.com</a>
            </div>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>INSTAGRAM</span>
              @manhar.creatives
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>LOCATION</span>
              Visnagar, Mahesana, Gujarat, India
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form Area */}
      <div className="contact-form-container" style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '120px 40px' 
      }}>
        <div style={{ width: '100%', maxWidth: '560px' }}>
          
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
              <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
                READY TO GROW?
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '60px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-primary)' }}>✓</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '12px', color: '#fff' }}>Inquiry Received</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem' }}>Thank you. Our team will review your request and reach out within 24 hours to schedule a consultation.</p>
                  </motion.div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="contact-name" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Full Name</label>
                      <input 
                        id="contact-name" 
                        placeholder="Full Name" 
                        required value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        style={inputStyle} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} 
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-company" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Company / Business Name</label>
                      <input 
                        id="contact-company"
                        placeholder="Company / Business Name" 
                        value={formData.company} 
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        style={inputStyle} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-email" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email Address</label>
                      <input 
                        id="contact-email"
                        placeholder="Email Address" 
                        type="email" required value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        style={inputStyle} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} 
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Phone Number</label>
                      <input 
                        id="contact-phone"
                        placeholder="Phone Number" 
                        type="tel" required value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        style={inputStyle} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} 
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-address" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Address / Location</label>
                      <input 
                        id="contact-address"
                        placeholder="Address / Location" 
                        value={formData.address} 
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        style={inputStyle} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} 
                      />
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                        <legend style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', fontFamily: 'var(--font-mono)', padding: 0 }}>PROJECT TYPE</legend>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {PROJECT_TYPES.map((type) => (
                            <button 
                              key={type} type="button" 
                              onClick={() => setFormData({...formData, type})}
                              style={{
                                padding: '10px 20px', borderRadius: '40px', fontSize: '0.9375rem', cursor: 'pointer',
                                background: formData.type === type ? '#fff' : 'transparent',
                                border: `1px solid ${formData.type === type ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                                color: formData.type === type ? '#000' : 'rgba(255,255,255,0.7)',
                                transition: 'all 0.3s ease', fontFamily: 'var(--font-body)',
                              }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {formData.type === 'Other' && (
                      <div>
                        <label htmlFor="contact-other-type" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Please specify your project type</label>
                        <input 
                          id="contact-other-type"
                          placeholder="Please specify your project type..."
                          required value={formData.otherType}
                          onChange={e => setFormData({...formData, otherType: e.target.value})}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                        />
                      </div>
                    )}

                    <div style={{ marginTop: '16px' }}>
                      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                        <legend style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontFamily: 'var(--font-mono)', padding: 0 }}>PREFERRED CONTACT METHOD</legend>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {['Email', 'Phone'].map((method) => (
                            <button 
                              key={method} type="button" 
                              onClick={() => setFormData({...formData, contactMethod: method})}
                              style={{
                                padding: '10px 20px', borderRadius: '40px', fontSize: '0.9375rem', cursor: 'pointer',
                                background: formData.contactMethod === method ? '#fff' : 'transparent',
                                border: `1px solid ${formData.contactMethod === method ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                                color: formData.contactMethod === method ? '#000' : 'rgba(255,255,255,0.7)',
                                transition: 'all 0.3s ease', fontFamily: 'var(--font-body)',
                              }}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <label htmlFor="contact-message" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Message / Project Brief</label>
                      <textarea 
                        id="contact-message"
                        placeholder="Message / Project Brief - tell us about your project, timeline, and goals..." 
                        rows={3} value={formData.message} 
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '40px' }} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} 
                      />
                    </div>

                    {submitError && (
                      <div style={{ padding: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                        There was a problem sending your inquiry. Please try again, or email us directly at{' '}
                        <a href="mailto:manharcreatives@gmail.com" style={{ color: '#22C55E', textDecoration: 'underline' }}>manharcreatives@gmail.com</a>.
                      </div>
                    )}

                    <div style={{ marginTop: '24px', padding: '20px 24px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'rgba(255,255,255,0.03)' }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', marginBottom: '6px', fontWeight: 500 }}>
                        Need more information before getting started?
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '16px' }}>
                        Download our Company Profile to explore our services and process.
                      </p>
                      <MagneticButton as="a" href="https://drive.google.com/uc?export=download&id=1RdGn0DZyyL_f2liZHFeJVqLUyYGWKSny" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '0.8125rem', width: 'fit-content', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '40px', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}>
                        ↓ Download Company Profile
                      </MagneticButton>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                      <MagneticButton className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1rem', width: 'fit-content' }}>
                        Send Inquiry
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </MagneticButton>
                    </div>
                  </>
                )}
              </form>
          </FadeIn>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          #contact { flex-direction: column !important; }
          .contact-info-panel { min-height: auto !important; padding: 60px 24px 40px !important; background-position: top !important; }
          .contact-info-panel > div:first-child { position: absolute !important; }
          .contact-info-content { position: relative !important; bottom: auto !important; left: auto !important; right: auto !important; }
          .contact-info-content h2 { margin-bottom: 32px !important; }
          .contact-info-content h2 br { display: none !important; }
          .contact-info-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .contact-form-container { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
