// ─── BRAND COLORS ────────────────────────────────────
export const COLORS = {
  primary: '#22C55E',
  primaryDark: '#16A34A',
  accent: '#4ADE80',
  bg: '#0B0F0E',
  bgSecondary: '#111827',
  cardSurface: '#1F2937',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
};

// ─── NAVIGATION ──────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

// ─── SERVICES DATA ───────────────────────────────────
export const SERVICES = [
  {
    id: 'web-dev',
    title: 'Website Development',
    tagline: 'We build modern digital systems.',
    description: 'Fast, responsive websites engineered to convert visitors into loyal customers. Custom-built with cutting-edge technology.',
    features: ['Custom Design', 'Mobile-First', 'SEO Optimized', 'Performance Tuned'],
    icon: '◈',
    gradient: 'linear-gradient(135deg, #22C55E22, #16A34A11)',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Digital Systems',
    tagline: 'We transform restaurant experiences.',
    description: 'Complete digital ecosystems for restaurants - from QR menus and online ordering to reservation systems and customer journey optimization.',
    features: ['Digital Menus', 'QR Ordering', 'Table Reservations', 'Analytics'],
    icon: '◉',
    gradient: 'linear-gradient(135deg, #4ADE8022, #22C55E11)',
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    tagline: 'We create memorable brands.',
    description: 'Professional brand identities that capture your essence and make lasting impressions. From logos to complete brand systems.',
    features: ['Logo Design', 'Brand Guidelines', 'Color Systems', 'Typography'],
    icon: '✦',
    gradient: 'linear-gradient(135deg, #16A34A22, #22C55E11)',
  },
  {
    id: 'social',
    title: 'Social Media Design',
    tagline: 'We create visibility.',
    description: 'Scroll-stopping social media content that builds engagement and grows your audience across all platforms.',
    features: ['Content Strategy', 'Post Design', 'Campaign Visuals', 'Brand Voice'],
    icon: '\u25CE',
    gradient: 'linear-gradient(135deg, #4ADE8022, #16A34A11)',
  },
  {
    id: 'print',
    title: 'Print Branding',
    tagline: 'We build physical brand presence.',
    description: 'Premium print materials that extend your digital brand into the physical world. Business cards, brochures, and packaging.',
    features: ['Business Cards', 'Brochures', 'Packaging', 'Stationery'],
    icon: '\u25C6',
    gradient: 'linear-gradient(135deg, #22C55E22, #4ADE8011)',
  },
  {
    id: 'digital-presence',
    title: 'Digital Presence Setup',
    tagline: 'We connect businesses with customers.',
    description: 'Complete digital setup - Google Business, Maps, communication channels - so customers find you instantly.',
    features: ['Google Business', 'Maps Setup', 'SEO Foundation', 'Analytics'],
    icon: '\u27D0',
    gradient: 'linear-gradient(135deg, #16A34A22, #4ADE8011)',
  },
];

// ─── PROCESS STEPS ───────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We begin by understanding your business, goals, audience, and requirements to establish a clear direction for the project.',
  },
  {
    step: '02',
    title: 'Research',
    description: 'We evaluate your market, competitors, and positioning to identify opportunities and make informed strategic decisions.',
  },
  {
    step: '03',
    title: 'Planning',
    description: 'We define project scope, priorities, timelines, and deliverables to create a structured execution plan.',
  },
  {
    step: '04',
    title: 'Design & Development',
    description: 'We transform strategy into functional designs and digital solutions built for usability, consistency, and performance.',
  },
  {
    step: '05',
    title: 'Review & Refinement',
    description: 'Every element is reviewed, tested, and refined to ensure quality, accuracy, and a seamless user experience.',
  },
  {
    step: '06',
    title: 'Delivery & Support',
    description: 'Once approved, the project is delivered with the necessary guidance, support, and documentation for a smooth transition.',
  },
];

// ─── PROJECTS ────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'Restaurant Website Concept',
    category: 'CONCEPT WEBSITE',
    description: 'A complete restaurant website concept designed to showcase the dining experience, simplify reservations, and strengthen brand presence.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    tags: ['Website', 'Restaurant', 'Branding'],
    showCta: true,
    ctaUrl: 'https://manharcreatives.github.io/Zaica-Wesbite/',
  },
  {
    title: 'Macron Industries',
    category: 'INDUSTRIAL WEBSITE',
    description: 'A modern industrial website designed to showcase capabilities, build credibility, and generate qualified business enquiries.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    tags: ['Website', 'Industrial', 'Business'],
    url: 'https://www.macronindustries.com/',
  },
  {
    title: 'Restaurant QR Menu System',
    category: 'CONCEPT DIGITAL SYSTEM',
    description: 'A QR menu and ordering system concept built to improve customer convenience and streamline restaurant operations.',
    image: 'https://files.catbox.moe/eu1qse.png',
    tags: ['QR Menu', 'Restaurant', 'Digital System'],
  },
  {
    title: 'Manhar Creatives Brand System',
    category: 'INTERNAL BRAND PROJECT',
    description: 'A strategic brand identity system developed to create consistency, recognition, and long-term brand value across every touchpoint.',
    image: 'https://files.catbox.moe/00wa8j.png',
    tags: ['Brand Identity', 'Guidelines', 'Print Design'],
  },
];

// ─── STATS ───────────────────────────────────────────
export const STATS = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Custom Solutions' },
  { value: 100, suffix: '%', label: 'Client-Centric Approach' },
  { value: 24, suffix: '/7', label: 'Online Presence' },
];

// ─── FAQ ─────────────────────────────────────────────
export const FAQS = [
  {
    q: 'What types of businesses do you work with?',
    a: 'We primarily work with restaurants, cafes, hotels, clinics, retail businesses, service-based businesses, and startups. Our solutions are tailored to the goals, challenges, and growth stage of each business.',
  },
  {
    q: 'What services does Manhar Creatives offer?',
    a: 'Our core services include website development, restaurant digital solutions, branding & identity design, print branding, and digital presence setup. Every solution is designed to strengthen credibility, improve visibility, and support business growth.',
  },
  {
    q: 'How does your project process work?',
    a: 'Every project follows a structured workflow: Discovery & Understanding, Research & Planning, Design & Execution, Review & Refinement, and Final Delivery. This ensures clarity, transparency, and consistent quality throughout the project.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines depend on scope and requirements. Most websites are completed within 1–3 weeks, while larger branding or multi-service projects may require additional planning and execution time. A clear timeline is provided before work begins.',
  },
  {
    q: 'Do you provide support after project completion?',
    a: 'Yes. We offer ongoing support, maintenance, updates, and future enhancements for businesses that want continued assistance after launch or delivery.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply book a discovery call or contact us through WhatsApp, email, or our contact form. We will discuss your business, understand your requirements, and recommend the most suitable solution for your goals.',
  },
];

// ─── STORY STAGES ────────────────────────────────────
export const STORY_STAGES = [
  'Chaos', 'Clarity', 'Strategy', 'Design', 'Systems', 'Digital Presence', 'Customers', 'Growth'
];
