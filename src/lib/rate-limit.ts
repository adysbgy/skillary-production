import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  configured: boolean;
}

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? Redis.fromEnv()
  : null;
const limiters = new Map<string, Ratelimit>();

function limiter(maxRequests: number, windowSeconds: number): Ratelimit | null {
  if (!redis) return null;
  const key = `${maxRequests}:${windowSeconds}`;
  const existing = limiters.get(key);
  if (existing) return existing;
  const created = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
    analytics: true,
    prefix: "skillary:rate-limit",
  });
  limiters.set(key, created);
  return created;
}

export async function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 10 * 60 * 1000,
): Promise<RateLimitResult> {
  const distributed = limiter(maxRequests, Math.ceil(windowMs / 1000));
  if (!distributed) {
    return { success: false, limit: maxRequests, remaining: 0, reset: Date.now() + windowMs, configured: false };
  }
  const result = await distributed.limit(key);
  return { ...result, configured: true };
}

export function getClientKey(req: Request, namespace = "global"): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || req.headers.get("x-real-ip")?.trim() || "unknown";
  const digest = createHash("sha256").update(ip).digest("hex").slice(0, 24);
  return `${namespace}:ip:${digest}`;
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(Math.max(0, result.remaining)),
    "RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
    "Retry-After": String(Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))),
  };
}
