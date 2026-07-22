import assert from "node:assert/strict";
import test from "node:test";
import { getActiveNavigationItem } from "../../.navigation-test-build/components/navigation/navigation-active-state.js";

const cases = [
  ["/programs", "programs"], ["/programs/", "programs"], ["/events", "programs"], ["/resources?tab=free", "programs"], ["/learning-paths#data", "programs"],
  ["/untuk-organisasi", "organizations"],
  ["/about", "about"], ["/contact", "about"], ["/privacy", "about"], ["/terms", "about"], ["/trainer-verification", "about"],
  ["/trainers", "faculty"], ["/trainers/person", "faculty"],
  ["/portofolio", "portfolio"],
  ["/", null], ["/program-catalog", null], ["/trainer", null], ["/trainers-old", null], ["/contact-us", null],
];

test("active navigation ownership is deterministic", () => {
  for (const [pathname, owner] of cases) assert.equal(getActiveNavigationItem(pathname), owner, pathname);
});

test("every marketing destination owns at most one top-level item", () => {
  for (const [pathname] of cases) {
    const owner = getActiveNavigationItem(pathname);
    assert.equal(owner === null || ["programs", "organizations", "about", "faculty", "portfolio"].includes(owner), true, pathname);
  }
});
