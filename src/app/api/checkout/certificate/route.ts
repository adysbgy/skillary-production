import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCertificateEligibility } from "@/lib/certificate-eligibility";
import { PRODUCT_TYPE } from "@/lib/payment-constants";
import { isPaymentEnabled, PAYMENT_HOLD_MESSAGE } from "@/lib/payments/payment-availability";

// POST /api/checkout/certificate — Create a payment order for a digital certificate
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isPaymentEnabled()) {
        return NextResponse.json({ error: PAYMENT_HOLD_MESSAGE, code: "PAYMENT_HOLD" }, { status: 503 });
    }

    const { courseId } = await req.json();
    if (!courseId) {
        return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    const eligibility = await getCertificateEligibility(session.user.id, courseId);

    // Already issued — no need to pay
    if (eligibility.state === "ISSUED") {
        return NextResponse.json({
            error: "Certificate already issued.",
            certificateCode: eligibility.certificate?.uniqueCode,
        }, { status: 409 });
    }

    // Already paid — direct to claim
    if (eligibility.state === "PAID_READY_TO_CLAIM") {
        return NextResponse.json({
            error: "Payment already completed. Please claim your certificate.",
            state: "PAID_READY_TO_CLAIM",
        }, { status: 409 });
    }

    // Existing pending order — return it
    if (eligibility.state === "PAYMENT_PENDING" && eligibility.pendingCertificateOrder) {
        return NextResponse.json({
            orderId: eligibility.pendingCertificateOrder.id,
            snapToken: eligibility.pendingCertificateOrder.gatewayRef,
            redirect: `/checkout/${eligibility.pendingCertificateOrder.id}`,
            state: "PAYMENT_PENDING",
        });
    }

    // Only allow checkout if state is exactly PAYMENT_REQUIRED
    if (eligibility.state !== "PAYMENT_REQUIRED") {
        const messages: Record<string, string> = {
            DISABLED: "Certificates are not available for this course.",
            NOT_ENROLLED: "You must be enrolled in this course first.",
            NOT_COMPLETED: "You must complete the course before purchasing a certificate.",
            ASSESSMENT_NOT_PASSED: "You must pass the required assessment before purchasing a certificate.",
            INCLUDED_READY_TO_CLAIM: "This course includes a free certificate. No payment needed.",
        };
        return NextResponse.json({
            error: messages[eligibility.state] || "Certificate checkout not available.",
            state: eligibility.state,
        }, { status: 400 });
    }

    // Validate price from server (never trust client)
    const price = eligibility.price;
    if (!price || price <= 0) {
        return NextResponse.json({
            error: "Certificate price is not configured for this course. Contact admin.",
        }, { status: 400 });
    }

    // Create PaymentOrder for digital certificate
    const order = await prisma.paymentOrder.create({
        data: {
            userId: session.user.id,
            courseId,
            productType: PRODUCT_TYPE.DIGITAL_CERTIFICATE,
            amount: price,
            status: "PENDING",
        },
    });

    // Midtrans integration
    const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
    if (midtransServerKey) {
        const isProd = process.env.NODE_ENV === "production" && !midtransServerKey.includes("SB-");
        const apiUrl = isProd
            ? "https://app.midtrans.com/snap/v1/transactions"
            : "https://app.sandbox.midtrans.com/snap/v1/transactions";

        try {
            const snapResponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(midtransServerKey + ":").toString("base64")}`,
                },
                body: JSON.stringify({
                    transaction_details: {
                        order_id: order.id,
                        gross_amount: Math.round(price),
                    },
                    item_details: [{
                        id: `cert-${courseId}`,
                        price: Math.round(price),
                        quantity: 1,
                        name: `Digital Certificate - ${eligibility.course?.title || "Course"}`.substring(0, 50),
                    }],
                    customer_details: {
                        email: session.user.email,
                    },
                }),
            });
            const snapData = await snapResponse.json();

            if (snapData?.token) {
                await prisma.paymentOrder.update({
                    where: { id: order.id },
                    data: {
                        gatewayRef: snapData.token,
                        gatewayData: JSON.stringify(snapData),
                    },
                });
                return NextResponse.json({
                    orderId: order.id,
                    snapToken: snapData.token,
                    redirect: `/checkout/${order.id}`,
                });
            }
        } catch (error) {
            console.error("Midtrans certificate checkout handshake failed:", error);
        }
    }

    return NextResponse.json({
        orderId: order.id,
        redirect: `/checkout/${order.id}`,
    });
}
