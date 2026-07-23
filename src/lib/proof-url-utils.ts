/**
 * Proof URL Utilities
 *
 * Internal QA utilities for inspecting legacy portfolio proof URLs.
 * These functions operate on local data only — no network calls.
 */

import {
  legacyPortfolioCards,
  publicPortfolioCards,
  type PortfolioCard,
} from "./legacy-portfolio";

/** Returns all proof URLs across all portfolio cards (may contain duplicates). */
export function getAllLegacyProofUrls(): { url: string; cardId: number; program: string; client: string }[] {
  const results: { url: string; cardId: number; program: string; client: string }[] = [];
  for (const card of legacyPortfolioCards) {
    for (const url of card.proof_urls) {
      results.push({ url, cardId: card.id, program: card.program, client: card.client });
    }
  }
  return results;
}

/** Returns unique proof URLs with their associated card IDs. */
export function getUniqueProofUrls(): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const card of legacyPortfolioCards) {
    for (const url of card.proof_urls) {
      const existing = map.get(url) || [];
      existing.push(card.id);
      map.set(url, existing);
    }
  }
  return map;
}

/** Returns portfolio cards that have zero proof URLs. */
export function getPortfolioCardsMissingProof(): PortfolioCard[] {
  return legacyPortfolioCards.filter((c) => c.proof_urls.length === 0);
}

/** Returns portfolio cards that have multiple proof URLs. */
export function getPortfolioCardsWithMultipleProof(): PortfolioCard[] {
  return legacyPortfolioCards.filter((c) => c.proof_urls.length > 1);
}

/** Returns proof URLs assigned to more than one registry record. */
export function getConflictingProofUrls(): Map<string, number[]> {
  return new Map([...getUniqueProofUrls()].filter(([, cardIds]) => cardIds.length > 1));
}

/** Basic URL shape validation — checks protocol and domain structure. */
export function validateProofUrlShape(url: string): { valid: boolean; reason?: string } {
  if (!url || typeof url !== "string") return { valid: false, reason: "Empty or non-string" };
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, reason: `Invalid protocol: ${parsed.protocol}` };
    }
    if (!parsed.hostname.includes(".")) {
      return { valid: false, reason: `Invalid hostname: ${parsed.hostname}` };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: "Malformed URL" };
  }
}

/** Summary statistics for audit purposes. */
export function getProofAuditSummary() {
  const allUrls = getAllLegacyProofUrls();
  const unique = getUniqueProofUrls();
  const missing = getPortfolioCardsMissingProof();
  const multi = getPortfolioCardsWithMultipleProof();
  const conflicts = getConflictingProofUrls();
  const malformed = [...unique.keys()].filter((u) => !validateProofUrlShape(u).valid);

  return {
    totalCards: legacyPortfolioCards.length,
    publicCards: publicPortfolioCards.length,
    totalProofUrlReferences: allUrls.length,
    uniqueProofUrls: unique.size,
    conflictingProofUrls: conflicts.size,
    conflictingCardIds: [...new Set([...conflicts.values()].flat())],
    cardsMissingProof: missing.length,
    cardsMissingProofIds: missing.map((c) => c.id),
    cardsWithMultipleProof: multi.length,
    malformedUrls: malformed,
  };
}
