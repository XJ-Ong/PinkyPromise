import { Heart, Users2, Target, Ban, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-10 pb-24 md:pb-10 max-w-3xl">
      <header className="space-y-2">
        <h1 className="hidden text-3xl font-bold tracking-tight text-slate-900 md:block">About Us</h1>
        <p className="text-slate-500">Who we are and why we built PinkyPromise.</p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-slate-900">Mission</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          PinkyPromise tackles the &quot;Pink Tax&quot; — the pattern where female-marketed
          products (razors, sprays, clothing, and other everyday goods) are priced
          higher than functionally similar products marketed to men. Because consumers
          often can&apos;t tell whether a price gap reflects real cost differences or
          just marketing, PinkyPromise helps people make informed, justified
          purchasing choices. The project supports <strong>UN SDG 5: Gender Equality</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Users2 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-slate-900">Who it&apos;s for</h2>
        </div>
        <ul className="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
          <li><strong>Female customers</strong> — save money by spotting and avoiding unjustified surcharges.</li>
          <li><strong>The general public</strong> — build awareness of retail pricing and everyday financial literacy.</li>
          <li><strong>Our Instagram community (@pinkypromise.my)</strong> — use shareable comparison content to advocate for gender equality in pricing.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-slate-900">What the Pink Tax Checker does</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Compares predefined male-marketed and female-marketed product pairs on
          price, materials, and product attributes, so users can see clearly whether a
          price difference is justified — not just guess.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Ban className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-slate-900">What&apos;s intentionally out of scope (for now)</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          This is a prototype, not a live production system: it does not use
          real-time AI image recognition, does not connect to a live global retail
          database, and is limited to a single country/region and a defined set of
          high-discrimination product categories, to keep comparisons accurate and
          trustworthy.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-slate-900">The team</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          - Zahra (Project Manager)
          - Adham
          - Dineysh
          - Kok
          - Wei Kang
          - Fikri
          - XJ
          - Jun Yin
        </p>
      </section>
    </main>
  );
}
