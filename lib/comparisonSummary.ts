import { ComparisonResult, Product } from "@/lib/types";

/**
 * Deterministic "AI-generated" demo copy derived from the factual product
 * fields and the comparison result. Kept pure so it can be unit-tested and
 * never stored as a product metric.
 */
export function getComparisonSummary(
  target: Product,
  compare: Product,
  result: ComparisonResult,
  taxPercent: number,
): string {
  const functionMatch = target.functionality.trim().toLowerCase() === compare.functionality.trim().toLowerCase();
  const designDiffers = target.design.trim().toLowerCase() !== compare.design.trim().toLowerCase();

  if (result === "pink_tax") {
    if (functionMatch && designDiffers) {
      return `Both products provide ${target.functionality.toLowerCase()}. The higher-priced option differs mainly in design: ${target.design.toLowerCase()} versus ${compare.design.toLowerCase()}. It costs ${taxPercent}% more.`;
    }
    return `The products should be compared carefully because their functional specifications are not identical. The observed price difference is ${taxPercent}%.`;
  }

  return `The products have comparable listed price and specifications. No pink-tax markup was detected in this demo comparison.`;
}