import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function hashRateLimitKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

/** Durable fixed-window limiter shared by all application instances. */
export async function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 10 * 60 * 1000
): Promise<RateLimitResult> {
  const keyHash = hashRateLimitKey(key);
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);

  const rows = await prisma.$queryRaw<Array<{ count: number; resetAt: Date }>>`
    INSERT INTO "RateLimitBucket" ("keyHash", "count", "resetAt", "updatedAt")
    VALUES (${keyHash}, 1, ${resetAt}, ${now})
    ON CONFLICT ("keyHash") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimitBucket"."resetAt" <= ${now} THEN 1
        ELSE "RateLimitBucket"."count" + 1
      END,
      "resetAt" = CASE
        WHEN "RateLimitBucket"."resetAt" <= ${now} THEN ${resetAt}
        ELSE "RateLimitBucket"."resetAt"
      END,
      "updatedAt" = ${now}
    RETURNING "count", "resetAt"
  `;

  const bucket = rows[0];
  if (!bucket) throw new Error("Rate limiter did not return a bucket");
  return {
    allowed: bucket.count <= maxRequests,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt.getTime() - now.getTime()) / 1000)),
  };
}

export function getClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return `ip:${forwarded.split(",")[0].trim()}`;
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return `ip:${realIp.trim()}`;
  return "ip:unknown";
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return { "Retry-After": String(result.retryAfterSeconds), "Cache-Control": "no-store" };
}
