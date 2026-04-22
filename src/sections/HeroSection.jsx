import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';

const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionStrong = motion.strong;

function TypingRole({ roles }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => roles[roleIndex].slice(0, latest));

  useEffect(() => {
    let typingControls;
    let deleteTimeout;
    let deleteControls;

    const typingAnimation = () => {
      typingControls = animate(count, roles[roleIndex].length, {
        type: 'tween',
        duration: 1.5,
        ease: 'easeInOut',
        delay: 0.4,
        onComplete: () => {
          deleteTimeout = setTimeout(() => {
            deleteControls = animate(count, 0, {
              type: 'tween', duration: 1, ease: 'easeInOut', delay: 1.5,
              onComplete: () => setRoleIndex((prev) => (prev + 1) % roles.length),
            });
          }, 1000);
        },
      });
    };

    typingAnimation();

    return () => {
      typingControls?.stop();
      deleteControls?.stop();
      clearTimeout(deleteTimeout);
    };
  }, [roleIndex, roles]);

  return (
    <MotionStrong className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-accent via-[#38bdf8] dark:via-[#bae6fd] to-accent bg-size-[200%_auto] animate-shine drop-shadow-[0_0_12px_var(--accent-glow)] font-extrabold pr-1">
      <motion.span>{displayText}</motion.span>
      <motion.span
        className="ml-1 inline-block h-full w-0.5 translate-y-1 bg-current"
        className="ml-0.5 inline-block h-[0.9em] w-0.75 translate-y-0.5 bg-accent shadow-[0_0_8px_var(--color-accent)] align-baseline"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
      />
    </MotionStrong>
  );
}

function HeroSection({ roles, heroImage, highlights, profile, socialProof }) {
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
            <TypingRole roles={roles} />
          </div>

          <p className="max-w-2xl text-base leading-8 text-(--text-muted) sm:text-lg">
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
