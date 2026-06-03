# SEO & Deployment — Remaining Tasks

## 🔴 Deploy Ke Baad Karna Hi Karna
- [x] `index.html` line ~450: `G-XXXXXXXXXX` → **GTM `GTM-MR352HNS`** se replace kiya (GTM head + noscript body)
- [x] `index.html` line ~77: `google-site-verification` — already verified owner in Search Console ✅
- [x] Search Console mein **sitemap update** karna hai (ab 11 URLs hain) — aap submit karo
- [ ] Google Search Console mein sitemap submit karo (updated with 11 URLs)

## 🟡 Recommended Improvements

### Social Share Banner
- `og:image` abhi logo hai — 1200×630 ka brand banner/image banake Cloudinary pe daalo, URL replace karo `index.html:28`

### Image Alt Text
- Saari images mein `alt` tags hai ya nahi check karo:
  - `src/components/Navigation.jsx` — logo alt
  - `src/sections/StoryTransition.jsx` — 2 images
  - `src/sections/BenefitsSection.jsx` — 2 images
  - `src/sections/FAQSection.jsx` — background image
  - `src/sections/CinematicFooter.jsx` — logo

### Performance
- [x] `loading="lazy"` + `decoding="async"` — verified, 1 missing tha (ProcessJourney.jsx) ✅ fix kiya
- Cloudinary URLs pe `q_auto/f_auto` hai — works for images

### ✅ New: Service Pages (June 2026)
- [x] **6 service pages created**: `/services/web-development`, `/services/restaurant-solutions`, `/services/branding`, `/services/social-media-design`, `/services/print-branding`, `/services/digital-presence`
- [x] **`ServicePage.jsx`** — new component with service details, features, city links, CTA
- [x] **`App.jsx`** — `SERVICE_SLUGS` mapping + routing
- [x] **`sitemap.xml`** — 5 → **28 URLs** (6 service + 3 city + 18 service-city + 1 home + 1 blog)
- [x] **JSON-LD** — har Service entry mein `url` field added pointing to service pages

## ✅ New: Service × City Pages (June 2026)
- [x] **18 unique service-city pages**: `/{service}-in-{city}` style URLs
- [x] **`ServiceCityPage.jsx`** — refactored to show service-specific content when `serviceId` is passed
- [x] **Dynamic routing** — `parseServiceCityPath()` function in `App.jsx` parses `{slug}-in-{city}` pattern
- [x] **City-only pages**: `/ahmedabad`, `/mehsana`, `/visnagar` restored (show all services)
- [x] **Service card linking** — each card links to its specific service-city page, active card highlighted

### Future (Post-MVP)
- [ ] **Next.js migration** — proper per-page SSR SEO ke liye (city pages, blog, services)
- [ ] **Per-page meta tags** — har city/service page ka alag title/description/og
- [ ] **Blog individual pages** — abhi sirf listing hai, individual blog post pages nahi
- [ ] **CSS `backgroundImage` → `<img>` conversion** — BenefitsSection, ValuePropsSection, ProjectShowcase, ServicesUniverse mein content images CSS background hai, `<img>` use karke alt text + lazy loading improve kar sakte hain

## 🟢 Done Already
- ✅ Meta tags: title, description, ~2200 keywords, canonical, OG, Twitter, geo, hreflang alternates
- ✅ Extra meta: robots, googlebot, revisit-after, rating, distribution, coverage, HandheldFriendly, etc.
- ✅ JSON-LD: LocalBusiness, Organization, WebSite, Services×6, FAQPage, BreadcrumbList, AggregateRating
- ✅ robots.txt, sitemap.xml, manifest.json
- ✅ Favicon (Cloudinary)
- ✅ Contact form (Google Apps Script)
- ✅ 404 page, Error Boundary
- ✅ Accessibility: FAQ keyboard/aria, nav aria-labels, form labels/fieldsets
- ✅ Performance: lazy loading, preconnect/dns-prefetch
- ✅ Mobile: contact info visible, icons shrunk, column-reverse fixed
- ✅ Videos: `f_auto` hata diya, ab raw URLs

## 📦 Deploy Checklist
- [ ] `npm run build` — clean
- [ ] `dist/` folder deploy (Vercel auto-deploys on git push)
- [ ] Custom domain set karna hai toh Vercel settings mein
- [ ] Form test karo — Google Sheet + email dono check
- [ ] GA4 real data aana shuru — 24-48 ghante lagte hain

## 📝 Important URLs
- Live: https://manhar-creatives.vercel.app (ya custom domain)
- Repo: https://github.com/manharcreatives/Manhar-Creatives
- Contact form: Google Apps Script (URL in `ContactExperience.jsx:20`)
- GA4: https://analytics.google.com
- Search Console: https://search.google.com/search-console
