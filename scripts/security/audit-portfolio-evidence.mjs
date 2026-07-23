import fs from "node:fs";

const source = fs.readFileSync("src/lib/legacy-portfolio.ts", "utf8");
const canonical = fs.readFileSync("src/app/portofolio/page.tsx", "utf8");
const explorer = fs.readFileSync("src/components/portfolio/PortfolioExplorer.tsx", "utf8");
const idsMatch = source.match(/PUBLIC_ARCHIVE_IDS = \[([^\]]+)\]/);
if (!idsMatch) throw new Error("Missing explicit public archive allowlist");
const ids = idsMatch[1].split(",").map(Number);
if (ids.length !== 24 || new Set(ids).size !== ids.length) throw new Error("Public archive allowlist must contain 24 unique audited records");
for (const required of ["publicPortfolioCards", "publicPortfolioMetrics"]) {
  if (!canonical.includes(required)) throw new Error(`Canonical portfolio does not use ${required}`);
}
for (const forbidden of ["legacyPortfolioCards} />", "legacyCaseStudies", "500+ peserta", "Organisasi klien", "Dipercaya oleh Organisasi"]){
  if (`${source}\n${canonical}\n${explorer}`.includes(forbidden)) throw new Error(`Unsafe portfolio claim/model remains: ${forbidden}`);
}
for (const retired of ["src/app/portfolio/page.tsx", "src/app/portfolio-arsip/page.tsx", "src/app/case-studies/page.tsx", "src/app/v2/portfolio/page.tsx", "src/components/case-studies/CaseStudyExplorer.tsx"]) {
  if (fs.existsSync(retired)) throw new Error(`Retired portfolio source still exists: ${retired}`);
}
console.log("Portfolio evidence audit passed: 24 public records; conflicting and missing-proof records remain unpublished.");
