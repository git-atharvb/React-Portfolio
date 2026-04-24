const fs = require('fs');
const path = require('path');

const content = @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import 'tailwindcss';

@theme {
  --color-background: var(--bg-main);
  --color-surface: var(--bg-surface);
  --color-surface-hover: var(--bg-surface-hover);
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-accent: var(--color-accent);
  --color-accent-hover: var(--color-accent-hover);
  --color-border: var(--border-color);
  --color-text-main: var(--text-main);
  --color-text-muted: var(--text-muted);
  --color-text-soft: var(--text-soft);
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --animate-shine: shine 3s linear infinite;
  @keyframes shine { to { background-position: 200% center; } }
}

@layer base {
  :root {
    --bg-main: linear-gradient(135deg, #fafafa 0%, #f5f3ff 100%);
    --bg-surface: rgba(255, 255, 255, 0.85);
    --bg-surface-hover: rgba(255, 255, 255, 1);
    --color-primary: #18181b;
    --color-secondary: #52525b;
    --color-accent: #6366f1;
    --color-accent-hover: #4f46e5;
    --border-color: rgba(99, 102, 241, 0.15);
    --text-main: #1f2937;
    --text-muted: #4b5563;
    --text-soft: #9ca3af;
    --shadow-surface: 0 10px 40px -10px rgba(99, 102, 241, 0.12);
    --shadow-hover: 0 20px 40px -10px rgba(99, 102, 241, 0.2);
    --accent-soft: rgba(99, 102, 241, 0.1);
    --accent-glow: rgba(99, 102, 241, 0.35);
  }

  .dark {
    --bg-main: linear-gradient(135deg, #09090b 0%, #0f0f1a 50%, #0a0a12 100%);
    --bg-surface: rgba(17, 17, 22, 0.75);
    --bg-surface-hover: rgba(24, 24, 27, 0.9);
    --color-primary: #fafafa;
    --color-secondary: #a1a1aa;
    --color-accent: #22d3ee;
    --color-accent-hover: #06b6d4;
    --border-color: rgba(34, 211, 238, 0.15);
    --text-main: #f4f4f5;
    --text-muted: #d4d4d8;
    --text-soft: #71717a;
    --shadow-surface: 0 10px 40px -10px rgba(34, 211, 238, 0.08);
    --shadow-hover: 0 20px 40px -10px rgba(34, 211, 238, 0.18);
    --accent-soft: rgba(34, 211, 238, 0.12);
    --accent-glow: rgba(34, 211, 238, 0.35);
  }

  html { scroll-behavior: smooth; scroll-padding-top: 7rem; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body { margin: 0; background: var(--bg-main); color: var(--text-main); font-family: Inter, sans-serif; -webkit-font-smoothing: antialiased; min-width: 320px; }
  * { box-sizing: border-box; }
  img { display: block; max-width: 100%; height: auto; }
  a { color: inherit; text-decoration: none; }
  button, input, textarea { font: inherit; }
  button { cursor: pointer; }
  p, h1, h2, h3, h4 { margin: 0; }
  p { line-height: 1.65; text-justify: distribute; hyphens: auto; }
  :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
  ::selection { background: var(--color-accent); color: #ffffff; }
}

@layer components {
  .content-panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; box-shadow: var(--shadow-surface); transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); }
  .content-panel:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); border-color: var(--accent-soft); }
  .section-eyebrow { color: var(--color-accent); font-family: JetBrains Mono, monospace; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; display: block; opacity: 0.9; }
  .section-subtitle { font-size: 1.875rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.025em; color: var(--text-main); }
  .hero-title { font-size: clamp(2.7rem, 6vw, 4.5rem); font-weight: 800; letter-spacing: -0.04em; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--text-main) 0%, var(--text-muted) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-tagline { font-size: 1.25rem; margin-bottom: 1rem; max-width: 42rem; line-height: 1.5; font-weight: 500; color: var(--text-muted); }
  .button-primary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.5rem; background: var(--color-accent); color: #ffffff; font-weight: 600; border-radius: 14px; border: none; box-shadow: 0 8px 24px -4px var(--accent-glow); transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); cursor: pointer; }
  .button-primary:hover { background: var(--color-accent-hover); transform: translateY(-2px); box-shadow: 0 12px 32px -4px var(--accent-glow); }
  .button-primary:active { transform: translateY(0) scale(0.98); }
  .button-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.5rem; background: var(--bg-surface); color: var(--text-main); font-weight: 600; border-radius: 14px; border: 1px solid var(--border-color); box-shadow: 0 4px 16px -2px var(--shadow-surface); transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); cursor: pointer; }
  .button-secondary:hover { background: var(--bg-surface-hover); border-color: var(--accent-soft); color: var(--color-accent); transform: translateY(-2px); box-shadow: 0 8px 24px -2px var(--shadow-hover); }
  .button-secondary:active { transform: translateY(0) scale(0.98); }
  .skill-badge { display: inline-flex; align-items: center; padding: 0.5rem 1rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main); font-family: JetBrains Mono, monospace; font-size: 0.875rem; border-radius: 12px; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); cursor: default; }
  .skill-badge:hover { border-color: var(--accent-soft); color: var(--color-accent); transform: translateY(-2px); box-shadow: 0 8px 16px -4px var(--shadow-hover); }
};

fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), content);
console.log('CSS written successfully');
