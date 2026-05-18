import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCertificateEligibility } from "@/lib/certificate-eligibility";

// POST /api/certificates/claim — Claim a certificate after eligibility is confirmed
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();
    if (!courseId) {
        return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    const eligibility = await getCertificateEligibility(session.user.id, courseId);

    // Already issued — return existing certificate safely
    if (eligibility.state === "ISSUED" && eligibility.certificate) {
        return NextResponse.json({
            success: true,
            certificateCode: eligibility.certificate.uniqueCode,
            certificateUrl: `/certificate/${eligibility.certificate.uniqueCode}`,
            alreadyIssued: true,
        });
    }

    // Allow claim only for these two states
    const claimableStates = ["INCLUDED_READY_TO_CLAIM", "PAID_READY_TO_CLAIM"];
    if (!claimableStates.includes(eligibility.state)) {
        const messages: Record<string, string> = {
            DISABLED: "Certificates are not available for this course.",
            NOT_ENROLLED: "You must be enrolled in this course.",
            NOT_COMPLETED: "You must complete the course first.",
            ASSESSMENT_NOT_PASSED: "You must pass the required assessment first.",
            PAYMENT_REQUIRED: "You must purchase the digital certificate first.",
            PAYMENT_PENDING: "Your certificate payment is still being processed.",
        };
        return NextResponse.json({
            error: messages[eligibility.state] || "Certificate claim not available.",
            state: eligibility.state,
        }, { status: 400 });
    }

    // Create the certificate (unique constraint protects against duplicates)
    try {
        const certificate = await prisma.certificate.create({
            data: {
                userId: session.user.id,
                courseId,
            },
        });

        return NextResponse.json({
            success: true,
            certificateCode: certificate.uniqueCode,
            certificateUrl: `/certificate/${certificate.uniqueCode}`,
        });
    } catch (error: any) {
        // Handle unique constraint violation (race condition / duplicate claim)
        if (error?.code === "P2002") {
            const existing = await prisma.certificate.findUnique({
                where: { userId_courseId: { userId: session.user.id, courseId } },
            });
            if (existing) {
                return NextResponse.json({
                    success: true,
                    certificateCode: existing.uniqueCode,
                    certificateUrl: `/certificate/${existing.uniqueCode}`,
                    alreadyIssued: true,
                });
            }
        }
        console.error("Certificate claim error:", error);
        return NextResponse.json({ error: "Failed to issue certificate." }, { status: 500 });
    }
}
