// Attendance → certificate automation (Fase D). Triggered by the Zoom
// `meeting.ended` webhook: pull the participant report, sum each attendee's
// total duration (they may rejoin), and for buyers who cleared the threshold,
// issue a certificate and notify them. Idempotent — safe to re-run.

import { prisma } from "./prisma";
import { getEventByZoomMeetingId, formatEventPrice } from "@/data/v2-events";
import { getMeetingParticipants } from "./zoom";
import { sendEmail, sendWhatsApp } from "./notify";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://skillary.my.id";
const ATTENDANCE_THRESHOLD = 0.6; // must be present for ≥60% of the session

export async function processMeetingAttendance(meetingId: string): Promise<void> {
  const event = getEventByZoomMeetingId(meetingId);
  if (!event) return;

  const participants = await getMeetingParticipants(meetingId);
  if (!participants) return; // Zoom not configured or report unavailable — skip, don't fail

  // Sum duration per email (attendees can rejoin, producing multiple rows).
  const totalsByEmail = new Map<string, number>();
  for (const p of participants) {
    totalsByEmail.set(p.email, (totalsByEmail.get(p.email) ?? 0) + p.duration);
  }
  const thresholdSeconds = event.durationMin * 60 * ATTENDANCE_THRESHOLD;

  const orders = await prisma.eventOrder.findMany({
    where: { eventSlug: event.slug, status: "PAID", attendedAt: null },
  });

  for (const order of orders) {
    const attended = (totalsByEmail.get(order.email.toLowerCase()) ?? 0) >= thresholdSeconds;
    if (!attended) continue;

    await prisma.eventOrder.update({ where: { id: order.id }, data: { attendedAt: new Date() } });

    let userId = order.userId;
    if (!userId) {
      const user = await prisma.user.upsert({
        where: { email: order.email },
        update: {},
        create: { email: order.email, name: order.name, role: "LEARNER" },
      });
      userId = user.id;
      await prisma.eventOrder.update({ where: { id: order.id }, data: { userId } });
    }

    const cert = await prisma.certificate.upsert({
      where: { userId_eventSlug: { userId, eventSlug: event.slug } },
      update: {},
      create: { userId, eventSlug: event.slug, eventTitle: event.title },
    });

    const certUrl = `${APP_URL}/certificate/${cert.uniqueCode}`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0F172A">
        <h2 style="margin:0 0 4px">Sertifikat Anda siap 🎓</h2>
        <p style="color:#64748B;margin:0 0 16px">Terima kasih telah mengikuti <strong>${event.title}</strong> (${formatEventPrice(event.price)}).</p>
        <a href="${certUrl}" style="display:inline-block;background:linear-gradient(135deg,#FF8A00,#FF5A5F);color:#fff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:999px">Lihat Sertifikat</a>
        <p style="color:#94A3B8;font-size:12px;margin-top:20px">ID Sertifikat: ${cert.uniqueCode}<br/>Skillary</p>
      </div>`;
    const wa = `*Sertifikat Anda siap 🎓*\n\nTerima kasih telah mengikuti *${event.title}*.\n\nLihat & unduh sertifikat:\n${certUrl}\n\n— Skillary`;

    await Promise.allSettled([
      sendEmail({ to: order.email, subject: `Sertifikat Anda — ${event.title}`, html }),
      sendWhatsApp({ to: order.whatsapp, message: wa }),
    ]);
  }
}
