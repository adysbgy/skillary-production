import { prisma } from "@/lib/prisma";

/**
 * Validates whether a user has a valid, active enrollment for a given course.
 * This is the central source of truth for learner content access.
 */
export async function hasActiveEnrollment(userId: string, courseId: string): Promise<boolean> {
    if (!userId || !courseId) return false;

    const enrollment = await (prisma as any).enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });

    return !!enrollment && enrollment.revokedAt === null;
}

/**
 * Validates course access for reading material (handles Instructor edge cases).
 * Instructors implicitly have access to their own courses even if not formally "enrolled".
 */
export async function canAccessCourseContent(userId: string, courseId: string): Promise<boolean> {
    if (!userId || !courseId) return false;

    // Check learner enrollment first (most common)
    const enrolled = await hasActiveEnrollment(userId, courseId);
    if (enrolled) return true;

    // Check if the user is the instructor owner of this course or an ADMIN
    const [course, user] = await Promise.all([
        prisma.course.findUnique({
            where: { id: courseId },
            select: { instructorId: true }
        }),
        prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })
    ]);

    if (user?.role === "ADMIN") return true;

    return course?.instructorId === userId;
}

/**
 * Determines if a course can be safely auto-enrolled without payment.
 */
export async function isCourseFree(courseId: string): Promise<boolean> {
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        // @ts-ignore - price exists in schema but TS cache may lag
        select: { price: true }
    });
    // @ts-ignore
    return course !== null && course.price === 0;
}

/**
 * Validates whether a course can be safely previewed by the current user
 * even if it's currently marked as DRAFT or UNPUBLISHED.
 */
export async function canPreviewCourse(userId: string | undefined | null, courseId: string): Promise<boolean> {
    if (!userId) return false;

    // Check if the user is the instructor owner of this course or an ADMIN
    const [course, user] = await Promise.all([
        prisma.course.findUnique({
            where: { id: courseId },
            select: { instructorId: true }
        }),
        prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })
    ]);

    if (user?.role === "ADMIN") return true;

    return course?.instructorId === userId;
}
