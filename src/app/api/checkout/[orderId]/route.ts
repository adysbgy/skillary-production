import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/checkout/[orderId] — Fetch order details for checkout page
export async function GET(_req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await params;

    const order = await (prisma as any).paymentOrder.findUnique({
        where: { id: orderId },
        include: {
            course: { select: { title: true, slug: true, level: true, duration: true } },
        },
    });

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Only allow the order owner to view it
    if (order.userId !== session.user.id) {
        return NextResponse.json({ error: "Not authorized to view this order" }, { status: 403 });
    }

    return NextResponse.json({
        id: order.id,
        amount: order.amount,
        status: order.status,
        gatewayRef: order.gatewayRef,
        course: order.course,
    });
}
