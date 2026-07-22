import { Scenario } from "@/lib/types";

export const scenarios: Scenario[] = [
  {
    id: "A",
    type: "pink_tax",
    label: "Clear Pink Tax",
    thumbnail: "/images/scenarios/scenario-a.svg",
    product: {
      name: "PinkCare Razor",
      image: "/images/scenarios/pink-razor.svg",
      price: 24.90,
      store: "HealthMart",
      unitSize: "3 blades",
      rating: 4.2,
    },
    alternative: {
      name: "Classic Razor",
      image: "/images/scenarios/classic-razor.svg",
      price: 19.90,
      store: "HealthMart",
      unitSize: "3 blades",
      rating: 4.0,
    },
    taxPercent: 25,
  },
  {
    id: "B",
    type: "fair_price",
    label: "Fair Price",
    thumbnail: "/images/scenarios/scenario-b.svg",
    product: {
      name: "FreshCare Body Wash",
      image: "/images/scenarios/freshcare-pink.svg",
      price: 15.90,
      store: "FreshCare",
      unitSize: "500 ml",
      rating: 4.5,
    },
    alternative: {
      name: "FreshCare Body Wash",
      image: "/images/scenarios/freshcare-blue.svg",
      price: 15.90,
      store: "FreshCare",
      unitSize: "500 ml",
      rating: 4.5,
    },
    taxPercent: 0,
  },
  {
    id: "C",
    type: "no_match",
    label: "No Match Found",
    thumbnail: "/images/scenarios/scenario-c.svg",
    product: {
      name: "Boutique Hair Serum",
      image: "/images/scenarios/hair-serum.svg",
      price: 45.00,
      store: "BeautyHub",
      unitSize: "100 ml",
      rating: 4.8,
    },
  },
];
