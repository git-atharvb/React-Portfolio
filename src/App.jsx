import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion';
import {
  FaGithub, FaInstagram, FaLinkedin, FaXTwitter,
  FaArrowUpRightFromSquare, FaDownload, FaMoon, FaSun,
  FaCode, FaShieldHalved, FaBrain, FaLaptopCode
} from 'react-icons/fa6';

import './App.css';

// --- UTILITY COMPONENTS ---
function AuroraBackground() {
  return <div className="aurora-bg" aria-hidden="true" />;
}

function ScrollReveal({ children, className = '', delay = 0, blur = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: blur ? 'blur(8px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: blur ? 'blur(0px)' : 'none' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = '', onClick, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  const handlePointerMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`magnetic-btn btn-neo ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// --- DATA CONFIGURATION ---
const techStack = ['ReactJS', 'Vite', 'Angular', 'Node.js', 'Firebase', 'MongoDB Atlas'];
const roles = ['Software Engineer', 'Full-Stack Developer', 'Creative Coder'];
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const highlights = [
  { label: 'Projects Built', value: '18+' },
  { label: 'Internships', value: '2' },
  { label: 'Certifications', value: '6+' },
  { label: 'Current CGPA', value: '8.83' },
];

const focusAreas = [
  {
    title: 'Product Engineering',
    detail: 'Building scalable web products with clean architecture and user-focused flows.',
    icon: FaLaptopCode,
  },
  {
    title: 'Cybersecurity Lens',
    detail: 'Applying secure-by-design thinking to interfaces, workflows, and data handling.',
    icon: FaShieldHalved,
  },
  {
    title: 'AI + Automation',
    detail: 'Exploring AI-assisted workflows and practical automation for real-world use cases.',
    icon: FaBrain,
  },
];

const education = [
  {
    degree: "Bachelor's in Engineering in Computer Science Engineering (AIML)",
    institute: 'Viva Institute Of Technology, Mumbai University',
    period: '2024 - 2027',
    detail: 'Specializing in Artificial Intelligence & Machine Learning. CGPA: 8.83',
  },
  {
    degree: 'Diploma in Information Technology',
    institute: 'Thakur Polytechnic, MSBTE',
    period: '2021 - 2024',
    detail: 'Excellence in core fundamentals of Information Technology.',
  },
];

const experience = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'PrepXL Inc.',
    detail: 'Contributed to real-world products including Circular-Equalizer and Audio Transcriptors.',
  },
  {
    role: 'Student Intern',
    company: 'Static Int Educare',
    detail: 'Completed industrial training, assessments, and collaborative project workflows.',
  },
];

const projects = [
  {
    title: 'NexaShield',
    description: 'A security-focused dashboard that helps teams monitor threat signals and automate first-response actions.',
    stack: ['ReactJS', 'Firebase', 'Tailwind CSS'],
    repo: '#',
    demo: '#',
  },
  {
    title: 'PAIVA',
    description: 'An AI-powered virtual assistant concept for handling smart productivity tasks and user reminders.',
    stack: ['Vite', 'JavaScript', 'MongoDB Atlas'],
    repo: '#',
    demo: '#',
  },
];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.3 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handlePointerMove = (event) => {
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  };

  return (
    <div
      className={`theme-shell ${theme === 'light' ? 'theme-light' : 'theme-dark'} min-h-screen selection:bg-accent selection:text-white`}
      onMouseMove={handlePointerMove}
    >
      <AuroraBackground />
      
      {/* Depth Hardware Cursor */}
      <motion.div
        className="cursor-glow hidden lg:block"
        style={{ left: smoothPointerX, top: smoothPointerY }}
      />
      
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left" style={{ scaleX: scrollYProgress }} />

      {/* Floating Navigation Pill */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="floating-nav flex items-center gap-6 pointer-events-auto">
          <a className="font-bold tracking-tight px-3 text-main hover:text-accent transition-colors" href="#home">Atharv.dev</a>
          <ul className="hidden md:flex items-center gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <a className="nav-link" href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="theme-toggle px-3 flex items-center justify-center">
            {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          </button>
        </nav>
      </div>

      {/* Main Bento Grid Layout */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-32 space-y-8 md:space-y-12">
        
        {/* HERO SECTION */}
        <section id="home">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              
              {/* Hero Intro */}
              <div className="bento-card col-span-1 lg:col-span-8 flex flex-col justify-center p-8 md:p-12 min-h-[420px]">
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-accent mb-4">
                  Hi, I'm Atharv — {roles[roleIndex]}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-main mb-6">
                  Designing & Engineering <br />
                  <span className="text-gradient">Digital Experiences.</span>
                </h1>
                <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                  I build polished, performant web applications with modern UI systems, scalable code, and purposeful interactions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <MagneticButton onClick={() => window.location.href='#projects'} className="btn-primary">View My Work</MagneticButton>
                  <MagneticButton onClick={() => window.open('#', '_blank')} className="btn-secondary">
                    <FaDownload className="mr-2" /> Resume
                  </MagneticButton>
                </div>
              </div>

              {/* Hero Metrics */}
              <div className="col-span-1 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
                {highlights.map((item) => (
                  <div key={item.label} className="bento-card flex flex-col items-center justify-center p-6 text-center lg:min-h-[195px]">
                    <span className="text-4xl md:text-5xl font-extrabold text-main mb-2">{item.value}</span>
                    <span className="text-xs uppercase tracking-widest text-muted font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about">
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              
              {/* About Content */}
              <div className="bento-card col-span-1 lg:col-span-7 p-8 md:p-10">
                <h2 className="text-3xl font-bold text-main mb-6">About Me</h2>
                <p className="text-muted leading-relaxed mb-8">
                  My journey in development started with curiosity and evolved into a passion for building impactful products. Dedicated and detail-oriented, I stay creative through logic, code, and multimedia design.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {focusAreas.map((item) => (
                    <div key={item.title} className="p-5 rounded-2xl bg-surface-alt border border-soft transition-colors hover:border-accent">
                      <item.icon className="text-2xl text-accent mb-4" />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-main mb-2">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Hobbies */}
              <div className="col-span-1 lg:col-span-5 grid grid-rows-2 gap-6 md:gap-8">
                <div className="bento-card p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-main mb-6">Core Stack</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {techStack.map((tech) => (
                      <span key={tech} className="px-4 py-1.5 rounded-full bg-surface border border-soft text-sm font-medium text-main hover:text-accent hover:border-accent transition-all duration-300">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="bento-card p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-main mb-6">Interests</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {['Painting', 'Chess', 'Table Tennis', 'Swimming', 'Canva Design'].map((hobby) => (
                      <span key={hobby} className="px-4 py-1.5 rounded-full bg-surface-alt border border-soft text-sm font-medium text-muted transition-all hover:text-main">{hobby}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* TIMELINE SECTION */}
        <section id="timeline">
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              
              {/* Experience */}
              <div className="bento-card p-8 md:p-10">
                <h2 className="text-3xl font-bold text-main mb-8">Experience</h2>
                <div className="relative border-l border-soft ml-3 space-y-8 pl-6 md:pl-8">
                  {experience.map((item) => (
                    <div key={item.role} className="relative">
                      <span className="absolute -left-[32px] md:-left-[40px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-surface"></span>
                      <h3 className="text-lg font-bold text-main">{item.role}</h3>
                      <p className="text-sm font-semibold text-accent mt-1 mb-3">{item.company}</p>
                      <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bento-card p-8 md:p-10">
                <h2 className="text-3xl font-bold text-main mb-8">Education</h2>
                <div className="relative border-l border-soft ml-3 space-y-8 pl-6 md:pl-8">
                  {education.map((item) => (
                    <div key={item.degree} className="relative">
                      <span className="absolute -left-[32px] md:-left-[40px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-surface"></span>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">{item.period}</p>
                      <h3 className="text-lg font-bold text-main">{item.degree}</h3>
                      <p className="text-sm font-semibold text-accent mt-1 mb-3">{item.institute}</p>
                      <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <ScrollReveal delay={0.3}>
            <h2 className="text-4xl font-extrabold text-main mb-8 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project) => (
                <div key={project.title} className="bento-card group flex flex-col p-6 md:p-8">
                  <div className="h-48 w-full rounded-xl bg-surface-alt border border-soft mb-6 flex items-center justify-center relative overflow-hidden transition-colors group-hover:border-accent">
                    <FaCode className="text-4xl text-muted group-hover:scale-110 group-hover:text-accent transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-alt to-transparent opacity-50"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-main mb-3">{project.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((item) => (
                      <span key={`${project.title}-${item}`} className="px-3 py-1 rounded-md bg-surface border border-soft text-xs text-muted font-semibold">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <MagneticButton onClick={() => window.open(project.repo, '_blank')} className="btn-secondary !py-2 !px-4 !text-xs w-full sm:w-auto">
                      <FaGithub className="text-base mr-2" /> Source
                    </MagneticButton>
                    <MagneticButton onClick={() => window.open(project.demo, '_blank')} className="btn-primary !py-2 !px-4 !text-xs w-full sm:w-auto">
                      <FaArrowUpRightFromSquare className="text-base mr-2" /> Demo
                    </MagneticButton>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer id="contact" className="border-t border-soft bg-surface-alt relative z-10 overflow-hidden">
        <ScrollReveal>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-main mb-6">Let's Connect</h2>
              <p className="text-muted text-lg max-w-md mb-8 leading-relaxed">
                I'm always open to discussing product design work or partnership opportunities. Let's build something great.
              </p>
              <a
                href="mailto:youremail@example.com"
                className="text-2xl md:text-3xl font-bold text-accent hover:text-main transition-colors inline-block w-max mb-10"
              >
                youremail@example.com
              </a>
              <div className="flex gap-4">
                {[
                  { icon: FaLinkedin, href: "https://www.linkedin.com" },
                  { icon: FaGithub, href: "https://github.com" },
                  { icon: FaInstagram, href: "https://www.instagram.com" },
                  { icon: FaXTwitter, href: "https://x.com" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="h-12 w-12 rounded-full bg-surface border border-soft flex items-center justify-center text-xl text-muted hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}

export default App;