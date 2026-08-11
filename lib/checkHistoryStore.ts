import { checkHistory as seedCheckHistory } from "@/data/checkHistory";
import { ComparisonRecord } from "@/lib/types";

const STORAGE_KEY = "pp_check_history_v1";

interface StoredCheckHistory {
  records: ComparisonRecord[];
}

function readStoredRecords(): ComparisonRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<StoredCheckHistory>;
    return Array.isArray(parsed.records) ? parsed.records : [];
  } catch {
    // Malformed storage falls back to seeds only — never throw.
    return [];
  }
}

function writeStoredRecords(records: ComparisonRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ records }));
}

function newestFirst(records: ComparisonRecord[]): ComparisonRecord[] {
  return [...records].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
}

/**
 * Returns the user's full check history, newest first. On the server (SSR)
 * this returns only the eight seed records and never touches `window`. In the
 * browser it merges the seed demo history with locally recorded checks.
 * Imported seed arrays are never mutated.
 */
export function getCheckHistory(): ComparisonRecord[] {
  const localRecords = readStoredRecords();
  return newestFirst([...localRecords, ...seedCheckHistory]);
}

/**
 * Persists a completed comparison check. Does not deduplicate by scenario
 * pair — a repeated comparison is a new completed check event. Generates an
 * id using a timestamp plus a random suffix, matching the Community store
 * approach.
 */
export function recordCompletedCheck(
  input: Omit<ComparisonRecord, "id" | "completedAt">
): ComparisonRecord {
  const record: ComparisonRecord = {
    ...input,
    id: `check-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: new Date().toISOString(),
  };

  const records = readStoredRecords();
  writeStoredRecords([record, ...records]);

  return record;
}