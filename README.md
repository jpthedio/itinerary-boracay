# 🏝️ Boracay Itinerary — JP & Mish

A 5-day, 4-night anniversary trip planner for Boracay, Philippines. Built as a single-page React app with interactive timeline, calendar view, budget tracker, and detailed travel info.

**Live:** [itinerary-boracay.vercel.app](https://itinerary-boracay.vercel.app)

---

## Features

- **Timeline** — Day-by-day accordion with expandable activities, costs, tips, and Google Maps links
- **Calendar** — Grid overview with tap-to-expand day cards
- **Budget** — Full cost breakdown, food hitlist, and interactive booking checklist
- **Details** — Accommodation options, flight info, practical tips, and emergency contacts
- **Auto-detect** — Defaults to the current trip day during the actual travel dates

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 |
| Build | Vite |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix primitives) |
| Hosting | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Deploy to Vercel
vercel --prod
```

## Project Structure

```
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── boracay-itinerary.jsx    # Original artifact source
├── SHIPIT.md                # Reusable deploy pipeline guide
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx               # Main app component
    ├── lib/utils.js
    └── components/ui/
        ├── tabs.jsx
        ├── checkbox.jsx
        └── badge.jsx
```

## How This Was Built

1. Prototyped the full component in a **Claude Artifact**
2. Scaffolded a Vite + React + Tailwind project with **Claude Code**
3. Tested locally, deployed to **Vercel** in one command

See [SHIPIT.md](./SHIPIT.md) for the full reusable pipeline.
