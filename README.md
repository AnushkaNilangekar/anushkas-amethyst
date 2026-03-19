# Anushka's Amethyst — Portfolio

Personal portfolio website!

## Stack

- **React + Vite** — framework and dev tooling
- **Tailwind CSS** — styling
- **Framer Motion** — animations and scroll transitions
- **tsparticles** — particle background (falling crystals/sparkles)
- **Lenis** — smooth scroll
- **Howler.js** — background music
- **ESLint** — code quality

## Sections

Splash → Hero → About → Experience → Projects → Skills → Contact

## Dev

```bash
npm install
npm run dev       # localhost:3000
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # lint
```

## Content

All personal content (bio, projects, experience, skills, links) lives in one file:

```
src/data/content.js
```

## Deployment

Deployed via Vercel — auto-deploys from the `main` branch.