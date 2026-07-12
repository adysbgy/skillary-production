import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEventBySlug } from "@/data/v2-events";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

// POST /api/checkout/event — guest checkout for a paid webinar/event ticket.
// Creates an EventOrder and, when Midtrans is configured, a Snap transaction.
// Falls back gracefully (order recorded, no gateway) when keys are absent so
// the endpoint is safe to ship before credentials are set.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://skillary.my.id";

// Map the on-page method choice to Midtrans Snap `enabled_payments` codes so the
// popup opens straight to the selected channel. Unknown/absent → all methods.
const PAYMENT_MAP: Record<string, string[]> = {
  qris: ["other_qris"],
  gopay: ["gopay"],
  shopeepay: ["shopeepay"],
  va: ["bank_transfer", "echannel"],
};

export async function POST(req: Request) {
  try {
    // Rate limit: 10 attempts / 10 min per IP
    if (!checkRateLimit(getClientKey(req), 10, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi nanti." }, { status: 429 });
    }

    const body = await req.json();
    const { eventSlug, name, email, whatsapp, method, _honeypot } = body ?? {};

    // Honeypot — silently accept bots without creating an order
    if (_honeypot) return NextResponse.json({ ok: true, orderId: "received" }, { status: 201 });

    if (!eventSlug || !name || !email || !whatsapp) {
      return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
    }

    const event = getEventBySlug(String(eventSlug));
    if (!event) return NextResponse.json({ error: "Event tidak ditemukan." }, { status: 404 });
    if (event.status === "Selesai") {
      return NextResponse.json({ error: "Event ini sudah selesai." }, { status: 400 });
    }
    if (event.price <= 0) {
      return NextResponse.json({ error: "Event ini gratis — gunakan pendaftaran biasa." }, { status: 400 });
    }

    const amount = Math.round(event.price);

    const order = await prisma.eventOrder.create({
      data: {
        eventSlug: event.slug,
        eventTitle: event.title,
        amount,
        name: String(name),
        email: String(email),
        whatsapp: String(whatsapp),
        status: "PENDING",
      },
    });

    // Midtrans Snap (raw API — consistent with the existing /api/checkout).
    // Sandbox by default; set MIDTRANS_ENV=production to go live.
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (serverKey) {
      const base =
        process.env.MIDTRANS_ENV === "production"
          ? "https://app.midtrans.com"
          : "https://app.sandbox.midtrans.com";
      const snapRes = await fetch(`${base}/snap/v1/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(serverKey + ":").toString("base64")}`,
        },
        body: JSON.stringify({
          transaction_details: { order_id: order.id, gross_amount: amount },
          item_details: [{ id: event.slug, price: amount, quantity: 1, name: event.title.slice(0, 50) }],
          customer_details: { first_name: String(name), email: String(email), phone: String(whatsapp) },
          ...(PAYMENT_MAP[String(method)] ? { enabled_payments: PAYMENT_MAP[String(method)] } : {}),
          callbacks: { finish: `${APP_URL}/checkout/${order.id}` },
        }),
      });
      const snap = await snapRes.json();
      if (!snapRes.ok || !snap.token) {
        console.error("Midtrans Snap error:", snap);
        return NextResponse.json({ error: "Gagal membuat transaksi. Coba lagi." }, { status: 502 });
      }
      await prisma.eventOrder.update({
        where: { id: order.id },
        data: { gatewayRef: snap.token, gatewayData: JSON.stringify(snap) },
      });
      return NextResponse.json(
        { orderId: order.id, snapToken: snap.token, redirectUrl: snap.redirect_url },
        { status: 201 }
      );
    }

    // Dev fallback — order recorded, no gateway configured yet.
    return NextResponse.json({ orderId: order.id, snapToken: null, pendingGateway: true }, { status: 201 });
  } catch (err) {
    console.error("Event checkout failed:", err);
    return NextResponse.json({ error: "Terjadi kesalahan. Coba lagi." }, { status: 500 });
  }
}
