import { createHash, createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { processMeetingAttendance } from "@/lib/attendance";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/observability/logger";

const MAX_PAYLOAD_BYTES = 256 * 1024;
const MAX_TIMESTAMP_SKEW_SECONDS = 5 * 60;

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const secret = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
  if (!secret) {
    log.error("webhook.zoom.unavailable", { reason: "SECRET_NOT_CONFIGURED" });
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  const raw = await req.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = raw ? JSON.parse(raw) as Record<string, unknown> : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = typeof body.event === "string" ? body.event : "";
  const payload = body.payload as { plainToken?: string; object?: { id?: string | number } } | undefined;
  if (event === "endpoint.url_validation") {
    if (!payload?.plainToken) return NextResponse.json({ error: "Missing plain token" }, { status: 400 });
    const encryptedToken = createHmac("sha256", secret).update(payload.plainToken).digest("hex");
    return NextResponse.json({ plainToken: payload.plainToken, encryptedToken });
  }

  const timestamp = req.headers.get("x-zm-request-timestamp") || "";
  const signature = req.headers.get("x-zm-signature") || "";
  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds) || Math.abs(Date.now() / 1000 - timestampSeconds) > MAX_TIMESTAMP_SKEW_SECONDS) {
    return NextResponse.json({ error: "Stale request" }, { status: 401 });
  }
  const expected = "v0=" + createHmac("sha256", secret).update(`v0:${timestamp}:${raw}`).digest("hex");
  if (!safeEqual(signature, expected)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const eventKeyHash = createHash("sha256").update(`${timestamp}:${signature}`).digest("hex");
  try {
    await prisma.webhookEvent.create({ data: { provider: "zoom", eventKeyHash, eventType: event || "unknown" } });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    throw error;
  }

  if (event === "meeting.ended" && payload?.object?.id != null) {
    const meetingId = String(payload.object.id);
    processMeetingAttendance(meetingId).catch((error) => log.warn("webhook.zoom.attendance_failed", { error }));
  }
  return NextResponse.json({ ok: true });
}
