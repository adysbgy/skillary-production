/**
 * Legacy Proof URL Validation Script
 *
 * Checks reachability of all unique proof URLs from the legacy portfolio.
 * Writes JSON and Markdown reports to docs/.
 *
 * Usage: npx tsx scripts/validate_legacy_proof_links.ts
 *
 * IMPORTANT:
 * - Does NOT scrape content.
 * - Only checks HTTP status/reachability.
 * - Respects delay between requests (400ms).
 * - Does NOT modify source data or remove links.
 */

import * as fs from "fs";
import * as path from "path";

// We need to import from the compiled source, so we use a relative path approach.
// Since tsx handles TS imports, we can import directly.
import { legacyPortfolioCards } from "../src/lib/legacy-portfolio";

type LinkStatus =
  | "OK"
  | "REDIRECT"
  | "PRIVATE_OR_LOGIN_REQUIRED"
  | "NOT_FOUND"
  | "TIMEOUT"
  | "NETWORK_ERROR"
  | "INVALID_URL"
  | "UNKNOWN";

interface ValidationResult {
  url: string;
  status: LinkStatus;
  httpCode: number | null;
  redirectUrl: string | null;
  relatedCardIds: number[];
  relatedPrograms: string[];
  relatedClients: string[];
  checkedAt: string;
  error?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

async function checkUrl(url: string): Promise<{ status: LinkStatus; httpCode: number | null; redirectUrl: string | null; error?: string }> {
  if (!isValidUrl(url)) {
    return { status: "INVALID_URL", httpCode: null, redirectUrl: null, error: "Malformed URL" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    // Try GET (Instagram blocks HEAD requests)
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Skillary-QA-LinkChecker/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });

    clearTimeout(timeout);
    const code = response.status;
    const finalUrl = response.url;
    const wasRedirected = finalUrl !== url;

    // Instagram login redirect detection
    if (finalUrl.includes("/accounts/login") || finalUrl.includes("/challenge/")) {
      return { status: "PRIVATE_OR_LOGIN_REQUIRED", httpCode: code, redirectUrl: finalUrl };
    }

    if (code >= 200 && code < 300) {
      return { status: wasRedirected ? "REDIRECT" : "OK", httpCode: code, redirectUrl: wasRedirected ? finalUrl : null };
    }
    if (code === 404) {
      return { status: "NOT_FOUND", httpCode: code, redirectUrl: null };
    }
    if (code === 401 || code === 403) {
      return { status: "PRIVATE_OR_LOGIN_REQUIRED", httpCode: code, redirectUrl: null };
    }

    return { status: "UNKNOWN", httpCode: code, redirectUrl: wasRedirected ? finalUrl : null };
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      return { status: "TIMEOUT", httpCode: null, redirectUrl: null, error: "Request timed out (10s)" };
    }
    return { status: "NETWORK_ERROR", httpCode: null, redirectUrl: null, error: err.message || "Unknown error" };
  }
}

async function main() {
  console.log("🔍 Legacy Proof URL Validation");
  console.log("================================\n");

  // 1. Build unique URL map
  const urlMap = new Map<string, { cardIds: number[]; programs: string[]; clients: string[] }>();
  for (const card of legacyPortfolioCards) {
    for (const url of card.proof_urls) {
      const existing = urlMap.get(url) || { cardIds: [], programs: [], clients: [] };
      existing.cardIds.push(card.id);
      if (!existing.programs.includes(card.program)) existing.programs.push(card.program);
      if (!existing.clients.includes(card.client)) existing.clients.push(card.client);
      urlMap.set(url, existing);
    }
  }

  const uniqueUrls = [...urlMap.keys()];
  console.log(`📊 Total unique proof URLs: ${uniqueUrls.length}`);
  console.log(`📊 Total portfolio cards: ${legacyPortfolioCards.length}`);
  console.log(`📊 Cards missing proof: ${legacyPortfolioCards.filter((c) => c.proof_urls.length === 0).length}\n`);

  // 2. Validate each URL
  const results: ValidationResult[] = [];
  let okCount = 0, redirectCount = 0, loginCount = 0, notFoundCount = 0, timeoutCount = 0, networkCount = 0, invalidCount = 0, unknownCount = 0;

  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    const meta = urlMap.get(url)!;
    process.stdout.write(`  [${i + 1}/${uniqueUrls.length}] Checking ${url.substring(0, 60)}... `);

    const result = await checkUrl(url);

    const entry: ValidationResult = {
      url,
      status: result.status,
      httpCode: result.httpCode,
      redirectUrl: result.redirectUrl,
      relatedCardIds: meta.cardIds,
      relatedPrograms: meta.programs,
      relatedClients: meta.clients,
      checkedAt: new Date().toISOString(),
      ...(result.error ? { error: result.error } : {}),
    };
    results.push(entry);

    switch (result.status) {
      case "OK": okCount++; break;
      case "REDIRECT": redirectCount++; break;
      case "PRIVATE_OR_LOGIN_REQUIRED": loginCount++; break;
      case "NOT_FOUND": notFoundCount++; break;
      case "TIMEOUT": timeoutCount++; break;
      case "NETWORK_ERROR": networkCount++; break;
      case "INVALID_URL": invalidCount++; break;
      default: unknownCount++; break;
    }

    console.log(result.status);

    // Delay between requests
    if (i < uniqueUrls.length - 1) {
      await sleep(400);
    }
  }

  // 3. Identify missing-proof cards
  const missingProofCards = legacyPortfolioCards.filter((c) => c.proof_urls.length === 0);

  // 4. Write JSON report
  const jsonReport = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalUniqueUrls: uniqueUrls.length,
      ok: okCount,
      redirect: redirectCount,
      privateOrLoginRequired: loginCount,
      notFound: notFoundCount,
      timeout: timeoutCount,
      networkError: networkCount,
      invalidUrl: invalidCount,
      unknown: unknownCount,
    },
    results,
    missingProofCards: missingProofCards.map((c) => ({ id: c.id, program: c.program, client: c.client, date: c.training_date })),
  };

  const docsDir = path.resolve(__dirname, "..", "docs");
  fs.writeFileSync(path.join(docsDir, "proof_url_validation_report.json"), JSON.stringify(jsonReport, null, 2), "utf-8");

  // 5. Write Markdown report
  const problemResults = results.filter((r) => r.status !== "OK");
  const ts = new Date().toISOString();
  let md = `# Legacy Proof URL Validation Report\n\nGenerated at: ${ts}\n\n`;
  md += `## Summary\n\n`;
  md += `| Metric | Count |\n|:---|---:|\n`;
  md += `| Total Unique URLs | ${uniqueUrls.length} |\n`;
  md += `| ✅ OK | ${okCount} |\n`;
  md += `| ↪️ Redirect | ${redirectCount} |\n`;
  md += `| 🔒 Login/Private | ${loginCount} |\n`;
  md += `| ❌ Not Found | ${notFoundCount} |\n`;
  md += `| ⏱️ Timeout | ${timeoutCount} |\n`;
  md += `| 🌐 Network Error | ${networkCount} |\n`;
  md += `| ⚠️ Invalid URL | ${invalidCount} |\n`;
  md += `| ❓ Unknown | ${unknownCount} |\n\n`;

  if (problemResults.length > 0) {
    md += `## Problem URLs\n\n`;
    md += `| URL | Status | HTTP | Card IDs | Program | Client | Action |\n`;
    md += `|:---|:---|:---|:---|:---|:---|:---|\n`;
    for (const r of problemResults) {
      const action = r.status === "PRIVATE_OR_LOGIN_REQUIRED"
        ? "Verify manually in browser"
        : r.status === "NOT_FOUND"
        ? "Replace or keep with validation badge"
        : r.status === "REDIRECT"
        ? "Review redirect destination"
        : "Investigate";
      md += `| ${r.url} | ${r.status} | ${r.httpCode || "—"} | ${r.relatedCardIds.join(", ")} | ${r.relatedPrograms[0]} | ${r.relatedClients[0]} | ${action} |\n`;
    }
    md += `\n`;
  } else {
    md += `## Problem URLs\n\nNone — all URLs returned OK.\n\n`;
  }

  if (missingProofCards.length > 0) {
    md += `## Cards Missing Proof URLs\n\n`;
    md += `| ID | Program | Client | Date | Action |\n`;
    md += `|:---|:---|:---|:---|:---|\n`;
    for (const c of missingProofCards) {
      md += `| ${c.id} | ${c.program} | ${c.client} | ${c.training_date || "—"} | Show "Perlu validasi dokumentasi" badge |\n`;
    }
    md += `\n`;
  }

  md += `## Notes\n\n`;
  md += `- Instagram may redirect to login for some posts even if they are public. Manual browser verification is recommended.\n`;
  md += `- "REDIRECT" status for Instagram URLs typically means the post exists but the platform redirected the request.\n`;
  md += `- This report does NOT scrape content, download images, or bypass private settings.\n`;
  md += `- Do NOT automatically remove proof URLs based on this report. Manual review is required.\n`;

  fs.writeFileSync(path.join(docsDir, "proof_url_validation_report.md"), md, "utf-8");

  // 6. Print summary
  console.log("\n================================");
  console.log("📋 VALIDATION COMPLETE\n");
  console.log(`  ✅ OK:            ${okCount}`);
  console.log(`  ↪️  Redirect:      ${redirectCount}`);
  console.log(`  🔒 Login/Private: ${loginCount}`);
  console.log(`  ❌ Not Found:     ${notFoundCount}`);
  console.log(`  ⏱️  Timeout:       ${timeoutCount}`);
  console.log(`  🌐 Network Error: ${networkCount}`);
  console.log(`  ⚠️  Invalid:       ${invalidCount}`);
  console.log(`  ❓ Unknown:       ${unknownCount}`);
  console.log(`\n📁 Reports written to:`);
  console.log(`  docs/proof_url_validation_report.json`);
  console.log(`  docs/proof_url_validation_report.md`);
}

main().catch((err) => {
  console.error("❌ Validation script failed:", err);
  process.exit(1);
});
