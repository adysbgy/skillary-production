import { prisma } from "@/lib/prisma";

export async function getBatchReportData(batchId: string) {
  const batch = await prisma.trainingBatch.findUnique({
    where: { id: batchId },
    include: {
      organization: true,
      participants: {
        where: { status: { not: "REMOVED" } },
        include: { user: true },
      },
      courses: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: { select: { id: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!batch) return null;

  const userIds = batch.participants.map((p) => p.userId).filter(Boolean) as string[];
  const courseIds = batch.courses.map((bc) => bc.courseId);

  // Bulk fetch related data for linked users
  const [enrollments, lessonProgresses, quizAttempts, certificates] = await Promise.all([
    (prisma as any).enrollment.findMany({
      where: { userId: { in: userIds }, courseId: { in: courseIds } },
    }),
    prisma.lessonProgress.findMany({
      where: { userId: { in: userIds } }, // We'll filter by course lessons in memory
    }),
    prisma.quizAttempt.findMany({
      where: { userId: { in: userIds } },
    }),
    prisma.certificate.findMany({
      where: { userId: { in: userIds }, courseId: { in: courseIds } },
    }),
  ]);

  // Lookup maps
  const enrollmentMap = new Map<string, any>(enrollments.map((e: any) => [`${e.userId}_${e.courseId}`, e]));
  const certMap = new Map(certificates.map((c) => [`${c.userId}_${c.courseId}`, c]));
  const progressMap = new Map(lessonProgresses.map((lp) => [`${lp.userId}_${lp.lessonId}`, lp]));
  // For quiz attempts, map by userId_quizId or just userId to find if they passed anything
  // Quiz relations to course might be complex. Safest heuristic: group by userId, check if passed.
  const quizAttemptMap = new Map<string, any[]>();
  quizAttempts.forEach((qa) => {
    const key = qa.userId;
    if (!quizAttemptMap.has(key)) quizAttemptMap.set(key, []);
    quizAttemptMap.get(key)!.push(qa);
  });

  const rows = [];
  let totalParticipants = batch.participants.length;
  let linkedParticipants = batch.participants.filter(p => p.userId).length;
  let activeEnrollments = 0;
  let completedRows = 0;
  let certificatesIssued = 0;
  let followUpNeededCount = 0;
  let totalProgressPercent = 0;

  for (const participant of batch.participants) {
    for (const batchCourse of batch.courses) {
      const course = batchCourse.course;
      const allLessons = course.modules.flatMap(m => m.lessons);
      const totalLessons = allLessons.length;

      let enrollmentStatus = participant.userId ? "NOT_GRANTED" : "NO_USER";
      let enrollmentSource = "—";
      let completedLessons = 0;
      let progressPercent = 0;
      let assessmentStatus = "UNKNOWN";
      let certificateStatus = participant.userId ? "NOT_ISSUED" : "NO_USER";
      let completedAt = "—";
      let followUpNeeded = false;

      if (participant.userId) {
        const key = `${participant.userId}_${course.id}`;
        const enrollment = enrollmentMap.get(key);

        if (enrollment) {
          enrollmentSource = enrollment.source;
          if (enrollment.revokedAt) {
            enrollmentStatus = "REVOKED";
          } else {
            enrollmentStatus = enrollment.source === "PAID" ? "PAID" : "ACTIVE";
            activeEnrollments++;
          }
        }

        // Progress
        completedLessons = allLessons.filter(l => progressMap.get(`${participant.userId}_${l.id}`)?.completed).length;
        if (totalLessons > 0) {
          progressPercent = Math.round((completedLessons / totalLessons) * 100);
        }

        if (progressPercent === 100) completedRows++;

        // Assessment (Heuristic: did they pass any quiz?)
        const userQuizzes = quizAttemptMap.get(participant.userId) || [];
        if (userQuizzes.length === 0) {
          assessmentStatus = "NOT_ATTEMPTED / UNKNOWN";
        } else {
          const passedAny = userQuizzes.some(q => q.passed);
          assessmentStatus = passedAny ? "PASSED" : "ATTEMPTED";
        }

        // Certificate
        const cert = certMap.get(key);
        if (cert) {
          certificateStatus = "ISSUED";
          certificatesIssued++;
          completedAt = new Date(cert.issuedAt).toISOString().split("T")[0];
        }

        // Follow-up logic
        if (!enrollment || enrollment.revokedAt) followUpNeeded = true;
        else if (progressPercent < 100) followUpNeeded = true;
        else if (certificateStatus === "NOT_ISSUED") followUpNeeded = true;
      } else {
        followUpNeeded = true;
      }

      if (followUpNeeded) followUpNeededCount++;
      totalProgressPercent += progressPercent;

      rows.push({
        participantId: participant.id,
        courseId: course.id,
        batchTitle: batch.title,
        organizationName: batch.organization.name,
        participantName: participant.name,
        participantEmail: participant.email,
        participantRole: participant.role || "—",
        participantStatus: participant.status,
        userLinked: participant.userId ? "Yes" : "No",
        courseTitle: course.title,
        courseRequired: batchCourse.required ? "Yes" : "No",
        enrollmentStatus,
        enrollmentSource,
        progressPercent,
        lessonsCompleted: completedLessons,
        totalLessons,
        assessmentStatus,
        certificateStatus,
        completedAt,
        followUpNeeded: followUpNeeded ? "Yes" : "No",
      });
    }
  }

  const averageProgress = rows.length > 0 ? Math.round(totalProgressPercent / rows.length) : 0;

  return {
    rows,
    summary: {
      totalParticipants,
      linkedParticipants,
      unlinkedParticipants: totalParticipants - linkedParticipants,
      assignedCourses: batch.courses.length,
      totalRows: rows.length,
      activeEnrollments,
      completedRows,
      certificatesIssued,
      followUpNeededCount,
      averageProgress,
    },
  };
}
