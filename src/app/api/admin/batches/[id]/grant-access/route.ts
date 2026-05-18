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

    let created = 0;
    let reactivated = 0;
    let skippedExisting = 0;
    let skippedPaid = 0;
    const details = [];

    // Process each linked participant against each course
    for (const participant of batch.participants) {
      const userId = participant.userId as string;

      for (const batchCourse of batch.courses) {
        const courseId = batchCourse.courseId;

        const existing = await (prisma as any).enrollment.findUnique({
          where: { userId_courseId: { userId, courseId } },
        });

        if (existing) {
          if (existing.source === "PAID") {
            skippedPaid++;
            details.push({ participant: participant.name, courseId, status: "SKIPPED_PAID" });
            continue;
          }

          if (existing.revokedAt === null) {
            skippedExisting++;
            details.push({ participant: participant.name, courseId, status: "SKIPPED_ALREADY_ENROLLED" });
            continue;
          }

          // Reactivate revoked enrollment
          await (prisma as any).enrollment.update({
            where: { id: existing.id },
            data: {
              source: "MANUAL",
              grantedByAdminId: adminId,
              revokedAt: null,
              revokedByAdminId: null,
            },
          });
          reactivated++;
          details.push({ participant: participant.name, courseId, status: "REACTIVATED" });
        } else {
          // Create new enrollment
          await (prisma as any).enrollment.create({
            data: {
              userId,
              courseId,
              source: "MANUAL",
              grantedByAdminId: adminId,
            },
          });
          created++;
          details.push({ participant: participant.name, courseId, status: "CREATED" });
        }
      }
    }

    // After granting access, ideally we might want to update batch status to ACTIVE
    // but that should probably remain a manual step for now.

    return NextResponse.json({
      ok: true,
      summary: {
        created,
        reactivated,
        skippedExisting,
        skippedPaid,
        totalProcessed: details.length,
      },
      details,
    });
  } catch (err: any) {
    console.error("Grant access failed:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memberikan akses." },
      { status: 500 }
    );
  }
}
