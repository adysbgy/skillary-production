import test from "node:test";
import assert from "node:assert/strict";
import { evaluateOfferPublication, evaluateOfferCheckout, isCanonicalOffersEnabled } from "../../.integrity-test-build/lib/offers/offer-policy.js";
import { isEvidencePubliclyUsable } from "../../.integrity-test-build/lib/offers/evidence-policy.js";

const now = new Date("2026-08-02T08:00:00.000Z");
const ready = {
  type: "WEBINAR", audience: "INDIVIDUAL", status: "SCHEDULED",
  title: "Webinar nyata", summary: "Ringkasan", slug: "webinar-nyata",
  primaryAction: "CHECKOUT", priceAmount: 100000, capacity: 200,
  registrationOpensAt: new Date("2026-08-01T00:00:00.000Z"),
  registrationClosesAt: new Date("2026-08-03T00:00:00.000Z"),
  publishedAt: new Date("2026-08-01T00:00:00.000Z"),
  trainerAssignments: [{ status: "ACCEPTED" }],
  productionRecords: [{ stage: "APPROVED", items: [{ requirement: "syllabus", status: "APPROVED" }] }],
};

test("draft offer cannot be published", () => {
  const result = evaluateOfferPublication({ ...ready, status: "DRAFT" });
  assert.equal(result.allowed, false);
  assert.ok(result.reasons.includes("offer status is not public"));
});

test("published trainer identity alone is insufficient without approved production", () => {
  const result = evaluateOfferPublication({ ...ready, productionRecords: [] });
  assert.equal(result.allowed, false);
  assert.ok(result.reasons.includes("approved production kit is required"));
});

test("checkout composes offer readiness with the global payment kill switch", () => {
  assert.equal(evaluateOfferCheckout(ready, { PAYMENTS_ENABLED: "false" }, now).allowed, false);
  assert.equal(evaluateOfferCheckout(ready, { PAYMENTS_ENABLED: "true", MIDTRANS_SERVER_KEY: "server-key" }, now).allowed, true);
});

test("canonical database readers remain disabled by default", () => {
  assert.equal(isCanonicalOffersEnabled({}), false);
  assert.equal(isCanonicalOffersEnabled({ CANONICAL_OFFERS_ENABLED: "true" }), true);
});

test("evidence fails closed on consent, expiry, withdrawal, and missing approval", () => {
  const evidence = { status: "APPROVED", consentStatus: "APPROVED", approvedCopy: "Approved", approvedAt: now, expiresAt: null, withdrawnAt: null };
  assert.equal(isEvidencePubliclyUsable(evidence, now), true);
  assert.equal(isEvidencePubliclyUsable({ ...evidence, consentStatus: "PENDING" }, now), false);
  assert.equal(isEvidencePubliclyUsable({ ...evidence, expiresAt: new Date("2026-08-01T00:00:00Z") }, now), false);
  assert.equal(isEvidencePubliclyUsable({ ...evidence, withdrawnAt: now }, now), false);
  assert.equal(isEvidencePubliclyUsable({ ...evidence, approvedAt: null }, now), false);
});
