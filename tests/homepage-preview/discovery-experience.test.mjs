import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = process.cwd();
const FEATURE_ROOT = "src/features/marketing/homepage-preview";

test("HP-S4 discovery tabs preserve server fallback and add manual keyboard activation", () => {
  const tabs = read(`${FEATURE_ROOT}/components/PreviewDiscoveryTabs.tsx`);
  const page = read(`${FEATURE_ROOT}/HomepagePreview.tsx`);

  assert.equal(tabs.startsWith('"use client";'), true);
  assert.equal(tabs.includes("useSyncExternalStore"), true);
  assert.equal(tabs.includes("queueMicrotask(onChange)"), true);
  assert.equal(tabs.includes('role={enhanced ? "tablist" : undefined}'), true);
  assert.equal(tabs.includes('role={enhanced ? "tab" : undefined}'), true);
  assert.equal(tabs.includes('role={enhanced ? "tabpanel" : undefined}'), true);
  assert.equal(tabs.includes("hidden={enhanced && activeTab !== tab.id}"), true);
  assert.equal(tabs.includes('event.key === "ArrowRight"'), true);
  assert.equal(tabs.includes('event.key === "ArrowLeft"'), true);
  assert.equal(tabs.includes('event.key === " " || event.key === "Enter"'), true);
  assert.equal(tabs.includes('event.key === "Home"'), true);
  assert.equal(tabs.includes('event.key === "End"'), true);
  assert.equal(tabs.includes('window.addEventListener("hashchange"'), true);
  assert.equal(tabs.includes('window.history.pushState(null, "", nextHash)'), true);
  assert.equal(tabs.includes("target.focus({ preventScroll: true })"), true);
  assert.equal(tabs.includes("getVisibleStickyOffset()"), true);
  assert.equal(tabs.includes("window.scrollTo({"), true);
  assert.equal(page.includes("<PreviewDiscoveryTabs"), true);

  for (const id of ["program", "workshop", "jalur-belajar"]) {
    assert.equal(page.includes(`headingId="${id}"`), true, id);
  }
});

test("HP-S8B uses truthful audience, learning-format, and business decisions", () => {
  const page = read(`${FEATURE_ROOT}/HomepagePreview.tsx`);
  const css = read(`${FEATURE_ROOT}/HomepagePreview.module.css`);
  const contract = read(`${FEATURE_ROOT}/data/homepage-preview-contract.ts`);
  const policy = read(`${FEATURE_ROOT}/data/homepage-preview-policy.ts`);
  const service = read(`${FEATURE_ROOT}/data/homepage-preview-service.ts`);

  assert.equal(page.includes("Bangun skill kerja yang siap dipraktikkan."), true);
  assert.equal(page.includes("Cara yang lebih jelas untuk membangun skill kerja."), true);
  assert.equal(page.includes("Bangun kapabilitas tim dari kebutuhan kerja yang nyata."), true);
  assert.equal(page.includes("Jadwal hanya tampil setelah"), false);
  assert.equal(page.includes("setelah topik, fasilitator, waktu, dan ketersediaannya terverifikasi"), true);
  for (const format of [
    "Jalur belajar",
    "Program terstruktur",
    "Events & Workshop",
    "Project & penilaian",
  ]) {
    assert.equal(page.includes(format), true, format);
  }
  for (const scope of [
    "Kebutuhan kerja",
    "Level peserta",
    "Format pelaksanaan",
    "Hasil project",
    "Penilaian",
    "Evaluasi program",
  ]) {
    assert.equal(page.includes(scope), true, scope);
  }
  assert.equal((page.match(/items\.slice\(0, 4\)/g) ?? []).length, 3);
  assert.equal(contract.includes("Workshop berikutnya belum dijadwalkan."), true);
  assert.equal(
    contract.includes("Daftarkan minat agar tim Skillary dapat menghubungi Anda saat topik dan jadwal telah terverifikasi."),
    true,
  );
  assert.equal(contract.includes('registerInterestAction("Daftarkan minat workshop")'), true);

  for (const field of ["level", "sessionOutcome", "registrationState", "reviewedAt"]) {
    assert.equal(policy.includes(`record.${field}`), true, `policy:${field}`);
    assert.equal(service.includes(`approval.${field}`), true, `service:${field}`);
    assert.equal(page.includes(`item.${field}`), true, `render:${field}`);
  }
  for (const forbidden of [
    "/events",
    "/checkout",
    "price",
    "seatCount",
    "countdown",
    "top companies",
    "trusted by",
    "student count",
  ]) {
    assert.equal(page.includes(forbidden), false, forbidden);
  }
  assert.match(css, /\.audienceGrid\s*\{[^}]*display:\s*grid;/s);
  assert.match(css, /\.formatsGrid\s*\{[^}]*display:\s*grid;/s);
  assert.match(css, /\.businessLayout\s*\{[^}]*display:\s*grid;/s);
  assert.match(css, /\.businessScope > div\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
});

test("HP-S8C guides visitors from a verified work goal into the curated catalog", () => {
  const page = read(`${FEATURE_ROOT}/HomepagePreview.tsx`);
  const css = read(`${FEATURE_ROOT}/HomepagePreview.module.css`);
  const icons = read(`${FEATURE_ROOT}/components/PreviewIcons.tsx`);
  const contract = read(`${FEATURE_ROOT}/data/homepage-preview-contract.ts`);
  const types = read(`${FEATURE_ROOT}/data/types.ts`);
  const service = read(`${FEATURE_ROOT}/data/homepage-preview-service.ts`);

  assert.equal(contract.includes('HOMEPAGE_PREVIEW_CONTRACT_VERSION = "HP-S9P.1"'), true);
  assert.equal(page.includes("Mulai dari hasil kerja yang ingin Anda bangun."), true);
  assert.equal(page.includes("Tujuan dulu. Program setelahnya."), true);
  assert.equal(page.includes("Urutannya membantu"), true);
  assert.equal(page.includes("bukan menunjukkan peringkat."), true);
  assert.equal(page.includes("Pilih format, lalu periksa detailnya."), true);
  assert.equal(page.includes("GUIDED_GOALS.flatMap"), true);
  assert.equal(page.includes("programsBySlug.get(goal.slug)"), true);
  assert.equal(page.includes("goal.program.href"), true);
  assert.equal(page.includes("<CatalogStatus presentation={data.catalogPresentation}"), true);
  assert.equal(page.includes('id={`program-${item.slug}`}'), true);

  for (const goal of [
    "Membangun dashboard untuk keputusan bisnis",
    "Mengambil keputusan dengan dasar data",
    "Menerapkan AI pada alur kerja tim",
    "Menyampaikan laporan agar mudah dipahami",
  ]) {
    assert.equal(page.includes(goal), true, goal);
  }

  for (const field of ["moduleCount", "outcomeCount"]) {
    assert.equal(types.includes(`${field}: number`), true, `type:${field}`);
    assert.equal(service.includes(`${field}: row.${field}`), true, `service:${field}`);
    assert.equal(page.includes(`item.${field}`), true, `render:${field}`);
  }

  assert.equal(icons.includes("export function GoalIcon"), true);
  assert.match(css, /\.guidedGoals\s*\{[^}]*display:\s*grid;/s);
  assert.match(css, /\.guidedGoalList > a\s*\{[^}]*min-height:\s*172px;/s);
  assert.match(css, /@media \(min-width: 940px\)[\s\S]*\.guidedGoals\s*\{[^}]*grid-template-columns:/s);
  assert.match(css, /\.programCard:target\s*\{[^}]*outline:\s*4px solid var\(--hp-orange\);/s);

  for (const disclosure of [
    "Tanggal dan zona waktu",
    "Format, level, dan hasil",
    "Profil yang telah terverifikasi",
    "Seluruh program di dalam jalur siap dibuka",
  ]) {
    assert.equal(page.includes(disclosure), true, disclosure);
  }

  for (const forbidden of [
    "Trending",
    "Best selling",
    "kursi tersisa",
    "peserta terbanyak",
    "Mulai checkout",
  ]) {
    assert.equal(page.includes(forbidden), false, forbidden);
  }
});

test("HP-S9P gives each audience a direct route and uses plain Skillary language", () => {
  const page = read(`${FEATURE_ROOT}/HomepagePreview.tsx`);
  const contract = read(`${FEATURE_ROOT}/data/homepage-preview-contract.ts`);

  assert.equal(
    contract.includes('organizationJourneySection: "#organization-heading"'),
    true,
  );
  assert.equal(page.includes('data-audience-route="individual"'), true);
  assert.equal(page.includes('data-audience-route="organization"'), true);
  assert.equal(
    (page.match(/SAFE_STATIC_DESTINATIONS\.organizationJourneySection/g) ?? []).length,
    3,
  );
  assert.equal(page.includes("Lihat program individu"), true);
  assert.equal((page.match(/Lihat alur untuk tim/g) ?? []).length, 2);

  for (const oldCopy of [
    "Project & assessment",
    "Format delivery",
    "Project output",
    "Assessment review",
    "Credential record",
    "Audience dan kebutuhan kerja",
    "Bukan dashboard ROI dan bukan janji real-time.",
  ]) {
    assert.equal(page.includes(oldCopy), false, oldCopy);
  }
});

function read(relativePath) {
  return readFileSync(path.join(PROJECT_ROOT, relativePath), "utf8");
}
