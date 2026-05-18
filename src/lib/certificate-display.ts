import { prisma } from "@/lib/prisma";

export type CertificateDisplayState =
    | "NOT_LOGGED_IN"
    | "NOT_ENROLLED"
    | "LOCKED"
    | "READY"
    | "ISSUED"
    | "DISABLED";

export type CertificateMode = "INCLUDED" | "PAID_DIGITAL" | "DISABLED";

export async function getCertificateState(
    courseId: string,
    userId?: string
): Promise<{
    state: CertificateDisplayState;
    hasAssessment: boolean;
    certificateMode: CertificateMode;
    certificateId?: string;
    uniqueCode?: string;
}> {
    // Fetch course certificateMode
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { certificateMode: true }
    });
    const certificateMode = ((course as any)?.certificateMode || "INCLUDED") as CertificateMode;

    // Check if course has any quiz lessons
    const quizLessons = await prisma.lesson.count({
        where: {
            module: { courseId },
            type: "QUIZ"
        }
    });
    const hasAssessment = quizLessons > 0;

    if (certificateMode === "DISABLED") {
        return { state: "DISABLED", hasAssessment, certificateMode };
    }

    if (!userId) {
        return { state: "NOT_LOGGED_IN", hasAssessment, certificateMode };
    }

    const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } }
    });

    if (!enrollment || enrollment.revokedAt) {
        return { state: "NOT_ENROLLED", hasAssessment, certificateMode };
    }

    // Check if certificate is already issued
    const certificate = await prisma.certificate.findUnique({
        where: { userId_courseId: { userId, courseId } }
    });

    if (certificate) {
        return { state: "ISSUED", hasAssessment, certificateMode, certificateId: certificate.id, uniqueCode: certificate.uniqueCode };
    }

    // Check completion status from enrollment
    if (enrollment.completedAt) {
        return { state: "READY", hasAssessment, certificateMode };
    }

    return { state: "LOCKED", hasAssessment, certificateMode };
}
