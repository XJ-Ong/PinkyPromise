export interface Product {
  name: string;
  image: string;              // path under /public/images/
  price: number;               // in RM
  unitSize: string;            // e.g. "500 ml" — used for the "Size" comparison row
  material: string;            // e.g. "Plastic + rubber grip"
  functionality: string;       // factual — e.g. "Twin-blade cartridge"
  design: string;              // factual — e.g. "Floral-print plastic handle"
  rating: number;               // 0-5
  // NOTE: `store` intentionally removed from Product. Store is never system-seeded
  // (see CommunityDeal.storeName) — B5/A2 of the change request.
}

export type ScenarioType = "pink_tax" | "fair_price";
export type ScenarioRole = "target" | "compare";

export interface Scenario {
  id: string;              // "A".."J" — was a closed 5-letter union, now a plain string
  type: ScenarioType;
  role: ScenarioRole;      // NEW — distinguishes Step-1 pool ("target") from Step-2 pool ("compare")
  pairId: string;          // NEW — links exactly one "target" scenario to exactly one "compare" scenario
  label: string;           // e.g. "Smooth Touch Floral Razor"
  thumbnail: string;
  product: Product;
  taxPercent?: number;     // present only when type === "pink_tax"; omit/0 when "fair_price"
}

export interface CommunityDeal {
  id: string;
  productName: string;
  category: "Personal Care" | "Household" | "Clothing" | "Other";
  price: number;
  storeName: string;       // NEW — required, always user-entered at submission time (B5)
  discountPercent: number;
  submitterName: string;
  timestamp: string;       // ISO date string
  verified: boolean;

  // NEW fields below
  image: string;               // hotlinked external URL (Unsplash), not a local path
  unitSize: string;             // e.g. "Pack of 4" — mirrors Product.unitSize
  material: string;             // mirrors Product.material
  functionality: string;        // mirrors Product.functionality — factual
  design: string;               // mirrors Product.design — factual
  rating: number;                // mirrors Product.rating
  submissionNote?: string;      // optional user-authored note prefilled with the generated summary
  baselinePrice?: number;       // optional comparison target price — used to recompute
                                  // discountPercent when the editable price changes
  addedByUser: boolean;         // true only for deals created through this browser's
                                  // "Add to Community Hub" flow (i.e. stored in
                                  // localStorage) — used to show the Edit button on
                                  // the Profile page. Seed deals are always false.
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;              // NEW — external article URL, opens in new tab (A1)
  source: string;           // NEW — e.g. "World Economic Forum"
}

export interface MockProfile {
  name: string;
  avatar: string;
  memberSince: string;
}

export type ComparisonResult = "pink_tax" | "fair_price";

export interface ComparisonRecord {
  id: string;
  targetScenarioId: string;
  compareScenarioId: string;
  result: ComparisonResult;
  taxPercent: number;
  completedAt: string;
}
