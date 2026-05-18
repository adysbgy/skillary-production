import * as fs from "fs";
import * as path from "path";
import { legacyPortfolioCards } from "../src/lib/legacy-portfolio";

const urlMap = new Map<string, number[]>();
for (const card of legacyPortfolioCards) {
  for (const url of card.proof_urls) {
    const existing = urlMap.get(url) || [];
    existing.push(card.id);
    urlMap.set(url, existing);
  }
}

let content = `export type ProofManualStatus =
  | "PUBLIC"
  | "LOGIN_REQUIRED"
  | "PRIVATE"
  | "BROKEN"
  | "NEEDS_REVIEW"
  | "NOT_CHECKED";

export interface ProofManualValidation {
  url: string;
  manualStatus: ProofManualStatus;
  lastCheckedAt?: string;
  checkedBy?: string;
  relatedPortfolioIds: number[];
  notes?: string;
}

export const legacyProofManualValidation: ProofManualValidation[] = [
`;

for (const [url, ids] of urlMap.entries()) {
  content += `  {
    url: "${url}",
    manualStatus: "NOT_CHECKED",
    relatedPortfolioIds: [${ids.join(", ")}],
    notes: "Awaiting manual browser validation.",
  },
`;
}

content += `];

export function getManualValidationForUrl(url: string): ProofManualValidation | undefined {
  return legacyProofManualValidation.find(p => p.url === url);
}

export function getProofManualStatus(url: string): ProofManualStatus {
  const v = getManualValidationForUrl(url);
  return v ? v.manualStatus : "NOT_CHECKED";
}

export function getProofManualValidationSummary() {
  const summary = {
    total: legacyProofManualValidation.length,
    public: 0,
    loginRequired: 0,
    private: 0,
    broken: 0,
    needsReview: 0,
    notChecked: 0,
  };
  for (const v of legacyProofManualValidation) {
    if (v.manualStatus === "PUBLIC") summary.public++;
    else if (v.manualStatus === "LOGIN_REQUIRED") summary.loginRequired++;
    else if (v.manualStatus === "PRIVATE") summary.private++;
    else if (v.manualStatus === "BROKEN") summary.broken++;
    else if (v.manualStatus === "NEEDS_REVIEW") summary.needsReview++;
    else summary.notChecked++;
  }
  return summary;
}

export function getPortfolioProofManualStatuses(portfolioId: number): ProofManualStatus[] {
  return legacyProofManualValidation
    .filter(v => v.relatedPortfolioIds.includes(portfolioId))
    .map(v => v.manualStatus);
}
`;

fs.writeFileSync(path.join(__dirname, "../src/lib/legacy-proof-validation.ts"), content, "utf-8");
console.log("src/lib/legacy-proof-validation.ts generated successfully.");
