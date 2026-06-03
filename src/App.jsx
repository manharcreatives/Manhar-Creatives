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

function useRoute() {
  const [route, setRoute] = useState({ type: 'home', params: {} });

  useEffect(() => {
    const checkRoute = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/';

      if (p === '/') return setRoute({ type: 'home', params: {} });
      if (p === '/services') return setRoute({ type: 'services', params: {} });

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

  if (route.type === 'services') {
    window.location.href = '/#services';
    return null;
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
