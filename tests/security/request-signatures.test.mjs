import test from "node:test";
import assert from "node:assert/strict";
import {
  createZoomSignature,
  isFreshUnixTimestamp,
  verifyBearerSecret,
  verifyZoomSignature,
} from "../../.integrity-test-build/lib/security/request-signatures.js";

test("bearer verification fails closed and accepts only the exact secret", () => {
  assert.equal(verifyBearerSecret(null, undefined), false);
  assert.equal(verifyBearerSecret("Bearer secret", undefined), false);
  assert.equal(verifyBearerSecret(null, "secret"), false);
  assert.equal(verifyBearerSecret("Basic secret", "secret"), false);
  assert.equal(verifyBearerSecret("Bearer wrong", "secret"), false);
  assert.equal(verifyBearerSecret("Bearer secret", "secret"), true);
});

test("webhook timestamps reject malformed, stale, and future replay values", () => {
  const now = 1_800_000_000_000;
  const current = String(Math.floor(now / 1000));
  assert.equal(isFreshUnixTimestamp(current, now), true);
  assert.equal(isFreshUnixTimestamp("not-time", now), false);
  assert.equal(isFreshUnixTimestamp(String(Math.floor(now / 1000) - 301), now), false);
  assert.equal(isFreshUnixTimestamp(String(Math.floor(now / 1000) + 301), now), false);
});

test("Zoom signature validates exact body and fresh timestamp only", () => {
  const now = 1_800_000_000_000;
  const timestamp = String(Math.floor(now / 1000));
  const rawBody = JSON.stringify({ event: "meeting.ended" });
  const secret = "webhook-secret";
  const signature = createZoomSignature(rawBody, timestamp, secret);
  assert.equal(verifyZoomSignature({ rawBody, timestamp, signature, secret, nowMilliseconds: now }), true);
  assert.equal(verifyZoomSignature({ rawBody: `${rawBody} `, timestamp, signature, secret, nowMilliseconds: now }), false);
  assert.equal(verifyZoomSignature({ rawBody, timestamp, signature, secret: undefined, nowMilliseconds: now }), false);
  assert.equal(verifyZoomSignature({ rawBody, timestamp: String(Number(timestamp) - 301), signature, secret, nowMilliseconds: now }), false);
});
