import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/checkout/callback — Handle payment gateway notification
// Midtrans will POST to this endpoint when payment status changes
export async function POST(req: NextRequest) {
    const body = await req.json();

    // === MIDTRANS NOTIFICATION HANDLER ===
    // Validate the notification against our secure tunnel
    const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
    if (!midtransServerKey) {
        return NextResponse.json({ error: "Gateway not configured" }, { status: 500 });
    }

    // Verify signature:
    const crypto = require("crypto");
    const signatureKey = crypto
        .createHash("sha512")
        .update(body.order_id + body.status_code + body.gross_amount + midtransServerKey)
        .digest("hex");

    if (signatureKey !== body.signature_key) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const orderId = body.order_id || body.orderId;
    const transactionStatus = body.transaction_status || body.status;

    if (!orderId) {
        return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    const order = await (prisma as any).paymentOrder.findUnique({
        where: { id: orderId },
        include: { course: true },
    });

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Map gateway status to our internal status
    let newStatus = order.status;
    if (transactionStatus === "capture" || transactionStatus === "settlement" || transactionStatus === "PAID") {
        newStatus = "PAID";
    } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "FAILED") {
        newStatus = "FAILED";
    } else if (transactionStatus === "expire" || transactionStatus === "EXPIRED") {
        newStatus = "EXPIRED";
    } else if (transactionStatus === "pending" || transactionStatus === "PENDING") {
        newStatus = "PENDING";
    }

    // Update order status
    await (prisma as any).paymentOrder.update({
        where: { id: orderId },
        data: {
            status: newStatus,
            gatewayRef: body.transaction_id || order.gatewayRef,
            gatewayData: JSON.stringify(body),
        },
    });

    // If payment is confirmed, branch by product type
    if (newStatus === "PAID") {
        const productType = order.productType || "COURSE";

        if (productType === "COURSE") {
            // Existing behavior: auto-enroll the learner for course purchases
            await prisma.enrollment.upsert({
                where: { userId_courseId: { userId: order.userId, courseId: order.courseId } },
                update: {
                    source: "PAID",
                    revokedAt: null,
                    revokedByAdminId: null
                },
                create: {
                    userId: order.userId,
                    courseId: order.courseId,
                    source: "PAID"
                },
            });
        } else if (productType === "DIGITAL_CERTIFICATE") {
            // Certificate payments: do NOT grant enrollment.
            // Certificate claim will be handled by a future Phase 2B endpoint.
            console.log(`[Callback] DIGITAL_CERTIFICATE payment confirmed for order ${orderId}. Certificate claim pending.`);
        } else {
            // Unknown product type — fail safely, do not grant enrollment
            console.warn(`[Callback] Unknown productType "${productType}" for order ${orderId}. No entitlement granted.`);
        }
    }

    return NextResponse.json({ success: true, status: newStatus });
}
