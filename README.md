# Atharv Bowlekar Portfolio

Single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion. The current version is tuned to feel stronger in recruiter reviews while still keeping a visually distinctive, motion-rich presentation.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- React Icons
- Formspree for contact submission

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.
- `npm run lint` checks the project with ESLint.

## Content Updates

Portfolio content lives in `src/content/portfolioContent.js`.

Update this file to change:

- hero copy and role rotation
- navigation items
- highlights and focus areas
- experience, education, and certifications
- projects and project link states
- social links and contact form text

## Structure

- `src/App.jsx`: app shell, theme state, pointer effects, and section composition
- `src/components/`: reusable UI building blocks
- `src/sections/`: page sections such as hero, about, journey, projects, and contact
- `src/content/portfolioContent.js`: source of truth for editable portfolio data
- `src/App.css`: theme tokens and page-specific styling

## Notes

- The contact form posts to Formspree through the configured endpoint in `portfolioContent.js`.
- Project cards handle missing live or source links gracefully instead of opening placeholder URLs.
- The hero image has been optimized for better production bundle size.
