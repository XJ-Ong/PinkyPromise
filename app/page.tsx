import Link from "next/link";
import { insights } from "@/data/insights";
import { deals } from "@/data/deals";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header>
        <h1>PinkyPromise</h1>
        <button aria-label="Notifications">Bell</button>
      </header>

      {/* Hero Card */}
      <section>
        <h2>Fair prices for everyone.</h2>
        <p>Check if you&apos;re paying the pink tax on everyday products.</p>
        <Link href="/upload" data-testid="hero-cta">
          Upload Product to Check
        </Link>
      </section>

      {/* Latest Pink Tax Insights */}
      <section>
        <h2>Latest Pink Tax Insights</h2>
        <div>
          {insights.map((insight) => (
            <article key={insight.id} data-testid={`insight-${insight.id}`}>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Recently Added Community Deals */}
      <section>
        <h2>Recently Added Community Deals</h2>
        <div>
          {deals.slice(0, 4).map((deal) => (
            <article key={deal.id} data-testid={`deal-${deal.id}`}>
              <h3>{deal.productName}</h3>
              <p>{deal.category}</p>
              <p>RM {deal.price.toFixed(2)}</p>
              <p>Save {deal.discountPercent}%</p>
              {deal.verified && <span>Verified</span>}
              <p>by {deal.submitterName}</p>
            </article>
          ))}
        </div>
        <Link href="/community" data-testid="see-all-deals">
          See all &gt;
        </Link>
      </section>
    </main>
  );
}
