import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  FaGithub, FaInstagram, FaLinkedin, FaXTwitter,
  FaArrowUpRightFromSquare, FaDownload, FaMoon, FaSun,
  FaCode, FaShieldHalved, FaBrain, FaLaptopCode, FaArrowRight
} from 'react-icons/fa6';

import './App.css';

// --- UTILITY COMPONENTS ---
function AuroraBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return <motion.div className="aurora-bg" style={{ y }} aria-hidden="true" />;
}

function ScrollReveal({ children, className = '', delay = 0, blur = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: blur ? 'blur(8px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: blur ? 'blur(0px)' : 'none' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
      className={`w-full ${className}`}
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

// New component for 3D tilt and border spotlight effect
function TiltBentoCard({ children, className = '' }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [7, -7]); // Reduced tilt
  const rotateY = useTransform(mouseX, [-150, 150], [-7, 7]);

  function handlePointerMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // For 3D tilt
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
    
    // For border spotlight
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: '1000px',
        rotateX,
        rotateY,
      }}
    >
      {children}
    </motion.div>
  );
}

// --- DATA CONFIGURATION ---
const techStack = ['HTML5/CSS3', 'JavaScript (ES6+)', 'React.js', 'PyQt6', 'Python', 'Java', 'AWS', 'Firebase'];
const roles = ['Full Stack Developer', 'AI/ML Enthusiast', 'Engineer', 'Passionate Learner', 'Motivated Student'];
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const highlights = [
  { label: 'Projects Built', value: '18+' },
  { label: 'Internships', value: '2' },
  { label: 'Certifications', value: '9+' },
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
    institute: 'Thakur Polytechnic, Maharashtra State Board of Technical Education',
    period: '2021 - 2024',
    detail: 'Excellence in Core Fundamentals of IT.',
  },
];

const certifications = [
  { title: 'DSA Problem Solving for Interviews using Java', issuer: 'Scaler', link: 'https://drive.google.com/file/d/1S8N73IlglAxgI8mjIloyxgj3lUfpJjyv/view?usp=drive_link' },
  { title: 'Deep Dive into Deep Learning', issuer: 'Scaler', link: 'https://drive.google.com/file/d/1Ce7VZZJmOfdbPmRX3x0mUYPnSnAsr9LS/view?usp=drive_link' },
  { title: 'Foundations of Prompt Engineering', issuer: 'Amazon Web Services', link: 'https://drive.google.com/file/d/12GeroEVRkfxtDvd3vEhaWqLn_mYYwEEW/view?usp=drive_link' },
  { title: 'GitHub Fundamentals', issuer: 'Microsoft Learn', link: 'https://drive.google.com/file/d/1NDHm5tOzJEcE8CJTEe22J8l-eOTjgBum/view?usp=drive_link' },
  { title: 'ReactJS - Web Development', issuer: 'Infosys Springboard', link: 'https://drive.google.com/file/d/1oKAUFuMNB9r3BRay43BokxtjtqPftFsi/view?usp=drive_link' },
  { title: 'Generative AI apps in Azure', issuer: 'Microsoft', link: 'https://drive.google.com/file/d/18GmkCzZKCFXdGYRWQafGoranN_nAqCWm/view?usp=drive_link' },
  { title: 'Data Visualization', issuer: 'Tata - Forage', link: 'https://drive.google.com/file/d/1PSuqH_Aip9lz5BT0VY3Y--KXgu6NcgGc/view?usp=drive_link' },
  { title: 'Software Engineering Job Simulation', issuer: 'JP Morgan Chase Co.', link: 'https://drive.google.com/file/d/1YVgx7JqNj-8WiLAugO4mEhmmijxZUwIS/view?usp=drive_link' },
  { title: 'Full Stack Java Development', issuer: 'Simpli-learn', link: 'https://drive.google.com/file/d/1IphtY07iBF4ocNMVbSctvLqXikgcYa3Z/view?usp=drive_link' }
];

const experience = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'PrepXL Inc.',
    detail: 'Working on real-world projects: Circular-Equalizer & Audio Transcriptors. (Dec 2025 - Present)',
  },
  {
    role: 'Student Intern',
    company: 'Static Int Educare',
    detail: 'Industrial Training & assessments and experienced first-hand working on mega-projects. (June 2024 - July 2024)',
  },
];

const projects = [
  {
    title: 'NexaShield',
    description: 'An advanced cybersecurity defense system capable of detecting SQL injection attacks in real-time logs.',
    stack: ['Python', 'Machine Learning', 'Flask'],
    repo: '#',
    demo: '#',
  },
  {
    title: 'Fitness Tracking App',
    description: 'A comprehensive fitness application to track workouts, monitor progress, and set health goals with real-time analytics.',
    stack: ['React Native', 'Firebase', 'Redux'],
    repo: '#',
    demo: '#',
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive admin panel for managing products, orders, and analytics visualization. (Coming Soon)',
    stack: ['React', 'Chart.js'],
    repo: '#',
    demo: '#',
  },
];


function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.3 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
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

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <div
      className={`theme-shell ${theme === 'light' ? 'theme-light' : 'theme-dark'} min-h-screen selection:bg-accent selection:text-white`}
      onMouseMove={handlePointerMove}
    >
      <AuroraBackground />
      {/* SVG Filter for creative flourish */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="1" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      
      {/* Depth Hardware Cursor */}
      <motion.div
        className="cursor-glow hidden lg:block"
        style={{ left: smoothPointerX, top: smoothPointerY }}
      />
      
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left" style={{ scaleX: scrollYProgress }} />

      {/* Floating Navigation Pill */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none drop-shadow-2xl">
        <nav className="floating-nav flex items-center gap-8 pointer-events-auto bg-surface/80">
          <a className="font-mono font-bold tracking-tight px-3 text-accent hover:text-main transition-colors text-lg" href="#home">
            &lt;atharv/&gt;
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <a className="nav-link hover:text-accent transition-colors" href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="theme-toggle px-3 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
            {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          </button>
        </nav>
      </div>

      {/* Main Bento Grid Layout */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6 py-24 md:py-32 flex flex-col gap-6 md:gap-8">
        
        {/* HERO SECTION */}
        <section id="home">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Hero Intro */}
              <div onPointerMove={handleSpotlight} className="bento-card col-span-1 lg:col-span-2 p-8 md:p-12 relative overflow-hidden group flex flex-col justify-center">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-accent-glow rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 h-full">
                  
                  {/* Left Side: Text & Name */}
                  <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left mt-4 md:mt-0">
                    {/* Pulsing Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-alt border border-soft text-[10px] sm:text-xs font-bold tracking-widest text-accent mb-6 w-max shadow-sm mx-auto md:mx-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                      </span>
                      AVAILABLE FOR WORK
                    </div>

                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted mb-2">
                      Hello, I'm
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tighter text-main mb-4">
                      <span className="text-metallic">Atharv</span> <br />
                      <span className="text-metallic">Bowlekar.</span>
                    </h1>
                    
                    <div className="text-base md:text-lg font-medium text-muted mb-6">
                      <span className="text-accent font-mono">
                        I am a {roles[roleIndex]}<span className="animate-pulse">|</span>
                      </span>
                    </div>

                    <p className="text-muted text-sm md:text-base max-w-md leading-relaxed mb-8 mx-auto md:mx-0">
                      Building secure, scalable digital experiences with a strong mindset, modern UI systems, and purposeful interactions.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <MagneticButton onClick={() => window.location.href='#projects'} className="btn-primary text-sm sm:text-base group">
                        View Projects <FaArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5" />
                      </MagneticButton>
                      <MagneticButton onClick={() => window.open('https://drive.google.com/file/d/1YVQzJDOFVzP63EwffPLHO8SBoXqEyxK-/view?usp=drive_link', '_blank')} className="btn-secondary text-sm sm:text-base group">
                        <FaDownload className="mr-2 inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" /> Resume
                      </MagneticButton>
                    </div>
                  </div>

                  {/* Right Side: Photo */}
                  <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 relative mb-6 md:mb-0">
                    <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-surface border border-soft rounded-full overflow-hidden shadow-2xl z-10 transform transition-transform duration-500 hover:scale-105">
                      <img 
                        src="assets/profile.png" 
                        alt="Atharv Bowlekar" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Profile+Photo' }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Metrics */}
              <div className="col-span-1 grid grid-cols-2 gap-4 md:gap-6">
                {highlights.map((item, i) => (
                  <div key={item.label} onPointerMove={handleSpotlight} className="bento-card flex flex-col items-center justify-center p-4 text-center aspect-square group hover:bg-surface-alt transition-colors">
                    <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-main to-muted mb-2 group-hover:scale-110 transition-transform duration-300">{item.value}</span>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about">
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* About Content */}
              <div onPointerMove={handleSpotlight} className="bento-card col-span-1 lg:col-span-2 p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-main mb-6">About Me</h2>
                <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                  Dedicated and detail-oriented aspiring Engineer with hands-on exposure to software development, modern programming languages, and AI/ML. Experienced in contributing to real world technical projects through internships and collaborative team work. Currently exploring the intersection of modern UI/UX and network security to build resilient web applications.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {focusAreas.map((item) => (
                    <div key={item.title} className="p-5 md:p-6 rounded-2xl bg-surface/50 border border-soft transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10 group">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-accent/20 transition-colors">
                        <item.icon className="text-2xl text-accent" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-main mb-3">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed font-medium">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Hobbies */}
              <div className="col-span-1 flex flex-col gap-6 md:gap-8">
                <div onPointerMove={handleSpotlight} className="bento-card p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-main mb-6">Core Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <motion.span 
                        key={tech} 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full bg-surface-alt border border-soft text-sm font-mono text-main cursor-default hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div onPointerMove={handleSpotlight} className="bento-card p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-main mb-6">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Painting', 'Chess', 'Table Tennis', 'Swimming', 'Canva Design'].map((hobby) => (
                      <span key={hobby} className="px-4 py-2 rounded-full bg-transparent border border-soft text-sm font-bold text-muted cursor-default transition-all hover:text-main hover:bg-surface-alt">{hobby}</span>
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
              <div onPointerMove={handleSpotlight} className="bento-card p-8 md:p-10 h-full">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-main mb-10">Experience</h2>
                <div className="relative border-l-2 border-soft ml-2 md:ml-3 space-y-10 pl-6 md:pl-8">
                  {experience.map((item) => (
                    <div key={item.role} className="relative">
                      {/* Glowing Timeline Node */}
                      <span className="absolute -left-[33px] md:-left-[41px] top-1.5 h-4 w-4 rounded-full bg-accent ring-4 ring-bg-main shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                      <h3 className="text-lg md:text-xl font-bold text-main">{item.role}</h3>
                      <p className="text-xs md:text-sm font-mono uppercase tracking-widest text-accent mt-2 mb-4">{item.company}</p>
                      <p className="text-base text-muted leading-relaxed font-medium">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certs */}
              <div className="flex flex-col gap-6 md:gap-8 h-full">
                
                {/* Education */}
                <div onPointerMove={handleSpotlight} className="bento-card p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-main mb-10">Education</h2>
                  <div className="relative border-l-2 border-soft ml-2 md:ml-3 space-y-8 pl-6 md:pl-8">
                    {education.map((item) => (
                      <div key={item.degree} className="relative">
                        <span className="absolute -left-[33px] md:-left-[41px] top-1 h-3 w-3 rounded-full bg-surface border-2 border-accent ring-4 ring-bg-main"></span>
                        <p className="text-xs font-mono text-muted mb-1">{item.period}</p>
                        <h3 className="text-base font-bold text-main leading-tight">{item.degree}</h3>
                        <p className="text-xs font-bold text-accent mt-2 mb-2">{item.institute}</p>
                        <p className="text-sm text-muted leading-relaxed font-medium">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Certifications */}
                <div onPointerMove={handleSpotlight} className="bento-card p-8 md:p-10 overflow-hidden flex flex-col flex-grow">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-main mb-6 flex justify-between items-center">
                    Certificates <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded-md">{certifications.length}</span>
                  </h2>
                  <div className="overflow-y-auto pr-2 space-y-3 max-h-[300px] scrollbar-thin">
                    {certifications.map((cert, i) => (
                      <a key={i} href={cert.link} target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-surface border border-soft hover:border-accent transition-colors group">
                        <h3 className="text-sm font-bold text-main group-hover:text-accent transition-colors">{cert.title}</h3>
                        <p className="text-xs text-muted mt-1 font-mono">{cert.issuer} <FaArrowUpRightFromSquare className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <ScrollReveal delay={0.3}>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-main mb-10 md:mb-12 text-center">Featured Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project) => (
                <TiltBentoCard key={project.title} className="bento-card group flex flex-col p-6 md:p-8">
                  <div className="h-40 md:h-48 w-full rounded-xl bg-surface-alt border border-soft mb-6 flex items-center justify-center relative overflow-hidden transition-colors group-hover:border-accent-glow">
                    <div className="absolute inset-0 bg-dot-pattern group-hover:opacity-60"></div>
                    <FaCode className="text-4xl md:text-5xl text-muted group-hover:scale-125 group-hover:text-accent transition-all duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-alt to-transparent opacity-50"></div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-main mb-3">{project.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6 flex-grow font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((item) => (
                      <span key={`${project.title}-${item}`} className="px-2 py-1 rounded-md bg-surface border border-soft text-[10px] tracking-wide text-muted font-mono uppercase">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <MagneticButton onClick={() => window.open(project.repo, '_blank')} className="btn-secondary !py-2 !px-4 !text-xs w-full sm:w-auto">
                      <FaGithub className="text-base mr-2" /> Source
                    </MagneticButton>
                    <MagneticButton onClick={() => window.open(project.demo, '_blank')} className="btn-primary !py-2 !px-4 !text-xs w-full sm:w-auto">
                      <FaArrowUpRightFromSquare className="text-base mr-2" /> Demo
                    </MagneticButton>
                  </div>
                </TiltBentoCard>
              ))}
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer id="contact" className="border-t border-soft bg-surface-alt relative z-10 overflow-hidden">
        <ScrollReveal>
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            
            {/* Contact Text & Socials */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-main mb-6">Let's Connect.</h2>
              <p className="text-muted text-base md:text-lg max-w-md mb-8 leading-relaxed font-medium">
                I'm always open to discussing product design work or partnership opportunities. Let's build something great.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/abowlekar" },
                  { icon: FaGithub, href: "https://github.com/git-atharvb" },
                  { icon: FaInstagram, href: "https://www.instagram.com/atharv.bowlekar?igsh=MTZubzdkOHhxaXV3MQ==" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-surface border border-soft flex items-center justify-center text-xl md:text-2xl text-muted hover:text-accent hover:border-accent hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300"
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Functional Formspree Contact Form */}
            <div className="flex items-center">
              <form action="https://formspree.io/f/xnjnddqk" method="POST" onSubmit={handleFormSubmit} className="w-full space-y-6 md:space-y-8 bg-surface p-6 md:p-10 rounded-2xl border border-soft shadow-lg relative overflow-hidden">
                <div className="relative">
                  <input type="text" name="name" id="name" className="peer w-full bg-transparent border-b-2 border-muted/30 py-3 text-main focus:outline-none focus:border-accent transition-colors placeholder-transparent" placeholder="Name" required />
                  <label htmlFor="name" className="absolute left-0 top-3 text-muted text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent cursor-text">Your Name</label>
                </div>
                
                <div className="relative">
                  <input type="email" name="email" id="email" className="peer w-full bg-transparent border-b-2 border-muted/30 py-3 text-main focus:outline-none focus:border-accent transition-colors placeholder-transparent" placeholder="Email" required />
                  <label htmlFor="email" className="absolute left-0 top-3 text-muted text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent cursor-text">Your Email</label>
                </div>
                
                <div className="relative">
                  <textarea name="message" id="message" rows="4" className="peer w-full bg-transparent border-b-2 border-muted/30 py-3 text-main focus:outline-none focus:border-accent transition-colors placeholder-transparent resize-none" placeholder="Message" required></textarea>
                  <label htmlFor="message" className="absolute left-0 top-3 text-muted text-base transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent cursor-text">Your Message</label>
                </div>
                
                <MagneticButton 
                  type="submit" 
                  disabled={formStatus === 'submitting'} 
                  className={`w-full py-4 text-base transition-all duration-300 ${
                    formStatus === 'success' ? '!bg-green-500 !text-white' : 
                    formStatus === 'error' ? '!bg-red-500 !text-white' : 'btn-primary'
                  }`}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 
                   formStatus === 'success' ? 'Message Sent Successfully!' : 
                   formStatus === 'error' ? 'Oops! Something went wrong.' : 
                   'Send Message'}
                </MagneticButton>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}

export default App;