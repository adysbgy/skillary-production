import { NextResponse } from "next/server";
import crypto from "crypto";
import { processMeetingAttendance } from "@/lib/attendance";

// POST /api/webhooks/zoom — handles Zoom's endpoint URL validation handshake
// and the `meeting.ended` event, which triggers attendance → certificate
// processing (Fase D). Register this URL in the Zoom App's Event Subscriptions
// and copy the generated Secret Token into ZOOM_WEBHOOK_SECRET_TOKEN.
export async function POST(req: Request) {
  const secret = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
  const raw = await req.text();
  const body = raw ? JSON.parse(raw) : {};

  // 1) Endpoint URL validation handshake (one-time, when adding the webhook).
  if (body.event === "endpoint.url_validation") {
    if (!secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    const plainToken = body.payload?.plainToken;
    const encryptedToken = crypto.createHmac("sha256", secret).update(plainToken).digest("hex");
    return NextResponse.json({ plainToken, encryptedToken });
  }

  // 2) Verify signature on real events: v0=HMAC_SHA256(`v0:{timestamp}:{body}`, secret)
  if (secret) {
    const timestamp = req.headers.get("x-zm-request-timestamp") || "";
    const signature = req.headers.get("x-zm-signature") || "";
    const expected = "v0=" + crypto.createHmac("sha256", secret).update(`v0:${timestamp}:${raw}`).digest("hex");
    if (signature !== expected) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  if (body.event === "meeting.ended") {
    const meetingId = body.payload?.object?.id ? String(body.payload.object.id) : null;
    if (meetingId) {
      // Zoom's participant report can lag briefly after the meeting ends;
      // this is best-effort and safe to re-run if it comes back empty.
      processMeetingAttendance(meetingId).catch((err) => console.warn("Attendance processing failed:", err));
    }
  }

  return NextResponse.json({ ok: true });
}
