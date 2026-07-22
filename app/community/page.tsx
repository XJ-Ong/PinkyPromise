import { deals } from "@/data/deals";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <main>
      {/* Search Bar */}
      <section data-testid="search-bar">
        <input type="text" placeholder="Search deals..." data-testid="search-input" />
      </section>

      {/* Category Filter Chips */}
      <section data-testid="category-filters">
        <button data-testid="filter-all">All</button>
        <button data-testid="filter-personal-care">Personal Care</button>
        <button data-testid="filter-household">Household</button>
        <button data-testid="filter-clothing">Clothing</button>
        <button data-testid="filter-other">Other</button>
      </section>

      {/* Price Range Filter */}
      <section data-testid="price-range-filter">
        <select data-testid="sort-select">
          <option value="recent">Most Recent</option>
          <option value="savings">Biggest Savings</option>
        </select>
      </section>

      {/* Deal List */}
      <section>
        <h2>Community Deals</h2>
        <div>
          {deals.map((deal) => (
            <article key={deal.id} data-testid={`deal-card-${deal.id}`}>
              <h3>{deal.productName}</h3>
              <p>{deal.category}</p>
              <p>RM {deal.price.toFixed(2)}</p>
              <p>Save {deal.discountPercent}%</p>
              {deal.verified && <span>Verified</span>}
              <p>by {deal.submitterName}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Floating Action Button (mobile) / Add Community Deal Button (web) */}
      <div data-testid="add-deal-button">
        <Link href="/report">+ Add Community Deal</Link>
      </div>
    </main>
  );
}
