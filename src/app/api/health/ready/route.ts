import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyBearerSecret } from "@/lib/security/request-signatures";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const secret = process.env.HEALTHCHECK_SECRET;
  if (!secret) return NextResponse.json({ status: "unavailable" }, { status: 503 });
  if (!verifyBearerSecret(req.headers.get("authorization"), secret)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let database = false;
  try { await Promise.race([prisma.$queryRaw`SELECT 1`, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 2000))]); database = true; } catch { database = false; }
  const configuration = {
    database: Boolean(process.env.DATABASE_URL),
    auth: Boolean(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
    storage: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    rateLimit: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
    cron: Boolean(process.env.CRON_SECRET),
    zoomWebhook: Boolean(process.env.ZOOM_WEBHOOK_SECRET_TOKEN),
  };
  const ready = database && configuration.database && configuration.auth && configuration.storage && configuration.rateLimit;
  return NextResponse.json({ status: ready ? "ready" : "degraded", database, configuration, gates: { payments: process.env.PAYMENTS_ENABLED === "true", canonicalOffers: process.env.CANONICAL_OFFERS_ENABLED === "true" } }, { status: ready ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
