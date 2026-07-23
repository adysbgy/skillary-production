import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

// POST /api/checkout — Create a payment order for a paid course
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const limit = await checkRateLimit(`checkout-user:${session.user.id}`, 10, 10 * 60 * 1000);
    if (!limit.allowed) {
        return NextResponse.json({ error: "Too many checkout attempts" }, { status: 429, headers: rateLimitHeaders(limit) });
    }

    const { courseId } = await req.json();
    if (!courseId) {
        return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Free courses should use direct enrollment, not checkout
    if (course.price <= 0) {
        return NextResponse.json({ error: "This course is free. Use direct enrollment." }, { status: 400 });
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId } },
    });
    if (existing) {
        return NextResponse.json({ error: "Already enrolled", redirect: `/learn/${course.slug}` }, { status: 409 });
    }

    // Check for existing PENDING order
    const pendingOrder = await prisma.paymentOrder.findFirst({
        where: { userId: session.user.id, courseId, status: "PENDING" },
        orderBy: { createdAt: "desc" },
    });

    if (pendingOrder) {
        return NextResponse.json({ orderId: pendingOrder.id, redirect: `/checkout/${pendingOrder.id}` });
    }

    // Create new payment order
    const order = await prisma.paymentOrder.create({
        data: {
            userId: session.user.id,
            courseId,
            productType: "COURSE",
            amount: course.price,
            status: "PENDING",
        },
    });

    // === MIDTRANS INTEGRATION POINT ===
    const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
    if (midtransServerKey) {
        const snapResponse = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(midtransServerKey + ":").toString("base64")}`,
            },
            body: JSON.stringify({
                transaction_details: { order_id: order.id, gross_amount: order.amount },
                customer_details: { email: session.user.email },
            }),
        });
        const snapData = await snapResponse.json();
        await prisma.paymentOrder.update({
            where: { id: order.id },
            data: { gatewayRef: snapData.token, gatewayData: JSON.stringify(snapData) },
        });
        return NextResponse.json({ orderId: order.id, snapToken: snapData.token, redirect: `/checkout/${order.id}` });
    }

    return NextResponse.json({ orderId: order.id, redirect: `/checkout/${order.id}` });
}
