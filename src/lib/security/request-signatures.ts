import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_WEBHOOK_TOLERANCE_SECONDS = 300;

function safeEqual(left: string, right: string): boolean {
  const leftBytes = Buffer.from(left, "utf8");
  const rightBytes = Buffer.from(right, "utf8");
  if (leftBytes.length !== rightBytes.length) return false;
  return timingSafeEqual(leftBytes, rightBytes);
}

export function verifyBearerSecret(
  authorizationHeader: string | null,
  expectedSecret: string | undefined,
): boolean {
  if (!expectedSecret || !authorizationHeader?.startsWith("Bearer ")) return false;
  const suppliedSecret = authorizationHeader.slice("Bearer ".length);
  return suppliedSecret.length > 0 && safeEqual(suppliedSecret, expectedSecret);
}

export function isFreshUnixTimestamp(
  timestamp: string,
  nowMilliseconds = Date.now(),
  toleranceSeconds = DEFAULT_WEBHOOK_TOLERANCE_SECONDS,
): boolean {
  if (!/^\d{10}$/.test(timestamp)) return false;
  const timestampMilliseconds = Number(timestamp) * 1000;
  if (!Number.isSafeInteger(timestampMilliseconds)) return false;
  return Math.abs(nowMilliseconds - timestampMilliseconds) <= toleranceSeconds * 1000;
}

export function createZoomSignature(
  rawBody: string,
  timestamp: string,
  secret: string,
): string {
  return `v0=${createHmac("sha256", secret)
    .update(`v0:${timestamp}:${rawBody}`)
    .digest("hex")}`;
}

export function verifyZoomSignature(input: {
  rawBody: string;
  timestamp: string;
  signature: string;
  secret: string | undefined;
  nowMilliseconds?: number;
  toleranceSeconds?: number;
}): boolean {
  if (!input.secret || !input.signature) return false;
  if (!isFreshUnixTimestamp(
    input.timestamp,
    input.nowMilliseconds,
    input.toleranceSeconds,
  )) return false;
  return safeEqual(
    input.signature,
    createZoomSignature(input.rawBody, input.timestamp, input.secret),
  );
}
