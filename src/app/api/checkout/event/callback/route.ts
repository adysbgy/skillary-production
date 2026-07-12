import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

// POST /api/checkout/event/callback — Midtrans payment notification for event
// ticket orders. Verifies the signature, then maps the gateway status onto the
// EventOrder. Register this URL as the Payment Notification URL in the Midtrans
// dashboard.
export async function POST(req: Request) {
  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: "Gateway not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = body ?? {};

    // Verify Midtrans signature: sha512(order_id + status_code + gross_amount + serverKey)
    const expected = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");
    if (expected !== signature_key) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const order = await prisma.eventOrder.findUnique({ where: { id: String(order_id) } });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    let status = order.status;
    if (transaction_status === "capture" || transaction_status === "settlement") {
      status = fraud_status === "challenge" ? "PENDING" : "PAID";
    } else if (transaction_status === "pending") {
      status = "PENDING";
    } else if (transaction_status === "expire") {
      status = "EXPIRED";
    } else if (transaction_status === "cancel" || transaction_status === "deny") {
      status = "FAILED";
    }

    await prisma.eventOrder.update({
      where: { id: order.id },
      data: { status, gatewayData: JSON.stringify(body) },
    });

    // TODO (next increment): when status becomes PAID, deliver access
    // (Zoom link + recording + e-certificate) to the buyer via email/WhatsApp.

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Event callback failed:", err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
