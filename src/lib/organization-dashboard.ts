import { prisma } from "@/lib/prisma";
import { getBatchReportData } from "@/lib/batch-report";

export async function getOrganizationDashboardData(organizationId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      batches: {
        where: { status: { not: "ARCHIVED" } }, // typically we exclude archived or handle them
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!org) return null;

  const summary = {
    totalBatches: org.batches.length,
    activeBatches: org.batches.filter((b) => b.status === "ACTIVE").length,
    completedBatches: org.batches.filter((b) => b.status === "COMPLETED").length,
    archivedBatches: org.batches.filter((b) => b.status === "ARCHIVED").length,
    totalParticipants: 0,
    linkedParticipants: 0,
    unlinkedParticipants: 0,
    assignedCourses: 0,
    activeEnrollments: 0,
    certificatesIssued: 0,
    followUpNeededCount: 0,
    averageProgress: 0, // calculated at the end
  };

  const batchSummaries = [];
  const followUpItems = [];
  let totalProgressAccumulator = 0;
  let batchWithProgressCount = 0;

  for (const batch of org.batches) {
    const report = await getBatchReportData(batch.id);
    if (!report) continue;

    summary.totalParticipants += report.summary.totalParticipants;
    summary.linkedParticipants += report.summary.linkedParticipants;
    summary.unlinkedParticipants += report.summary.unlinkedParticipants;
    summary.assignedCourses += report.summary.assignedCourses;
    summary.activeEnrollments += report.summary.activeEnrollments;
    summary.certificatesIssued += report.summary.certificatesIssued;
    summary.followUpNeededCount += report.summary.followUpNeededCount;

    if (report.summary.totalRows > 0) {
      totalProgressAccumulator += report.summary.averageProgress;
      batchWithProgressCount++;
    }

    batchSummaries.push({
      batchId: batch.id,
      title: batch.title,
      status: batch.status,
      format: batch.format,
      startDate: batch.startDate,
      endDate: batch.endDate,
      participantCount: report.summary.totalParticipants,
      linkedParticipantCount: report.summary.linkedParticipants,
      assignedCourseCount: report.summary.assignedCourses,
      averageProgress: report.summary.averageProgress,
      certificatesIssued: report.summary.certificatesIssued,
      followUpNeededCount: report.summary.followUpNeededCount,
      latestUpdatedAt: batch.updatedAt,
    });

    // Extract follow-up reasons from report rows
    for (const row of report.rows) {
      if (row.followUpNeeded === "Yes") {
        let reason = "PROGRESS_PENDING";
        if (row.enrollmentStatus === "NO_USER") reason = "NO_USER_ACCOUNT";
        else if (row.enrollmentStatus === "NOT_GRANTED") reason = "NOT_GRANTED";
        else if (row.enrollmentStatus === "REVOKED") reason = "ACCESS_REVOKED";
        else if (row.progressPercent < 100) reason = `LOW_PROGRESS (${row.progressPercent}%)`;
        else if (row.certificateStatus === "NOT_ISSUED") reason = "CERTIFICATE_NOT_ISSUED";

        followUpItems.push({
          participantName: row.participantName,
          participantEmail: row.participantEmail,
          batchId: batch.id,
          batchTitle: batch.title,
          courseTitle: row.courseTitle,
          reason,
        });
      }
    }
  }

  summary.averageProgress = batchWithProgressCount > 0 
    ? Math.round(totalProgressAccumulator / batchWithProgressCount) 
    : 0;

  // Sort follow up items to show most urgent ones first or just take top 10
  // NO_USER and NOT_GRANTED usually need admin action first
  const reasonWeight = (r: string) => {
    if (r === "NO_USER_ACCOUNT") return 1;
    if (r === "NOT_GRANTED") return 2;
    if (r === "CERTIFICATE_NOT_ISSUED") return 3;
    if (r.startsWith("LOW_PROGRESS")) return 4;
    return 5;
  };

  const topFollowUps = followUpItems
    .sort((a, b) => reasonWeight(a.reason) - reasonWeight(b.reason))
    .slice(0, 10);

  return {
    organization: org,
    summary,
    batchSummaries,
    followUpItems: topFollowUps,
    totalFollowUpItemsCount: followUpItems.length,
  };
}
