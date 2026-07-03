import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import { supabase } from '../lib/supabase';

const PROJECT_TYPES = ['Website', 'Branding', 'Restaurant Solutions', 'Print', 'Digital Presence', 'Other'];

const COUNTRY_CODES = [
  { code: '+93', country: 'Afghanistan' },
  { code: '+355', country: 'Albania' },
  { code: '+213', country: 'Algeria' },
  { code: '+376', country: 'Andorra' },
  { code: '+244', country: 'Angola' },
  { code: '+1', country: 'Anguilla' },
  { code: '+1', country: 'Antigua & Barbuda' },
  { code: '+54', country: 'Argentina' },
  { code: '+374', country: 'Armenia' },
  { code: '+297', country: 'Aruba' },
  { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' },
  { code: '+994', country: 'Azerbaijan' },
  { code: '+1', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+1', country: 'Barbados' },
  { code: '+375', country: 'Belarus' },
  { code: '+32', country: 'Belgium' },
  { code: '+501', country: 'Belize' },
  { code: '+229', country: 'Benin' },
  { code: '+1', country: 'Bermuda' },
  { code: '+975', country: 'Bhutan' },
  { code: '+591', country: 'Bolivia' },
  { code: '+387', country: 'Bosnia & Herzegovina' },
  { code: '+267', country: 'Botswana' },
  { code: '+55', country: 'Brazil' },
  { code: '+1', country: 'British Virgin Islands' },
  { code: '+673', country: 'Brunei' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+226', country: 'Burkina Faso' },
  { code: '+257', country: 'Burundi' },
  { code: '+855', country: 'Cambodia' },
  { code: '+237', country: 'Cameroon' },
  { code: '+1', country: 'Canada' },
  { code: '+238', country: 'Cape Verde' },
  { code: '+1', country: 'Cayman Islands' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+235', country: 'Chad' },
  { code: '+56', country: 'Chile' },
  { code: '+86', country: 'China' },
  { code: '+57', country: 'Colombia' },
  { code: '+269', country: 'Comoros' },
  { code: '+242', country: 'Congo' },
  { code: '+682', country: 'Cook Islands' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+225', country: "Côte d'Ivoire" },
  { code: '+385', country: 'Croatia' },
  { code: '+53', country: 'Cuba' },
  { code: '+599', country: 'Curaçao' },
  { code: '+357', country: 'Cyprus' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+45', country: 'Denmark' },
  { code: '+253', country: 'Djibouti' },
  { code: '+1', country: 'Dominica' },
  { code: '+1', country: 'Dominican Republic' },
  { code: '+243', country: 'DR Congo' },
  { code: '+593', country: 'Ecuador' },
  { code: '+20', country: 'Egypt' },
  { code: '+503', country: 'El Salvador' },
  { code: '+240', country: 'Equatorial Guinea' },
  { code: '+291', country: 'Eritrea' },
  { code: '+372', country: 'Estonia' },
  { code: '+268', country: 'Eswatini' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+500', country: 'Falkland Islands' },
  { code: '+298', country: 'Faroe Islands' },
  { code: '+679', country: 'Fiji' },
  { code: '+358', country: 'Finland' },
  { code: '+33', country: 'France' },
  { code: '+594', country: 'French Guiana' },
  { code: '+689', country: 'French Polynesia' },
  { code: '+241', country: 'Gabon' },
  { code: '+220', country: 'Gambia' },
  { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' },
  { code: '+233', country: 'Ghana' },
  { code: '+350', country: 'Gibraltar' },
  { code: '+30', country: 'Greece' },
  { code: '+299', country: 'Greenland' },
  { code: '+1', country: 'Grenada' },
  { code: '+590', country: 'Guadeloupe' },
  { code: '+1', country: 'Guam' },
  { code: '+502', country: 'Guatemala' },
  { code: '+44', country: 'Guernsey' },
  { code: '+224', country: 'Guinea' },
  { code: '+245', country: 'Guinea-Bissau' },
  { code: '+592', country: 'Guyana' },
  { code: '+509', country: 'Haiti' },
  { code: '+504', country: 'Honduras' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+36', country: 'Hungary' },
  { code: '+354', country: 'Iceland' },
  { code: '+91', country: 'India' },
  { code: '+62', country: 'Indonesia' },
  { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' },
  { code: '+353', country: 'Ireland' },
  { code: '+44', country: 'Isle of Man' },
  { code: '+972', country: 'Israel' },
  { code: '+39', country: 'Italy' },
  { code: '+1', country: 'Jamaica' },
  { code: '+81', country: 'Japan' },
  { code: '+44', country: 'Jersey' },
  { code: '+962', country: 'Jordan' },
  { code: '+7', country: 'Kazakhstan' },
  { code: '+254', country: 'Kenya' },
  { code: '+686', country: 'Kiribati' },
  { code: '+383', country: 'Kosovo' },
  { code: '+965', country: 'Kuwait' },
  { code: '+996', country: 'Kyrgyzstan' },
  { code: '+856', country: 'Laos' },
  { code: '+371', country: 'Latvia' },
  { code: '+961', country: 'Lebanon' },
  { code: '+266', country: 'Lesotho' },
  { code: '+231', country: 'Liberia' },
  { code: '+218', country: 'Libya' },
  { code: '+423', country: 'Liechtenstein' },
  { code: '+370', country: 'Lithuania' },
  { code: '+352', country: 'Luxembourg' },
  { code: '+853', country: 'Macau' },
  { code: '+261', country: 'Madagascar' },
  { code: '+265', country: 'Malawi' },
  { code: '+60', country: 'Malaysia' },
  { code: '+960', country: 'Maldives' },
  { code: '+223', country: 'Mali' },
  { code: '+356', country: 'Malta' },
  { code: '+692', country: 'Marshall Islands' },
  { code: '+596', country: 'Martinique' },
  { code: '+222', country: 'Mauritania' },
  { code: '+230', country: 'Mauritius' },
  { code: '+262', country: 'Mayotte' },
  { code: '+52', country: 'Mexico' },
  { code: '+691', country: 'Micronesia' },
  { code: '+373', country: 'Moldova' },
  { code: '+377', country: 'Monaco' },
  { code: '+976', country: 'Mongolia' },
  { code: '+382', country: 'Montenegro' },
  { code: '+1', country: 'Montserrat' },
  { code: '+212', country: 'Morocco' },
  { code: '+258', country: 'Mozambique' },
  { code: '+95', country: 'Myanmar' },
  { code: '+264', country: 'Namibia' },
  { code: '+674', country: 'Nauru' },
  { code: '+977', country: 'Nepal' },
  { code: '+31', country: 'Netherlands' },
  { code: '+687', country: 'New Caledonia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+505', country: 'Nicaragua' },
  { code: '+227', country: 'Niger' },
  { code: '+234', country: 'Nigeria' },
  { code: '+683', country: 'Niue' },
  { code: '+850', country: 'North Korea' },
  { code: '+389', country: 'North Macedonia' },
  { code: '+1', country: 'Northern Mariana Islands' },
  { code: '+47', country: 'Norway' },
  { code: '+968', country: 'Oman' },
  { code: '+92', country: 'Pakistan' },
  { code: '+680', country: 'Palau' },
  { code: '+970', country: 'Palestine' },
  { code: '+507', country: 'Panama' },
  { code: '+675', country: 'Papua New Guinea' },
  { code: '+595', country: 'Paraguay' },
  { code: '+51', country: 'Peru' },
  { code: '+63', country: 'Philippines' },
  { code: '+48', country: 'Poland' },
  { code: '+351', country: 'Portugal' },
  { code: '+1', country: 'Puerto Rico' },
  { code: '+974', country: 'Qatar' },
  { code: '+262', country: 'Réunion' },
  { code: '+40', country: 'Romania' },
  { code: '+7', country: 'Russia' },
  { code: '+250', country: 'Rwanda' },
  { code: '+590', country: 'Saint Barthélemy' },
  { code: '+290', country: 'Saint Helena' },
  { code: '+1', country: 'Saint Kitts & Nevis' },
  { code: '+1', country: 'Saint Lucia' },
  { code: '+590', country: 'Saint Martin' },
  { code: '+508', country: 'Saint Pierre & Miquelon' },
  { code: '+1', country: 'Saint Vincent & Grenadines' },
  { code: '+685', country: 'Samoa' },
  { code: '+378', country: 'San Marino' },
  { code: '+239', country: 'São Tomé & Príncipe' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+221', country: 'Senegal' },
  { code: '+381', country: 'Serbia' },
  { code: '+248', country: 'Seychelles' },
  { code: '+232', country: 'Sierra Leone' },
  { code: '+65', country: 'Singapore' },
  { code: '+1', country: 'Sint Maarten' },
  { code: '+421', country: 'Slovakia' },
  { code: '+386', country: 'Slovenia' },
  { code: '+677', country: 'Solomon Islands' },
  { code: '+252', country: 'Somalia' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+211', country: 'South Sudan' },
  { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+249', country: 'Sudan' },
  { code: '+597', country: 'Suriname' },
  { code: '+46', country: 'Sweden' },
  { code: '+41', country: 'Switzerland' },
  { code: '+963', country: 'Syria' },
  { code: '+886', country: 'Taiwan' },
  { code: '+992', country: 'Tajikistan' },
  { code: '+255', country: 'Tanzania' },
  { code: '+66', country: 'Thailand' },
  { code: '+670', country: 'Timor-Leste' },
  { code: '+228', country: 'Togo' },
  { code: '+690', country: 'Tokelau' },
  { code: '+676', country: 'Tonga' },
  { code: '+1', country: 'Trinidad & Tobago' },
  { code: '+216', country: 'Tunisia' },
  { code: '+90', country: 'Turkey' },
  { code: '+993', country: 'Turkmenistan' },
  { code: '+1', country: 'Turks & Caicos Islands' },
  { code: '+688', country: 'Tuvalu' },
  { code: '+256', country: 'Uganda' },
  { code: '+380', country: 'Ukraine' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+1', country: 'United States' },
  { code: '+598', country: 'Uruguay' },
  { code: '+1', country: 'US Virgin Islands' },
  { code: '+998', country: 'Uzbekistan' },
  { code: '+678', country: 'Vanuatu' },
  { code: '+39', country: 'Vatican City' },
  { code: '+58', country: 'Venezuela' },
  { code: '+84', country: 'Vietnam' },
  { code: '+681', country: 'Wallis & Futuna' },
  { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' },
  { code: '+263', country: 'Zimbabwe' },
];

function CountryCodeSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(cc =>
        cc.code.includes(search.trim()) ||
        cc.country.toLowerCase().includes(search.trim().toLowerCase())
      )
    : COUNTRY_CODES;

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const selected = COUNTRY_CODES.find(cc => cc.code === value) || COUNTRY_CODES[0];

  const triggerBase = {
    width: '140px',
    padding: '20px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: error ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: '1.125rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px',
    transition: 'border-color 0.3s ease',
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => { setOpen(p => !p); setSearch(''); }}
        style={triggerBase}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected.code} {selected.country}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
          flexShrink: 0,
          opacity: 0.5,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="country-dropdown" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '320px',
          maxHeight: '340px',
          marginTop: '4px',
          background: 'rgba(17,24,39,0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                placeholder="Search country or code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  width: '100%',
                }}
              />
            </div>
          </div>
          <div style={{
            overflowY: 'auto',
            flex: 1,
            maxHeight: '240px',
          }}>
            {filtered.map((cc, i) => (
              <button
                key={`${cc.code}-${i}`}
                type="button"
                onClick={() => { onChange(cc.code); setOpen(false); setSearch(''); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 16px',
                  background: cc.code === value
                    ? 'rgba(34,197,94,0.12)'
                    : 'transparent',
                  border: 'none',
                  color: cc.code === value ? '#22C55E' : 'rgba(255,255,255,0.8)',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => { if (cc.code !== value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (cc.code !== value) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{
                  color: 'rgba(255,255,255,0.4)',
                  minWidth: '64px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem'
                }}>
                  {cc.code}
                </span>
                <span>{cc.country}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '24px 16px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontSize: '0.9375rem' }}>
                No countries found
              </div>
            )}
          </div>
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
          }}>
            {filtered.length} {filtered.length === 1 ? 'country' : 'countries'}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactExperience() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', address: '', type: '', otherType: '', message: '', contactMethod: 'Email' });
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const INITIAL_FORM = { name: '', company: '', email: '', phone: '', address: '', type: '', otherType: '', message: '', contactMethod: 'Email' };

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) {
        errs.phone = 'Please enter a valid phone number';
      }
    }
    return errs;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(false);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const fullPhone = `${countryCode} ${formData.phone}`;
    const payload = { ...formData, phone: fullPhone };
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
    // Also insert into CRM's Supabase as a new client
    try {
      const { data: existing } = await supabase
        .from('clients')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);
      const maxNum = existing?.length > 0
        ? parseInt(existing[0].id?.replace('MC-CL-', '') || '0', 10)
        : 0;
      const newId = `MC-CL-${String(maxNum + 1).padStart(4, '0')}`;
      await supabase.from('clients').insert([{
        id: newId,
        timestamp: new Date().toISOString(),
        source: 'Website',
        name: formData.name,
        business: formData.company || '',
        phone: fullPhone,
        email: formData.email || '',
        location: formData.address || '',
        services: formData.type === 'Other' ? formData.otherType : formData.type,
        requirement: formData.message || '',
        contact_method: formData.contactMethod,
      }]);
    } catch (err) {
      console.error('Supabase insert failed:', err);
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData(INITIAL_FORM);
      setCountryCode('+91');
      setErrors({});
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

  const errorStyle = {
    color: '#EF4444',
    fontSize: '0.8125rem',
    marginTop: '4px',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  return (
    <section id="contact" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      
      {/* Left: Full Bleed Image */}
      <div className="contact-info-panel" style={{ 
        flex: 1, 
        position: 'relative', 
        backgroundImage: 'url(/images/backgrounds/contact-bg.png)', 
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
                        onChange={e => { setFormData({...formData, name: e.target.value}); if (errors.name) setErrors(prev => ({...prev, name: ''})); }}
                        style={{ ...inputStyle, borderBottomColor: errors.name ? '#EF4444' : 'rgba(255,255,255,0.2)' }} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = errors.name ? '#EF4444' : 'rgba(255,255,255,0.2)'} 
                      />
                      {errors.name && <div style={errorStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>{errors.name}</div>}
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
                        onChange={e => { setFormData({...formData, email: e.target.value}); if (errors.email) setErrors(prev => ({...prev, email: ''})); }}
                        style={{ ...inputStyle, borderBottomColor: errors.email ? '#EF4444' : 'rgba(255,255,255,0.2)' }} 
                        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                        onBlur={e => e.target.style.borderColor = errors.email ? '#EF4444' : 'rgba(255,255,255,0.2)'} 
                      />
                      {errors.email && <div style={errorStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>{errors.email}</div>}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Phone Number</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                        <CountryCodeSelect value={countryCode} onChange={setCountryCode} error={errors.phone} />
                        <input 
                          id="contact-phone"
                          placeholder="Phone Number" 
                          type="tel" required value={formData.phone} 
                          onChange={e => { setFormData({...formData, phone: e.target.value}); if (errors.phone) setErrors(prev => ({...prev, phone: ''})); }}
                          style={{ ...inputStyle, borderBottomColor: errors.phone ? '#EF4444' : 'rgba(255,255,255,0.2)' }} 
                          onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} 
                          onBlur={e => e.target.style.borderColor = errors.phone ? '#EF4444' : 'rgba(255,255,255,0.2)'} 
                        />
                      </div>
                      {errors.phone && <div style={errorStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>{errors.phone}</div>}
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .country-dropdown { animation: fadeIn 0.15s ease; }
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
