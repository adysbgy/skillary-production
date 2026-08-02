import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LessonClient from "./LessonClient";
import { canAccessCourseContent } from "@/lib/entitlements";
import { createPublicQuizData } from "@/lib/quiz-integrity";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ courseSlug: string; lessonSlug: string }> }) {
    const { courseSlug, lessonSlug } = await params;
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const course = await prisma.course.findUnique({
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
    const allLessons = course.modules.flatMap((module) => module.lessons);
    const currentIndex = allLessons.findIndex((lesson) => lesson.slug === lessonSlug);
    if (currentIndex === -1) notFound();

    const lesson = allLessons[currentIndex];
    const allSlugs = allLessons.map((lesson) => lesson.slug);

    // Fetch all progress for this user in this course
    const progressRecords = await prisma.lessonProgress.findMany({
        where: {
            userId: session.user.id,
            lessonId: { in: allLessons.map((lesson) => lesson.id) }
        },
    });

    const certificate = await prisma.certificate.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } }
    });

    // Enforce sequential locking server-side for regular learners
    const userRole = session.user.role;
    const isOwnerOrAdmin = userRole === "ADMIN" || course.instructorId === session.user.id;
    if (!isOwnerOrAdmin && currentIndex > 0) {
        const previousLessonId = allLessons[currentIndex - 1].id;
        const prevIsComplete = progressRecords.some((record) => record.lessonId === previousLessonId && record.completed);
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
        modules: course.modules.map((module) => ({
            id: module.id,
            title: module.title,
            lessons: module.lessons.map((moduleLesson) => ({
                id: moduleLesson.id,
                title: moduleLesson.title,
                slug: moduleLesson.slug,
                type: moduleLesson.type,
                content: moduleLesson.content,
                videoUrl: moduleLesson.videoUrl,
                quizData: moduleLesson.type === "QUIZ" ? createPublicQuizData(moduleLesson.quizData) : null,
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
        quizData: lesson.type === "QUIZ" ? createPublicQuizData(lesson.quizData) : null,
        resources: lesson.resources.map((resource) => ({
            id: resource.id,
            filename: resource.filename,
            url: `/api/resources/${resource.id}/download`,
            fileType: resource.fileType,
            fileSize: resource.fileSize,
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
