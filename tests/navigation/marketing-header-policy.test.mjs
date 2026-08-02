import assert from "node:assert/strict";
import test from "node:test";
import {
  isCheckoutRoute,
  isHiddenHeaderRoute,
  isMarketingHeaderRoute,
  matchesRouteBoundary,
  needsMarketingHeaderSpacer,
  resolveHeaderMode,
} from "../../.navigation-test-build/components/navigation/marketing-header-policy.js";

const cases = [
  ["/", "hidden", false],
  ["/programs", "marketing", false],
  ["/programs/", "marketing", false],
  ["/resources?tab=free", "marketing", false],
  ["/events#upcoming", "marketing", false],
  ["/untuk-organisasi", "marketing", false],
  ["/about", "marketing", false],
  ["/contact", "marketing", false],
  ["/portofolio", "marketing", false],
  ["/trainers", "marketing", false],
  ["/trainers/apply", "marketing", false],
  ["/trainers/frizzia-darren", "marketing", false],
  ["/trainer-verification", "marketing", false],
  ["/trainers/frizzia-darren/checkout", "hidden", false],
  ["/programs/data/checkout", "hidden", false],
  ["/checkout/order-demo", "hidden", false],
  ["/lp", "hidden", false],
  ["/lp/startup", "hidden", false],
  ["/skillary-campus", "hidden", false],
  ["/skillary-campus/navigation-preview", "hidden", false],
  ["/skillary-campus/navigation-production-preview", "hidden", false],
  ["/admin", "hidden", false],
  ["/admin/trainers", "hidden", false],
  ["/dashboard", "hidden", false],
  ["/dashboard/settings", "hidden", false],
  ["/learn/course-1", "hidden", false],
  ["/login", "hidden", false],
  ["/register", "hidden", false],
  ["/register/instructor", "hidden", false],
  ["/blog", "fallback", false],
  ["/community", "fallback", false],
  ["/program-catalog", "fallback", false],
  ["/trainer", "fallback", false],
  ["/trainers-old", "fallback", false],
  ["/administrator", "fallback", false],
  ["/dashboard-old", "fallback", false],
  ["/learning", "fallback", false],
  ["/lp-old", "fallback", false],
  ["/skillary-campuses", "fallback", false],
  ["/login-help", "fallback", false],
];

test("header ownership and marketing spacer matrix", () => {
  for (const [pathname, mode, spacer] of cases) {
    assert.equal(resolveHeaderMode(pathname), mode, pathname);
    assert.equal(needsMarketingHeaderSpacer(pathname), spacer, `${pathname} spacer`);
  }
});

test("resolved header ownership activates exactly one renderer", () => {
  for (const [pathname] of cases) {
    const mode = resolveHeaderMode(pathname);
    const renderers = {
      marketing: mode === "marketing",
      fallback: mode === "fallback",
      hidden: mode === "hidden",
    };
    assert.equal(Object.values(renderers).filter(Boolean).length, 1, pathname);
    if (isHiddenHeaderRoute(pathname)) assert.equal(mode, "hidden", `${pathname} hidden priority`);
    if (mode === "marketing") assert.equal(isMarketingHeaderRoute(pathname), true, pathname);
  }
});

test("route matching respects path-segment boundaries", () => {
  assert.equal(matchesRouteBoundary("/trainers/person", "/trainers"), true);
  assert.equal(matchesRouteBoundary("/trainers-old", "/trainers"), false);
  assert.equal(matchesRouteBoundary("/admin/users", "/admin"), true);
  assert.equal(matchesRouteBoundary("/administrator", "/admin"), false);
});

test("checkout suppression applies to actual and nested route families", () => {
  assert.equal(isCheckoutRoute("/checkout/order-demo"), true);
  assert.equal(resolveHeaderMode("/checkout/order-demo"), "hidden");
  assert.equal(isCheckoutRoute("/programs/course/checkout"), true);
  assert.equal(resolveHeaderMode("/programs/course/checkout"), "hidden");
  assert.equal(isCheckoutRoute("/checkout-help"), false);
  assert.equal(resolveHeaderMode("/checkout-help"), "fallback");
});
