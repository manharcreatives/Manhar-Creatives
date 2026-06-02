# Manhar Creatives — Web Testing

A premium, handcrafted brand experience website for **Manhar Creatives**, a website development & branding agency based in Visnagar, Gujarat, serving clients worldwide.

Built with Vite + React 19, styled with Tailwind CSS v4, animated with Framer Motion, and featuring an immersive 3D mesh gradient background via React Three Fiber.

## ✨ Features

- **Hero** — Fullscreen video background with animated typography and magnetic CTA
- **Services Universe** — 6 core services with scroll-driven parallax and interactive cards
- **Project Showcase** — Fullscreen project demos (video, iframe, image) with scroll-based parallax
- **Industries** — Grid showcasing industries served (restaurant, clinic, retail, startup, etc.)
- **FAQ** — Fully accessible accordion with keyboard navigation and ARIA support
- **Contact Form** — Google Apps Script powered form with email notifications
- **Blog** — Client-side blog with 5 articles
- **City Pages** — Location-specific landing pages (Ahmedabad, Mehsana, Visnagar)
- **Preloader** — Animated logo video with progress bar and mobile timeout fallback
- **404 Page** — Custom NoMatch route
- **Error Boundary** — Graceful error handling for the entire app

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | JavaScript (JSX) |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion 12 |
| **3D** | React Three Fiber / Drei (MeshGradient) |
| **Scroll** | Lenis (smooth scroll) |
| **Form Backend** | Google Apps Script |

## 📁 Project Structure

```
public/             # Static assets (favicon, manifest, sitemap, robots.txt)
src/
├── components/     # Reusable UI components
│   ├── ErrorBoundary.jsx
│   ├── FloatingCall.jsx
│   ├── MagneticButton.jsx
│   ├── MeshGradient.jsx
│   ├── Navigation.jsx
│   ├── Preloader.jsx
│   ├── SmoothScroll.jsx
│   └── TextReveal.jsx
├── sections/       # Page sections (17 sections)
│   ├── HeroExperience.jsx
│   ├── ServicesUniverse.jsx
│   ├── ProjectShowcase.jsx
│   ├── ContactExperience.jsx
│   ├── FAQSection.jsx
│   ├── BlogPage.jsx
│   ├── ServiceCityPage.jsx
│   └── ... (10 more)
├── three/          # Three.js / R3F components
├── utils/          # Constants, hooks, helpers
├── assets/         # Static images
├── App.jsx         # Root component with routing
├── main.jsx        # Entry point
└── index.css       # Global styles + Tailwind
index.html          # HTML entry (meta tags, JSON-LD, GA4)
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

1. Run `npm run build`
2. Deploy the `dist/` folder to your hosting (Vercel, Netlify, Cloudflare Pages, etc.)
3. After deploy, update these placeholders in `index.html`:
   - `G-XXXXXXXXXX` → your real Google Analytics 4 ID
   - `content=""` in `google-site-verification` → your Search Console code

## 🔍 SEO

- **On-page**: Title, description, 2200+ keywords, canonical, OG/Twitter tags, geo tags, hreflang alternates
- **Structured Data** (JSON-LD): LocalBusiness, Organization, WebSite (with SearchAction), Services x6, FAQPage, BreadcrumbList, AggregateRating + Review
- **Technical**: robots.txt, sitemap.xml, PWA manifest, resource hints (preconnect/dns-prefetch)
- **International**: areaServed includes 150+ cities across USA, UK, Canada, Australia, UAE, Europe, Asia, Africa, Latin America
- **Note**: Vite CSR SPA — server-side per-page metadata not available; city/blog pages rendered client-side

## 📬 Contact Form

The contact form submits to a Google Apps Script web app. Data is written to Google Sheets and an email notification is sent to `manharcreatives@gmail.com`.

To set up your own:
1. Create a Google Apps Script with the provided `doPost(e)` function
2. Deploy as a Web App (Execute as: Me, Access: Anyone)
3. Replace the URL in `src/sections/ContactExperience.jsx`

## 📄 License

Private — All rights reserved. Manhar Creatives.
