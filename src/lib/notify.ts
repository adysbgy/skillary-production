// Notification backbone — email (Resend) + WhatsApp (pluggable).
// Both fail-soft: if the provider isn't configured, they no-op so fulfillment
// is never blocked. Email is the free, always-on channel (Resend); WhatsApp is
// an enhancement (Fonnte for MVP → swap to Meta WA Cloud API for scale).

import { Resend } from "resend";

const FROM = process.env.RESEND_FROM_EMAIL || "Skillary <onboarding@resend.dev>";

type Sent = { ok?: true; skipped?: true; error?: true };

export async function sendEmail(params: { to: string; subject: string; html: string }): Promise<Sent> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { skipped: true };
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from: FROM, to: params.to, subject: params.subject, html: params.html });
    return { ok: true };
  } catch (err) {
    console.warn("sendEmail failed:", err);
    return { error: true };
  }
}

export async function sendWhatsApp(params: { to: string; message: string }): Promise<Sent> {
  // MVP provider: Fonnte (set FONNTE_TOKEN). Pro upgrade: Meta WA Cloud API —
  // swap this block for a graph.facebook.com template call without touching callers.
  const token = process.env.FONNTE_TOKEN;
  if (!token) return { skipped: true };
  try {
    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: { Authorization: token },
      body: new URLSearchParams({ target: params.to, message: params.message }),
    });
    if (!res.ok) {
      console.warn("sendWhatsApp non-200:", res.status);
      return { error: true };
    }
    return { ok: true };
  } catch (err) {
    console.warn("sendWhatsApp failed:", err);
    return { error: true };
  }
}
