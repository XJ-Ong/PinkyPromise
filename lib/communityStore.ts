"use client";

import { deals as seedDeals } from "@/data/deals";
import { CommunityDeal } from "@/lib/types";

const STORAGE_KEY = "pp_community_deals_v1";

interface StoredState {
  added: CommunityDeal[];               // new deals created by this browser
  edited: Record<string, Partial<CommunityDeal>>; // edits keyed by seed OR added deal id
}

function readStoredState(): StoredState {
  if (typeof window === "undefined") return { added: [], edited: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { added: [], edited: {} };
    const parsed = JSON.parse(raw);
    return {
      added: Array.isArray(parsed.added) ? parsed.added : [],
      edited: typeof parsed.edited === "object" && parsed.edited ? parsed.edited : {},
    };
  } catch {
    return { added: [], edited: {} };
  }
}

function writeStoredState(state: StoredState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
 * combo already exists (seed or previously added).
 */
export function addDeal(
  input: AddDealInput
): { ok: true; deal: CommunityDeal } | { ok: false; reason: "duplicate"; existing: CommunityDeal } {
  const existing = findDuplicate(input.productName, input.storeName);
  if (existing) {
    return { ok: false, reason: "duplicate", existing };
  }

  const deal: CommunityDeal = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    productName: input.productName,
    category: input.category,
    price: input.price,
    storeName: input.storeName,
    discountPercent: input.discountPercent,
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
  writeStoredState(state);

  return { ok: true, deal };
}

/** Edits an existing deal (seed or user-added) by id. Only storeName and price are expected to change. */
export function editDeal(id: string, changes: Partial<Pick<CommunityDeal, "storeName" | "price">>) {
  const state = readStoredState();

  // If it's a locally-added deal, patch it directly in `added`.
  const addedIndex = state.added.findIndex((d) => d.id === id);
  if (addedIndex !== -1) {
    state.added[addedIndex] = { ...state.added[addedIndex], ...changes };
    writeStoredState(state);
    return;
  }

  // Otherwise it's a seed deal — store the diff in `edited`.
  state.edited[id] = { ...state.edited[id], ...changes };
  writeStoredState(state);
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
  | { ok: true; deal: CommunityDeal }
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
    trimmed.price < 0
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
    updated.discountPercent = Math.round(
      ((current.baselinePrice - trimmed.price) / current.baselinePrice) * 100
    );
  }

  state.added[index] = updated;
  writeStoredState(state);

  return { ok: true, deal: updated };
}

/** Deletes a locally added deal and any saved overlay for it. */
export function deleteMyAddedDeal(id: string): { ok: true } | { ok: false; reason: "not_found" } {
  const state = readStoredState();
  const index = state.added.findIndex((d) => d.id === id);
  if (index === -1) return { ok: false, reason: "not_found" };

  state.added.splice(index, 1);
  delete state.edited[id];
  writeStoredState(state);

  return { ok: true };
}