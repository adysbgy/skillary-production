import assert from "node:assert/strict";
import test from "node:test";
import { getActiveNavigationItem } from "../../.navigation-test-build/components/navigation/navigation-active-state.js";

const cases = [
  ["/programs", "programs"], ["/programs/", "programs"], ["/events", "events"], ["/resources?tab=free", "programs"], ["/learning-paths#data", "programs"],
  ["/untuk-organisasi", "services"],
  ["/about", "about"], ["/contact", null], ["/privacy", null], ["/terms", null], ["/trainer-verification", "programs"], ["/expert-partner", "trainers"], ["/community", null], ["/blog", null],
  ["/trainers", "trainers"], ["/trainers/person", "trainers"],
  ["/portofolio", "portfolio"],
  ["/", null], ["/program-catalog", null], ["/trainer", null], ["/trainers-old", null], ["/contact-us", null],
];

test("active navigation ownership is deterministic", () => {
  for (const [pathname, owner] of cases) assert.equal(getActiveNavigationItem(pathname), owner, pathname);
});

test("every marketing destination owns at most one top-level item", () => {
  for (const [pathname] of cases) {
    const owner = getActiveNavigationItem(pathname);
    assert.equal(owner === null || ["events", "programs", "services", "trainers", "portfolio", "about"].includes(owner), true, pathname);
  }
});
