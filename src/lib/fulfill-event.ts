// Fulfillment for a paid event ticket — the post-payment step that turns an
// order into access. Runs from the Midtrans callback when an order becomes PAID.
//
// Fase A scope: passwordless auto-account + buyer confirmation (email + WA).
// Later phases add: Zoom registrant (unique join link), scheduled reminders,
// recording access, and attendance-based certificate issuance.

import { prisma } from "./prisma";
import { getEventBySlug, formatEventPrice } from "@/data/v2-events";
import { sendEmail, sendWhatsApp } from "./notify";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://skillary.my.id";

export async function fulfillEventOrder(orderId: string): Promise<void> {
  const order = await prisma.eventOrder.findUnique({ where: { id: orderId } });
  if (!order || order.status !== "PAID" || order.fulfilledAt) return; // idempotent

  // Passwordless auto-account: identity = email. No signup friction; the buyer
  // later accesses their dashboard (recording, certificate) via a magic link.
  const user = await prisma.user.upsert({
    where: { email: order.email },
    update: { name: order.name },
    create: { email: order.email, name: order.name, role: "LEARNER" },
  });

  await prisma.eventOrder.update({
    where: { id: order.id },
    data: { userId: user.id, fulfilledAt: new Date() },
  });

  // Notify buyer (fire-and-forget; failures never block fulfillment).
  const event = getEventBySlug(order.eventSlug);
  const when = event ? `${event.dateLabel} · ${event.time}` : "";
  const dashUrl = `${APP_URL}/dashboard`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0F172A">
      <h2 style="margin:0 0 4px">Pembayaran diterima ✅</h2>
      <p style="color:#64748B;margin:0 0 16px">Terima kasih, ${order.name}. Kursi Anda di webinar berikut sudah aman.</p>
      <div style="border:1px solid #E7EDF3;border-radius:12px;padding:16px;margin-bottom:16px">
        <strong>${order.eventTitle}</strong><br/>
        <span style="color:#64748B">${when}</span><br/>
        <span style="color:#64748B">Total dibayar: ${formatEventPrice(order.amount)}</span>
      </div>
      <p style="margin:0 0 8px">Yang berikutnya:</p>
      <ul style="color:#334155;padding-left:18px;margin:0 0 16px">
        <li>Link Zoom + pengingat dikirim menjelang acara.</li>
        <li>Rekaman & e-sertifikat muncul di dashboard Anda setelah acara.</li>
      </ul>
      <a href="${dashUrl}" style="display:inline-block;background:linear-gradient(135deg,#FF8A00,#FF5A5F);color:#fff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:999px">Buka Dashboard</a>
      <p style="color:#94A3B8;font-size:12px;margin-top:20px">Skillary · Pembelajaran profesional yang terukur</p>
    </div>`;

  const waMsg =
    `*Pembayaran diterima ✅*\n\nHalo ${order.name}, kursi Anda di *${order.eventTitle}* (${when}) sudah aman.\n\n` +
    `Link Zoom & pengingat dikirim menjelang acara. Rekaman & e-sertifikat tersedia di dashboard setelah acara:\n${dashUrl}\n\nTerima kasih — Skillary`;

  await Promise.allSettled([
    sendEmail({ to: order.email, subject: `Pembayaran diterima — ${order.eventTitle}`, html }),
    sendWhatsApp({ to: order.whatsapp, message: waMsg }),
  ]);
}
