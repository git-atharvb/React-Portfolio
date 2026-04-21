import { AnimatePresence, motion } from 'framer-motion';
import { FaBarsStaggered, FaMoon, FaSun, FaXmark } from 'react-icons/fa6';

const MotionDiv = motion.div;
const MotionNav = motion.nav;

function SiteHeader({
  mobileNavOpen,
  navItems,
  onCloseMobileNav,
  onToggleMobileNav,
  onToggleTheme,
  theme,
}) {
  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand-mark" href="#home">
            {`<atharv />`}
          </a>

          <nav aria-label="Primary navigation" className="desktop-nav">
            {navItems.map((item) => (
              <a className="nav-link" href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              aria-label="Toggle theme"
              className="theme-toggle"
              onClick={onToggleTheme}
              type="button"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={mobileNavOpen}
              aria-label={mobileNavOpen ? 'Close mobile navigation' : 'Open mobile navigation'}
              className="menu-toggle"
              onClick={onToggleMobileNav}
              type="button"
            >
              {mobileNavOpen ? <FaXmark /> : <FaBarsStaggered />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileNavOpen && (
          <MotionDiv
            animate={{ opacity: 1 }}
            className="mobile-nav-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <MotionNav
              animate={{ y: 0, opacity: 1 }}
              aria-label="Mobile navigation"
              className="mobile-nav-panel"
              exit={{ y: -20, opacity: 0 }}
              id="mobile-navigation"
              initial={{ y: -20, opacity: 0 }}
            >
              {navItems.map((item) => (
                <a
                  className="mobile-nav-link"
                  href={item.href}
                  key={item.label}
                  onClick={onCloseMobileNav}
                >
                  {item.label}
                </a>
              ))}
            </MotionNav>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}

export default SiteHeader;
