import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email, lessonId } = await req.json();

        if (!email || !lessonId) {
            return NextResponse.json({ error: "Missing email or lessonId" }, { status: 400 });
        }

        // Fetch the lesson and course to verify ownership
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: { module: { include: { course: true } } },
        });

        if (!lesson || lesson.type !== "QUIZ") {
            return NextResponse.json({ error: "Invalid quiz lesson" }, { status: 404 });
        }

        const course = lesson.module.course;
        const role = (session.user as any).role;
        const isOwnerOrAdmin = role === "ADMIN" || (course as any).instructorId === session.user.id;

        if (!isOwnerOrAdmin) {
            return NextResponse.json({ error: "Forbidden. You do not have permission to modify attempts for this course." }, { status: 403 });
        }

        // Find the target user
        const targetUser = await prisma.user.findUnique({ where: { email } });
        if (!targetUser) {
            return NextResponse.json({ error: "Learner with this email not found" }, { status: 404 });
        }

        // Perform the safe reset
        const deleted = await prisma.quizAttempt.deleteMany({
            where: {
                userId: targetUser.id,
                lessonId: lesson.id,
            }
        });

        if (deleted.count === 0) {
            return NextResponse.json({ success: true, message: "Learner has no attempts recorded for this quiz." });
        }

        return NextResponse.json({ success: true, message: `Successfully reset ${deleted.count} attempt(s) for ${targetUser.email}.` });

    } catch (error: any) {
        console.error("Quiz reset error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
