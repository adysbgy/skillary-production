import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { getBatchReportData } from "@/lib/batch-report";
import { generateCSV, csvResponse } from "@/lib/csv";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;

  try {
    const data = await getBatchReportData(id);

    if (!data) {
      return new NextResponse("Batch not found", { status: 404 });
    }

    const headers = [
      "Organization",
      "Batch",
      "Participant Name",
      "Email",
      "Role",
      "Participant Status",
      "User Linked",
      "Course",
      "Required",
      "Enrollment Status",
      "Enrollment Source",
      "Progress %",
      "Lessons Completed",
      "Total Lessons",
      "Assessment Status",
      "Certificate Status",
      "Completed At",
      "Follow-up Needed"
    ];

    const csvRows = data.rows.map(row => [
      row.organizationName,
      row.batchTitle,
      row.participantName,
      row.participantEmail,
      row.participantRole,
      row.participantStatus,
      row.userLinked,
      row.courseTitle,
      row.courseRequired,
      row.enrollmentStatus,
      row.enrollmentSource,
      `${row.progressPercent}%`,
      row.lessonsCompleted,
      row.totalLessons,
      row.assessmentStatus,
      row.certificateStatus,
      row.completedAt,
      row.followUpNeeded
    ]);

    const csv = generateCSV(headers, csvRows);
    const safeTitle = data.rows[0]?.batchTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || id;
    const filename = `Batch_Report_${safeTitle}_${new Date().toISOString().split('T')[0]}.csv`;

    return csvResponse(csv, filename);

  } catch (err: any) {
    console.error("Batch CSV error:", err);
    return new NextResponse("Failed to generate CSV", { status: 500 });
  }
}
