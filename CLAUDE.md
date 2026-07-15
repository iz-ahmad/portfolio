# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install deps
npm run dev        # dev server (localhost:3000)
npm run build       # production build — this is a *static export* (writes to out/)
npm run start       # serve the last build (must run build first)
npm run lint        # next lint
npm run type-check    # tsc --noEmit
```

There is no test suite/framework configured in this repo.

`next.config.ts` sets `output: 'export'` with `images.unoptimized: true` and `trailingSlash: true` — every route must be statically renderable at build time (no server-only APIs, no dynamic route handlers relying on a Node runtime). `src/app/page.tsx` fetches GitHub contribution data at build/request time via `fetch(..., { next: { revalidate: 86400 } })` with a try/catch fallback to an empty grid — keep that fallback intact since the static export can't tolerate an unhandled fetch failure.

## Architecture

**Single-page portfolio + one standalone landing page.** The site is one long-scroll page (`src/app/page.tsx` → `AppShell`) plus a second, unrelated static route at `src/app/packages/turbo-seeder/page.tsx` (a marketing landing page for an open-source Laravel package). The two routes share only the `ambient/` decorative components and design tokens — they do not share section components.

**`AppShell` (`src/components/AppShell.tsx`) is the orchestrator** for the main page: it owns loading-screen state, scroll-spy (`IntersectionObserver` over section ids from `src/data/sections.json`), scroll-reveal (`.reveal` → `.in` class toggling), and capability flags (`prefers-reduced-motion`, `pointer: fine`) that gate whether `Starfield`, `Scanlines`, and `CustomCursor` mount. Section order in `AppShell` is the source of truth for page structure; `sections.json` must stay in sync with the `id`s used there for nav/scroll-spy to work.

**Content is data-driven.** Each section component (`src/components/sections/*.tsx`) reads from a matching JSON file in `src/data/` (e.g. `experiences.json`, `projects.json`, `skills.json`, `testimonials.json`), typed via shared interfaces in `src/types/index.ts`. Adding/editing content is usually a JSON edit, not a component edit — check `src/types/index.ts` first to see the expected shape.

**Component folders by role:**
- `components/sections/` — the actual page sections (Hero, Experience, SkillsOrbit, Projects, Testimonials, BugSnake game, etc.)
- `components/chrome/` — persistent UI chrome: `SideNav`/`MobileNav` (driven by `sections.json` + `active` state from scroll-spy), `TopHud`, `SoundToggle`, `CustomCursor`, `LoadingScreen`
- `components/ambient/` — purely decorative background layers (`BgGrid`, `Starfield`, `Scanlines`), shared between the main page and the turbo-seeder page
- `components/packages/TurboSeeder/` — components used only by the `/packages/turbo-seeder` route

**Styling is plain global CSS, not modules/Tailwind.** `src/app/globals.css` `@import`s the stylesheets in `src/styles/` (`base.css`, `sections-styles.css`, `experience.css`, `oss.css`, `testimonials.css`, `extras.css`, `turbo-seeder.css`). Some sections (Experience, OSS, Testimonials, Turbo Seeder) have their own dedicated stylesheet; everything else lives in `sections-styles.css`. When adding a new section, prefer adding to the relevant existing stylesheet over creating a new one unless the section is large enough to warrant its own file (as Experience/Testimonials/OSS did).

**Sound effects** (`src/lib/sfx.ts`) use raw Web Audio (`AudioContext`, oscillators, generated noise buffers) — there's no audio asset pipeline. Mute state persists to `localStorage` (`iz_muted`) and is checked lazily via `ensureCtx()`. `SoundToggle` and `AppShell`'s boot sound are the main call sites; new interactive sound cues should go through `SFX.play(name)` with a new case in the `switch`, not a new ad hoc `AudioContext`.

**Path alias:** `@/*` → `src/*` (see `tsconfig.json`).
