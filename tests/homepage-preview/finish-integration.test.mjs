import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = process.cwd();

test("HP-S8F header and page share the source-backed search contract", () => {
  const header = read("src/features/marketing/homepage-preview/components/PreviewHeader.tsx");
  const page = read("src/app/(standalone)/lp/homepage-preview/page.tsx");
  const loader = read(
    "src/features/marketing/homepage-preview/data/get-homepage-preview-data.ts",
  );

  assert.equal(header.includes("getCachedHomepagePreviewData"), true);
  assert.equal(header.includes("data.search.entries"), true);
  assert.equal(header.includes("HOMEPAGE_STATIC_SEARCH_ENTRIES"), false);
  assert.equal(page.includes("getCachedHomepagePreviewData"), true);
  assert.equal(loader.includes('import { cache } from "react"'), true);
  assert.equal(loader.includes("export const getCachedHomepagePreviewData = cache("), true);
  assert.equal(loader.includes("getHomepagePreviewData()"), true);
});

function read(relativePath) {
  return readFileSync(path.join(PROJECT_ROOT, relativePath), "utf8");
}
