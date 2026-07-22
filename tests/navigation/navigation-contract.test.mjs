import assert from "node:assert/strict";
import test from "node:test";
import {
  CANONICAL_NAVIGATION_HREFS,
  DIRECT_NAV,
  DIRECT_NAV_IDS,
  FORBIDDEN_NAVIGATION_PREFIXES,
  NAV_PANEL_IDS,
  NAV_PANELS,
  NAV_UTILITY_LINKS,
  getCanonicalNavigationHrefs,
  getNavigationContractViolations,
} from "../../.navigation-test-build/components/navigation/navigation-contract.js";

const expectedPanelDestinations = {
  programs: [["Semua Program", "/programs"], ["Events & Kelas Singkat", "/events"], ["Learning Paths", "/learning-paths"], ["Resource Gratis", "/resources"], ["Kenali Trainers", "/trainers"], ["Standar Trainers", "/trainer-verification"], ["Services untuk Organisasi", "/untuk-organisasi"]],
  services: [["Pelatihan In-House", "/untuk-organisasi"], ["Katalog Program", "/programs"], ["Learning Path Tim", "/learning-paths"], ["Pilih Trainers", "/trainers"], ["Portfolio", "/portofolio"], ["Standar Trainers", "/trainer-verification"], ["About Skillary", "/about"]],
  };

test("exact panel and direct-link unions remain stable", () => {
  assert.deepEqual(NAV_PANELS.map((panel) => panel.id), [...NAV_PANEL_IDS]);
  assert.deepEqual(DIRECT_NAV.map((link) => link.id), [...DIRECT_NAV_IDS]);
  assert.deepEqual(NAV_UTILITY_LINKS.map(({ id, label, href }) => [id, label, href]), [["find-program", "Cari program", "/programs"], ["business", "Untuk Bisnis", "/untuk-organisasi"]]);
});

test("panel labels, groups, and destinations match approved IA", () => {
  assert.deepEqual(NAV_PANELS.map((panel) => panel.label), ["Programs", "Services"]);
  for (const panel of NAV_PANELS) {
    assert.equal(panel.groups.length, 2, panel.id);
    assert.deepEqual(panel.groups.flatMap((group) => group.links.map((link) => [link.label, link.href])), expectedPanelDestinations[panel.id], panel.id);
  }
  assert.deepEqual(DIRECT_NAV.map(({ label, href }) => [label, href]), [["Events", "/events"], ["Trainers", "/trainers"], ["Portfolio", "/portofolio"], ["About", "/about"]]);
});

test("contract invariant validator reports no violations", () => {
  assert.deepEqual(getNavigationContractViolations(), []);
});

test("all output hrefs are canonical and avoid forbidden route families", () => {
  const canonical = new Set(CANONICAL_NAVIGATION_HREFS);
  for (const href of getCanonicalNavigationHrefs()) {
    assert.equal(canonical.has(href), true, href);
    assert.equal(href.startsWith("/"), true, href);
    assert.equal(/[?#]/.test(href), false, href);
    assert.equal(FORBIDDEN_NAVIGATION_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`)), false, href);
  }
});

test("only organization panel owns the consultation CTA", () => {
  const actions = NAV_PANELS.filter((panel) => panel.action).map((panel) => [panel.id, panel.action.href]);
  assert.deepEqual(actions, [["services", "/contact"]]);
});

test("rendered destination multiplicity never exceeds three", () => {
  const hrefs = [...NAV_UTILITY_LINKS.map((link) => link.href), ...DIRECT_NAV.map((link) => link.href), ...NAV_PANELS.flatMap((panel) => [...panel.groups.flatMap((group) => group.links.map((link) => link.href)), ...(panel.action ? [panel.action.href] : [])])];
  const counts = hrefs.reduce((result, href) => result.set(href, (result.get(href) ?? 0) + 1), new Map());
  for (const [href, count] of counts) assert.ok(count <= 3, `${href}: ${count}`);
});
