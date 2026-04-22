import { FaArrowUpRightFromSquare, FaAws, FaMicrosoft } from 'react-icons/fa6';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

const issuerBrandMap = {
  aws: { label: 'AWS', className: 'issuer-aws', icon: FaAws },
  microsoft: { label: 'MS', className: 'issuer-microsoft', icon: FaMicrosoft },
  scaler: { label: 'SC', className: 'issuer-scaler' },
  infosys: { label: 'IN', className: 'issuer-infosys' },
  tata: { label: 'T', className: 'issuer-tata' },
  jpmorgan: { label: 'JP', className: 'issuer-jpmorgan' },
  simplilearn: { label: 'SL', className: 'issuer-simplilearn' },
};

function IssuerBadge({ issuer, issuerKey }) {
  const brand = issuerBrandMap[issuerKey] || { label: issuer.slice(0, 2).toUpperCase(), className: 'issuer-default' };
  const Icon = brand.icon;

  return (
    <div className={`issuer-badge ${brand.className}`} aria-hidden="true">
      {Icon ? <Icon /> : <span>{brand.label}</span>}
    </div>
  );
}

function CertificationsSection({ certifications }) {
  return (
    <section className="content-section" id="certifications">
      <SectionHeading
        description="A dedicated certification section with clearer issuer identity, cleaner card layout, and direct access to each credential."
        eyebrow="Certifications"
        title="Verified learning across platforms and domains."
      />

      <div className="certifications-grid">
        {certifications.map((certification, index) => (
          <ScrollReveal className="certification-card" delay={0.05 + index * 0.04} key={certification.title}>
            <div className="certification-card-top">
              <IssuerBadge issuer={certification.issuer} issuerKey={certification.issuerKey} />
              <div>
                <p className="section-eyebrow">Certificate</p>
                <p className="timeline-organization">{certification.issuer}</p>
              </div>
            </div>
            <h3 className="section-subtitle">{certification.title}</h3>
            <a
              className="certification-link"
              href={certification.link}
              rel="noreferrer"
              target="_blank"
            >
              View Certificate
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export default CertificationsSection;
