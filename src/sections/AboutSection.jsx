import { motion } from 'framer-motion';
import { 
  FaBrain, 
  FaLaptopCode, 
  FaShieldHalved, 
  FaAws, 
  FaJava, 
  FaLinux,
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3,
  FaDocker,
  FaGit,
  FaFigma,
  FaDatabase,
  FaCloud,
  FaAngular,
  FaBolt,
  FaFire,
  FaServer,
  FaCode,
  FaGithub
} from 'react-icons/fa6';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

const iconMap = {
  product: FaLaptopCode,
  security: FaShieldHalved,
  ai: FaBrain,
};

const stackCategories = [
  {
    title: 'Frontend',
    skills: ['Angular', 'React', 'Vite', 'HTML', 'CSS', 'React Native', 'PyQt6'],
  },
  {
    title: 'Backend',
    skills: ['Java', 'NodeJS', 'Python'],
  },
  {
    title: 'Database',
    skills: ['MongoDB Atlas', 'SQLite', 'MySQL', 'Firebase', 'Supabase'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ', 'Figma', 'Cursor'],
  },
  {
    title: 'Deployment',
    skills: ['Vercel', 'Netlify', 'Firebase'],
  },
];

const beyondWorkInterests = [
  'Painting & Art ( Acrylic, Poster, Sketching )',
  'Designing & Video Editing ( Canva, Filmora, DaVinci ), Multimedia Operatives.',
  'Sport - Chess (Rapid/Blitz), Table-Tennis, Volleyball',
  'Cube Solving : Algorithmic Practice ( 3*3, 4*4 )',
  'Learning new technologies & exploring creativity.',
  'Travelling, adventure and wide experiences.',
];

const softSkills = [
  'Leadership',
  'Documentation',
  'Teamwork',
  'Punctuality',
  'Project Management',
  'Presentation',
  'Multi-lingual communication - English, Marathi, Hindi',
];

const getSkillIcon = (skillName) => {
  if (typeof skillName !== 'string') return FaLaptopCode;
  const normalized = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const map = {
    angular: FaAngular,
    react: FaReact,
    reactnative: FaReact,
    vite: FaBolt,
    javascript: FaNodeJs,
    js: FaNodeJs,
    typescript: FaNodeJs,
    ts: FaNodeJs,
    node: FaNodeJs,
    nodejs: FaNodeJs,
    python: FaPython,
    html: FaHtml5,
    css: FaCss3,
    aws: FaAws,
    amazonwebservices: FaAws,
    docker: FaDocker,
    git: FaGit,
    github: FaGithub,
    figma: FaFigma,
    vscode: FaCode,
    intellij: FaCode,
    cursor: FaCode,
    java: FaJava,
    linux: FaLinux,
    mongodbatlas: FaDatabase,
    mongodb: FaDatabase,
    mongo: FaDatabase,
    sqlite: FaDatabase,
    mysql: FaDatabase,
    supabase: FaDatabase,
    firebase: FaFire,
    vercel: FaServer,
    netlify: FaServer,
    postgres: FaDatabase,
    postgresql: FaDatabase,
    sql: FaDatabase,
    gcp: FaCloud,
    googlecloud: FaCloud,
    azure: FaCloud,
    kubernetes: FaCloud,
    k8s: FaCloud
  };
  return map[normalized] || FaLaptopCode;
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

          <ScrollReveal className="content-panel" delay={0.12}>
            <p className="section-eyebrow">Soft skills</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span className="skill-badge cursor-default" key={skill}>
                  {skill}
                </span>
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
            <div className="mt-6 space-y-6">
              {stackCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
                    {category.title}
                  </h4>
                  <motion.div 
                    className="flex flex-wrap gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.04 } },
                      hidden: {},
                    }}
                  >
                    {category.skills.map((skill) => {
                      const Icon = getSkillIcon(skill);
                      return (
                        <motion.span
                          className="skill-badge flex cursor-default items-center gap-2" 
                          key={skill}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 10 },
                            visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <Icon className="text-[var(--text-muted)]" aria-hidden="true" />
                          {skill}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="content-panel" delay={0.16}>
            <p className="section-eyebrow">Beyond work</p>
            <div className="mt-4 space-y-3">
              {beyondWorkInterests.map((interest) => (
                <h4 className="text-sm font-medium text-[var(--text-muted)] leading-relaxed" key={interest}>
                  {interest}
                </h4>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
