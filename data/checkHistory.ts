import { ComparisonRecord } from "@/lib/types";

/**
 * Seed demo history: eight completed checks (six pink-tax results, two
 * fair-price results). These are demo comparison history records, not
 * community reports or CommunityDeal objects. Repeated scenario pairs are
 * intentional — each entry represents a separate demo check session.
 * Timestamps are chronological (oldest first) in the source; the store
 * getter returns them newest first.
 */
export const checkHistory: ComparisonRecord[] = [
  {
    id: "seed-check-1",
    targetScenarioId: "A",
    compareScenarioId: "F",
    result: "pink_tax",
    taxPercent: 41.6,
    completedAt: "2026-05-06T09:30:00Z",
  },
  {
    id: "seed-check-2",
    targetScenarioId: "B",
    compareScenarioId: "G",
    result: "pink_tax",
    taxPercent: 44,
    completedAt: "2026-05-20T14:15:00Z",
  },
  {
    id: "seed-check-3",
    targetScenarioId: "D",
    compareScenarioId: "I",
    result: "fair_price",
    taxPercent: 0,
    completedAt: "2026-06-02T11:00:00Z",
  },
  {
    id: "seed-check-4",
    targetScenarioId: "C",
    compareScenarioId: "H",
    result: "pink_tax",
    taxPercent: 50,
    completedAt: "2026-06-15T16:45:00Z",
  },
  {
    id: "seed-check-5",
    targetScenarioId: "E",
    compareScenarioId: "J",
    result: "pink_tax",
    taxPercent: 33.1,
    completedAt: "2026-06-28T08:20:00Z",
  },
  {
    id: "seed-check-6",
    targetScenarioId: "A",
    compareScenarioId: "F",
    result: "pink_tax",
    taxPercent: 41.6,
    completedAt: "2026-07-10T10:05:00Z",
  },
  {
    id: "seed-check-7",
    targetScenarioId: "B",
    compareScenarioId: "G",
    result: "pink_tax",
    taxPercent: 44,
    completedAt: "2026-07-18T15:10:00Z",
  },
  {
    id: "seed-check-8",
    targetScenarioId: "D",
    compareScenarioId: "I",
    result: "fair_price",
    taxPercent: 0,
    completedAt: "2026-07-22T19:40:00Z",
  },
];