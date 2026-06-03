import { useState, useCallback, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import HeroExperience from './sections/HeroExperience';
import StoryTransition from './sections/StoryTransition';
import ValuePropsSection from './sections/ValuePropsSection';
import ServicesUniverse from './sections/ServicesUniverse';
import ProcessJourney from './sections/ProcessJourney';
import FeaturedSolutionsSection from './sections/FeaturedSolutionsSection';
import IndustriesSection from './sections/IndustriesSection';
import BenefitsSection from './sections/BenefitsSection';
import ProjectShowcase from './sections/ProjectShowcase';
import TrustAuthority from './sections/TrustAuthority';
import FAQSection from './sections/FAQSection';
import ContactExperience from './sections/ContactExperience';
import CinematicFooter from './sections/CinematicFooter';
import NoMatch from './sections/NoMatch';
import ServiceCityPage from './sections/ServiceCityPage';
import ServicePage from './sections/ServicePage';
import BlogPage from './sections/BlogPage';

const SERVICE_SLUGS = {
  'web-development': 'web-dev',
  'restaurant-solutions': 'restaurant',
  'branding': 'branding',
  'social-media-design': 'social',
  'print-branding': 'print',
  'digital-presence': 'digital-presence',
};

const CITY_KEYS = ['ahmedabad', 'mehsana', 'visnagar'];

function parseServiceCityPath(path) {
  const match = path.match(/^(.+)-in-(ahmedabad|mehsana|visnagar)$/);
  if (!match) return null;
  const slug = match[1];
  const city = match[2];
  return SERVICE_SLUGS[slug] ? { serviceId: SERVICE_SLUGS[slug], city } : null;
}

function useRoute() {
  const [route, setRoute] = useState({ type: 'home', params: {} });

  useEffect(() => {
    const checkRoute = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      const path = p.startsWith('/') ? p.slice(1) : p;

      if (p === '/') return setRoute({ type: 'home', params: {} });
      if (path.startsWith('blog/')) return setRoute({ type: 'blogArticle', params: { slug: path.replace('blog/', '') } });
      if (path === 'blog') return setRoute({ type: 'blog', params: {} });

      if (CITY_KEYS.includes(path)) return setRoute({ type: 'city', params: { city: path, serviceId: null, path } });

      const sc = parseServiceCityPath(path);
      if (sc) return setRoute({ type: 'city', params: { city: sc.city, serviceId: sc.serviceId, path } });

      if (path.startsWith('services/')) {
        const slug = path.replace('services/', '');
        if (SERVICE_SLUGS[slug]) return setRoute({ type: 'service', params: { serviceId: SERVICE_SLUGS[slug], path } });
      }

      if (path === 'services') return setRoute({ type: 'services', params: {} });

      return setRoute({ type: '404', params: {} });
    };
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  return route;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useRoute();

  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  if (!loaded) return <Preloader onComplete={handlePreloaderComplete} />;

  if (route.type === '404') {
    return (
      <>
        <Navigation />
        <NoMatch />
      </>
    );
  }

  if (route.type === 'service') {
    return (
      <>
        <Navigation />
        <ServicePage serviceId={route.params.serviceId} />
        <CinematicFooter />
      </>
    );
  }

  if (route.type === 'services') {
    window.location.href = '/#services';
    return null;
  }

  if (route.type === 'city') {
    return (
      <>
        <Navigation />
        <ServiceCityPage city={route.params.city} serviceId={route.params.serviceId} />
        <CinematicFooter />
      </>
    );
  }

  if (route.type === 'blog' || route.type === 'blogArticle') {
    return (
      <>
        <Navigation />
        <BlogPage />
        <CinematicFooter />
      </>
    );
  }

  return (
    <>
      <SmoothScroll>
        <div className="noise-overlay" />
        <Navigation />
        <main>
          <HeroExperience />
          <StoryTransition />
          <ValuePropsSection />
          <ServicesUniverse />
          <ProcessJourney />
          <FeaturedSolutionsSection />
          <IndustriesSection />
          <BenefitsSection />
          <ProjectShowcase />
          <TrustAuthority />
          <FAQSection />
          <ContactExperience />
        </main>
        <CinematicFooter />
      </SmoothScroll>
    </>
  );
}
