import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

function JourneySection({ certifications, education, experience, onSpotlight }) {
  return (
    <section className="content-section" id="journey">
      <SectionHeading
        description="A quick view of the internships, education, and certifications that shape how I approach software work today."
        eyebrow="Journey"
        title="Relevant experience, education, and proof of learning."
      />

      <div className="journey-grid">
        <ScrollReveal className="panel" delay={0.06}>
          <p className="section-eyebrow">Experience</p>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.role}-${item.company}`} onPointerMove={onSpotlight}>
                <span className="timeline-period">{item.period}</span>
                <h3>{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="panel" delay={0.1}>
          <p className="section-eyebrow">Education</p>
          <div className="timeline">
            {education.map((item) => (
              <article className="timeline-item" key={`${item.degree}-${item.period}`} onPointerMove={onSpotlight}>
                <span className="timeline-period">{item.period}</span>
                <h3>{item.degree}</h3>
                <p className="timeline-company">{item.institute}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal className="panel certifications-panel" delay={0.12}>
        <div className="certifications-header">
          <div>
            <p className="section-eyebrow">Certifications</p>
            <h3>Continuous learning that supports delivery.</h3>
          </div>
          <span className="count-badge">{certifications.length}</span>
        </div>
        <div className="cert-grid">
          {certifications.map((item) => (
            <a className="cert-card" href={item.link} key={item.title} rel="noreferrer" target="_blank">
              <div>
                <h4>{item.title}</h4>
                <p>{item.issuer}</p>
              </div>
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

export default JourneySection;
