import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBarsStaggered,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaXmark,
} from 'react-icons/fa6';
import ActionButton from './ActionButton.jsx';

const MotionAside = motion.aside;
const MotionDiv = motion.div;

const socialIcons = {
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
};

function NavLinks({ activeSection, navItems, onNavigate }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-2">
      {navItems.map((item) => {
        const sectionId = item.href.replace('#', '');
        const isActive = activeSection === sectionId;

        return (
          <a
            aria-current={isActive ? 'true' : undefined}
            className={`sidebar-nav-link ${isActive ? 'is-active' : ''}`}
            href={item.href}
            key={item.label}
            onClick={onNavigate}
          >
            <span className="sidebar-nav-dot" aria-hidden="true" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function SocialLinks({ socials }) {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map((social) => {
        const Icon = socialIcons[social.icon];

        return (
          <a
            aria-label={social.platform}
            className="sidebar-social-link"
            href={social.href}
            key={social.platform}
            rel="noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function SidebarCard({ currentRole, heroImage, profile, socials, theme, onToggleTheme, activeSection, navItems, onNavigate }) {
  return (
    <div className="sidebar-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <a className="brand-mark" href="#home" onClick={onNavigate}>
            {profile.brand}
          </a>
          <p className="mt-3 text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
            Hybrid Portfolio
          </p>
        </div>
        <button
          aria-label="Toggle theme"
          className="theme-toggle"
          onClick={onToggleTheme}
          type="button"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="sidebar-avatar">
          <img alt="Atharv Bowlekar portrait" height="144" src={heroImage} width="144" />
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">{profile.name}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{currentRole}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">{profile.tagline}</p>

      <div className="sidebar-divider" />

      <NavLinks activeSection={activeSection} navItems={navItems} onNavigate={onNavigate} />

      <div className="sidebar-divider" />

      <div className="sidebar-footer space-y-4">
        <div>
          <p className="section-eyebrow">Contact</p>
          <a className="inline-flex items-center gap-2 text-sm text-[var(--text-main)]" href="#contact" onClick={onNavigate}>
            <FaEnvelope aria-hidden="true" />
            Let's talk
          </a>
        </div>
        <SocialLinks socials={socials} />
        <ActionButton
          className="button-primary w-full justify-center"
          href={profile.resumeUrl}
          rel="noreferrer"
          target="_blank"
        >
          Resume <FaDownload aria-hidden="true" />
        </ActionButton>
      </div>
    </div>
  );
}

function PortfolioSidebar({
  activeSection,
  currentRole,
  heroImage,
  mobileNavOpen,
  navItems,
  onCloseMobileNav,
  onToggleMobileNav,
  onToggleTheme,
  profile,
  socials,
  theme,
}) {
  return (
    <>
      <header className="mobile-topbar">
        <a className="brand-mark" href="#home">
          {profile.brand}
        </a>
        <div className="flex items-center gap-3">
          <button aria-label="Toggle theme" className="theme-toggle" onClick={onToggleTheme} type="button">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button
            aria-controls="mobile-sidebar"
            aria-expanded={mobileNavOpen}
            aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
            className="theme-toggle"
            onClick={onToggleMobileNav}
            type="button"
          >
            {mobileNavOpen ? <FaXmark /> : <FaBarsStaggered />}
          </button>
        </div>
      </header>

      <aside className="desktop-sidebar">
        <div className="desktop-sidebar-inner">
          <SidebarCard
            activeSection={activeSection}
            currentRole={currentRole}
            heroImage={heroImage}
            navItems={navItems}
            onNavigate={undefined}
            onToggleTheme={onToggleTheme}
            profile={profile}
            socials={socials}
            theme={theme}
          />
        </div>
      </aside>

      <AnimatePresence>
        {mobileNavOpen && (
          <MotionDiv
            animate={{ opacity: 1 }}
            className="mobile-sidebar-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <MotionAside
              animate={{ x: 0 }}
              className="mobile-sidebar-sheet"
              exit={{ x: '-100%' }}
              id="mobile-sidebar"
              initial={{ x: '-100%' }}
            >
              <SidebarCard
                activeSection={activeSection}
                currentRole={currentRole}
                heroImage={heroImage}
                navItems={navItems}
                onNavigate={onCloseMobileNav}
                onToggleTheme={onToggleTheme}
                profile={profile}
                socials={socials}
                theme={theme}
              />
            </MotionAside>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}

export default PortfolioSidebar;
