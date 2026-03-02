# Ship-It Pipeline

**From idea to live URL in minutes.**

Artifact → Local → Git → Live

---

## Overview

A repeatable process for turning Claude Artifact prototypes into deployed, production-ready web apps.

| Phase | Tool | Output |
|-------|------|--------|
| 1. Prototype | Claude Artifact | Working React component |
| 2. Scaffold | Claude Code + Vite | Full project with dependencies |
| 3. Test | Local dev server | Verified, error-free build |
| 4. Version | Git + GitHub | Source control + collaboration |
| 5. Ship | Vercel | Live public URL |

---

## Phase 1: Prototype in Claude Artifact

Build your idea as a **single React component**. Focus on:

- Layout and structure
- Data shape and content
- Interactions and state
- Visual design

**Best practices:**
- Use **shadcn/ui** components (Tabs, Badge, Checkbox, Card, etc.) — they translate 1:1 to a real project
- Use **Tailwind CSS** for styling — no extra setup needed later
- Keep everything in one file — easier to scaffold from

**Output:** A single `.jsx` file (e.g., `my-app.jsx`)

---

## Phase 2: Scaffold with Claude Code

Drop the `.jsx` file in a project folder, then prompt:

```
Create package.json for a Vite + React + Tailwind project.
Add shadcn/ui components for [tabs/checkbox/badge/etc].
Wire up the artifact as src/App.jsx.
Install, build, and run locally.
```

**What gets created:**

```
project/
├── package.json            # Vite + React + Radix + Tailwind
├── vite.config.js          # @ alias for clean imports
├── tailwind.config.js      # Content paths configured
├── postcss.config.js       # Tailwind + Autoprefixer
├── index.html              # Entry HTML
├── .gitignore              # node_modules, dist, .vercel, .claude
└── src/
    ├── main.jsx            # React DOM entry point
    ├── index.css            # @tailwind directives
    ├── App.jsx              # Your artifact component
    ├── lib/utils.js         # cn() merge helper
    └── components/ui/       # shadcn/ui components (Tabs, Badge, etc.)
```

**Key dependencies:**
- `react` + `react-dom` — UI framework
- `@radix-ui/*` — Accessible primitives (used by shadcn)
- `class-variance-authority` + `clsx` + `tailwind-merge` — Style utilities
- `tailwindcss` + `autoprefixer` + `postcss` — CSS toolchain
- `vite` + `@vitejs/plugin-react` — Build tool

---

## Phase 3: Test Locally

```bash
npm install           # Install dependencies
npm run dev           # Start dev server → localhost:5173
npm run build         # Verify production build succeeds
```

**Check for:**
- No console errors
- All tabs/pages render correctly
- Interactions work (clicks, toggles, state)
- Responsive layout (resize browser)

---

## Phase 4: Git + GitHub

```bash
git init
git add .
git commit -m "Initial commit: [project description]"
gh repo create username/project-name --public --source=. --push
```

**`.gitignore` should include:**
```
node_modules
dist
.vercel
.claude
*.local
```

**Or prompt Claude Code:**
```
Init git, commit everything, create a GitHub repo, and push.
```

---

## Phase 5: Deploy to Vercel

**First time (one-time setup):**
```bash
npm i -g vercel
```

**Deploy:**
```bash
vercel --prod
```

Vercel auto-detects Vite, installs deps, builds, and gives you a live URL.

**Auto-deploy (optional):**
Connect the GitHub repo in Vercel Dashboard → Settings → Git. Every `git push` triggers a new deploy.

---

## One-Shot Prompt

Copy-paste this for future projects:

```
I have a React component in [filename].jsx that uses [list shadcn components].
Create a Vite + React + Tailwind project around it.
Set up package.json, install dependencies, deploy locally and test,
init git, push to GitHub, and deploy to Vercel production.
```

---

## When to Level Up

| You need... | Upgrade to |
|-------------|-----------|
| Backend / API routes | Next.js on Vercel |
| Auth + database | Next.js + Supabase |
| Multiple pages | Add React Router or Next.js |
| SEO / server rendering | Next.js (auto SSR) |
| Mobile app | React Native or Expo |

---

## Stack Reference

| Layer | Tool | Why |
|-------|------|-----|
| Prototype | Claude Artifact | Instant visual iteration |
| Framework | React 18 | Component model, huge ecosystem |
| Build | Vite | Fast HMR, clean config |
| Styling | Tailwind CSS | Utility-first, no CSS files |
| Components | shadcn/ui + Radix | Accessible, composable, beautiful |
| Version Control | Git + GitHub | Standard, integrates with everything |
| Hosting | Vercel | Zero-config deploys, free tier, fast CDN |
