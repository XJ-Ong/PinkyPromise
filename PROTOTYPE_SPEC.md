# PinkyPromise — "Pink Tax Checker" Prototype Specification
**Version:** 1.0
**Date:** 22 July 2026
**Type:** Frontend-only interactive prototype (no backend, no computer vision)
**Related WBS item:** 3.3 — Design and develop "Pink Tax Checker" Figma prototype

---

## 1. Purpose & Scope

This document specifies the full functional and content design of the PinkyPromise prototype for both **Mobile** and **Web** form factors. The prototype demonstrates the core "Pink Tax Checker" concept end-to-end using **pre-defined data and simulated logic only** — there is no real image recognition, no live database, and no user authentication backend.

### 1.1 What this prototype IS
- A clickable, interactive demonstration of the intended user journey.
- Built entirely on static/mock data and client-side state (no server calls).
- Designed to be hosted as a publicly accessible link (e.g., Figma prototype share link, or a simple static site) and embedded in the @pinkypromise.my Instagram bio/story, satisfying the assignment's "accessible by target audience" requirement.

### 1.2 What this prototype IS NOT
- Not a working computer vision / image recognition system.
- Not connected to any real product price database.
- Not persisting data permanently across real users (any "submission" is simulated/local only).

### 1.3 Explicit Scope Decision (for Final Report — Constraints/Assumptions section)
> Due to time constraints, the group has scoped out development of a real computer-vision price-comparison engine. Instead, the prototype uses a "Wizard of Oz" simulation pattern: three pre-defined product scenarios stand in for live photo recognition, allowing full demonstration of the intended user experience without requiring backend/ML infrastructure. This is a deliberate, documented scope reduction, not an oversight.

---

## 2. Global Design Requirements

| Element | Requirement |
|---|---|
| Platforms | Mobile-based and Web-based versions (both documented in Prototype Plan) |
| Data source | Static/local JSON — no API calls |
| State management | Client-side only (React state / Figma variables / local variables) |
| Navigation | Bottom nav (mobile): Home, Upload, Compare, Community, Profile. Top nav (web): Home, Upload, Compare, Community, Profile icon |
| Visual style | Card-based UI, soft pink/navy palette per existing wireframes, bold high-contrast typography for tax percentage badges |
| Disclaimer visibility | Must appear on Upload & Process screen, above the scenario selection area, on both platforms |
| Simulated latency | 1.5–2 seconds artificial delay on "Processing" screen for all scenarios, to preserve the realism of the user journey |

---

## 3. Screen-by-Screen Specification

### 3.1 Screen 01 — Home Dashboard

**Purpose:** Landing hub; educates users and drives them to start a check.

**Components:**
- Header: PinkyPromise logo, notification bell icon (mobile) / full nav bar (web)
- Hero card: "Fair prices for everyone." tagline + one-line description
- Primary CTA button: **"Upload Product to Check"** → navigates to Screen 02
- "Latest Pink Tax Insights" section — horizontally scrollable card feed (3 static educational cards, e.g. "Why similar products cost more," "How to compare unit prices," "Community tips for fair shopping")
- "Recently Added Community Deals" section — vertical list preview of 3–4 static deal cards (name, category, price, discount %, verified badge), with "See all >" link → navigates to Screen 04

**Data:** All content static/hardcoded. No live feed logic required.

**States:** Single state — no loading/empty state needed (content is always present).

---

### 3.2 Screen 02 — Upload & Process

**Purpose:** Captures the "user input" step (simulated) and demonstrates the core checker function via pre-set scenarios.

**Sub-step A — Upload (Step 1 of 3 stepper: Upload → Process → Compare)**

Components:
- Stepper indicator showing current step
- Upload drop zone: "Upload a product image — JPG or PNG, Max 10 MB" with cloud icon and "Choose File" button
- **Disclaimer box** (placed directly below the drop zone, before scenario selection):
  > 🔧 **Demo Mode:** Our AI-powered image recognition is still under development. To preview how Pink Tax Checker works, please select one of the sample products below instead of uploading your own photo.
- **Scenario selector** — 3 tappable thumbnail cards, each showing a product photo + label:
  1. **Scenario A — "Clear Pink Tax"**: Pink razor vs. equivalent men's razor (large price gap)
  2. **Scenario B — "Fair Price"**: A product pair with no meaningful price difference (demonstrates the app isn't rigged to always find tax)
  3. **Scenario C — "No Match Found"**: A product with no verified alternative in the (fake) database (demonstrates an error/empty state)
- Tapping a scenario thumbnail = the trigger event (equivalent to "photo submitted")

**Sub-step B — Process (Step 2 of 3)**

Components:
- Animated processing icon (spinning ring / product illustration)
- Text: "Checking prices and matching alternatives..."
- Progress bar animating from 0% → 100% over ~1.5–2 seconds (simulated; not tied to any real computation)
- "Cancel" button — returns to Sub-step A, resets selection

**Transition logic:**
- On reaching 100%, auto-navigate to Screen 03, passing along which scenario (A/B/C) was selected so Screen 03 renders the correct pre-defined outcome.

---

### 3.3 Screen 03 — Comparison Result

**Purpose:** Displays the (simulated) price discrepancy data and next-step action.

This screen has **three distinct output states**, one per scenario, all pre-authored (no computation happens — content is simply pulled from a static object keyed by scenario ID).

#### State A — "Clear Pink Tax" (Scenario A selected)
- Split comparison: "Pink Tax" product (left, pink accent) vs. "Fair Price" alternative (right, blue/neutral accent)
- Bold red badge: **"Pink Tax: +25%"**
- Subtext: "Same function, higher price"
- Comparison table: size, unit price, store, rating — for both products
- Savings callout: "You Save RM 5.00 — that's 20% off"
- Price breakdown donut chart (static illustration): e.g. 80% base cost / 20% "pink markup" — purely illustrative, not calculated from real data
- CTA: **"Report a Better Price"** → navigates to Screen 03b (see 3.3.1 below)

#### State B — "Fair Price" (Scenario B selected)
- Same split-comparison layout, but:
  - Badge changes to **green/neutral**, reading: **"No Pink Tax Detected"**
  - Subtext: "This product is fairly priced compared to alternatives."
  - No savings callout shown (or shows "RM 0.00 difference")
- CTA changes to: **"Add to Community Hub"** (lets user confirm/share this as a verified fair-price example) — can route to a simple confirmation toast, no real submission needed

#### State C — "No Match Found" (Scenario C selected)
- Empty-state illustration (e.g. magnifying glass icon)
- Message: **"We couldn't find a verified alternative for this product yet."**
- Subtext: "Help grow our database — report this product or suggest an alternative you know of."
- CTA: **"Report This Product"** → navigates to Screen 03b, pre-filled to reflect "no alternative found" context

**Data source:** A single static lookup object, e.g.:
```
scenarios = {
  A: { type: "pink_tax", product: {...}, alternative: {...}, taxPercent: 25 },
  B: { type: "fair_price", product: {...}, alternative: {...}, taxPercent: 0 },
  C: { type: "no_match", product: {...} }
}
```

---

### 3.3.1 Screen 03b — Report a Better Price (NEW — fills previously identified gap)

**Purpose:** Completes the "Report a Better Price" flow that was previously only a dangling CTA button with no destination screen.

**Components:**
- Form fields (all client-side, no real submission):
  - Product/alternative name (text input)
  - Store name (text input)
  - Price (numeric input)
  - Optional: photo upload (decorative only — disabled or accepts file but does nothing with it)
  - Optional note field
- Submit button: **"Submit Report"**
- On submit: show a **success confirmation state** (toast or modal): "Thanks! Your report has been added to the Community Hub for review." — data is not actually persisted anywhere real; this can either (a) do nothing further, or (b) optimistically append a fake card to the Community Hub screen's local state for demo continuity within the same session.
- "Cancel" / back arrow returns to Screen 03.

**Note:** This satisfies core interaction completeness for grading purposes — the flow now has a beginning, middle, and end, even though no real backend persistence exists.

---

### 3.4 Screen 04 — Community Hub

**Purpose:** Allows browsing of crowd-sourced (fake) verified deals.

**Components:**
- Search bar (static — can be non-functional or do simple client-side string filter on the static list)
- Category filter chips: All / Personal Care / Household / Clothing / Other
- Price range filter (dropdown or slider — client-side filter only, operates on the static dataset)
- Sort by dropdown (e.g. "Most Recent," "Biggest Savings") — client-side array sort, no server logic
- Deal list/cards: product name, category, price, "Save X%" badge, submitter name + relative time (e.g. "by Alex L. · 2 days ago"), Verified checkmark icon
- Floating "+" action button (mobile) / "Add Community Deal" button (web) → opens a simplified version of the Report form (Screen 03b), for manually adding a deal outside the checker flow

**Data:** Static array of ~5–8 pre-authored deal objects. Filtering/sorting operates entirely in-browser on this array — genuinely functional, just against fake data.

---

### 3.5 Screen 05 — Profile (NEW — fills previously identified gap)

**Purpose:** Referenced in the bottom nav across all screens but was not previously documented as a screen.

**Components:**
- Static mock user avatar, name, "member since" date
- Summary stats (static numbers): "Products Checked," "Reports Submitted," "Total Saved (RM)"
- List of the user's own submitted reports (can reuse Community Hub card style, filtered to 1–2 fake "my reports" entries)
- Settings icon (decorative, non-functional is acceptable, or leads to a simple static settings list)

**Note:** No real authentication needed — this is a single fixed mock profile, since there's no backend/login system.

---

## 4. Navigation Map

```
Home (01)
 └─▶ Upload & Process (02: Upload) 
       └─▶ Upload & Process (02: Processing, auto-advance)
             └─▶ Comparison Result (03)
                   ├─ State A/C ─▶ Report a Better Price (03b) ─▶ [success] ─▶ back to Comparison (03) or Home
                   └─ State B ──▶ [confirmation toast] ─▶ back to Comparison (03) or Home
 └─▶ Community Hub (04)
       └─▶ Report a Better Price (03b, reused) ─▶ [success] ─▶ back to Community Hub
 └─▶ Profile (05)

Bottom/Top nav present on all main screens (Home, Upload, Compare, Community, Profile)
```

---

## 5. Fake Data Requirements (to be authored by content/design team)

| Dataset | Fields needed | Approx. size |
|---|---|---|
| 3 CV scenarios (A/B/C) | product name, image, price, store, unit size, rating; alternative product (same fields); tax %; type (pink_tax / fair_price / no_match) | 3 entries |
| Community Hub deals | product name, category, price, discount %, submitter name, timestamp, verified (bool) | 6–8 entries |
| Home page insight cards | title, short description, icon/image | 3 entries |
| Mock user profile | name, avatar, join date, stats (checked/reported/saved) | 1 entry |

All of the above can live in a single static JSON/JS object bundled with the prototype — no database or backend service required.

---

## 6. Explicit Non-Functional Elements (to disclose in Final Report)

To be transparent in your documentation about what's simulated vs. real:

| Feature | Real or Simulated? |
|---|---|
| Image upload | Simulated — accepts any file or is disabled; actual image is discarded, scenario choice drives outcome |
| Price comparison / tax %  calculation | Simulated — pre-authored per scenario, not computed |
| Community Hub search/filter/sort | **Real** — operates on static data client-side |
| Report submission | Simulated — shows success state, does not persist beyond session (or optimistically updates local state only) |
| Profile stats | Static/mock, not calculated from real activity |
| Processing progress bar | Simulated animation/timer, not tied to real computation |

---

## 7. Accessibility & Distribution Requirement (ties to Gap #10)

- Prototype must be published via a **public, shareable link** (Figma "Share" prototype link with "Anyone with the link can view," or a deployed static site).
- The link must be **actively embedded** in the @pinkypromise.my Instagram bio, and referenced in at least one Story/post — not just built and left undistributed.
- Recommend taking a dated screenshot of the Instagram bio/story showing the live link, to include as evidence in the Final Report appendix.

---

## 8. Open Items Before Build

- [ ] Finalize product names/images for the 3 CV scenarios (need real or stock photos, not just placeholders, for believability)
- [ ] Confirm whether Report submissions should optimistically update the Community Hub list within the same session (recommended, for a more convincing demo) or simply show a static success toast
- [ ] Decide hosting method for public accessibility (Figma link vs. static site deploy)
- [ ] Confirm Profile screen's stats numbers (can be arbitrary but should look plausible)
