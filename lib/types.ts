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
  id: "A" | "B" | "C" | "D" | "E";
  type: ScenarioType;
  label: string;               // e.g. "Smooth Touch Floral Razor"
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
  pinkTaxAlertsFound: number;
}
