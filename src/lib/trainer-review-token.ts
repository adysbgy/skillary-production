import { createHash, randomBytes } from "node:crypto";

const TOKEN_PATTERN = /^[a-f0-9]{64}$/;
const TOKEN_PATH_PATTERN = /(\/trainer-review\/)[a-f0-9]{64}/gi;
export const TRAINER_REVIEW_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export function generateTrainerReviewToken() { return randomBytes(32).toString("hex"); }
export function isValidTrainerReviewToken(token: string) { return TOKEN_PATTERN.test(token); }
export function hashTrainerReviewToken(token: string) { if (!isValidTrainerReviewToken(token)) return null; return createHash("sha256").update(token).digest("hex"); }
export function redactTrainerReviewToken(value: string) { return value.replace(TOKEN_PATH_PATTERN, "$1[REDACTED]"); }
export function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character] as string); }
export function getCanonicalAppOrigin() {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (!configured) { if (process.env.NODE_ENV === "production") throw new Error("NEXT_PUBLIC_APP_URL is required to issue trainer review links"); return "http://localhost:3000"; }
  const url = new URL(configured);
  if (!/^https?:$/.test(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) throw new Error("NEXT_PUBLIC_APP_URL must be an origin without credentials, path, query, or hash");
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") throw new Error("NEXT_PUBLIC_APP_URL must use HTTPS in production");
  return url.origin;
}
