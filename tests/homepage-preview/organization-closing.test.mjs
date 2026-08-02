import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = process.cwd();
const PAGE = read("src/features/marketing/homepage-preview/HomepagePreview.tsx");
const FOOTER = read("src/features/marketing/homepage-preview/components/PreviewFooter.tsx");
const CSS = read("src/features/marketing/homepage-preview/HomepagePreview.module.css");

test("HP-S6 explains a four-step organization journey with concrete outputs", () => {
  for (const title of ["Pahami", "Rancang", "Jalankan", "Tinjau"]) {
    assert.equal(PAGE.includes(`title: "${title}"`), true, title);
  }

  assert.equal((PAGE.match(/question: "/g) ?? []).length, 4);
  assert.equal((PAGE.match(/output: "/g) ?? []).length, 4);
  assert.equal(PAGE.includes("Konteks dan kebutuhan program"), true);
  assert.equal(PAGE.includes("Ringkasan program dan rencana pelaksanaan"), true);
  assert.equal(PAGE.includes("Tinjauan dan ringkasan sesuai data"), true);
  assert.equal(CSS.includes(".organizationBrief"), true);
});

test("HP-S6 separates the five inspectable HR and L&D areas without ROI promises", () => {
  for (const title of ["Partisipasi", "Kemajuan", "Penilaian", "Sertifikat", "Laporan"]) {
    assert.equal(PAGE.includes(`title: "${title}"`), true, title);
  }

  assert.equal(PAGE.includes("Ringkasan membantu HR/L&amp;D meninjau partisipasi"), true);
  assert.equal(PAGE.includes("Isi, akses, format, dan waktu penyampaian"), true);
  assert.equal(CSS.includes(".inspectMatrixHeader"), true);
  assert.equal(CSS.includes(".inspectBoundary"), true);
});

test("HP-S6 FAQ is factual, native, and keeps online payment on hold", () => {
  assert.equal((PAGE.match(/<FaqItem title=/g) ?? []).length, 6);
  assert.equal(PAGE.includes("Tidak selalu dengan struktur yang sama."), true);
  assert.equal(PAGE.includes("Tidak ada CTA checkout pada homepage preview."), true);
  assert.equal(PAGE.includes("HOMEPAGE_PAYMENT_POLICY.message"), true);
  assert.equal(PAGE.includes("<details"), true);
  assert.equal(PAGE.includes("<summary>"), true);

  for (const forbidden of ["SLA", "guaranteed ROI", "jaminan ROI", "checkout href"]) {
    assert.equal(PAGE.includes(forbidden), false, forbidden);
  }
});

test("HP-S6 closing presents distinct individual and organization next steps", () => {
  assert.equal(PAGE.includes('data-audience="individual"'), true);
  assert.equal(PAGE.includes('data-audience="organization"'), true);
  assert.equal(PAGE.includes("Bandingkan topik dan level"), true);
  assert.equal(PAGE.includes("Peserta dan kebutuhan kerja"), true);
  assert.equal(PAGE.includes("SAFE_STATIC_DESTINATIONS.programSection"), true);
  assert.equal(PAGE.includes("SAFE_STATIC_DESTINATIONS.contact"), true);
});

test("HP-S8E harmonizes the lower page without fabricated social proof", () => {
  for (const marker of [
    "organization-process",
    "inspection-matrix",
    "faq-stack",
    "audience-closing",
  ]) {
    assert.equal(PAGE.includes(`data-lower-page="${marker}"`), true, marker);
  }

  assert.match(
    CSS,
    /@media \(min-width: 940px\)[\s\S]*?\.organizationSteps\s*\{[^}]*grid-template-columns:\s*repeat\(4,/,
  );
  assert.match(CSS, /\.inspectBand\s*\{[^}]*background:\s*var\(--hp-light\)/s);
  assert.match(CSS, /\.faqIntro\s*\{[^}]*text-align:\s*center/s);
  assert.match(CSS, /\.closingAudienceIcon\s*\{[^}]*color:\s*var\(--hp-orange\)/s);
  assert.equal((PAGE.match(/<AudienceIcon kind=/g) ?? []).length >= 4, true);

  for (const unsupported of [
    "learner count",
    "client logo",
    "winner badge",
    "real-time dashboard",
    "guaranteed ROI",
  ]) {
    assert.equal(PAGE.includes(unsupported), false, unsupported);
  }
});

test("HP-S6 footer destinations resolve to existing pages and contain no dead event or checkout link", () => {
  const routeSources = {
    "/certifications": "src/app/certifications/page.tsx",
    "/portofolio": "src/app/(marketing)/portofolio/page.tsx",
    "/trainers": "src/app/trainers/page.tsx",
    "/resources": "src/app/resources/page.tsx",
    "/untuk-organisasi": "src/app/(marketing)/untuk-organisasi/page.tsx",
    "/login": "src/app/(auth)/login/page.tsx",
    "/contact": "src/app/contact/page.tsx",
    "/privacy": "src/app/(marketing)/privacy/page.tsx",
    "/terms": "src/app/terms/page.tsx",
  };

  for (const [route, source] of Object.entries(routeSources)) {
    assert.equal(existsSync(path.join(PROJECT_ROOT, source)), true, `${route} -> ${source}`);
  }

  assert.equal((FOOTER.match(/label: "/g) ?? []).length, 16, "four groups plus twelve links");
  assert.equal(FOOTER.includes("/events"), false);
  assert.equal(FOOTER.includes("/checkout"), false);
  assert.equal(FOOTER.includes("SAFE_STATIC_DESTINATIONS.contact"), true);
});

function read(relativePath) {
  return readFileSync(path.join(PROJECT_ROOT, relativePath), "utf8");
}
