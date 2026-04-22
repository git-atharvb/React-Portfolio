import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

function getStartYear(period, fallback = 0) {
  const match = period.match(/\d{4}/);
  return match ? Number(match[0]) : fallback;
}

function buildJourneyMilestones({ certifications, education, experience }) {
  const experienceMilestones = experience.map((item) => ({
    type: 'Experience',
    title: item.role,
    organization: item.company,
    period: item.period,
    detail: item.detail,
  }));

  const educationMilestones = education.map((item) => ({
    type: 'Education',
    title: item.degree,
    organization: item.institute,
    period: item.period,
    detail: item.detail,
  }));

  const certificationYears = certifications.map((item) => getStartYear(item.title, 2024));
  const certificationStart = Math.min(2024, ...certificationYears);
  const certificationMilestone = {
    type: 'Certifications',
    title: 'Continuous certification track',
    organization: 'Scaler, AWS, Microsoft, Infosys, Tata, JPMorgan, Simplilearn',
    period: `${certificationStart} - Present`,
    detail: `Completed ${certifications.length}+ certifications across problem solving, deep learning, React, GitHub, GenAI, and data-focused workflows.`,
    certifications,
  };

  return [...educationMilestones, ...experienceMilestones, certificationMilestone].sort(
    (first, second) => getStartYear(first.period) - getStartYear(second.period),
  );
}

function JourneyCard({ align, milestone }) {
  return (
    <article className={`timeline-entry ${align}`}>
      <div className="timeline-marker" aria-hidden="true" />
      <div className="timeline-card">
        <span className="status-pill">{milestone.type}</span>
        <p className="section-eyebrow mt-4">{milestone.period}</p>
        <h3 className="section-subtitle">{milestone.title}</h3>
        <p className="timeline-organization">{milestone.organization}</p>
        <p className="mt-3">{milestone.detail}</p>

        {milestone.certifications && (
          <div className="timeline-cert-list">
            {milestone.certifications.slice(0, 4).map((certification) => (
              <a
                className="timeline-cert-link"
                href={certification.link}
                key={certification.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{certification.title}</span>
                <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function JourneySection({ certifications, education, experience }) {
  const milestones = buildJourneyMilestones({ certifications, education, experience });

  return (
    <section className="content-section" id="journey">
      <SectionHeading
        description="A single vertical timeline that shows how education, internships, and continuous learning stack into a stronger developer profile."
        eyebrow="Journey"
        title="Experience, education, and learning progression."
      />

      <div className="journey-timeline">
        <div className="journey-line" aria-hidden="true" />
        {milestones.map((milestone, index) => (
          <ScrollReveal className="timeline-row" delay={0.06 + index * 0.05} key={`${milestone.type}-${milestone.title}`}>
            <JourneyCard align={index % 2 === 0 ? 'timeline-left' : 'timeline-right'} milestone={milestone} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export default JourneySection;
