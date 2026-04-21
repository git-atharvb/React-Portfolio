import ScrollReveal from '../ScrollReveal.jsx';

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignmentClass = align === 'center' ? 'section-heading-center' : '';

  return (
    <ScrollReveal className={`section-heading ${alignmentClass}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </ScrollReveal>
  );
}

export default SectionHeading;
