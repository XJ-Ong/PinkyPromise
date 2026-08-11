"use client";

import { deals as seedDeals } from "@/data/deals";
import { CommunityDeal } from "@/lib/types";

const STORAGE_KEY = "pp_community_deals_v1";

interface StoredState {
  added: CommunityDeal[];               // new deals created by this browser
  edited: Record<string, Partial<CommunityDeal>>; // edits keyed by seed OR added deal id
}

function isValidStoredDeal(x: unknown): x is CommunityDeal {
  if (!x || typeof x !== "object") return false;
  const d = x as Record<string, unknown>;
  if (typeof d.id !== "string" || !d.id) return false;
  if (typeof d.productName !== "string" || !d.productName.trim()) return false;
  if (typeof d.storeName !== "string" || !d.storeName.trim()) return false;
  if (typeof d.price !== "number" || !Number.isFinite(d.price) || d.price <= 0) return false;
  if (typeof d.discountPercent !== "number" || !Number.isFinite(d.discountPercent) || d.discountPercent < 0 || d.discountPercent > 99) return false;
  if (typeof d.timestamp !== "string" || Number.isNaN(new Date(d.timestamp).getTime())) return false;
  return true;
}

function readStoredState(): StoredState {
  if (typeof window === "undefined") return { added: [], edited: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { added: [], edited: {} };
    const parsed = JSON.parse(raw);
    return {
      added: Array.isArray(parsed.added) ? parsed.added.filter(isValidStoredDeal) : [],
      edited: typeof parsed.edited === "object" && parsed.edited ? parsed.edited : {},
    };
  } catch {
    return { added: [], edited: {} };
  }
}

function writeStoredState(state: StoredState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

/** Returns the full merged list: seed deals (with any local edits applied) + user-added deals. */
export function getAllDeals(): CommunityDeal[] {
  const { added, edited } = readStoredState();

  const mergedSeed = seedDeals.map((deal) =>
    edited[deal.id] ? { ...deal, ...edited[deal.id] } : deal
  );

  const mergedAdded = added.map((deal) =>
    edited[deal.id] ? { ...deal, ...edited[deal.id] } : deal
  );

  return [...mergedAdded, ...mergedSeed];
}

/** Case-insensitive, trimmed match on productName + storeName. */
export function findDuplicate(productName: string, storeName: string): CommunityDeal | undefined {
  return getAllDeals().find(
    (d) =>
      normalize(d.productName) === normalize(productName) &&
      normalize(d.storeName) === normalize(storeName)
  );
}

export interface AddDealInput {
  productName: string;
  category: CommunityDeal["category"];
  price: number;
  storeName: string;
  image: string;
  unitSize: string;
  material: string;
  functionality: string;
  design: string;
  rating: number;
  submissionNote?: string;
  submitterName: string;
  discountPercent: number;
  baselinePrice?: number;
}

/**
 * Adds a new deal. Returns { ok: true, deal } on success, or
 * { ok: false, reason: "duplicate", existing } if a matching product+store
 * combo already exists (seed or previously added), or
 * { ok: false, reason: "invalid" } if the price is missing or not greater than 0.
 */
export function addDeal(
  input: AddDealInput
):
  | { ok: true; deal: CommunityDeal; persisted: boolean }
  | { ok: false; reason: "duplicate"; existing: CommunityDeal }
  | { ok: false; reason: "invalid" } {
  if (!Number.isFinite(input.price) || input.price <= 0) {
    return { ok: false, reason: "invalid" };
  }

  const existing = findDuplicate(input.productName, input.storeName);
  if (existing) {
    return { ok: false, reason: "duplicate", existing };
  }

  const rawDiscount =
    input.baselinePrice && input.baselinePrice > 0
      ? ((input.baselinePrice - input.price) / input.baselinePrice) * 100
      : input.discountPercent;
  const discountPercent = Math.max(0, Math.min(99, Math.round(rawDiscount)));

  const deal: CommunityDeal = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    productName: input.productName,
    category: input.category,
    price: input.price,
    storeName: input.storeName,
    discountPercent,
    submitterName: input.submitterName,
    timestamp: new Date().toISOString(),
    verified: false,
    image: input.image,
    unitSize: input.unitSize,
    material: input.material,
    functionality: input.functionality,
    design: input.design,
    rating: input.rating,
    submissionNote: input.submissionNote,
    baselinePrice: input.baselinePrice,
    addedByUser: true,
  };

  const state = readStoredState();
  state.added = [deal, ...state.added];
  const persisted = writeStoredState(state);

  return { ok: true, deal, persisted };
}

/** Deals created by this browser (for the Profile "My Submissions" section). */
export function getMyAddedDeals(): CommunityDeal[] {
  return getAllDeals().filter((d) => d.addedByUser);
}

export type EditableCommunityDealFields = Pick<
  CommunityDeal,
  "productName" | "material" | "submissionNote" | "storeName" | "price"
>;

/**
 * Updates a locally added deal. Rejects ids that are not present in
 * `state.added` (seed deals are read-only), blank or invalid values, and
 * duplicate product-name-plus-store pairs (excluding the edited deal itself).
 * Trimmed values are saved; discountPercent is recomputed from the stored
 * comparison baseline when a new price is available, otherwise preserved.
 */
export function updateMyAddedDeal(
  id: string,
  changes: EditableCommunityDealFields
):
  | { ok: true; deal: CommunityDeal; persisted: boolean }
  | { ok: false; reason: "not_found" | "duplicate" | "invalid"; existing?: CommunityDeal } {
  const trimmed: EditableCommunityDealFields = {
    productName: changes.productName.trim(),
    material: changes.material.trim(),
    submissionNote: changes.submissionNote?.trim(),
    storeName: changes.storeName.trim(),
    price: changes.price,
  };

  if (
    !trimmed.productName ||
    !trimmed.material ||
    !trimmed.storeName ||
    !Number.isFinite(trimmed.price) ||
    trimmed.price <= 0
  ) {
    return { ok: false, reason: "invalid" };
  }

  const state = readStoredState();
  const index = state.added.findIndex((d) => d.id === id);
  if (index === -1) return { ok: false, reason: "not_found" };

  const duplicate = getAllDeals().find(
    (d) =>
      d.id !== id &&
      normalize(d.productName) === normalize(trimmed.productName) &&
      normalize(d.storeName) === normalize(trimmed.storeName)
  );
  if (duplicate) {
    return { ok: false, reason: "duplicate", existing: duplicate };
  }

  const current = state.added[index];
  const updated: CommunityDeal = { ...current, ...trimmed };

  if (
    typeof current.baselinePrice === "number" &&
    current.baselinePrice > 0 &&
    trimmed.price !== current.price
  ) {
    const rawDiscount =
      ((current.baselinePrice - trimmed.price) / current.baselinePrice) * 100;
    updated.discountPercent = Math.max(0, Math.min(99, Math.round(rawDiscount)));
  }

  state.added[index] = updated;
  const persisted = writeStoredState(state);

  return { ok: true, deal: updated, persisted };
}

/** Deletes a locally added deal and any saved overlay for it. */
export function deleteMyAddedDeal(id: string): { ok: true; persisted: boolean } | { ok: false; reason: "not_found" } {
  const state = readStoredState();
  const index = state.added.findIndex((d) => d.id === id);
  if (index === -1) return { ok: false, reason: "not_found" };

  state.added.splice(index, 1);
  delete state.edited[id];
  const persisted = writeStoredState(state);

  return { ok: true, persisted };
}