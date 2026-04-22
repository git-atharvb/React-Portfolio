import { motion } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaCodeBranch, FaLaptopCode } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

const MotionArticle = motion.article;

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
        {repoUrl ? 'GitHub' : 'GitHub soon'}
      </ActionButton>
      <ActionButton
        className="button-primary compact"
        disabled={!liveUrl}
        href={liveUrl || undefined}
        rel="noreferrer"
        target="_blank"
      >
        <FaArrowUpRightFromSquare aria-hidden="true" />
        {liveUrl ? 'Live Demo' : status}
      </ActionButton>
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <ScrollReveal className="featured-project-shell" delay={0.06}>
      <div className="featured-project-copy">
        <div className="status-pill">Featured Project</div>
        <p className="section-eyebrow mt-4">Large card showcase</p>
        <h3 className="featured-project-title">{project.title}</h3>
        <p className="text-base leading-8 text-(--text-muted)">{project.description}</p>
        <div className="tag-list mt-6">
          {project.stack.map((item) => (
            <span className="skill-badge" key={`${project.title}-${item}`}>
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div className="featured-project-metric" key={metric}>
              {metric}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ProjectActions liveUrl={project.liveUrl} repoUrl={project.repoUrl} status={project.status} />
        </div>
      </div>

      <div className="featured-project-visual">
        <div className={`project-browser project-browser-${project.theme}`}>
          <div className="project-browser-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="project-browser-body">
            <div className="project-browser-main">
              <div className="project-browser-sidebar" />
              <div className="project-browser-panels">
                <div className="project-browser-panel large" />
                <div className="project-browser-panel" />
                <div className="project-browser-panel" />
              </div>
            </div>
            <div className="project-browser-caption">
              <FaLaptopCode aria-hidden="true" />
              <span>{project.highlight}</span>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function BentoProjectTile({ index, onSpotlight, project }) {
  const sizeClass = index % 3 === 0 ? 'bento-wide' : index % 3 === 1 ? 'bento-tall' : '';

  return (
    <ScrollReveal className={sizeClass} delay={0.08 + index * 0.06}>
      <MotionArticle
        className="bento-project-card"
        onPointerMove={onSpotlight}
        whileHover={{ y: -8, scale: 1.01 }}
      >
        <div className={`bento-project-visual bento-project-${project.theme}`}>
          <span className="project-pill">{project.highlight}</span>
          <FaLaptopCode aria-hidden="true" />
        </div>
        <div className="space-y-3">
          <p className="section-eyebrow">{project.status}</p>
          <h3 className="section-subtitle">{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <div className="tag-list">
          {project.stack.map((item) => (
            <span className="skill-badge" key={`${project.title}-${item}`}>
              {item}
            </span>
          ))}
        </div>
        <ProjectActions liveUrl={project.liveUrl} repoUrl={project.repoUrl} status={project.status} />
      </MotionArticle>
    </ScrollReveal>
  );
}

function ProjectsSection({ onSpotlight, projects }) {
  const featuredProject = projects.find((project) => project.featured) || projects[0];
  const remainingProjects = projects.filter((project) => project.title !== featuredProject.title);

  return (
    <section className="content-section" id="projects">
      <SectionHeading
        description="A hybrid project layout: one large showcase card for the strongest work, followed by a tighter bento grid for the rest of the portfolio."
        eyebrow="Projects"
        title="Featured work with hierarchy and motion."
      />

      <FeaturedProject project={featuredProject} />

      <div className="bento-project-grid">
        {remainingProjects.map((project, index) => (
          <BentoProjectTile index={index} key={project.title} onSpotlight={onSpotlight} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
