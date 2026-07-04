const knowledge = {
  business: {
    name: "Manhar Creatives",
    tagline: "Website Development & Branding Agency",
    founded: "2024",
    location: "Visnagar, Mahesana, Gujarat, India",
    phone: "+919714571522",
    email: "manharcreatives@gmail.com",
    whatsapp: "https://wa.me/919714571522",
    website: "https://www.manharcreatives.com",
    instagram: "https://instagram.com/manhar.creatives",
    languages: ["English", "Hindi", "Gujarati"],
    hours: "Mon-Sun 09:00-21:00",
    rating: "4.9/5 (48 reviews)",
    areasServed: ["Ahmedabad", "Mehsana", "Visnagar", "Gujarat", "India", "Mumbai", "Delhi", "Bangalore", "Pune", "Surat", "Jaipur", "United States", "United Kingdom", "Canada", "Australia", "UAE", "Singapore", "Europe", "Worldwide"]
  },
  services: [
    { name: "Website Development", features: ["Business Websites", "Corporate Websites", "Landing Pages", "Portfolio Websites", "Startup Websites"], description: "Custom websites designed to showcase your business, strengthen trust, and create a professional digital presence. Every website is built with clarity, performance, and user experience in mind.", timeline: "1-3 weeks" },
    { name: "Restaurant Digital Solutions", features: ["Restaurant Websites", "QR Menu Systems", "Digital Menus", "Customer Experience", "Restaurant Branding"], description: "Restaurant-focused digital solutions including QR menu systems, restaurant websites, digital menus, and customer-facing experiences designed to improve convenience, efficiency, and brand perception." },
    { name: "Branding & Identity", features: ["Logo Design", "Brand Identity", "Brand Guidelines", "Visual Systems", "Business Branding"], description: "Strategic branding solutions that help businesses establish consistency, improve recognition, and create a strong professional image across digital and physical touchpoints." },
    { name: "Social Media Design", features: ["Social Media Posts", "Campaign Creatives", "Content Visuals", "Brand Communication", "Promotional Designs"], description: "Professional social media creatives designed to strengthen brand presence, maintain consistency, and help businesses communicate effectively with their audience." },
    { name: "Print & Offline Branding", features: ["Business Cards", "Brochures", "Flyers", "Signage", "Marketing Materials"], description: "High-quality print and offline branding materials designed to reinforce your brand identity and create a consistent experience across every customer touchpoint." },
    { name: "Digital Presence Setup", features: ["Google Business Profile", "Business Email Setup", "WhatsApp Business", "Online Presence Setup", "Digital Optimization"], description: "Essential digital setup services that help businesses present a professional image online, improve discoverability, and maintain consistency across key digital platforms." }
  ],
  clientTypes: ["Restaurants", "Cafes", "Hotels", "Clinics", "Retail Businesses", "Service-based Businesses", "Startups"],
  faq: [
    { q: "What types of businesses do you work with?", a: "We primarily work with restaurants, cafes, hotels, clinics, retail businesses, service-based businesses, and startups." },
    { q: "What services does Manhar Creatives offer?", a: "Our core services include website development, restaurant digital solutions, branding & identity design, print branding, and digital presence setup." },
    { q: "How does your project process work?", a: "Every project follows a structured workflow: Discovery & Understanding, Research & Planning, Design & Execution, Review & Refinement, and Final Delivery." },
    { q: "How long does a typical project take?", a: "Most websites are completed within 1-3 weeks, while larger branding or multi-service projects may require additional time." },
    { q: "Do you provide support after project completion?", a: "Yes. We offer ongoing support, maintenance, updates, and future enhancements." },
    { q: "How do I get started?", a: "Contact us through WhatsApp, email, or our contact form. We will discuss your requirements and recommend the best solution." },
    { q: "What is the pricing?", a: "Pricing depends on scope and complexity. We provide a detailed quote after understanding your requirements. Contact us for a free consultation." },
    { q: "Do you work with clients outside India?", a: "Yes! We work with clients worldwide including USA, UK, Canada, Australia, UAE, Singapore, and across Europe." }
  ],
  process: ["Discovery & Understanding", "Research & Planning", "Design & Execution", "Review & Refinement", "Final Delivery & Support"],
  contactForm: { fields: ["name", "company", "email", "phone", "address", "type", "message", "contactMethod"], types: ["Website", "Branding", "Restaurant Solutions", "Print", "Digital Presence", "Other"] }
};

// ─── LLM Provider (pekpik) ───
const LLM_BASE_URL = 'https://aiapiv2.pekpik.com/v1/chat/completions';

const BACKUP_KEYS = [
  { key: process.env.LLM_KEY_1 || '', model: 'smart-chat' },
  { key: process.env.LLM_KEY_2 || '', model: 'smart-chat' },
  { key: process.env.LLM_KEY_3 || '', model: 'smart-chat' },
  { key: process.env.LLM_KEY_4 || '', model: 'deepseek-chat' },
  { key: process.env.LLM_KEY_5 || '', model: 'deepseek-chat' },
];

// ─── Session store ───
const sessions = new Map();
const SESSION_TTL = 30 * 60 * 1000;

function cleanSessions() {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.lastUsed > SESSION_TTL) sessions.delete(id);
  }
}
setInterval(cleanSessions, 60000);

function buildSystemPrompt(language = 'english') {
  const servicesText = knowledge.services.map(s =>
    `  - ${s.name}: ${s.description} [Services: ${s.features.join(', ')}]`
  ).join('\n');
  const faqText = knowledge.faq.map(f => `  Q: ${f.q}\n  A: ${f.a}`).join('\n\n');

  const langNames = { english: 'English', hindi: 'Hindi', gujarati: 'Gujarati' };
  return `You are the official AI assistant for Manhar Creatives, a website development & branding agency based in Visnagar, Gujarat, India.

LANGUAGE: The user selected ${langNames[language] || 'English'}. You MUST respond in ${langNames[language] || 'English'} only. Never switch to another language.

YOUR ROLE:
- Answer questions about Manhar Creatives and their services
- Help visitors understand what the agency offers
- Collect basic information when someone wants to start a project
- Be friendly, professional, and helpful
- You can respond in English, Hindi, or Gujarati based on the visitor's language

BUSINESS INFO:
- Name: ${knowledge.business.name}
- Phone: ${knowledge.business.phone}
- Email: ${knowledge.business.email}
- WhatsApp: ${knowledge.business.whatsapp}
- Website: ${knowledge.business.website}
- Location: ${knowledge.business.location}
- Hours: ${knowledge.business.hours}
- Rating: ${knowledge.business.rating}

SERVICES:
${servicesText}

CLIENT TYPES: ${knowledge.clientTypes.join(', ')}

PROJECT PROCESS: ${knowledge.process.join(' → ')}

FAQ:
${faqText}

SERVED AREAS: ${knowledge.business.areasServed.join(', ')}

CONVERSATION GUIDELINES:
1. First ask about their business/needs
2. Recommend relevant services based on their description
3. If they're interested, collect: name, phone, email, business name, and service needed
4. Never make up pricing — tell them pricing depends on scope and they should contact for a quote
5. At the end, offer to connect them via WhatsApp or have someone call them
6. Keep responses concise and helpful
7. If asked something outside your knowledge, say you'll have a team member follow up`;
}

async function chatWithLLM(messages) {
  let lastErr = null;
  for (const provider of BACKUP_KEYS) {
    if (!provider.key) continue;
    try {
      const response = await fetch(LLM_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${provider.key}`
        },
        body: JSON.stringify({
          model: provider.model,
          messages: messages,
          max_tokens: 800,
          temperature: 0.7
        }),
        signal: AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined
      });
      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
      lastErr = new Error(`Status ${response.status}`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('All API keys exhausted');
}

function getBody(req) {
  if (typeof req.body === 'string') return JSON.parse(req.body);
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding('utf8');
    req.on('data', c => raw += c);
    req.on('end', () => { try { resolve(JSON.parse(raw)); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await getBody(req);
    const { message, sessionId = '', language = 'english' } = body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const sid = sessionId || `mch_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    if (!sessions.has(sid)) {
      sessions.set(sid, {
        messages: [{ role: 'system', content: buildSystemPrompt(language) }],
        lastUsed: Date.now(),
        createdAt: Date.now()
      });
    }

    const session = sessions.get(sid);
    session.lastUsed = Date.now();
    session.messages.push({ role: 'user', content: message });

    const reply = await chatWithLLM(session.messages);

    session.messages.push({ role: 'assistant', content: reply });
    if (session.messages.length > 20) {
      const systemMsg = session.messages[0];
      session.messages = [
        systemMsg,
        { role: 'system', content: 'Previous context: visitor has been asking about services.' },
        ...session.messages.slice(-10)
      ];
    }

    return res.json({ reply, sessionId: sid });
  } catch (error) {
    console.error('Chat error:', error.message);
    return res.status(500).json({
      reply: "I apologize, but I'm having trouble connecting right now. Please reach out to us directly on WhatsApp at +919714571522 or email manharcreatives@gmail.com. We'll get back to you shortly!",
      error: error.message
    });
  }
}
