import assert from "node:assert/strict";
import test from "node:test";
import {
  CANONICAL_NAVIGATION_HREFS,
  DIRECT_NAV,
  DIRECT_NAV_IDS,
  FORBIDDEN_NAVIGATION_PREFIXES,
  NAV_PANEL_IDS,
  NAV_PANELS,
  getCanonicalNavigationHrefs,
  getNavigationContractViolations,
} from "../../.navigation-test-build/components/navigation/navigation-contract.js";

const expectedPanelDestinations = {
  programs: [["Learning Paths", "/learning-paths"], ["Resource Gratis", "/resources"], ["Standar Trainers", "/trainer-verification"]],
  };

test("exact panel and direct-link unions remain stable", () => {
  assert.deepEqual(NAV_PANELS.map((panel) => panel.id), [...NAV_PANEL_IDS]);
  assert.deepEqual(DIRECT_NAV.map((link) => link.id), [...DIRECT_NAV_IDS]);
});

test("panel labels, groups, and destinations match approved IA", () => {
  assert.deepEqual(NAV_PANELS.map((panel) => panel.label), ["Programs"]);
  for (const panel of NAV_PANELS) {
    assert.equal(panel.groups.length, 2, panel.id);
    assert.deepEqual(panel.groups.flatMap((group) => group.links.map((link) => [link.label, link.href])), expectedPanelDestinations[panel.id], panel.id);
  }
  assert.deepEqual(DIRECT_NAV.map(({ label, href }) => [label, href]), [["Events", "/events"], ["Services", "/untuk-organisasi"], ["Trainers", "/trainers"], ["Portfolio", "/portofolio"], ["About", "/about"]]);
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

test("hover panels do not own contextual consultation actions", () => {
  assert.deepEqual(NAV_PANELS.filter((panel) => panel.action), []);
});

test("every primary navigation destination has one owner", () => {
  const directHrefs = new Set(DIRECT_NAV.map((link) => link.href));
  const panelSecondaryHrefs = NAV_PANELS.flatMap((panel) => panel.groups.flatMap((group) => group.links.map((link) => link.href)));
  assert.equal(new Set(panelSecondaryHrefs).size, panelSecondaryHrefs.length);
  for (const href of panelSecondaryHrefs) assert.equal(directHrefs.has(href), false, href);
  for (const panel of NAV_PANELS) {
    assert.equal(panel.groups.some((group) => group.links.some((link) => link.href === panel.href)), false, panel.id);
  }
});
