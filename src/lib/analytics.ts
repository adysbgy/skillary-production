/**
 * Shared utility for calculating course health mathematically.
 * Needs to receive a `course` object with related arrays (modules -> lessons -> progress/quizAttempts).
 */
export function computeCourseAnalytics(course: any) {
    const totalEnrolled = course._count?.enrollments || 0;
    const totalCompleted = course._count?.certificates || 0;
    const completionRate = totalEnrolled > 0 ? Math.round((totalCompleted / totalEnrolled) * 100) : 0;

    const totalLessons = (course.modules || []).reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);

    const allProgressRecords = (course.modules || []).flatMap((m: any) => (m.lessons || []).flatMap((l: any) => l.progress || []));
    const completedLessons = allProgressRecords.filter((p: any) => p.completed).length;
    const expectedTotalLessonProgress = totalEnrolled * totalLessons;
    const avgProgress = expectedTotalLessonProgress > 0 ? Math.round((completedLessons / expectedTotalLessonProgress) * 100) : 0;

    const allQuizAttempts = (course.modules || []).flatMap((m: any) => (m.lessons || []).flatMap((l: any) => l.quizAttempts || []));
    const totalQuizAttempts = allQuizAttempts.length;
    const avgQuizScore = totalQuizAttempts > 0
        ? Math.round(allQuizAttempts.reduce((acc: number, q: any) => acc + (q.totalQuestions > 0 ? q.score / q.totalQuestions : 0), 0) / totalQuizAttempts * 100)
        : null;

    return {
        totalEnrolled,
        totalCompleted,
        completionRate,
        avgProgress,
        totalQuizAttempts,
        avgQuizScore,
        totalLessons
    };
}
