import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';

const MotionDiv = motion.div;
const MotionSection = motion.section;

function HeroSection({ currentRole, heroImage, highlights, profile, socialProof }) {
  return (
    <MotionSection
      className="hero-section"
      id="home"
      initial="hidden"
      transition={{ staggerChildren: 0.08 }}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="visible"
    >
      <div className="hero-layout-grid">
        <MotionDiv
          className="space-y-6"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          variants={{
            hidden: { opacity: 0, y: 36 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="status-pill">{profile.availability}</div>
          <div className="space-y-4">
            <p className="section-eyebrow">Hero</p>
            <h1 className="hero-title">{profile.name}</h1>
            <p className="hero-tagline">{profile.tagline}</p>
          </div>

          <div className="hero-story-line">
            <span>Currently focused on</span>
            <strong>{currentRole}</strong>
          </div>

          <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            {profile.summary}
          </p>

          <div className="hero-actions">
            <ActionButton className="button-primary" href={profile.primaryCta}>
              View Projects <FaArrowRight aria-hidden="true" />
            </ActionButton>
            <ActionButton className="button-secondary" href={profile.secondaryCta}>
              Contact Me <FaEnvelope aria-hidden="true" />
            </ActionButton>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {socialProof.map((item) => (
              <div className="hero-proof-card" key={item}>
                <span className="hero-proof-dot" aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          className="hero-visual-column"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          variants={{
            hidden: { opacity: 0, scale: 0.96, y: 24 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
        >
          <div className="hero-visual-shell tidy-hero-shell">
            <div className="hero-label-row">
              <span className="hero-chip">Explore My Portfolio</span>
              <span className="hero-chip">Coding with a Vibe</span>
            </div>

            <div className="hero-portrait-panel tidy-hero-panel">
              <img
                alt="Atharv Bowlekar portrait"
                className="hero-portrait-image"
                height="960"
                loading="eager"
                src={heroImage}
                width="810"
              />
            </div>

            <div className="hero-info-grid">
              <article className="hero-info-card hero-info-card-wide">
                <p className="section-eyebrow">Visual anchor</p>
                <h2>Frontend polish, product clarity, and engineering intent.</h2>
                <p>
                  A cleaner visual stack that supports the hero instead of competing with it.
                </p>
              </article>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}

export default HeroSection;
