import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await requireAdminAPI();
  if (error) return error;

  const adminId = session.user.id;
  const { id: batchId } = await params;

  try {
    const batch = await prisma.trainingBatch.findUnique({
      where: { id: batchId },
      include: {
        participants: {
          where: {
            status: { not: "REMOVED" },
            userId: { not: null },
          },
        },
        courses: true,
      },
    });

    if (!batch) {
      return NextResponse.json({ error: "Batch tidak ditemukan." }, { status: 404 });
    }

    if (batch.participants.length === 0 || batch.courses.length === 0) {
      return NextResponse.json(
        { error: "Batch tidak memiliki peserta aktif yang terhubung dengan akun, atau tidak memiliki course." },
        { status: 400 }
      );
    }

    let revoked = 0;
    let skippedNoEnrollment = 0;
    let skippedPaid = 0;
    let skippedAlreadyRevoked = 0;
    const details = [];

    // Process each linked participant against each course
    for (const participant of batch.participants) {
      const userId = participant.userId as string;

      for (const batchCourse of batch.courses) {
        const courseId = batchCourse.courseId;

        const existing = await (prisma as any).enrollment.findUnique({
          where: { userId_courseId: { userId, courseId } },
        });

        if (!existing) {
          skippedNoEnrollment++;
          details.push({ participant: participant.name, courseId, status: "SKIPPED_NO_ENROLLMENT" });
          continue;
        }

        if (existing.source === "PAID") {
          skippedPaid++;
          details.push({ participant: participant.name, courseId, status: "SKIPPED_PAID" });
          continue;
        }

        if (existing.revokedAt !== null) {
          skippedAlreadyRevoked++;
          details.push({ participant: participant.name, courseId, status: "SKIPPED_ALREADY_REVOKED" });
          continue;
        }

        // Revoke ONLY if it is MANUAL or non-PAID active enrollment
        // Safety: We restrict to MANUAL specifically based on requirements to be safest.
        if (existing.source === "MANUAL") {
          await (prisma as any).enrollment.update({
            where: { id: existing.id },
            data: {
              revokedAt: new Date(),
              revokedByAdminId: adminId,
            },
          });
          revoked++;
          details.push({ participant: participant.name, courseId, status: "REVOKED" });
        } else {
           // E.g. FREE, UNKNOWN
           // Currently we leave them alone unless specified
           skippedNoEnrollment++; 
           details.push({ participant: participant.name, courseId, status: "SKIPPED_NOT_MANUAL" });
        }
      }
    }

    return NextResponse.json({
      ok: true,
      summary: {
        revoked,
        skippedNoEnrollment,
        skippedPaid,
        skippedAlreadyRevoked,
        totalProcessed: details.length,
      },
      details,
    });
  } catch (err: any) {
    console.error("Revoke access failed:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mencabut akses." },
      { status: 500 }
    );
  }
}
