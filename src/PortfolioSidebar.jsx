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

function NavLinks({ activeSection, navItems, onNavigate, layoutIdPrefix }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-1 xl:gap-2">
      {navItems.map((item) => {
        const sectionId = item.href.replace('#', '');
        const isActive = activeSection === sectionId;

        return (
          <motion.a
            aria-current={isActive ? 'true' : undefined}
            className={`sidebar-nav-link relative ${isActive ? 'is-active' : ''}`}
            href={item.href}
            key={item.label}
            onClick={onNavigate}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isActive && (
              <motion.div
                layoutId={`${layoutIdPrefix}sidebarNavPill`}
                className="absolute inset-0 -z-10 rounded-[14px]"
                style={{ background: 'var(--accent-soft)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {isActive ? (
              <motion.span
                layoutId={`${layoutIdPrefix}sidebarNavIndicator`}
                className="sidebar-nav-dot"
                aria-hidden="true"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            ) : (
              <span className="sidebar-nav-dot opacity-0" aria-hidden="true" />
            )}
            {item.label}
          </motion.a>
        );
      })}
    </nav>
  );
}

function SocialLinks({ socials }) {
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((social) => {
        const Icon = socialIcons[social.icon];

        return (
          <motion.a
            aria-label={social.platform}
            className="sidebar-social-link"
            href={social.href}
            key={social.platform}
            rel="noreferrer"
            target="_blank"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}

function SidebarCard({ currentRole, navbarImage, profile, socials, theme, onToggleTheme, activeSection, navItems, onNavigate, layoutIdPrefix = 'desktop-' }) {
  return (
    <div className="sidebar-card flex flex-col h-full overflow-hidden! py-4! xl:py-6!">
      {/* Header Area */}
      <div className="shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.a 
              className="brand-mark inline-block" 
              href="#home" 
              onClick={onNavigate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {profile.brand}
            </motion.a>
            <p className="mt-1 text-[10px] xl:text-xs uppercase tracking-[0.25em] text-(--text-soft)">
              Atharv's Portfolio
            </p>
          </div>
          <button
            aria-label="Toggle theme"
            className="theme-toggle shrink-0"
            onClick={onToggleTheme}
            type="button"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="mt-4 xl:mt-6 flex items-center gap-3 xl:gap-4">
          <div className="sidebar-avatar w-12 h-12 xl:w-16 xl:h-16 shrink-0 overflow-hidden rounded-full border border-(--border-color)">
            <img alt={`${profile.name} portrait`} className="h-full w-full object-cover" src={navbarImage} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base xl:text-lg font-bold tracking-tight text-(--text-main) truncate">{profile.name}</h2>
            <p className="text-xs xl:text-sm text-(--text-muted) truncate">{currentRole}</p>
          </div>
        </div>
      </div>

      <div className="sidebar-divider shrink-0 my-3! xl:my-6!" />

      {/* Navigation Area */}
      <div className="flex-1 flex flex-col justify-center min-h-0 py-1">
        <NavLinks activeSection={activeSection} navItems={navItems} onNavigate={onNavigate} layoutIdPrefix={layoutIdPrefix} />
      </div>

      <div className="sidebar-divider shrink-0 my-3! xl:my-6!" />

      {/* Footer Area */}
      <div className="sidebar-footer shrink-0 flex flex-col gap-3 xl:gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="section-eyebrow mb-1!">Contact</p>
            <a className="inline-flex items-center gap-2 text-sm text-(--text-main) hover:opacity-80 transition-opacity" href="#contact" onClick={onNavigate}>
              <FaEnvelope aria-hidden="true" className="shrink-0" />
              <span className="truncate">Let's talk</span>
            </a>
          </div>
          <div className="shrink-0">
            <SocialLinks socials={socials} />
          </div>
        </div>
        
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
  navbarImage,
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

      <aside className="desktop-sidebar sticky top-0 h-screen overflow-hidden!">
        <div className="desktop-sidebar-inner h-full overflow-hidden!">
          <SidebarCard
            activeSection={activeSection}
            currentRole={currentRole}
            navbarImage={navbarImage}
            navItems={navItems}
            onNavigate={undefined}
            onToggleTheme={onToggleTheme}
            profile={profile}
            socials={socials}
            theme={theme}
            layoutIdPrefix="desktop-"
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
              className="mobile-sidebar-sheet right-0 left-auto! overflow-hidden!"
              exit={{ x: '100%' }}
              id="mobile-sidebar"
              initial={{ x: '100%' }}
            >
              <SidebarCard
                activeSection={activeSection}
                currentRole={currentRole}
                navbarImage={navbarImage}
                navItems={navItems}
                onNavigate={onCloseMobileNav}
                onToggleTheme={onToggleTheme}
                profile={profile}
                socials={socials}
                theme={theme}
                layoutIdPrefix="mobile-"
              />
            </MotionAside>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}

export default PortfolioSidebar;
