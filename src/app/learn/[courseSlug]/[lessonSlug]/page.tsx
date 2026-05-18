import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LessonClient from "./LessonClient";
import { canAccessCourseContent } from "@/lib/entitlements";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ courseSlug: string; lessonSlug: string }> }) {
    const { courseSlug, lessonSlug } = await params;
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const course = await (prisma as any).course.findUnique({
        where: { slug: courseSlug },
        include: {
            modules: {
                orderBy: { sortOrder: "asc" },
                include: {
                    lessons: {
                        orderBy: { sortOrder: "asc" },
                        include: { resources: { orderBy: { sortOrder: "asc" } } },
                    },
                },
            },
        },
    });

    if (!course) notFound();

    if (course.status !== "PUBLISHED") {
        const { canPreviewCourse } = await import("@/lib/entitlements");
        const canPreview = await canPreviewCourse(session.user.id, course.id);
        if (!canPreview) notFound();
    }

    // Verify entitlement: prevents direct URL bypass to unentitled lessons
    const isEntitled = await canAccessCourseContent(session.user.id, course.id);
    if (!isEntitled) {
        redirect(`/program/${course.slug}`);
    }

    // Flatten all lessons in order
    const allLessons = course.modules.flatMap((m: any) => m.lessons);
    const currentIndex = allLessons.findIndex((l: any) => l.slug === lessonSlug);
    if (currentIndex === -1) notFound();

    const lesson = allLessons[currentIndex];
    const allSlugs = allLessons.map((l: any) => l.slug);

    // Fetch all progress for this user in this course
    const progressRecords = await prisma.lessonProgress.findMany({
        where: {
            userId: session.user.id,
            lessonId: { in: allLessons.map((l: any) => l.id) }
        },
    });

    const certificate = await prisma.certificate.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } }
    });

    // Enforce sequential locking server-side for regular learners
    const userRole = (session.user as any).role;
    const isOwnerOrAdmin = userRole === "ADMIN" || course.instructorId === session.user.id;
    if (!isOwnerOrAdmin && currentIndex > 0) {
        const previousLessonId = allLessons[currentIndex - 1].id;
        const prevIsComplete = progressRecords.some((p: any) => p.lessonId === previousLessonId && p.completed);
        if (!prevIsComplete) {
            redirect(`/learn/${course.slug}`);
        }
    }

    const progress = progressRecords.map((p) => ({
        lessonId: p.lessonId,
        completed: p.completed,
    }));

    // Map Prisma models to the simplified UI schema expected by LessonClient
    const uiCourse = {
        title: course.title,
        slug: course.slug,
        modules: course.modules.map((m: any) => ({
            id: m.id,
            title: m.title,
            lessons: m.lessons.map((l: any) => ({
                id: l.id,
                title: l.title,
                slug: l.slug,
                type: l.type,
                content: l.content,
                videoUrl: l.videoUrl,
                quizData: l.quizData || null,
            }))
        }))
    };

    const uiLesson = {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        type: lesson.type,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        quizData: lesson.quizData || null,
        resources: ((lesson as any).resources || []).map((r: any) => ({
            id: r.id,
            filename: r.filename,
            url: r.url,
            fileType: r.fileType,
            fileSize: r.fileSize,
        })),
    };

    return (
        <LessonClient
            course={uiCourse}
            lesson={uiLesson}
            progress={progress}
            allSlugs={allSlugs}
            certificateCode={certificate?.uniqueCode || undefined}
        />
    );
}
