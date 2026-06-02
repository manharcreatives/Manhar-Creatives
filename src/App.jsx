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
import BlogPage from './sections/BlogPage';

const CITY_ROUTES = {
  'website-development-in-ahmedabad': 'ahmedabad',
  'website-development-in-mehsana': 'mehsana',
  'website-development-in-visnagar': 'visnagar',
  'branding-in-ahmedabad': 'ahmedabad',
  'branding-in-mehsana': 'mehsana',
  'branding-in-visnagar': 'visnagar',
  'restaurant-solutions-in-ahmedabad': 'ahmedabad',
  'restaurant-solutions-in-mehsana': 'mehsana',
  'restaurant-solutions-in-visnagar': 'visnagar',
  'digital-presence-in-ahmedabad': 'ahmedabad',
  'digital-presence-in-mehsana': 'mehsana',
  'digital-presence-in-visnagar': 'visnagar',
};

function useRoute() {
  const [route, setRoute] = useState({ type: 'home', params: {} });

  useEffect(() => {
    const checkRoute = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      const path = p.startsWith('/') ? p.slice(1) : p;

      if (p === '/') return setRoute({ type: 'home', params: {} });
      if (path.startsWith('blog/')) return setRoute({ type: 'blogArticle', params: { slug: path.replace('blog/', '') } });
      if (path === 'blog') return setRoute({ type: 'blog', params: {} });

      if (CITY_ROUTES[path]) return setRoute({ type: 'city', params: { city: CITY_ROUTES[path], path } });

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

  if (route.type === 'city') {
    return (
      <>
        <Navigation />
        <ServiceCityPage city={route.params.city} />
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
