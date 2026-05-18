import * as fs from "fs";
import * as path from "path";
import { legacyPortfolioCards } from "../src/lib/legacy-portfolio";
import { legacyProofManualValidation } from "../src/lib/legacy-proof-validation";

function generateTracker() {
  let md = `# Proof URL Manual Validation Tracker\n\n`;
  md += `This document tracks the manual browser verification of external proof URLs used in the Skillary legacy portfolio.\n\n`;
  md += `*Generated automatically from \`src/lib/legacy-proof-validation.ts\`*\n\n`;
  
  md += `## Manual Validation List\n\n`;
  md += `| No | URL | Manual Status | Portfolio IDs | Program / Client | Checked By | Last Checked | Notes | Action |\n`;
  md += `|:---|:---|:---|:---|:---|:---|:---|:---|:---|\n`;

  let idx = 1;
  for (const v of legacyProofManualValidation) {
    // get program/client
    const cards = v.relatedPortfolioIds.map(id => legacyPortfolioCards.find(c => c.id === id)).filter(c => c !== undefined) as any[];
    const programsClients = cards.map(c => `${c.program} (${c.client})`).join("<br>");
    
    let action = "Review in browser";
    if (v.manualStatus === "PUBLIC") action = "None";
    else if (v.manualStatus === "BROKEN" || v.manualStatus === "PRIVATE") action = "Find alternative / Use badge";

    md += `| ${idx++} | ${v.url} | **${v.manualStatus}** | ${v.relatedPortfolioIds.join(", ")} | ${programsClients} | ${v.checkedBy || "-"} | ${v.lastCheckedAt || "-"} | ${v.notes || "-"} | ${action} |\n`;
  }

  md += `\n## Cards Without Proof URLs\n\n`;
  const missing = legacyPortfolioCards.filter(c => c.proof_urls.length === 0);
  md += `| ID | Program | Client | Date | Recommended Action |\n`;
  md += `|:---|:---|:---|:---|:---|\n`;
  for (const c of missing) {
    md += `| ${c.id} | ${c.program} | ${c.client} | ${c.training_date || "—"} | Cari arsip dokumentasi tambahan atau pertahankan badge *Perlu validasi dokumentasi*. |\n`;
  }

  const outPath = path.resolve(__dirname, "../docs/proof_url_manual_validation_tracker.md");
  fs.writeFileSync(outPath, md, "utf-8");
  console.log("Tracker docs generated at:", outPath);
}

generateTracker();
