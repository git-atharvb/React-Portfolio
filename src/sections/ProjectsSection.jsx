import { FaArrowUpRightFromSquare, FaCodeBranch, FaLaptopCode } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

function ProjectActions({ liveUrl, repoUrl, status }) {
  return (
    <div className="project-actions">
      <ActionButton
        className="button-secondary compact"
        disabled={!repoUrl}
        href={repoUrl || undefined}
        rel="noreferrer"
        target="_blank"
      >
        <FaCodeBranch aria-hidden="true" />
        {repoUrl ? 'Source' : 'Source soon'}
      </ActionButton>
      <ActionButton
        className="button-primary compact"
        disabled={!liveUrl}
        href={liveUrl || undefined}
        rel="noreferrer"
        target="_blank"
      >
        <FaArrowUpRightFromSquare aria-hidden="true" />
        {liveUrl ? 'Live demo' : status}
      </ActionButton>
    </div>
  );
}

function ProjectsSection({ onSpotlight, projects }) {
  return (
    <section className="content-section" id="projects">
      <SectionHeading
        align="center"
        description="These project cards are written to help someone hiring quickly understand the product area, stack, and current state without chasing extra context."
        eyebrow="Projects"
        title="Featured work with clearer signals."
      />

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ScrollReveal className="panel project-card" delay={0.06 + index * 0.05} key={project.title}>
            <div className="project-visual" onPointerMove={onSpotlight}>
              <span className="project-pill">{project.highlight}</span>
              <FaLaptopCode aria-hidden="true" />
            </div>
            <div className="project-copy">
              <p className="section-eyebrow">{project.status}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="tag-list">
              {project.stack.map((item) => (
                <span className="tag" key={`${project.title}-${item}`}>
                  {item}
                </span>
              ))}
            </div>
            <ProjectActions liveUrl={project.liveUrl} repoUrl={project.repoUrl} status={project.status} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
