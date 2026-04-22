import { FaBrain, FaLaptopCode, FaShieldHalved } from 'react-icons/fa6';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

const iconMap = {
  product: FaLaptopCode,
  security: FaShieldHalved,
  ai: FaBrain,
};

function AboutSection({ focusAreas, highlights, interests, profile, skills, strengths }) {
  return (
    <section className="content-section" id="about">
      <SectionHeading
        description="A minimal two-column layout that keeps the story readable: who I am on the left, practical strengths and tools on the right."
        eyebrow="About"
        title="Clear strengths, focused skills, and a readable story."
      />

      <div className="about-layout">
        <div className="space-y-6">
          <ScrollReveal className="content-panel about-story-panel" delay={0.05}>
            <p className="section-eyebrow">Profile</p>
            <h3 className="section-subtitle">Building reliable products with strong visual judgment.</h3>
            <p>{profile.summary}</p>
            <p className="mt-4">
              {profile.shortBio} I enjoy work that balances structure, usability, and technical
              implementation quality without making the interface feel heavy or noisy.
            </p>
          </ScrollReveal>

          <ScrollReveal className="content-panel" delay={0.1}>
            <p className="section-eyebrow">Key strengths</p>
            <div className="space-y-4">
              {strengths.map((item) => (
                <div className="strength-row" key={item}>
                  <span className="strength-bullet" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4 sm:grid-cols-2" delay={0.14}>
            {highlights.map((item) => (
              <article className="content-panel compact-panel" key={item.label}>
                <span className="compact-stat">{item.value}</span>
                <p className="compact-stat-label">{item.label}</p>
              </article>
            ))}
          </ScrollReveal>
        </div>

        <div className="space-y-6">
          <ScrollReveal className="content-panel" delay={0.08}>
            <p className="section-eyebrow">Focus areas</p>
            <div className="space-y-4">
              {focusAreas.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <div className="focus-row" key={item.title}>
                    <div className="focus-row-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="section-subtitle">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal className="content-panel" delay={0.12}>
            <p className="section-eyebrow">Stack & tools</p>
            <div className="skills-badge-grid">
              {skills.map((skill) => (
                <span className="skill-badge" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="content-panel" delay={0.16}>
            <p className="section-eyebrow">Beyond work</p>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <span className="interest-badge" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
