import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import heroImage from './assets/hero-optimized.jpg';
import SiteHeader from './components/SiteHeader.jsx';
import { portfolioContent } from './content/portfolioContent.js';
import AboutSection from './sections/AboutSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import HeroSection from './sections/HeroSection.jsx';
import JourneySection from './sections/JourneySection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import './App.css';

const AuroraBackground = () => <div className="aurora-bg" aria-hidden="true" />;
const MotionDiv = motion.div;

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [formStatus, setFormStatus] = useState('idle');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.35 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.35 });

  const { seo } = portfolioContent;
  const currentRole = portfolioContent.profile.roles[roleIndex];
  const themeMeta = useMemo(
    () => ({
      dark: seo.themeColorDark,
      light: seo.themeColorLight,
    }),
    [seo.themeColorDark, seo.themeColorLight],
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % portfolioContent.profile.roles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    document.title = seo.title;

    const selectors = [
      ['meta[name="description"]', seo.description],
      ['meta[property="og:title"]', seo.title],
      ['meta[property="og:description"]', seo.description],
      ['meta[property="og:url"]', seo.url],
      ['meta[property="og:image"]', seo.image],
      ['meta[name="twitter:title"]', seo.title],
      ['meta[name="twitter:description"]', seo.description],
      ['meta[name="twitter:image"]', seo.image],
    ];

    selectors.forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      }
    });
  }, [seo]);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.style.colorScheme = theme;
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    if (metaTheme) {
      metaTheme.setAttribute('content', themeMeta[theme]);
    }
  }, [theme, themeMeta]);

  useEffect(() => {
    if (!mobileNavOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileNavOpen]);

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  };

  const handlePointerMove = (event) => {
    if (shouldReduceMotion || window.innerWidth < 1024) {
      return;
    }

    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  };

  const handleSpotlight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('submitting');
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      setFormStatus('success');
      form.reset();
    } catch {
      setFormStatus('error');
    }

    window.setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <div
      className={`theme-shell ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}
      onMouseMove={handlePointerMove}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <AuroraBackground />

      {!shouldReduceMotion && (
        <MotionDiv
          aria-hidden="true"
          className="cursor-glow hidden lg:block"
          style={{ left: smoothPointerX, top: smoothPointerY }}
        />
      )}

      <MotionDiv
        aria-hidden="true"
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      <SiteHeader
        mobileNavOpen={mobileNavOpen}
        navItems={portfolioContent.navItems}
        onCloseMobileNav={closeMobileNav}
        onToggleMobileNav={() => setMobileNavOpen((previous) => !previous)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <main id="main-content" className="site-main">
        <HeroSection
          currentRole={currentRole}
          heroImage={heroImage}
          highlights={portfolioContent.highlights}
          profile={portfolioContent.profile}
          socialProof={portfolioContent.socialProof}
          onSpotlight={handleSpotlight}
        />
        <AboutSection
          focusAreas={portfolioContent.focusAreas}
          interests={portfolioContent.interests}
          onSpotlight={handleSpotlight}
          profile={portfolioContent.profile}
          skills={portfolioContent.skills}
        />
        <JourneySection
          certifications={portfolioContent.certifications}
          education={portfolioContent.education}
          experience={portfolioContent.experience}
          onSpotlight={handleSpotlight}
        />
        <ProjectsSection onSpotlight={handleSpotlight} projects={portfolioContent.projects} />
      </main>

      <ContactSection
        contact={portfolioContent.contact}
        formStatus={formStatus}
        onFormSubmit={handleFormSubmit}
        onSpotlight={handleSpotlight}
        socials={portfolioContent.socials}
      />
    </div>
  );
}

export default App;
