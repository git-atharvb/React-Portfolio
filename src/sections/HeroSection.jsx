import { FaArrowDown, FaArrowRight, FaDownload } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

function HeroSection({ currentRole, heroImage, highlights, onSpotlight, profile, socialProof }) {
  return (
    <section className="hero-section" id="home">
      <ScrollReveal>
        <div className="hero-grid">
          <article className="panel hero-copy" onPointerMove={onSpotlight}>
            <div className="status-pill">{profile.availability}</div>
            <p className="section-eyebrow">Mumbai-based developer</p>
            <h1>{profile.intro}</h1>
            <div className="hero-role-line">
              <span>I currently work as</span>
              <strong>{currentRole}</strong>
            </div>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions">
              <ActionButton className="button-primary" href={profile.primaryCta}>
                View Projects <FaArrowRight aria-hidden="true" />
              </ActionButton>
              <ActionButton
                className="button-secondary"
                href={profile.resumeUrl}
                rel="noreferrer"
                target="_blank"
              >
                Resume <FaDownload aria-hidden="true" />
              </ActionButton>
            </div>
            <ul className="proof-list">
              {socialProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <aside className="hero-side">
            <article className="panel portrait-card" onPointerMove={onSpotlight}>
              <div className="portrait-copy">
                <p className="section-eyebrow">Quick profile</p>
                <h2>{profile.name}</h2>
                <p>{profile.location}</p>
              </div>
              <div className="portrait-frame">
                <img
                  alt="Atharv Bowlekar portrait"
                  height="960"
                  loading="eager"
                  src={heroImage}
                  width="810"
                />
              </div>
            </article>

            <div className="highlights-grid">
              {highlights.map((item) => (
                <article className="panel stat-card" key={item.label} onPointerMove={onSpotlight}>
                  <span className="stat-value">{item.value}</span>
                  <span className="stat-label">{item.label}</span>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="hero-marquee panel" onPointerMove={onSpotlight}>
          <span>Recruiter-ready storytelling</span>
          <FaArrowDown aria-hidden="true" />
          <span>Production-minded frontend craft</span>
          <FaArrowDown aria-hidden="true" />
          <span>Secure-by-design thinking</span>
          <FaArrowDown aria-hidden="true" />
          <span>Single-page portfolio with strong conversion focus</span>
        </div>
      </ScrollReveal>
    </section>
  );
}

export default HeroSection;
