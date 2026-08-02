import test from "node:test";
import assert from "node:assert/strict";
import { createMidtransSignature, verifyMidtransSignature } from "../../.integrity-test-build/lib/payments/midtrans-signature.js";
import { doesGrossAmountMatch } from "../../.integrity-test-build/lib/payments/payment-validation.js";
import { getMidtransEndpoints, resolveMidtransEnvironment, validateMidtransKeyEnvironment } from "../../.integrity-test-build/lib/payments/midtrans-config.js";
import { mapMidtransStatus, resolvePaymentTransition } from "../../.integrity-test-build/lib/payments/payment-status.js";
import { redactRecord } from "../../.integrity-test-build/lib/observability/redaction.js";
import { isPaymentEnabled } from "../../.integrity-test-build/lib/payments/payment-availability.js";

test("payments remain fail-closed until explicitly enabled with a server key", () => {
  assert.equal(isPaymentEnabled({}), false);
  assert.equal(isPaymentEnabled({ PAYMENTS_ENABLED: "true" }), false);
  assert.equal(isPaymentEnabled({ MIDTRANS_SERVER_KEY: "SB-Mid-server-test" }), false);
  assert.equal(isPaymentEnabled({ PAYMENTS_ENABLED: "true", MIDTRANS_SERVER_KEY: "SB-Mid-server-test" }), true);
});

test("signature verification accepts exact synthetic vector and rejects tampering", () => {
  const fields={orderId:"order-test-1",statusCode:"200",grossAmount:"150000.00"};
  const signature=createMidtransSignature(fields,"SB-Mid-server-synthetic");
  assert.equal(verifyMidtransSignature(fields,"SB-Mid-server-synthetic",signature),true);
  assert.equal(verifyMidtransSignature({...fields,grossAmount:"1.00"},"SB-Mid-server-synthetic",signature),false);
  assert.equal(verifyMidtransSignature(fields,"SB-Mid-server-synthetic","bad"),false);
});

test("amount binding normalizes representation but rejects mismatch",()=>{
  assert.equal(doesGrossAmountMatch(150000,"150000.00"),true);
  assert.equal(doesGrossAmountMatch(150000,"149999.99"),false);
  assert.equal(doesGrossAmountMatch(150000,"not-a-number"),false);
});

test("environment resolution is explicit and detects likely key mismatch",()=>{
  assert.equal(resolveMidtransEnvironment(undefined),"sandbox");
  assert.equal(getMidtransEndpoints("production").apiBaseUrl,"https://app.midtrans.com");
  assert.equal(validateMidtransKeyEnvironment("SB-Mid-server-test","sandbox"),true);
  assert.equal(validateMidtransKeyEnvironment("Mid-server-live","production"),true);
  assert.throws(()=>resolveMidtransEnvironment("staging"));
});

test("gateway status mapping and transitions protect paid terminal state",()=>{
  assert.equal(mapMidtransStatus("settlement"),"PAID");
  assert.equal(mapMidtransStatus("capture","challenge"),"PENDING");
  assert.equal(mapMidtransStatus("unknown"),null);
  assert.equal(resolvePaymentTransition("PENDING","PAID"),"PAID");
  assert.equal(resolvePaymentTransition("PAID","EXPIRED"),null);
  assert.equal(resolvePaymentTransition("PAID","PAID"),"PAID");
  assert.equal(resolvePaymentTransition("FAILED","PENDING"),null);
});

test("redaction strips secrets and obvious contact data recursively",()=>{
  const out=redactRecord({authorization:"Bearer abc",email:"buyer@example.com",message:"call +628123456789",nested:{signature_key:"secret"}});
  assert.equal(out.authorization,"[REDACTED]");
  assert.equal(out.email,"[REDACTED_EMAIL]");
  assert.equal(out.message,"call [REDACTED_PHONE]");
  assert.deepEqual(out.nested,{signature_key:"[REDACTED]"});
});
