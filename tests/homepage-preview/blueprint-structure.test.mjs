import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  getHomepageBlueprintViolations,
  HOMEPAGE_BLUEPRINT_BANDS,
  HOMEPAGE_BLUEPRINT_VERSION,
} from "../../.homepage-preview-test-build/features/marketing/homepage-preview/blueprint.js";

const PROJECT_ROOT = process.cwd();
const ROUTE_ROOT = path.join(PROJECT_ROOT, "src/app/(standalone)/lp/homepage-preview");
const FEATURE_ROOT = path.join(PROJECT_ROOT, "src/features/marketing/homepage-preview");

const EXPECTED_BANDS = Array.from({ length: 13 }, (_, index) =>
  `SK-HP-${String(index + 1).padStart(2, "0")}`,
);

test("HP-S8F blueprint contains exactly 13 complete bands in locked order", () => {
  assert.equal(HOMEPAGE_BLUEPRINT_VERSION, "HP-S8F.0");
  assert.deepEqual(
    HOMEPAGE_BLUEPRINT_BANDS.map(({ id }) => id),
    EXPECTED_BANDS,
  );
  assert.deepEqual(getHomepageBlueprintViolations(), []);
  assert.equal(new Set(HOMEPAGE_BLUEPRINT_BANDS.map(({ id }) => id)).size, 13);

  for (const band of HOMEPAGE_BLUEPRINT_BANDS) {
    assert.equal(Boolean(band.referenceId || band.originalSkillaryLabel), true, band.id);
    for (const field of [
      "surface",
      "gridRatio",
      "density",
      "cardMediaAnatomy",
      "tokenAssignment",
      "responsiveReflow",
      "interaction",
      "intentionalDifference",
    ]) {
      assert.equal(Boolean(String(band[field]).trim()), true, `${band.id}:${field}`);
    }
  }
});

test("route and feature keep the root layout as the sole main landmark", () => {
  const source = allSource([...typescriptFiles(ROUTE_ROOT), ...typescriptFiles(FEATURE_ROOT)]);
  assert.equal(/<main\b/i.test(source), false);
  assert.equal(/role\s*=\s*["']main["']/i.test(source), false);
  assert.equal(/role\s*=\s*["']banner["']/i.test(source), false);
  assert.equal(/role\s*=\s*["']contentinfo["']/i.test(source), false);
});

test("the loaded preview composes one H1 and the 13 stable band markers", () => {
  const header = read("src/features/marketing/homepage-preview/components/PreviewHeader.tsx");
  const page = read("src/features/marketing/homepage-preview/HomepagePreview.tsx");
  const footer = read("src/features/marketing/homepage-preview/components/PreviewFooter.tsx");
  const composition = [header, page, footer].join("\n");
  const ids = [...composition.matchAll(/(?:homepageBandAttributes\(|bandId=)["'](SK-HP-\d{2})["']/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(ids, EXPECTED_BANDS);
  assert.equal((composition.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((header.match(/<header\b/g) ?? []).length, 1);
  assert.equal((footer.match(/<footer\b/g) ?? []).length, 1);
  assert.equal(composition.includes("data-conditional-proof"), false);
});

test("route metadata, runtime, shell, loading and error boundaries are explicit", () => {
  const layout = read("src/app/(standalone)/lp/homepage-preview/layout.tsx");
  const page = read("src/app/(standalone)/lp/homepage-preview/page.tsx");
  const loading = read("src/app/(standalone)/lp/homepage-preview/loading.tsx");
  const error = read("src/app/(standalone)/lp/homepage-preview/error.tsx");

  assert.equal(layout.includes("index: false"), true);
  assert.equal(layout.includes("follow: false"), true);
  assert.equal(layout.includes("HomepagePreviewShell"), true);
  assert.equal(page.includes('runtime = "nodejs"'), true);
  assert.equal(page.includes('dynamic = "force-dynamic"'), true);
  assert.equal(page.includes("getCachedHomepagePreviewData()"), true);
  assert.equal(loading.includes('role="status"'), true);
  assert.equal(error.startsWith('"use client";'), true);
  assert.equal(error.includes("unstable_retry"), true);
  assert.equal(error.includes("error.message"), false);
});

test("shell has a focusable skip target and no preview URL is added to sitemap", () => {
  const shell = read("src/features/marketing/homepage-preview/components/PreviewShell.tsx");
  const sitemap = read("src/app/sitemap.ts");

  assert.equal(shell.includes('href="#homepage-preview-content"'), true);
  assert.equal(shell.includes('id="homepage-preview-content"'), true);
  assert.equal(shell.includes("tabIndex={-1}"), true);
  assert.equal(sitemap.includes("/lp/homepage-preview"), false);
});

test("HP-S8F source is Skillary-only, local, payment-held, and uses only owned hero assets", () => {
  const sourceFiles = [...typescriptFiles(ROUTE_ROOT), ...typescriptFiles(FEATURE_ROOT)];
  const source = allSource(sourceFiles);
  const uiSource = allSource(
    sourceFiles.filter((file) => !file.includes(`${path.sep}data${path.sep}`)),
  );
  for (const forbidden of [
    /\ballman\b/i,
    /#F6C34F/i,
    /#EB6C64/i,
    /mavenanalytics/i,
    /framerusercontent/i,
    /mavenshowcase/i,
    /authenticator\.mavenanalytics/i,
    /rewardful/i,
    /googletagmanager/i,
    /cognito/i,
    /appsync/i,
  ]) {
    assert.equal(forbidden.test(source), false, forbidden.toString());
  }

  const css = read("src/features/marketing/homepage-preview/HomepagePreview.module.css");
  assert.equal(css.includes("rgb(255, 138, 0)"), true);
  assert.equal(uiSource.includes("/events"), false);
  assert.equal(uiSource.includes("/checkout"), false);
  assert.equal(source.includes("onlineCheckoutAvailable: true"), false);
  assert.equal(source.includes('from "next/image"'), true);
  assert.equal(source.includes("hero-individual-cutout-v2.png"), true);
  assert.equal(source.includes("hero-organization-cutout-v2.png"), true);
});

function read(relativePath) {
  const absolute = path.join(PROJECT_ROOT, relativePath);
  assert.equal(existsSync(absolute), true, relativePath);
  return readFileSync(absolute, "utf8");
}

function typescriptFiles(root) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...typescriptFiles(absolute));
    if (entry.isFile() && /\.tsx?$/.test(entry.name)) files.push(absolute);
  }
  return files.sort();
}

function allSource(files) {
  return files.map((file) => readFileSync(file, "utf8")).join("\n");
}
