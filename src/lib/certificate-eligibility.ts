import { prisma } from "@/lib/prisma";
import { CERTIFICATE_MODE, PRODUCT_TYPE } from "@/lib/payment-constants";

export type CertificateEligibilityState =
    | "DISABLED"
    | "NOT_ENROLLED"
    | "NOT_COMPLETED"
    | "ASSESSMENT_NOT_PASSED"
    | "INCLUDED_READY_TO_CLAIM"
    | "PAYMENT_REQUIRED"
    | "PAYMENT_PENDING"
    | "PAID_READY_TO_CLAIM"
    | "ISSUED";

export interface CertificateEligibility {
    state: CertificateEligibilityState;
    course: { id: string; title: string; slug: string; certificateMode: string; digitalCertificatePrice: number | null } | null;
    enrollment: { id: string; completedAt: Date | null } | null;
    certificate: { id: string; uniqueCode: string } | null;
    paidCertificateOrder: { id: string } | null;
    pendingCertificateOrder: { id: string; gatewayRef: string | null } | null;
    hasAssessment: boolean;
    price: number | null;
}

/**
 * Server-side eligibility check for digital certificate purchase/claim.
 * This is the single source of truth for certificate entitlement state.
 */
export async function getCertificateEligibility(
    userId: string,
    courseId: string
): Promise<CertificateEligibility> {
    // 1. Fetch course with certificate config
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: {
            id: true,
            title: true,
            slug: true,
            certificateMode: true,
            digitalCertificatePrice: true,
        },
    });

    if (!course) {
        return makeResult("DISABLED", { course: null });
    }

    const certMode = (course as any).certificateMode || CERTIFICATE_MODE.INCLUDED;
    const price = (course as any).digitalCertificatePrice as number | null;

    const courseData = {
        id: course.id,
        title: course.title,
        slug: course.slug,
        certificateMode: certMode,
        digitalCertificatePrice: price,
    };

    // 2. DISABLED mode — no certificate layer
    if (certMode === CERTIFICATE_MODE.DISABLED) {
        return makeResult("DISABLED", { course: courseData });
    }

    // 3. Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
        select: { id: true, completedAt: true, revokedAt: true },
    });

    if (!enrollment || enrollment.revokedAt) {
        return makeResult("NOT_ENROLLED", { course: courseData });
    }

    // 4. Check if certificate is already issued
    const certificate = await prisma.certificate.findUnique({
        where: { userId_courseId: { userId, courseId } },
        select: { id: true, uniqueCode: true },
    });

    if (certificate) {
        return makeResult("ISSUED", {
            course: courseData,
            enrollment: { id: enrollment.id, completedAt: enrollment.completedAt },
            certificate,
        });
    }

    // 5. Check completion
    if (!enrollment.completedAt) {
        return makeResult("NOT_COMPLETED", {
            course: courseData,
            enrollment: { id: enrollment.id, completedAt: null },
        });
    }

    // 6. Check required assessment pass
    const hasAssessment = await checkHasRequiredAssessment(courseId);
    if (hasAssessment) {
        const passed = await checkAssessmentPassed(userId, courseId);
        if (!passed) {
            return makeResult("ASSESSMENT_NOT_PASSED", {
                course: courseData,
                enrollment: { id: enrollment.id, completedAt: enrollment.completedAt },
                hasAssessment: true,
            });
        }
    }

    // 7. Branch by certificate mode
    if (certMode === CERTIFICATE_MODE.INCLUDED) {
        return makeResult("INCLUDED_READY_TO_CLAIM", {
            course: courseData,
            enrollment: { id: enrollment.id, completedAt: enrollment.completedAt },
            hasAssessment,
        });
    }

    // PAID_DIGITAL: check payment status
    // Check for PAID order first
    const paidOrder = await (prisma as any).paymentOrder.findFirst({
        where: {
            userId,
            courseId,
            productType: PRODUCT_TYPE.DIGITAL_CERTIFICATE,
            status: "PAID",
        },
        select: { id: true },
    });

    if (paidOrder) {
        return makeResult("PAID_READY_TO_CLAIM", {
            course: courseData,
            enrollment: { id: enrollment.id, completedAt: enrollment.completedAt },
            hasAssessment,
            paidCertificateOrder: paidOrder,
            price,
        });
    }

    // Check for PENDING order
    const pendingOrder = await (prisma as any).paymentOrder.findFirst({
        where: {
            userId,
            courseId,
            productType: PRODUCT_TYPE.DIGITAL_CERTIFICATE,
            status: "PENDING",
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, gatewayRef: true },
    });

    if (pendingOrder) {
        return makeResult("PAYMENT_PENDING", {
            course: courseData,
            enrollment: { id: enrollment.id, completedAt: enrollment.completedAt },
            hasAssessment,
            pendingCertificateOrder: pendingOrder,
            price,
        });
    }

    // No payment exists
    return makeResult("PAYMENT_REQUIRED", {
        course: courseData,
        enrollment: { id: enrollment.id, completedAt: enrollment.completedAt },
        hasAssessment,
        price,
    });
}

// --- Internal helpers ---

function makeResult(
    state: CertificateEligibilityState,
    partial: Partial<CertificateEligibility> = {}
): CertificateEligibility {
    return {
        state,
        course: partial.course ?? null,
        enrollment: partial.enrollment ?? null,
        certificate: partial.certificate ?? null,
        paidCertificateOrder: partial.paidCertificateOrder ?? null,
        pendingCertificateOrder: partial.pendingCertificateOrder ?? null,
        hasAssessment: partial.hasAssessment ?? false,
        price: partial.price ?? null,
    };
}

/**
 * Check if course has any required-to-continue quiz lessons.
 */
async function checkHasRequiredAssessment(courseId: string): Promise<boolean> {
    const quizLessons = await prisma.lesson.findMany({
        where: {
            module: { courseId },
            type: "QUIZ",
        },
        select: { quizData: true },
    });

    for (const lesson of quizLessons) {
        if (lesson.quizData) {
            try {
                const parsed = JSON.parse(lesson.quizData);
                if (!Array.isArray(parsed) && parsed.settings?.isRequiredToContinue) {
                    return true;
                }
            } catch { }
        }
    }
    return false;
}

/**
 * Check if user has passed all required-to-continue quizzes for the course.
 * Consistent with /api/progress validation logic.
 */
async function checkAssessmentPassed(userId: string, courseId: string): Promise<boolean> {
    const requiredQuizLessons = await prisma.lesson.findMany({
        where: {
            module: { courseId },
            type: "QUIZ",
        },
        select: { id: true, quizData: true },
    });

    for (const lesson of requiredQuizLessons) {
        if (!lesson.quizData) continue;
        try {
            const parsed = JSON.parse(lesson.quizData);
            if (!Array.isArray(parsed) && parsed.settings?.isRequiredToContinue) {
                // This quiz is required — check if user has a passing attempt
                const bestAttempt = await (prisma as any).quizAttempt.findFirst({
                    where: { userId, lessonId: lesson.id },
                    orderBy: { score: "desc" },
                });
                if (!bestAttempt || !bestAttempt.passed) {
                    return false;
                }
            }
        } catch { }
    }
    return true;
}
