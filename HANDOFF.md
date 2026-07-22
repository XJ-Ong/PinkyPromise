# PinkyPromise — Handoff Document for AGY (UI/UX Visual Implementation)

**Date:** 22 July 2026  
**Status:** Phases 1 & 2 complete. Ready for Phase 3 (AGY's responsibility).

---

## 1. Project Overview

**PinkyPromise** is a "Pink Tax Checker" prototype — a frontend-only Next.js app that demonstrates detecting gender-based price discrimination (pink tax) using pre-defined scenarios. No backend, no real image recognition, no database.

**Tech Stack:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (components in `components/ui/`)
- lucide-react (icons)

**Repository:** https://github.com/XJ-Ong/PinkyPromise  
**Working Directory:** `/mnt/c/Data/Codes/Projects/PinkyPromise`

---

## 2. What Was Built (Phases 1 & 2)

### Phase 1 — Project Initialization
- Next.js scaffolded with TypeScript, Tailwind, shadcn/ui
- shadcn components installed: button, card, badge, dialog, input, select, progress, avatar, tabs
- Dependencies: clsx, tailwind-merge, class-variance-authority, lucide-react, @base-ui/react
- Folder structure created: `app/`, `components/`, `data/`, `lib/`, `public/images/`
- Config files: `.gitignore`, `README.md`, `LICENSE` (MIT), `PROTOTYPE_SPEC.md`
- `lib/utils.ts` with `cn()` helper

### Phase 2 — Data Layer & Routing Skeleton

**Data files (all static, no logic):**
- `lib/types.ts` — TypeScript interfaces: Product, ScenarioType, Scenario, CommunityDeal, InsightCard, MockProfile
- `data/scenarios.ts` — 3 CV scenarios:
  - Scenario A: "Clear Pink Tax" (pink_tax, +25% markup)
  - Scenario B: "Fair Price" (fair_price, 0% markup)
  - Scenario C: "No Match Found" (no_match)
- `data/deals.ts` — 6 community deals across Personal Care, Household, Clothing, Other
- `data/insights.ts` — 3 insight cards ("Why similar products cost more", "How to compare unit prices", "Community tips")
- `data/profile.ts` — Mock profile (Sarah Tan, 42 products checked, RM 156.50 saved)

**6 Routes (all with `data-testid` attributes):**
| Route | Screen | Key Elements |
|-------|--------|--------------|
| `/` | Home Dashboard | Hero card, insights section, deals preview |
| `/upload` | Upload & Process | Stepper, dropzone, disclaimer box, 3 scenario thumbnails |
| `/compare?scenario=A\|B\|C` | Comparison Result | Reads query param, renders 3 states (pink_tax/fair_price/no_match) |
| `/report` | Report a Better Price | Form: product name, store, price, photo (disabled), note |
| `/community` | Community Hub | Search bar, category filter chips, sort dropdown, deal list |
| `/profile` | Profile | Avatar, stats, my reports list, settings |

**Navigation components:**
- `components/nav/BottomNav.tsx` — Mobile nav (visible below `md` breakpoint)
- `components/nav/TopNav.tsx` — Web nav (visible at `md+`)
- `app/layout.tsx` — Responsive nav switching via Tailwind `hidden md:block` / `block md:hidden`

---

## 3. Current Build Status

- `npm run build` succeeds with no TypeScript errors
- All routes render correctly with real data
- All `data-testid` attributes present and unchanged
- All changes committed to `main` branch

---

## 4. Your Task: Phase 3 — UI/UX Visual Implementation

**Branch:** `ui/agy-visual-design`  
**Spec Reference:** `PinkyPromise_Prototype_Specification.md` (full spec) and `PinkyPromise_Implementation_Plan.md` lines 324–376 (Phase 3 detailed instructions)

### 4.1 Strict Scope Boundary

**You MUST:**
- Add Tailwind utility classes to all elements
- Add shadcn/ui component wrappers (Card, Badge, Dialog, Progress, etc.) around existing content
- Add icons using `lucide-react`
- Add images from `/public/images/`
- Restructure JSX markup/div nesting for layout purposes
- Preserve all `data-testid` attributes exactly as-is

**You MUST NOT:**
- Rename, remove, or restructure `data-testid` attributes or component props
- Add or modify any `useState`/`useEffect`/business logic
- Touch anything in `/data/`, `/lib/`, or `/app/api`
- Introduce a new CSS framework or override Tailwind/shadcn with custom global CSS resets

### 4.2 Design Tokens

Derive the color palette, typography scale, and card styling from the wireframe images:
- **Primary:** Soft pink
- **Secondary:** Navy
- **Backgrounds:** White/cream
- **Cards:** Rounded corners
- **Tax badges:** Bold red (pink tax) / green (fair price) high-contrast percentage badges

Define these as Tailwind theme extensions in `tailwind.config.ts` or CSS variables in `globals.css` via shadcn's theme system. Do not hardcode one-off hex values per component.

### 4.3 Responsive Implementation

- **Mobile-first:** Base Tailwind classes target Mobile Based layout (bottom nav, single-column stacked cards)
- **Web layout:** Use `md:` prefixed classes for ≥768px (top nav, 2-column dashboard grids, wider comparison)
- Nav switching already implemented in `layout.tsx` using Tailwind `hidden md:flex` / `flex md:hidden`

### 4.4 Per-Screen Styling Checklist

| Screen | Styling Requirements |
|--------|---------------------|
| **Home Dashboard** | Hero card with tagline + CTA button, horizontally scrollable insight card feed (mobile) → grid (web), vertical deal list preview with verified badges |
| **Upload & Process** | Stepper indicator, upload dropzone styling, **disclaimer box styled distinctly** (soft yellow/amber background, icon) above scenario thumbnails, animated progress bar |
| **Comparison Result** | All 3 states styled per spec: pink_tax red badge, fair_price green badge, no_match empty-state illustration. Split comparison layout, savings callout, donut chart (static SVG) |
| **Report a Better Price** | Clean form styling, success confirmation state (toast or modal) |
| **Community Hub** | Filter chip row, sort dropdown, deal card list with verified badge emphasis, floating action button (mobile) vs inline button (web) |
| **Profile** | Avatar, stats row, submitted-reports list reusing Community Hub card style |

### 4.5 Required Commits

```
style(nav): implement responsive bottom/top nav switch and design tokens
style(home): implement mobile-first Home Dashboard layout and cards
style(upload): implement stepper, dropzone, disclaimer, and scenario cards
style(compare): implement all 3 comparison result states and badges
style(report): implement report form and success state styling
style(community): implement filter/sort UI and deal card list styling
style(profile): implement profile stats and submitted-reports styling
```

### 4.6 Definition of Done

- [ ] Every screen visually matches the wireframes' intent (card-based, pink/navy palette, bold high-contrast tax badges) on both mobile viewport (~375px) and desktop-width viewport (~1280px)
- [ ] Resizing the browser window shows the layout genuinely reflow (nav position changes, grid columns change) with no broken/overlapping elements
- [ ] All `data-testid` attributes from Phase 2 are still present and unchanged
- [ ] No new business logic/state was introduced
- [ ] `npm run build` still succeeds with no TypeScript errors
- [ ] Committed and merged to `main`

---

## 5. Key Files for Reference

| File | Purpose |
|------|---------|
| `PinkyPromise_Prototype_Specification.md` | Full spec (238 lines) — all screens, components, data requirements |
| `PinkyPromise_Implementation_Plan.md` | Full implementation plan (542 lines) — Phase 3 starts at line 324 |
| `app/layout.tsx` | Root layout with responsive nav switching |
| `app/page.tsx` | Home Dashboard |
| `app/upload/page.tsx` | Upload & Process |
| `app/compare/page.tsx` | Comparison Result (reads `?scenario=A\|B\|C`) |
| `app/report/page.tsx` | Report a Better Price form |
| `app/community/page.tsx` | Community Hub |
| `app/profile/page.tsx` | Profile |
| `components/nav/BottomNav.tsx` | Mobile bottom navigation |
| `components/nav/TopNav.tsx` | Web top navigation |
| `data/scenarios.ts` | 3 CV scenario datasets |
| `data/deals.ts` | 6 community deals |
| `data/insights.ts` | 3 insight cards |
| `data/profile.ts` | Mock user profile |
| `lib/types.ts` | TypeScript interfaces |

---

## 6. After You Finish (Phase 3)

Once your Definition of Done is fully checked and merged to `main`:
1. Stop — do not attempt any interactivity/logic work
2. Tell the human it is ready to go back to OPENCODE for Phase 4 (Interaction Logic & State Wiring)

---

## 7. Quick Start

```bash
cd /mnt/c/Data/Codes/Projects/PinkyPromise
git checkout -b ui/agy-visual-design
npm run dev
```

The app runs at `http://localhost:3000`. All routes are accessible via the bottom nav (mobile) or top nav (web).
