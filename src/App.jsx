import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import heroImage from './assets/hero-optimized.jpg';
import navbarImage from './assets/navbar.jpg';
import PortfolioSidebar from './components/PortfolioSidebar.jsx';
import { portfolioContent } from './content/portfolioContent.js';
import AboutSection from './sections/AboutSection.jsx';
import CertificationsSection from './sections/CertificationsSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import HeroSection from './sections/HeroSection.jsx';
import JourneySection from './sections/JourneySection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import './App.css';

const AuroraBackground = () => <div className="aurora-bg" aria-hidden="true" />;
const MotionDiv = motion.div;

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [formStatus, setFormStatus] = useState('idle');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.35 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.35 });

  const { seo } = portfolioContent;
  const { roles } = portfolioContent.profile;
  const currentRole = roles[0];
  const sectionIds = useMemo(
    () => portfolioContent.navItems.map((item) => item.href.replace('#', '')),
    [],
  );
  const themeMeta = useMemo(
    () => ({
      dark: seo.themeColorDark,
      light: seo.themeColorLight,
    }),
    [seo.themeColorDark, seo.themeColorLight],
  );

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
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }
      
      const focalPoint = window.innerHeight * 0.3; // Highlight section crossing 30% from the top
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger immediately to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.style.colorScheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

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
      className="theme-shell bg-background min-h-screen text-text-main font-sans transition-colors duration-300"
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

      <div className="app-shell flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 !py-4 md:!py-8">
        <PortfolioSidebar
          activeSection={activeSection}
          currentRole={currentRole}
          navbarImage={navbarImage}
          mobileNavOpen={mobileNavOpen}
          navItems={portfolioContent.navItems}
          onCloseMobileNav={closeMobileNav}
          onToggleMobileNav={() => setMobileNavOpen((previous) => !previous)}
          onToggleTheme={toggleTheme}
          profile={portfolioContent.profile}
          socials={portfolioContent.socials}
          theme={theme}
        />

        <main id="main-content" className="site-main flex-1 min-w-0">
          <HeroSection
            roles={roles}
            heroImage={heroImage}
            highlights={portfolioContent.highlights}
            profile={portfolioContent.profile}
            socialProof={portfolioContent.socialProof}
          />
          <AboutSection
            focusAreas={portfolioContent.focusAreas}
            highlights={portfolioContent.highlights}
            interests={portfolioContent.interests}
            profile={portfolioContent.profile}
            skills={portfolioContent.skills}
            strengths={portfolioContent.strengths}
          />
          <ProjectsSection onSpotlight={handleSpotlight} projects={portfolioContent.projects} />
          <JourneySection
            education={portfolioContent.education}
            experience={portfolioContent.experience}
          />
          <CertificationsSection certifications={portfolioContent.certifications} />
          <ContactSection
            contact={portfolioContent.contact}
            formStatus={formStatus}
            onFormSubmit={handleFormSubmit}
            onSpotlight={handleSpotlight}
            socials={portfolioContent.socials}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
