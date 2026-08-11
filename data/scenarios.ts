import { Scenario } from "@/lib/types";

export const scenarios: Scenario[] = [
  // ---------- Pair 1: Razors ----------
  {
    id: "A",
    type: "pink_tax",
    role: "target",
    pairId: "pair-1",
    label: "Smooth Touch Floral Razor",
    thumbnail: "/images/scenarios/a-product.png",
    product: {
      name: "Smooth Touch Floral Razor",
      image: "/images/scenarios/a-product.png",
      price: 8.50,
      unitSize: "Pack of 4",
      material: "Stainless steel blades, plastic floral-print handle",
      functionality: "Twin-blade cartridge",
      design: "Floral-print plastic handle",
      rating: 4.3,
    },
    taxPercent: 41.6,
  },
  {
    id: "F",
    type: "pink_tax",
    role: "compare",
    pairId: "pair-1",
    label: "Classic Grip Standard Razor",
    thumbnail: "/images/scenarios/f-product.png",
    product: {
      name: "Classic Grip Standard Razor",
      image: "/images/scenarios/f-product.png",
      price: 6.00,
      unitSize: "Pack of 4",
      material: "Stainless steel blades, plastic textured-grip handle",
      functionality: "Twin-blade cartridge",
      design: "Textured neutral-grip handle",
      rating: 4.2,
    },
  },

  // ---------- Pair 2: Body spray/mist ----------
  {
    id: "B",
    type: "pink_tax",
    role: "target",
    pairId: "pair-2",
    label: "Bloom Fresh Body Mist",
    thumbnail: "/images/scenarios/b-product.png",
    product: {
      name: "Bloom Fresh Body Mist",
      image: "/images/scenarios/b-product.png",
      price: 7.20,
      unitSize: "150 ml",
      material: "Aqueous fragrance solution, glass bottle",
      functionality: "Continuous fine-mist spray",
      design: "Floral-pattern glass bottle",
      rating: 4.4,
    },
    taxPercent: 44,
  },
  {
    id: "G",
    type: "pink_tax",
    role: "compare",
    pairId: "pair-2",
    label: "Active Sport Body Spray",
    thumbnail: "/images/scenarios/g-product.png",
    product: {
      name: "Active Sport Body Spray",
      image: "/images/scenarios/g-product.png",
      price: 5.00,
      unitSize: "150 ml",
      material: "Aqueous fragrance solution, aluminum can",
      functionality: "Continuous fine-mist spray",
      design: "Neutral aluminum can, sport label",
      rating: 4.3,
    },
  },

  // ---------- Pair 3: Travel organizer ----------
  {
    id: "C",
    type: "pink_tax",
    role: "target",
    pairId: "pair-3",
    label: "Pastel Rose Travel Organizer Pouch",
    thumbnail: "/images/scenarios/c-product.png",
    product: {
      name: "Pastel Rose Travel Organizer Pouch",
      image: "/images/scenarios/c-product.png",
      price: 15.00,
      unitSize: "1 pouch",
      material: "Polyester exterior, nylon lining, YKK-style zipper",
      functionality: "Multi-compartment organizer pouch",
      design: "Pastel rose print",
      rating: 4.5,
    },
    taxPercent: 50,
  },
  {
    id: "H",
    type: "pink_tax",
    role: "compare",
    pairId: "pair-3",
    label: "Utility Travel Toiletry Kit",
    thumbnail: "/images/scenarios/h-product.png",
    product: {
      name: "Utility Travel Toiletry Kit",
      image: "/images/scenarios/h-product.png",
      price: 10.00,
      unitSize: "1 pouch",
      material: "Polyester exterior, nylon lining, YKK-style zipper",
      functionality: "Multi-compartment organizer pouch",
      design: "Solid neutral colorway",
      rating: 4.4,
    },
  },

  // ---------- Pair 4: Body wash (fair price) ----------
  {
    id: "D",
    type: "fair_price",
    role: "target",
    pairId: "pair-4",
    label: "FreshCare Body Wash",
    thumbnail: "/images/scenarios/d-product.png",
    product: {
      name: "FreshCare Body Wash",
      image: "/images/scenarios/d-product.png",
      price: 15.90,
      unitSize: "500 ml",
      material: "Sulfate-free gel formula, PET bottle",
      functionality: "Pump-dispensed sulfate-free body wash",
      design: "White PET bottle, unisex label",
      rating: 4.5,
    },
    taxPercent: 0,
  },
  {
    id: "I",
    type: "fair_price",
    role: "compare",
    pairId: "pair-4",
    label: "FreshCare Body Wash (Men's)",
    thumbnail: "/images/scenarios/i-product.png",
    product: {
      name: "FreshCare Body Wash (Men's)",
      image: "/images/scenarios/i-product.png",
      price: 15.90,
      unitSize: "500 ml",
      material: "Sulfate-free gel formula, PET bottle",
      functionality: "Pump-dispensed sulfate-free body wash",
      design: "White PET bottle, unisex label",
      rating: 4.5,
    },
  },

  // ---------- Pair 5: Activewear (NEW) ----------
  {
    id: "E",
    type: "pink_tax",
    role: "target",
    pairId: "pair-5",
    label: "Blossom Fit Activewear Tee",
    thumbnail: "/images/scenarios/e-product.png",
    product: {
      name: "Blossom Fit Activewear Tee",
      image: "/images/scenarios/e-product.png",
      price: 39.90,
      unitSize: "Size M",
      material: "88% polyester / 12% spandex, moisture-wicking",
      functionality: "Moisture-wicking training tee",
      design: "Blush colorway, floral-tag branding",
      rating: 4.6,
    },
    taxPercent: 33.1,
  },
  {
    id: "J",
    type: "pink_tax",
    role: "compare",
    pairId: "pair-5",
    label: "Everyday Fit Training Tee",
    thumbnail: "/images/scenarios/j-product.png",
    product: {
      name: "Everyday Fit Training Tee",
      image: "/images/scenarios/j-product.png",
      price: 29.90,
      unitSize: "Size M",
      material: "88% polyester / 12% spandex, moisture-wicking",
      functionality: "Moisture-wicking training tee",
      design: "Neutral heather, plain branding",
      rating: 4.5,
    },
  },
];

export function getTargetScenarios(): Scenario[] {
  return scenarios.filter((s) => s.role === "target");
}

export function getCompareScenarioForTarget(targetId: string): Scenario | undefined {
  const target = scenarios.find((s) => s.id === targetId && s.role === "target");
  if (!target) return undefined;
  return scenarios.find((s) => s.role === "compare" && s.pairId === target.pairId);
}

export function getScenarioById(id: string | null | undefined): Scenario | undefined {
  if (!id) return undefined;
  return scenarios.find((s) => s.id === id);
}

export function getValidComparison(targetId: string | null | undefined,
                                   compareId: string | null | undefined) {
  const target = getScenarioById(targetId);
  const compare = getScenarioById(compareId);
  if (!target || !compare) return undefined;
  if (target.role !== "target" || compare.role !== "compare") return undefined;
  if (target.pairId !== compare.pairId) return undefined;
  return { target, compare };
}
