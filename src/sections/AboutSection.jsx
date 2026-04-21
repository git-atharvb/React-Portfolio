import { FaBrain, FaLaptopCode, FaShieldHalved } from 'react-icons/fa6';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

const iconMap = {
  product: FaLaptopCode,
  security: FaShieldHalved,
  ai: FaBrain,
};

function AboutSection({ focusAreas, interests, onSpotlight, profile, skills }) {
  return (
    <section className="content-section" id="about">
      <SectionHeading
        description="The goal here is simple: help recruiters and collaborators understand what I build, how I think, and where I can contribute quickly."
        eyebrow="About"
        title="Technical range with product judgment."
      />

      <div className="about-grid">
        <ScrollReveal className="panel about-story" delay={0.06}>
          <p className="section-eyebrow">Who I am</p>
          <h3>I care about clarity, polish, and trust.</h3>
          <p>{profile.summary}</p>
          <p>
            I enjoy projects where strong UI craft meets meaningful engineering decisions, especially
            when the result needs to be fast, practical, and easy for users to understand.
          </p>
        </ScrollReveal>

        <div className="focus-grid">
          {focusAreas.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <ScrollReveal className="panel focus-card" delay={0.08 + index * 0.05} key={item.title}>
                <div className="focus-icon" onPointerMove={onSpotlight}>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <div className="skills-grid">
        <ScrollReveal className="panel" delay={0.12}>
          <p className="section-eyebrow">Core stack</p>
          <div className="tag-list">
            {skills.map((skill) => (
              <span className="tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="panel" delay={0.16}>
          <p className="section-eyebrow">Beyond code</p>
          <div className="tag-list">
            {interests.map((interest) => (
              <span className="tag tag-muted" key={interest}>
                {interest}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AboutSection;
