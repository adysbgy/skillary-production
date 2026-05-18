import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BatchParticipantsPanel } from "@/components/admin/BatchParticipantsPanel";
import { BatchCoursesPanel } from "@/components/admin/BatchCoursesPanel";
import { BatchAccessControlPanel } from "@/components/admin/BatchAccessControlPanel";
import { BatchReportPanel } from "@/components/admin/BatchReportPanel";
import { getBatchReportData } from "@/lib/batch-report";
import {
  BATCH_STATUS_LABELS, BATCH_STATUS_COLORS,
  BATCH_FORMAT_LABELS,
  type BatchStatus, type BatchFormat,
} from "@/lib/batch-constants";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function AdminBatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const batch = await prisma.trainingBatch.findUnique({
    where: { id },
    include: {
      organization: { select: { id: true, name: true, sector: true } },
      participants: { select: { status: true, userId: true } },
      _count: { select: { courses: true } },
    },
  });

  if (!batch) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Batch Tidak Ditemukan</h1>
        <Link href="/admin/batches" className="text-sm text-[#1E3A8A] font-semibold hover:underline">← Kembali</Link>
      </div>
    );
  }

  const reportData = await getBatchReportData(id);

  const statusColor = BATCH_STATUS_COLORS[batch.status as BatchStatus] || "bg-gray-100 text-gray-600";
  const activeParticipants = batch.participants.filter((p) => p.status !== "REMOVED");
  const linkedParticipants = activeParticipants.filter((p) => p.userId !== null);

  const readiness = {
    hasOrg: !!batch.organization,
    hasParticipants: activeParticipants.length > 0,
    hasCourses: batch._count.courses > 0,
    hasLinkedUsers: linkedParticipants.length > 0,
    hasAccess: reportData ? reportData.summary.activeEnrollments > 0 : false,
    hasReport: reportData ? reportData.summary.averageProgress > 0 || reportData.summary.certificatesIssued > 0 : false,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 flex-wrap">
        <Link href="/admin/batches" className="text-sm text-black/50 hover:text-black">← Batches</Link>
        <span className="text-black/20">·</span>
        <Link href={`/admin/organizations/${batch.organization.id}`} className="text-sm text-black/50 hover:text-black">
          {batch.organization.name}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-semibold tracking-[-0.02em]">{batch.title}</h1>
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor}`}>
            {BATCH_STATUS_LABELS[batch.status as BatchStatus] || batch.status}
          </span>
        </div>
        <Link
          href={`/admin/batches/${batch.id}/edit`}
          className="text-sm font-medium px-4 py-2 bg-black/5 border border-black/10 rounded-lg hover:bg-black/10 transition-colors shrink-0"
        >
          Edit
        </Link>
      </div>

      {/* Readiness Checklist */}
      <Card className="p-5 border-black/5 bg-[#FFFDF9]">
        <h2 className="text-sm font-semibold tracking-tight mb-4">Batch Readiness</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
          <div className="flex gap-2">
            <span className={readiness.hasParticipants ? "text-emerald-600" : "text-black/30"}>{readiness.hasParticipants ? "✅" : "⚪️"}</span>
            <div>
              <p className={`text-xs font-medium ${readiness.hasParticipants ? "text-black/80" : "text-black/50"}`}>Peserta</p>
              <p className="text-[10px] text-black/40 mt-0.5">{readiness.hasParticipants ? `${activeParticipants.length} aktif` : "Tambahkan minimal satu peserta"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={readiness.hasCourses ? "text-emerald-600" : "text-black/30"}>{readiness.hasCourses ? "✅" : "⚪️"}</span>
            <div>
              <p className={`text-xs font-medium ${readiness.hasCourses ? "text-black/80" : "text-black/50"}`}>Courses</p>
              <p className="text-[10px] text-black/40 mt-0.5">{readiness.hasCourses ? `${batch._count.courses} assigned` : "Assign minimal satu course"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={readiness.hasLinkedUsers ? "text-emerald-600" : "text-black/30"}>{readiness.hasLinkedUsers ? "✅" : "⚪️"}</span>
            <div>
              <p className={`text-xs font-medium ${readiness.hasLinkedUsers ? "text-black/80" : "text-black/50"}`}>Akun Linked</p>
              <p className="text-[10px] text-black/40 mt-0.5">{readiness.hasLinkedUsers ? `${linkedParticipants.length} terhubung` : "Peserta butuh akun"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={readiness.hasAccess ? "text-emerald-600" : "text-black/30"}>{readiness.hasAccess ? "✅" : "⚪️"}</span>
            <div>
              <p className={`text-xs font-medium ${readiness.hasAccess ? "text-black/80" : "text-black/50"}`}>Akses Belajar</p>
              <p className="text-[10px] text-black/40 mt-0.5">{readiness.hasAccess ? "Akses telah diberikan" : "Gunakan fitur Grant Access"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={readiness.hasReport ? "text-emerald-600" : "text-black/30"}>{readiness.hasReport ? "✅" : "⚪️"}</span>
            <div>
              <p className={`text-xs font-medium ${readiness.hasReport ? "text-black/80" : "text-black/50"}`}>Progress & Report</p>
              <p className="text-[10px] text-black/40 mt-0.5">{readiness.hasReport ? "Data pembelajaran tersedia" : "Menunggu peserta belajar"}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-black/5 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3">Detail Batch</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Organisasi</p>
                <Link href={`/admin/organizations/${batch.organization.id}`} className="text-[#1E3A8A] hover:underline font-medium">
                  {batch.organization.name}
                </Link>
                {batch.organization.sector && (
                  <p className="text-xs text-black/40 mt-0.5">{batch.organization.sector}</p>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Format</p>
                <p className="text-black/90 font-medium">{BATCH_FORMAT_LABELS[batch.format as BatchFormat] || batch.format}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Tanggal Mulai</p>
                <p className="text-black/90">{fmtDate(batch.startDate)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Tanggal Selesai</p>
                <p className="text-black/90">{fmtDate(batch.endDate)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Dibuat</p>
                <p className="text-black/90">{fmtDate(batch.createdAt)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Terakhir Diperbarui</p>
                <p className="text-black/90">{fmtDate(batch.updatedAt)}</p>
              </div>
            </div>
            {batch.description && (
              <div className="pt-3 border-t border-black/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-2">Deskripsi</p>
                <p className="text-sm text-black/80 leading-relaxed whitespace-pre-wrap">{batch.description}</p>
              </div>
            )}
            {batch.notes && (
              <div className="pt-3 border-t border-black/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-2">Catatan</p>
                <p className="text-sm text-black/80 leading-relaxed whitespace-pre-wrap">{batch.notes}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Right sidebar: Counts & Actions */}
        <div className="space-y-4">
          <Card className="p-0 border-black/5">
            <BatchAccessControlPanel
              batchId={batch.id}
              totalActiveParticipants={activeParticipants.length}
              linkedParticipantsCount={linkedParticipants.length}
              courseCount={batch._count.courses}
            />
          </Card>
        </div>
      </div>

      {/* Real Sections */}
      <div className="space-y-8">
        <Card className="p-6 border-black/5 shadow-sm">
          <BatchParticipantsPanel batchId={batch.id} />
        </Card>

        <Card className="p-6 border-black/5 shadow-sm">
          <BatchCoursesPanel batchId={batch.id} />
        </Card>
      </div>

      {/* Report Section */}
      {reportData && (
        <div className="space-y-6 pt-4 border-t border-black/5">
          <Card className="p-6 border-black/5 shadow-sm">
            <BatchReportPanel
              batchId={batch.id}
              summary={reportData.summary}
              previewRows={reportData.rows.slice(0, 10)}
            />
          </Card>
        </div>
      )}

    </div>
  );
}
