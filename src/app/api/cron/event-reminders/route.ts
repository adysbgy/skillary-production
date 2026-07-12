import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEventBySlug, getEventStart, type EventItem } from "@/data/v2-events";
import { sendEmail, sendWhatsApp } from "@/lib/notify";

// GET /api/cron/event-reminders — Vercel Cron (hourly). Sends H-1 (within 24h)
// and H-1jam (within 1h) reminders to paid buyers, with the join link and an
// add-to-calendar link. Idempotent via EventOrder.remindersSent.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://skillary.my.id";
const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

function gcalLink(event: EventItem): string {
  const start = getEventStart(event);
  const end = new Date(start.getTime() + event.durationMin * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Skillary — ${event.title}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Webinar Skillary: ${event.title}. Akses & rekaman di ${APP_URL}/dashboard`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

async function sendReminder(order: { name: string; email: string; whatsapp: string; eventTitle: string }, event: EventItem, tag: string) {
  const soon = tag === "H-1jam" ? "dalam 1 jam" : "besok";
  const cal = gcalLink(event);
  const dash = `${APP_URL}/dashboard`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0F172A">
      <h2 style="margin:0 0 4px">Webinar Anda dimulai ${soon} ⏰</h2>
      <p style="color:#64748B;margin:0 0 16px">Halo ${order.name}, jangan sampai terlewat.</p>
      <div style="border:1px solid #E7EDF3;border-radius:12px;padding:16px;margin-bottom:16px">
        <strong>${event.title}</strong><br/>
        <span style="color:#64748B">${event.dateLabel} · ${event.time} · ${event.format}</span>
      </div>
      <a href="${dash}" style="display:inline-block;background:linear-gradient(135deg,#FF8A00,#FF5A5F);color:#fff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:999px;margin-right:8px">Buka Dashboard</a>
      <a href="${cal}" style="display:inline-block;color:#FF8A00;text-decoration:none;font-weight:bold;padding:12px 4px">+ Tambah ke Kalender</a>
      <p style="color:#94A3B8;font-size:12px;margin-top:20px">Skillary</p>
    </div>`;
  const wa =
    `*Webinar dimulai ${soon} ⏰*\n\nHalo ${order.name}, *${event.title}* (${event.dateLabel} · ${event.time}).\n\n` +
    `Link Zoom ada di dashboard Anda: ${dash}\nTambah ke kalender: ${cal}\n\n— Skillary`;

  await Promise.allSettled([
    sendEmail({ to: order.email, subject: `Pengingat: ${event.title} dimulai ${soon}`, html }),
    sendWhatsApp({ to: order.whatsapp, message: wa }),
  ]);
}

export async function GET(req: Request) {
  // Verify the Vercel Cron secret when configured.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const orders = await prisma.eventOrder.findMany({ where: { status: "PAID" } });
  let sent = 0;

  for (const order of orders) {
    const event = getEventBySlug(order.eventSlug);
    if (!event) continue;
    const diff = getEventStart(event).getTime() - now;
    if (diff <= 0) continue; // already started / past

    const already = order.remindersSent ?? [];
    const toSend: string[] = [];
    if (diff <= DAY && !already.includes("H-1")) toSend.push("H-1");
    if (diff <= HOUR && !already.includes("H-1jam")) toSend.push("H-1jam");
    if (toSend.length === 0) continue;

    for (const tag of toSend) await sendReminder(order, event, tag);
    await prisma.eventOrder.update({ where: { id: order.id }, data: { remindersSent: [...already, ...toSend] } });
    sent += toSend.length;
  }

  return NextResponse.json({ ok: true, checked: orders.length, sent });
}
