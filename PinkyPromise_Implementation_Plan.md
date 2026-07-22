# PinkyPromise — Full Implementation Plan
**Repository:** https://github.com/XJ-Ong/PinkyPromise (currently empty)
**Reference document:** `PinkyPromise_Prototype_Specification.md` (v1.1) — every phase below cites the exact section it implements
**Author context:** Single human owner, zero manual coding. Two coding agents alternate on this repo:
- **OPENCODE** — project setup, routing, data, state/logic, testing, deployment. Everything except visual styling.
- **AGY** — visual/UI implementation only, on top of scaffolding OPENCODE has already built.

---

## 0. HOW TO USE THIS DOCUMENT

This is a **single shared plan** fed to both agents. Do not summarize or re-interpret it — follow it literally, in order.

- Every phase heading is tagged **`Owner: OPENCODE`** or **`Owner: AGY`**.
- An agent must **only execute phases tagged with its own name**. If you reach a phase tagged for the other agent, **stop immediately** — do not attempt it, do not skip ahead to a later OPENCODE phase, do not "helpfully" do UI work if you are OPENCODE.
- Every phase ends with a **Definition of Done** checklist and a **required commit**. Do not proceed to the next phase, or hand off, until every item in Definition of Done is true and the commit has been made.
- Look for `>>> HANDOFF <<<` markers — these are the exact stopping points between agents.
- If a phase references the spec document, open and re-read that exact section before writing code — do not rely on memory of a prior summary.

---

## 1. Prerequisites & Environment (read by both agents)

| Setting | Value | Why |
|---|---|---|
| Node.js | v20.x LTS | Matches current Next.js LTS requirements |
| Package manager | **npm** only | Avoid mixing lockfiles between agents — never introduce `yarn.lock` or `pnpm-lock.yaml` |
| Framework | Next.js 14+ (App Router) | Per spec Section 2 |
| Language | **TypeScript** | Type errors catch hallucinated prop names/data shapes at compile time — important given hands-off, multi-agent development |
| Styling | Tailwind CSS + shadcn/ui | Per spec Section 2 |
| Hosting | Vercel (free tier), auto-deploy from `main` | Per spec Section 2 and Section 9 (public link requirement) |
| Backend | **None.** No API routes, no database, no auth. | Per spec Section 2 — confirmed final |
| Repo | https://github.com/XJ-Ong/PinkyPromise | Already created, empty, remote must be used (do not create a new repo) |

**Before either agent starts work in a session:** run `git pull origin main` (or the relevant branch) first, to avoid working from a stale local copy if the human switched agents/machines between sessions.

---

## 2. Git Conventions (read by both agents)

### 2.1 Commit message format — Conventional Commits
```
<type>(<scope>): <short description>

[optional body]
```

**Types allowed:**
| Type | Use for |
|---|---|
| `feat` | New functionality (routes, components, logic) |
| `style` | Visual/CSS/Tailwind changes only, no logic change (AGY will use this heavily) |
| `fix` | Bug fixes |
| `chore` | Tooling, config, dependency installs, project setup |
| `docs` | README, comments, this plan's own tracking notes |
| `refactor` | Code restructuring with no behavior change |
| `test` | Manual test notes or test scripts |

**Scope** = the screen or area affected, using these fixed labels:
`init`, `home`, `upload`, `compare`, `report`, `community`, `profile`, `nav`, `data`, `deploy`, `docs`

**Examples:**
```
chore(init): scaffold Next.js app with TypeScript, Tailwind, shadcn/ui
feat(data): add static scenario, deals, insights, and profile datasets
feat(upload): implement scenario selection and simulated processing state
style(home): apply mobile-first card layout and pink/navy theme
fix(compare): correct savings calculation display for fair-price scenario
chore(deploy): connect repo to Vercel, verify production build
```

### 2.2 Branching strategy
`main` must always be in a working, buildable state. Each phase below is done on its own short-lived branch, then merged back into `main` before the next phase starts. This isolates AGY's UI pass so it can be reverted independently of OPENCODE's logic work if needed.

```bash
# starting any phase
git checkout main
git pull origin main
git checkout -b <branch-name-for-this-phase>

# ...do the phase's work, committing as you go...

# finishing a phase
git add .
git commit -m "<type>(<scope>): <description>"
git push -u origin <branch-name-for-this-phase>
git checkout main
git merge <branch-name-for-this-phase>
git push origin main
```

Branch names to use, in order:
1. `setup/project-init`
2. `feat/data-and-routing`
3. `ui/agy-visual-design`
4. `feat/interaction-logic`
5. `chore/deploy-config`
6. `docs/final-polish`

### 2.3 Commit frequency
Commit after every meaningfully complete unit of work (one component, one route, one data file) — not just once at the end of a phase. Small, frequent, well-labeled commits make it possible to see exactly what each agent touched.

---

## 3. PHASE 1 — Project Initialization
**Owner: OPENCODE**
**Branch:** `setup/project-init`
**Spec reference:** Section 2 (Technology Stack)

### 3.1 Steps

```bash
# 1. Clone the empty repo
git clone https://github.com/XJ-Ong/PinkyPromise.git
cd PinkyPromise

# 2. Scaffold Next.js (TypeScript, App Router, Tailwind, ESLint, no src/ dir change needed)
npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias "@/*"
# When prompted:
#   - Would you like to use `src/` directory? -> No
#   - Would you like to customize the default import alias? -> Yes, use @/*

# 3. Initialize shadcn/ui
npx shadcn@latest init
# When prompted, choose:
#   - Style: Default
#   - Base color: Slate (will be overridden by custom theme later in Phase 3, AGY's job)
#   - CSS variables: Yes

# 4. Add the specific shadcn components this project needs
npx shadcn@latest add button card badge dialog input select progress avatar tabs

# 5. Install any remaining utility packages
npm install clsx
```

### 3.2 Folder structure to create (empty placeholder files where noted)

```
PinkyPromise/
├── app/
│   ├── layout.tsx                 (root layout, nav shell placeholder)
│   ├── page.tsx                   (Home — Screen 5.1)
│   ├── upload/
│   │   └── page.tsx                (Upload & Process — Screen 5.2)
│   ├── compare/
│   │   └── page.tsx                (Comparison Result — Screen 5.3)
│   ├── report/
│   │   └── page.tsx                (Report a Better Price — Screen 5.3.1)
│   ├── community/
│   │   └── page.tsx                (Community Hub — Screen 5.4)
│   ├── profile/
│   │   └── page.tsx                (Profile — Screen 5.5)
│   └── globals.css
├── components/
│   ├── nav/
│   │   ├── BottomNav.tsx           (mobile nav shell)
│   │   └── TopNav.tsx              (web nav shell)
│   ├── home/
│   ├── upload/
│   ├── compare/
│   ├── community/
│   └── profile/
├── data/
│   ├── scenarios.ts                (3 CV scenarios — spec Section 7)
│   ├── deals.ts                    (Community Hub deals — spec Section 7)
│   ├── insights.ts                 (Home insight cards — spec Section 7)
│   └── profile.ts                  (mock user profile — spec Section 7)
├── lib/
│   └── types.ts                    (shared TypeScript interfaces)
├── public/
│   └── images/
│       ├── scenarios/               (3 product photo pairs — see 3.4 below)
│       ├── deals/
│       └── icons/
├── .gitignore
├── README.md
└── LICENSE
```

### 3.3 `.gitignore` contents
```
node_modules/
.next/
.env*
.vercel
.DS_Store
*.log
```

### 3.4 Manual asset input required (flag to human, do not attempt to auto-source)
The 3 scenario product images and ~6-8 community deal thumbnails referenced in spec Section 7 need to be supplied as image files placed in `public/images/scenarios/` and `public/images/deals/`. Use only **generic/fictional-brand product photos** (no real brand logos or trademarks), consistent with the existing wireframes' fictional brands (HealthMart, FreshCare, etc.) — this avoids trademark issues since this is a public repo. If no real images are available yet, use simple flat-color placeholder rectangles with product-type labels (e.g. "Razor A") as a temporary stand-in, and note this in the README as a known placeholder to replace later.

### 3.5 README.md initial content
Create a README with: project name, one-line description ("Interactive frontend-only prototype demonstrating the Pink Tax Checker concept — SDG 5, PRMGT group project"), tech stack list, `npm install && npm run dev` instructions, and a note: **"This prototype uses no backend. All data is static/mock. See PROTOTYPE_SPEC.md for full functional specification."** Also copy `PinkyPromise_Prototype_Specification.md` into the repo root as `PROTOTYPE_SPEC.md` for permanent reference.

### 3.6 LICENSE
Add an MIT License file (standard template, copyright holder = repo owner's name, current year).

### Definition of Done
- [ ] `npm run dev` starts with no errors, default Next.js page loads
- [ ] Tailwind and shadcn/ui confirmed working (a shadcn `<Button>` renders with styling on the default page)
- [ ] Full folder structure above exists (empty files are fine — content comes in Phase 2)
- [ ] `.gitignore`, `README.md`, `LICENSE`, `PROTOTYPE_SPEC.md` exist
- [ ] All changes committed and merged to `main` per Section 2.2

**Required commit(s):**
```
chore(init): scaffold Next.js app with TypeScript, Tailwind, shadcn/ui
chore(init): add project folder structure and placeholder route files
docs(docs): add README, LICENSE, and copy prototype spec into repo
```

---

## 4. PHASE 2 — Data Layer & Routing Skeleton
**Owner: OPENCODE**
**Branch:** `feat/data-and-routing`
**Spec reference:** Section 5 (all screens), Section 6 (Navigation Map), Section 7 (Fake Data Requirements)

### 4.1 Data files (fill in `/data/*.ts` with real static content, matching spec Section 7 exactly)

`lib/types.ts` — define shared interfaces first:
```typescript
export interface Product {
  name: string;
  image: string;       // path under /public/images/
  price: number;        // in RM
  store: string;
  unitSize: string;     // e.g. "500 ml"
  rating: number;        // 0-5
}

export type ScenarioType = "pink_tax" | "fair_price" | "no_match";

export interface Scenario {
  id: "A" | "B" | "C";
  type: ScenarioType;
  label: string;               // e.g. "Clear Pink Tax"
  thumbnail: string;
  product: Product;
  alternative?: Product;       // absent for "no_match"
  taxPercent?: number;         // absent for "no_match"
}

export interface CommunityDeal {
  id: string;
  productName: string;
  category: "Personal Care" | "Household" | "Clothing" | "Other";
  price: number;
  discountPercent: number;
  submitterName: string;
  timestamp: string;    // ISO date string
  verified: boolean;
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MockProfile {
  name: string;
  avatar: string;
  memberSince: string;
  productsChecked: number;
  reportsSubmitted: number;
  totalSavedRM: number;
}
```

`data/scenarios.ts` — 3 entries (A: pink_tax, B: fair_price, C: no_match), matching the structure from spec Section 4.3 exactly, including the specific example content already described there (pink razor vs. men's razor, a fairly-priced pair, and an unmatched product).

`data/deals.ts` — 6-8 entries covering all 4 categories (Personal Care, Household, Clothing, Other), reusing the example products already shown in the wireframes (Everyday Body Wash, Classic Razor Set, Daily Deodorant, Basic Cotton Tee) plus 2-4 more to fill out the list.

`data/insights.ts` — 3 entries matching the Home Dashboard wireframe card titles ("Why similar products cost more," "How to compare unit prices," "Community tips for fair shopping").

`data/profile.ts` — 1 mock profile entry with plausible placeholder stats.

### 4.2 Routing skeleton — functional but unstyled
Build each route as a **working but visually plain** page (no Tailwind polish yet — that is AGY's job in Phase 3). Each page should:
- Import and render its relevant data
- Contain correct semantic HTML structure (headings, divs for card slots, buttons with correct labels)
- Have working `next/link` navigation between routes matching the Navigation Map (spec Section 6)
- Contain `data-testid` attributes on major interactive elements (upload dropzone, scenario thumbnails, CTA buttons, filter controls) so AGY can identify what to style without renaming/restructuring elements

**Do not add any React state yet in this phase** beyond what's needed to render static data — the scenario-selection/processing/report-submission logic is Phase 4's job (after AGY's UI pass). This keeps AGY's diff clean: they are styling static, working markup, not live application state.

### 4.3 Navigation shell
Build `components/nav/BottomNav.tsx` (mobile) and `components/nav/TopNav.tsx` (web) as functional, unstyled navigation containing links to all 5 routes. Conditionally render one or the other in `app/layout.tsx` — but at this phase, it's fine to render both stacked and unstyled; AGY will implement the actual responsive show/hide behavior in Phase 3 per spec Section 3.

### Definition of Done
- [ ] All 6 routes (`/`, `/upload`, `/compare`, `/report`, `/community`, `/profile`) render without errors and contain real (not placeholder-lorem-ipsum) content from the `/data` files
- [ ] Clicking through the navigation shell reaches every route
- [ ] All interactive elements have `data-testid` attributes
- [ ] No visual styling has been attempted beyond default browser/Tailwind base styles
- [ ] TypeScript compiles with no errors (`npm run build` succeeds)
- [ ] Committed and merged to `main`

**Required commit(s):**
```
feat(data): add static scenario, deals, insights, and profile datasets
feat(home): add unstyled Home Dashboard route with insight and deal data
feat(upload): add unstyled Upload & Process route with scenario selector
feat(compare): add unstyled Comparison Result route with 3 output states
feat(report): add unstyled Report a Better Price route
feat(community): add unstyled Community Hub route with deal list
feat(profile): add unstyled Profile route
feat(nav): add unstyled BottomNav and TopNav components
```

---

## 5. `>>> HANDOFF: OPENCODE STOPS HERE <<<`

**If you are OPENCODE:** stop now. Do not attempt Phase 3 (UI/UX Implementation) under any circumstance, even if it looks quick. Confirm Phase 2's Definition of Done is fully checked, confirm the branch is merged into `main`, and end your session. Tell the human it is ready for AGY.

**If you are AGY:** you are starting fresh on `main`, which now contains a fully working but unstyled Next.js app. Your job is Phase 3 below, and **only** Phase 3.

---

## 6. PHASE 3 — UI/UX Visual Implementation
**Owner: AGY**
**Branch:** `ui/agy-visual-design`
**Spec reference:** Section 3 (Responsive Behavior), Section 4 (Global Design Requirements), Section 5 (all screens 5.1–5.5), and the original wireframe images (`Prototype_Plan.pdf` — request this file from the human if not already in your context, since it contains the exact visual reference for colors, layout, and card structure for both Mobile Based and Web Based versions)

### 6.1 Strict scope boundary — read this first
You are styling **existing, working pages**. Do **not**:
- Rename, remove, or restructure the `data-testid` attributes or component props left by OPENCODE
- Add or modify any `useState`/`useEffect`/business logic — if a page currently has no interactivity (e.g., clicking a scenario does nothing yet), **leave it that way**; that logic comes in Phase 4
- Touch anything in `/data/`, `/lib/`, `/app/api` (there is none — do not add one), or deployment config
- Introduce a new CSS framework or override Tailwind/shadcn with custom global CSS resets

You **may**:
- Add Tailwind utility classes to all elements
- Add shadcn/ui component wrappers (Card, Badge, Dialog, Progress, etc.) around existing content, as long as the underlying data and `data-testid`s are preserved
- Add icons (use `lucide-react`, already compatible with shadcn — run `npm install lucide-react` if not present)
- Add images referenced from `/public/images/`
- Restructure JSX markup/div nesting purely for layout purposes, as long as content and interactive element identifiers are unchanged

### 6.2 Design tokens
Derive the color palette, typography scale, and card styling directly from the wireframe images (soft pink primary, navy secondary, white/cream backgrounds, rounded card corners, bold red/green percentage badges for tax/no-tax states). Define these as Tailwind theme extensions in `tailwind.config.ts` (or CSS variables in `globals.css` via shadcn's theme system) so they are reused consistently across all 5 screens — do not hardcode one-off hex values per component.

### 6.3 Responsive implementation (Section 3 of spec)
- Build **mobile-first**: base Tailwind classes (no prefix) target the Mobile Based layout (bottom nav visible, single-column stacked cards, stacked stepper).
- Use `md:` prefixed classes to layer on the Web Based layout at ≥768px (top nav visible, 2-column dashboard grids, wider comparison layout).
- In `app/layout.tsx` (or the Nav components), show `BottomNav` below `md:` breakpoint and `TopNav` at `md:` and above, using Tailwind's `hidden md:flex` / `flex md:hidden` pattern — not JavaScript device detection.

### 6.4 Per-screen styling checklist
- **5.1 Home Dashboard** — hero card with tagline + CTA button, horizontally scrollable insight card feed (mobile) becoming a grid (web), vertical deal list preview with verified badges
- **5.2 Upload & Process** — stepper indicator, upload dropzone styling, **disclaimer box styled distinctly** (e.g. soft yellow/amber background, icon) placed above the 3 scenario thumbnail cards, animated progress bar for the Processing state
- **5.3 Comparison Result** — all 3 states (pink_tax red badge, fair_price green badge, no_match empty-state illustration) styled per spec 5.3, split comparison layout, savings callout, donut chart illustration (static SVG or shadcn-compatible chart component)
- **5.3.1 Report a Better Price** — clean form styling, success confirmation state (toast or modal) styled distinctly from the form
- **5.4 Community Hub** — filter chip row, sort dropdown, deal card list/table with verified badge emphasis, floating action button (mobile) vs. inline button (web)
- **5.5 Profile** — avatar, stats row, submitted-reports list reusing Community Hub card style

### Definition of Done
- [ ] Every screen visually matches the wireframes' intent (card-based, pink/navy palette, bold high-contrast tax badges) on both a real or simulated mobile viewport and a desktop-width viewport
- [ ] Resizing the browser window between ~375px and ~1280px shows the layout genuinely reflow (nav position changes, grid columns change) with no broken/overlapping elements at any width in between
- [ ] All `data-testid` attributes from Phase 2 are still present and unchanged
- [ ] No new business logic/state was introduced
- [ ] `npm run build` still succeeds with no TypeScript errors
- [ ] Committed and merged to `main`

**Required commit(s)** (one or more per screen, using `style(<scope>)`):
```
style(nav): implement responsive bottom/top nav switch and design tokens
style(home): implement mobile-first Home Dashboard layout and cards
style(upload): implement stepper, dropzone, disclaimer, and scenario cards
style(compare): implement all 3 comparison result states and badges
style(report): implement report form and success state styling
style(community): implement filter/sort UI and deal card list styling
style(profile): implement profile stats and submitted-reports styling
```

---

## 7. `>>> HANDOFF: AGY STOPS HERE <<<`

**If you are AGY:** stop now once Phase 3's Definition of Done is fully checked and merged to `main`. Do not attempt any interactivity/logic work. End your session and tell the human it is ready to go back to OPENCODE.

**If you are OPENCODE:** you are resuming on `main`, which now contains a fully styled but not-yet-interactive app. Your job is Phases 4 onward below.

---

## 8. PHASE 4 — Interaction Logic & State Wiring
**Owner: OPENCODE**
**Branch:** `feat/interaction-logic`
**Spec reference:** Section 5.2 (Upload & Process), 5.3 (Comparison Result), 5.3.1 (Report), 5.4 (Community Hub), Section 8 (Non-Functional Elements table — confirm what's real vs. simulated)

### 8.1 Scenario selection & simulated processing (Screen 5.2)
- On scenario thumbnail click, store the selected scenario ID (React state, or pass via URL query param `?scenario=A` to `/compare` — query param approach is simpler given no global state library is specified, and keeps routing declarative)
- Trigger the "Processing" sub-state: show progress bar, animate 0% → 100% over 1.5–2 seconds using a `setInterval` or CSS transition tied to a timeout
- On completion, navigate to `/compare?scenario=<id>`
- "Cancel" button resets to the upload/selection sub-state

### 8.2 Comparison Result rendering (Screen 5.3)
- Read `scenario` query param, look up the matching entry in `data/scenarios.ts`, and conditionally render State A/B/C content and CTA exactly as specified in spec Section 5.3
- Wire the CTA buttons to navigate to `/report?context=<scenario-id>` (State A/C) or trigger the "Add to Community Hub" confirmation (State B — can be a simple local toast/alert, no persistence)

### 8.3 Report a Better Price (Screen 5.3.1)
- Build a controlled form (product name, store, price, optional note) using React state
- On submit: show a success confirmation (toast or inline success message) — do not persist anywhere real
- **Optional enhancement** (confirm with human before building): optimistically append the submitted report to an in-memory/local array so it appears in the Community Hub for the remainder of the session. This is a nice-to-have for demo realism, not a requirement — check spec Section 10 Open Items before deciding.

### 8.4 Community Hub filtering/sorting (Screen 5.4)
- Implement **real, working** client-side logic: category filter chips, price range filter, sort dropdown, all operating on the static `data/deals.ts` array via `useState` + `.filter()`/`.sort()`. This is the one part of the app where the "logic" is genuinely functional, not simulated — per spec Section 8.

### 8.5 Cross-check against spec Section 8 table
Before considering this phase done, re-read the "Explicit Non-Functional Elements" table in the spec and confirm every row matches what was actually built (image upload still simulated, tax % still pre-authored not calculated, Community Hub filter/sort genuinely functional, report submission simulated, profile stats static, processing bar simulated).

### Definition of Done
- [ ] Full user journey works end to end: Home → Upload → select scenario → Processing animates → Comparison Result shows correct state → Report flow (or Community confirmation) completes → returns to Home/Community
- [ ] All 3 scenarios (A/B/C) produce visibly different, correct outcomes
- [ ] Community Hub filters/sorts genuinely change the visible list
- [ ] No console errors during the full click-through
- [ ] `npm run build` succeeds
- [ ] Committed and merged to `main`

**Required commit(s):**
```
feat(upload): wire scenario selection and simulated processing timer
feat(compare): render scenario-specific comparison states from query param
feat(report): implement controlled form with simulated success state
feat(community): implement functional category/price filter and sort logic
```

---

## 9. PHASE 5 — QA & Manual Testing
**Owner: OPENCODE**
**No new branch needed — do this directly against `main` after Phase 4 is merged, fixing any issues found on a small `fix/qa-pass` branch if needed.**

### 9.1 Manual test checklist (run through all of these; log results in a `TESTING.md` file at repo root)
- [ ] Home → every card/link navigates correctly
- [ ] Upload → Scenario A → Processing animates → Comparison shows "Pink Tax +25%" state correctly
- [ ] Upload → Scenario B → Comparison shows "No Pink Tax Detected" state correctly, no savings callout shown
- [ ] Upload → Scenario C → Comparison shows "No Match Found" empty state correctly
- [ ] Report a Better Price form: empty submit, filled submit, cancel/back button all behave correctly
- [ ] Community Hub: each category filter, price range filter, and each sort option individually changes the visible list correctly; combining filters works
- [ ] Profile screen renders mock stats correctly, "my reports" list displays
- [ ] Resize browser from 375px to 1280px width — confirm nav switches from bottom to top at the `md` breakpoint, grids reflow, no overlapping/broken elements at any width
- [ ] Test the deployed Vercel URL (after Phase 6) on an actual physical phone browser, not just a resized desktop window
- [ ] Run Lighthouse (Chrome DevTools) on the deployed URL — note performance/accessibility scores in `TESTING.md`, fix any critical accessibility issues (missing alt text, insufficient color contrast) flagged

### Definition of Done
- [ ] `TESTING.md` created with all checklist items marked pass/fail and any bugs found + fixed
- [ ] All checklist items pass
- [ ] Committed and merged to `main`

**Required commit(s):**
```
test(docs): add manual QA checklist and results to TESTING.md
fix(<scope>): <describe any bug fixed during QA>
```

---

## 10. PHASE 6 — Deployment
**Owner: OPENCODE**
**Branch:** `chore/deploy-config`

### 10.1 Steps
1. Push `main` to GitHub (should already be up to date from prior phases).
2. Go to vercel.com, sign in (GitHub SSO recommended), click "Add New Project," import `XJ-Ong/PinkyPromise`.
3. Framework preset should auto-detect as Next.js — leave build command/output directory as defaults.
4. No environment variables needed (confirmed no backend, Section 2 of spec).
5. Deploy. Confirm the production URL loads correctly and matches the local dev experience.
6. In Vercel project settings, confirm "Production Branch" is set to `main`, so every future push to `main` auto-redeploys.
7. (Optional) Add a custom domain if the human wants a cleaner URL for the Instagram bio — not required; the default `*.vercel.app` URL satisfies the spec's "public, shareable link" requirement (Section 9).

### 10.2 Post-deploy verification
- [ ] Production URL loads on desktop browser
- [ ] Production URL loads correctly on an actual mobile phone browser (not simulated) and shows the Mobile Based layout
- [ ] Full click-through test from Section 9.1 repeated once against the live production URL, not just localhost

### Definition of Done
- [ ] Live public URL confirmed working on both desktop and real mobile device
- [ ] Auto-deploy on push to `main` confirmed (make a trivial commit and verify Vercel redeploys)
- [ ] Committed and merged to `main`

**Required commit(s):**
```
chore(deploy): add vercel.json config if needed, confirm production build settings
docs(deploy): note production URL and deployment steps in README
```

---

## 11. PHASE 7 — Final Polish & Documentation
**Owner: OPENCODE**
**Branch:** `docs/final-polish`

### 11.1 Steps
- Add a favicon and Open Graph/social preview metadata (title, description, image) in `app/layout.tsx` using Next.js's Metadata API, so the link looks presentable when shared in the Instagram bio/story
- Finalize `README.md`: project description, live URL, tech stack, local setup instructions, explicit "no backend, static data only" note, link to `PROTOTYPE_SPEC.md`
- Confirm `PROTOTYPE_SPEC.md` in the repo is up to date with the final version discussed with the human
- Tag this milestone: `git tag v1.0-prototype && git push origin v1.0-prototype`

### Definition of Done
- [ ] Favicon and social preview visible when sharing the link
- [ ] README complete and accurate
- [ ] Git tag `v1.0-prototype` created and pushed
- [ ] Committed and merged to `main`

**Required commit(s):**
```
feat(docs): add favicon and social preview metadata
docs(docs): finalize README with live URL and setup instructions
```

---

## 12. Milestone → Assignment WBS Mapping (for the human's reference, not agent-actionable)

| Implementation Phase | Maps to Assignment WBS | Notes |
|---|---|---|
| Phase 1–2 (Init, Data/Routing) | 3.3 "Design and develop Pink Tax Checker Figma prototype" (Executing phase, 30 Jun–21 Jul 2026 per Gantt) | Actually building in code rather than Figma — confirm with lecturer this satisfies the deliverable, or produce a Figma export/mockup alongside if strictly required |
| Phase 3 (AGY UI) | Same WBS item, visual design portion | |
| Phase 4 (Logic) | Same WBS item, functional portion | |
| Phase 5 (QA) | 3.4 "Test prototype functionality and refine based on feedback" | |
| Phase 6 (Deploy) | Ties to Assignment Gap #10 — "accessible by target audience" requirement | |
| Phase 7 (Polish) | 3.5 "Integrate technology solution into Instagram campaign" — remember to actually embed the live link in the Instagram bio/story, not just finish building | |

**Flagging one thing outside this plan's control:** the assignment brief's WBS item 3.3 specifically says "Figma prototype." This plan builds a real coded web app instead, which is arguably stronger evidence of a working solution — but it's worth explicitly confirming with your Project Sponsor/lecturer that a live coded prototype satisfies the deliverable, rather than assuming it's an acceptable substitution, since grading rubrics sometimes check for the literal artifact named in the brief.

---

## 13. Assumptions Log (confirm or override before starting)

| # | Assumption made in this plan | If wrong, change to... |
|---|---|---|
| 1 | TypeScript, not JavaScript | Re-run `create-next-app` without `--typescript` in Phase 1 |
| 2 | npm as package manager | Swap all `npm` commands for `pnpm`/`yarn` consistently in every phase |
| 3 | Report screen is a route (`/report`), not a modal | Have AGY implement as a shadcn `<Dialog>` instead in Phase 3, remove the route in Phase 2 |
| 4 | MIT License | Remove/replace LICENSE file in Phase 1 if a different license or no license is wanted |
| 5 | Scenario/deal images are placeholder or fictional-brand only | If real licensed product photography becomes available, replace files in `public/images/` directly — no code changes needed |
| 6 | Branch-per-phase git strategy | If preferred, commit everything directly to `main` — remove the branch/merge steps from each phase, keep the commit message conventions |
| 7 | Vercel default `*.vercel.app` domain is sufficient for the Instagram bio link | Add a custom domain step in Phase 6 if a branded domain is wanted |
| 8 | Figma deliverable substitution (Section 12) | Confirm with lecturer; if a literal Figma file is still required, that would need to be produced separately from this coded build |
