import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import CourseOverviewClient from "./CourseOverviewClient";
import { canAccessCourseContent, hasActiveEnrollment } from "@/lib/entitlements";

export default async function CoursePage(props: { params: Promise<{ courseSlug: string }> }) {
    const params = await props.params;
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const course = await prisma.course.findUnique({
        where: { slug: params.courseSlug },
        include: {
            modules: {
                orderBy: { sortOrder: 'asc' },
                include: {
                    lessons: {
                        orderBy: { sortOrder: 'asc' }
                    }
                }
            }
        }
    });

    if (!course) notFound();

    if (course.status !== "PUBLISHED") {
        // Allow enrolled learners to continue accessing archived/draft courses
        const enrolled = await hasActiveEnrollment(session.user.id, course.id);
        if (!enrolled) {
            const { canPreviewCourse } = await import("@/lib/entitlements");
            const canPreview = await canPreviewCourse(session.user.id, course.id);
            if (!canPreview) notFound();
        }
    }

    // Check entitlement using the secure layer
    const isEntitled = await canAccessCourseContent(session.user.id, course.id);

    if (!isEntitled) {
        redirect(`/program/${course.slug}`);
    }

    // Always true at this point because we redirect if false
    const isEnrolled = true;

    // Fetch progress safely since we confirmed entitlement
    const progress = await prisma.lessonProgress.findMany({
        where: {
            userId: session.user.id,
            lesson: { moduleId: { in: course.modules.map(m => m.id) } }
        }
    });

    const certificate = await prisma.certificate.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } }
    });

    const isPreview = course.status !== "PUBLISHED";
    const isArchivedAccess = isPreview && await hasActiveEnrollment(session.user.id, course.id);

    return (
        <CourseOverviewClient
            course={course}
            isEnrolled={isEnrolled}
            progress={progress}
            isPreview={isPreview}
            isArchivedAccess={isArchivedAccess}
            certificateCode={certificate?.uniqueCode || undefined}
        />
    );
}
