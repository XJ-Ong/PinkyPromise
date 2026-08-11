# PinkyPromise

A pink-tax comparison demo that helps shoppers compare products side by side with clearer, evidence-based pricing information.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Package Manager:** npm

## Getting Started

Clone the Repository

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Verification

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run verify:images
```

`verify:images` verifies all 10 scenario image references are canonical lowercase and resolve on disk. Scenario images are local assets under `public/images/scenarios/`, and their paths are case-sensitive in deployment.

## Important Note

**This prototype uses no backend.** Comparison history and Community Hub submissions are demo-only data stored in your browser's `localStorage`; they are not shared with a server. Storage can be silently unavailable (private browsing, quota limits, disabled storage), in which case the app degrades gracefully and shows a warning.

## Explore

Follow the project on our [Instagram](https://instagram.com/pinkypromise.my).

## Project Structure

```
app/           - Next.js App Router routes
components/    - React components organized by feature
data/          - Static mock data (scenarios, deals, insights, profile)
lib/           - Shared TypeScript interfaces
public/        - Static assets (images, icons)
```

## License

MIT