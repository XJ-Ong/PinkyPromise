import Link from "next/link";
import { scenarios } from "@/data/scenarios";

export default function ComparePage({
  searchParams,
}: {
  searchParams: { scenario?: string };
}) {
  const scenarioId = searchParams.scenario as "A" | "B" | "C" | undefined;
  const scenario = scenarios.find((s) => s.id === scenarioId);

  if (!scenario) {
    return (
      <main>
        <h1>No scenario selected</h1>
        <Link href="/upload">Go back to Upload</Link>
      </main>
    );
  }

  // State A - Pink Tax
  if (scenario.type === "pink_tax" && scenario.alternative && scenario.taxPercent) {
    const savings = scenario.alternative.price - scenario.product.price;
    return (
      <main>
        {/* Stepper */}
        <div data-testid="stepper">
          <span>Upload</span>
          <span>Process</span>
          <span>Step 3 of 3: Compare</span>
        </div>

        {/* Pink Tax Badge */}
        <div data-testid="pink-tax-badge">
          <strong>Pink Tax: +{scenario.taxPercent}%</strong>
          <p>Same function, higher price</p>
        </div>

        {/* Comparison Table */}
        <section data-testid="comparison-table">
          <div>
            <h3>Pink Tax Product</h3>
            <p>{scenario.product.name}</p>
            <p>RM {scenario.product.price.toFixed(2)}</p>
            <p>{scenario.product.store}</p>
            <p>{scenario.product.unitSize}</p>
            <p>Rating: {scenario.product.rating}</p>
          </div>
          <div>
            <h3>Fair Price Alternative</h3>
            <p>{scenario.alternative.name}</p>
            <p>RM {scenario.alternative.price.toFixed(2)}</p>
            <p>{scenario.alternative.store}</p>
            <p>{scenario.alternative.unitSize}</p>
            <p>Rating: {scenario.alternative.rating}</p>
          </div>
        </section>

        {/* Savings Callout */}
        <div data-testid="savings-callout">
          <p>You Save RM {Math.abs(savings).toFixed(2)} — that&apos;s {scenario.taxPercent}% off</p>
        </div>

        {/* Price Breakdown Illustration */}
        <div data-testid="price-breakdown">
          <p>Price Breakdown Illustration</p>
          <p>80% base cost / 20% pink markup</p>
        </div>

        {/* CTA */}
        <Link href={`/report?context=${scenario.id}`} data-testid="report-cta">
          Report a Better Price
        </Link>
      </main>
    );
  }

  // State B - Fair Price
  if (scenario.type === "fair_price") {
    return (
      <main>
        {/* Stepper */}
        <div data-testid="stepper">
          <span>Upload</span>
          <span>Process</span>
          <span>Step 3 of 3: Compare</span>
        </div>

        {/* Fair Price Badge */}
        <div data-testid="fair-price-badge">
          <strong>No Pink Tax Detected</strong>
          <p>This product is fairly priced compared to alternatives.</p>
        </div>

        {/* Comparison Table */}
        <section data-testid="comparison-table">
          <div>
            <h3>Product</h3>
            <p>{scenario.product.name}</p>
            <p>RM {scenario.product.price.toFixed(2)}</p>
            <p>{scenario.product.store}</p>
            <p>{scenario.product.unitSize}</p>
            <p>Rating: {scenario.product.rating}</p>
          </div>
          {scenario.alternative && (
            <div>
              <h3>Alternative</h3>
              <p>{scenario.alternative.name}</p>
              <p>RM {scenario.alternative.price.toFixed(2)}</p>
              <p>{scenario.alternative.store}</p>
              <p>{scenario.alternative.unitSize}</p>
              <p>Rating: {scenario.alternative.rating}</p>
            </div>
          )}
        </section>

        {/* Savings Callout - RM 0.00 difference */}
        <div data-testid="savings-callout">
          <p>RM 0.00 difference</p>
        </div>

        {/* CTA */}
        <button data-testid="add-to-community">
          Add to Community Hub
        </button>
      </main>
    );
  }

  // State C - No Match Found
  if (scenario.type === "no_match") {
    return (
      <main>
        {/* Stepper */}
        <div data-testid="stepper">
          <span>Upload</span>
          <span>Process</span>
          <span>Step 3 of 3: Compare</span>
        </div>

        {/* Empty State */}
        <div data-testid="no-match-empty-state">
          <p>Magnifying Glass Icon</p>
          <h2>We couldn&apos;t find a verified alternative for this product yet.</h2>
          <p>Help grow our database — report this product or suggest an alternative you know of.</p>
        </div>

        {/* CTA */}
        <Link href={`/report?context=${scenario.id}`} data-testid="report-product-cta">
          Report This Product
        </Link>
      </main>
    );
  }

  return null;
}
