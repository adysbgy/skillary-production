import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = process.cwd();
const PAGE = read("src/features/marketing/homepage-preview/HomepagePreview.tsx");
const CSS = read("src/features/marketing/homepage-preview/HomepagePreview.module.css");

test("HP-S5B ships three product views and three artifact specimens", () => {
  for (const variant of ["project", "assessment", "credential"]) {
    assert.equal(PAGE.includes(`data-proof-canvas=\"${variant}\"`), true, variant);
  }

  for (const variant of ["brief", "rubric", "credential"]) {
    assert.equal(PAGE.includes(`data-artifact=\"${variant}\"`), true, variant);
  }

  assert.equal(
    (PAGE.match(/className=\{styles\.specimenLabel\}>Contoh tampilan/g) ?? []).length,
    2,
    "the two mapped specimen groups label all six rendered examples",
  );
  assert.equal(
    PAGE.includes("Seluruh contoh bersifat anonim dan tidak menggunakan nama, nilai, atau hasil peserta."),
    true,
  );
  assert.equal(PAGE.includes("Contoh — bukan sertifikat valid"), true);
  assert.equal(PAGE.includes("Umpan balik contoh tanpa nilai peserta."), true);
});

test("HP-S5B does not promote legacy synthetic people, metrics, or customer proof", () => {
  for (const forbidden of [
    "Dian Anggraini",
    "Rizky Pratama",
    "Sari Nurhaliza",
    "Peserta A",
    "Peserta B",
    "92%",
    "84%",
    "client logo",
    "testimonial",
  ]) {
    assert.equal(PAGE.toLowerCase().includes(forbidden.toLowerCase()), false, forbidden);
  }

  assert.equal(PAGE.includes("PRODUCT_VIEWS"), true);
  assert.equal(PAGE.includes("ARTIFACTS"), true);
  assert.equal(CSS.includes(".proofCanvas"), true);
  assert.equal(CSS.includes('[data-artifact-card]'), true);
});

test("HP-S8D turns proof into an anonymous showcase without inventing learner work", () => {
  assert.equal(PAGE.includes('data-showcase-mode="anonymous-specimen"'), true);
  assert.equal(PAGE.includes("Dari project ke bukti yang dapat ditinjau."), true);
  assert.equal(PAGE.includes("Periksa contoh buktinya"), true);
  assert.equal(PAGE.includes("Periksa bentuk buktinya."), true);
  assert.equal(PAGE.includes("Seluruh contoh bersifat anonim dan tidak menggunakan nama, nilai, atau hasil peserta."), true);
  assert.equal(PAGE.includes("Dari tugas ke bukti yang dapat ditinjau."), true);

  for (const copy of [
    "Ringkasan dan hasil kerja",
    "Catatan peninjauan",
    "Kriteria sesuai program",
    "Status ketika syarat terpenuhi",
    "Artefak jika tersedia",
  ]) {
    assert.equal(PAGE.includes(copy), true, copy);
  }

  for (const forbidden of [
    "challenge winner",
    "top data experts",
    "watch video",
    "explore showcase",
    "project/10874",
  ]) {
    assert.equal(PAGE.toLowerCase().includes(forbidden), false, forbidden);
  }

  assert.match(CSS, /\.productGrid\s*\{[^}]*display:\s*grid;/s);
  assert.match(CSS, /@media \(min-width: 940px\)[\s\S]*\.productGrid\s*\{[^}]*repeat\(3,/s);
  assert.match(CSS, /@media \(min-width: 940px\)[\s\S]*\.artifactGrid\s*\{[^}]*repeat\(3,/s);
});

function read(relativePath) {
  return readFileSync(path.join(PROJECT_ROOT, relativePath), "utf8");
}
