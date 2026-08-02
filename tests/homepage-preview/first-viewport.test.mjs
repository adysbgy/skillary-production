import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = process.cwd();
const FEATURE_ROOT = "src/features/marketing/homepage-preview";
const INDIVIDUAL_ASSET = "public/images/homepage-preview/hero-individual-cutout-v2.png";
const ORGANIZATION_ASSET = "public/images/homepage-preview/hero-organization-cutout-v2.png";

test("HP-S8A header owns a single reference-aligned row, disclosed search, and focus-returning dialog", () => {
  const header = read(`${FEATURE_ROOT}/components/PreviewHeader.tsx`);
  const search = read(`${FEATURE_ROOT}/components/PreviewSearch.tsx`);
  const mobile = read(`${FEATURE_ROOT}/components/PreviewMobileNavigation.tsx`);
  const navigation = read(`${FEATURE_ROOT}/components/preview-navigation.ts`);
  const css = read(`${FEATURE_ROOT}/HomepagePreview.module.css`);

  assert.equal(header.includes("PreviewSearch"), true);
  assert.equal(header.includes("PreviewMobileNavigation"), true);
  assert.equal(header.includes('className={styles.desktopSearchPopover}'), true);
  assert.equal(header.includes('aria-label="Navigasi utama Skillary"'), true);
  assert.equal(header.includes("Mulai Belajar"), true);
  assert.equal(header.includes("data-preview-sticky-navigation"), false);
  assert.equal(navigation.includes("Workshop berikutnya"), true);
  assert.equal(search.startsWith('"use client";'), true);
  assert.equal(search.includes('data-query-tracking="disabled"'), true);
  assert.equal(search.includes('data-search-state={state}'), true);
  assert.equal(search.includes('event.key === "Escape"'), true);
  assert.equal(mobile.startsWith('"use client";'), true);
  assert.equal(mobile.includes("showModal()"), true);
  assert.equal(mobile.includes("<dialog"), true);
  assert.equal(mobile.includes("onCancel"), true);
  assert.equal(mobile.includes('event.key !== "Escape"'), true);
  assert.equal(mobile.includes('aria-haspopup="dialog"'), true);
  assert.equal(mobile.includes('aria-controls="preview-mobile-drawer"'), true);
  assert.equal(mobile.includes("triggerRef.current?.focus"), true);
  assert.match(css, /\.headerUtility\s*\{[^}]*grid-template-columns:\s*auto minmax\(0, 1fr\) auto;/s);
  assert.match(css, /@media \(max-width: 939px\)/);
  assert.match(css, /\.mobileDrawer::backdrop/);

  for (const forbidden of ["fetch(", "localStorage", "sessionStorage", "URLSearchParams", "analytics"] ) {
    assert.equal(search.includes(forbidden), false, forbidden);
  }
});

test("HP-S8A hero uses two original transparent portraits and a reference-aligned first viewport", () => {
  const page = read(`${FEATURE_ROOT}/HomepagePreview.tsx`);
  const css = read(`${FEATURE_ROOT}/HomepagePreview.module.css`);

  assert.equal(page.includes('from "next/image"'), true);
  assert.equal(page.includes("hero-individual-cutout-v2.png"), true);
  assert.equal(page.includes("hero-organization-cutout-v2.png"), true);
  assert.equal(
    (page.match(/<Image\b/g) ?? []).length,
    2,
    "one reusable hero image site and one reusable program-card image site",
  );
  assert.equal(page.includes('loading="eager"'), true);
  assert.equal(page.includes("fetchPriority="), false);
  assert.equal(page.includes('sizes="(max-width: 519px)'), true);
  assert.equal(/\bpriority=/.test(page), false, "Next.js 16 priority prop is deprecated");
  assert.equal(page.includes("Bangun skill kerja yang siap dipakai."), true);
  assert.equal(page.includes("Lihat alur organisasi"), true);
  assert.equal(page.includes("Belajar terarah"), true);
  assert.equal(page.includes("Praktik nyata"), true);
  assert.equal(page.includes("Buktikan hasil"), true);
  assert.equal(page.includes("Ringkasan hasil"), true);
  assert.equal(page.includes('data-skillary-signature="learn-practice-prove"'), true);
  assert.equal((page.match(/className=\{styles\.heroCapabilityStep\}/g) ?? []).length, 1);
  assert.equal(page.includes("heroKicker"), false);
  assert.match(css, /\.heroPortrait\s*\{[^}]*object-fit:\s*contain;/s);
  assert.match(css, /\.heroBand\s*\{[^}]*background-image:/s);
  assert.match(css, /\.capabilityBubble\s*\{[^}]*border-radius:\s*50%;/s);
  assert.match(css, /\.heroCapabilityStrip\s*\{/s);
  assert.match(css, /\.heroCapabilityStep\s*\{/s);
  assert.match(css, /\.heroCapabilityCopy small\s*\{/s);
  assert.match(css, /\.heroFigure\s*\{[^}]*min-height:/s);

  const assetBytes = [INDIVIDUAL_ASSET, ORGANIZATION_ASSET].map((asset) => {
    const absolute = path.join(PROJECT_ROOT, asset);
    assert.equal(existsSync(absolute), true, asset);
    return statSync(absolute).size;
  });
  assert.equal(assetBytes.every((bytes) => bytes > 10_000), true);
  assert.equal(assetBytes.reduce((total, bytes) => total + bytes, 0) <= 2.2 * 1024 * 1024, true);
});

test("HP-S3 keeps generation provenance and contact-sheet selection evidence", () => {
  const provenancePath = path.join(
    PROJECT_ROOT,
    "docs/references/skillary-hero/2026-08-01/PROVENANCE.md",
  );
  const contactSheetPath = path.join(
    PROJECT_ROOT,
    "docs/references/skillary-hero/2026-08-01/hp-s3-hero-candidate-contact-sheet.jpg",
  );
  assert.equal(existsSync(provenancePath), true);
  assert.equal(existsSync(contactSheetPath), true);

  const provenance = readFileSync(provenancePath, "utf8");
  assert.equal(provenance.includes("No Maven image"), true);
  assert.equal(provenance.includes("IND-A + ORG-A"), true);
  assert.equal(provenance.includes("not customer proof or testimonial"), true);
  assert.equal(statSync(contactSheetPath).size > 20_000, true);
});

function read(relativePath) {
  const absolute = path.join(PROJECT_ROOT, relativePath);
  assert.equal(existsSync(absolute), true, relativePath);
  return readFileSync(absolute, "utf8");
}
