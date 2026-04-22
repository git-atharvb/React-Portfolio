import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

function ExperienceTimeline({ experience }) {
  return (
    <div className="experience-rail">
      {experience.map((item, index) => (
        <ScrollReveal className="experience-rail-row" delay={0.06 + index * 0.06} key={`${item.role}-${item.company}`}>
          <div className="experience-rail-marker" aria-hidden="true" />
          <article className="experience-card">
            <p className="section-eyebrow">{item.period}</p>
            <h3 className="section-subtitle">{item.role}</h3>
            <p className="timeline-organization">{item.company}</p>
            <p className="mt-3">{item.detail}</p>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}

function EducationPath({ education }) {
  return (
    <div className="education-path">
      {education.map((item, index) => (
        <ScrollReveal className="education-step" delay={0.08 + index * 0.08} key={`${item.degree}-${item.period}`}>
          <div className="education-step-year">{item.period}</div>
          <article className="education-card">
            <span className="education-step-count">0{index + 1}</span>
            <h3 className="section-subtitle">{item.degree}</h3>
            <p className="timeline-organization">{item.institute}</p>
            <p className="mt-3">{item.detail}</p>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}

function JourneySection({ education, experience }) {
  return (
    <section className="content-section" id="journey">
      <SectionHeading
        description="Experience and education now use separate layouts so each story reads more naturally instead of being forced into one mixed timeline."
        eyebrow="Journey"
        title="Professional experience and academic journey."
      />

      <div className="journey-split-layout">
        <ScrollReveal className="content-panel journey-panel" delay={0.05}>
          <p className="section-eyebrow">Experience Timeline</p>
          <h3 className="section-subtitle">Hands-on work and internship progression.</h3>
          <ExperienceTimeline experience={experience} />
        </ScrollReveal>

        <ScrollReveal className="content-panel journey-panel" delay={0.1}>
          <p className="section-eyebrow">Education Path</p>
          <h3 className="section-subtitle">Academic growth with strong fundamentals.</h3>
          <EducationPath education={education} />
        </ScrollReveal>
      </div>
    </section>
  );
}

export default JourneySection;
