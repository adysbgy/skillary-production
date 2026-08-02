import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { processMeetingAttendance } from "@/lib/attendance";
import { verifyZoomSignature } from "@/lib/security/request-signatures";

type ZoomWebhookBody = {
  event?: string;
  payload?: {
    plainToken?: string;
    object?: { id?: string | number };
  };
};

export async function POST(req: Request) {
  const secret = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
  if (!secret) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const raw = await req.text();
  let body: ZoomWebhookBody;
  try {
    body = JSON.parse(raw) as ZoomWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.event === "endpoint.url_validation") {
    const plainToken = body.payload?.plainToken;
    if (!plainToken || plainToken.length > 512) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const encryptedToken = createHmac("sha256", secret)
      .update(plainToken)
      .digest("hex");
    return NextResponse.json({ plainToken, encryptedToken });
  }

  const timestamp = req.headers.get("x-zm-request-timestamp") || "";
  const signature = req.headers.get("x-zm-signature") || "";
  if (!verifyZoomSignature({ rawBody: raw, timestamp, signature, secret })) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (body.event === "meeting.ended") {
    const rawMeetingId = body.payload?.object?.id;
    const meetingId = rawMeetingId === undefined ? null : String(rawMeetingId);
    if (!meetingId || meetingId.length > 128) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await processMeetingAttendance(meetingId);
  }

  return NextResponse.json({ ok: true });
}
