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
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:gap-12">
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
          className="relative"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          variants={{
            hidden: { opacity: 0, scale: 0.94, y: 24 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
        >
          <div className="hero-visual-shell">
            <div className="hero-visual-orbit hero-visual-orbit-top">Scroll storytelling</div>
            <div className="hero-visual-orbit hero-visual-orbit-bottom">Modern recruiter flow</div>
            <div className="hero-portrait-panel">
              <img
                alt="Atharv Bowlekar portrait"
                className="hero-portrait-image"
                height="960"
                loading="eager"
                src={heroImage}
                width="810"
              />
              <div className="hero-portrait-overlay">
                <p className="section-eyebrow">Visual anchor</p>
                <h2>Frontend polish, product clarity, and engineering intent.</h2>
              </div>
            </div>
            <div className="hero-floating-card hero-floating-card-top">
              <span className="section-eyebrow">Profile</span>
              <p>Building interfaces that make technical ability immediately legible to recruiters.</p>
            </div>
            <div className="hero-floating-card hero-floating-card-bottom">
              <span className="section-eyebrow">Highlights</span>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div className="hero-mini-stat" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}

export default HeroSection;
