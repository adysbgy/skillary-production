import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BATCH_STATUS_LABELS, BATCH_STATUS_COLORS, BATCH_FORMAT_LABELS, type BatchStatus, type BatchFormat } from "@/lib/batch-constants";
import { getOrganizationDashboardData } from "@/lib/organization-dashboard";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function AdminOrganizationDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const dashboard = await getOrganizationDashboardData(id);

  if (!dashboard) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Organisasi Tidak Ditemukan</h1>
        <Link href="/admin/organizations" className="text-sm text-[#1E3A8A] font-semibold hover:underline">← Kembali</Link>
      </div>
    );
  }

  const { organization: org, summary, batchSummaries, followUpItems, totalFollowUpItemsCount } = dashboard;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4 flex-wrap">
        <Link href="/admin/organizations" className="text-sm text-black/50 hover:text-black">← Organizations</Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.02em]">{org.name}</h1>
          <p className="text-sm text-black/50 mt-1">{org.sector || "Sektor tidak ditentukan"} • Dibuat {fmtDate(org.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/organizations/${org.id}/edit`}
            className="text-sm font-medium px-4 py-2 bg-black/5 border border-black/10 rounded-lg hover:bg-black/10 transition-colors shrink-0"
          >
            Edit Info
          </Link>
          <Link
            href={`/admin/batches/new?organizationId=${org.id}`}
            className="text-sm font-medium px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors shrink-0"
          >
            + Buat Batch
          </Link>
        </div>
      </div>

      {org.contactName || org.contactEmail ? (
        <div className="bg-black/[0.02] border border-black/5 rounded-xl p-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {org.contactName && <div><span className="text-black/50">Contact:</span> <span className="font-medium">{org.contactName}</span></div>}
          {org.contactEmail && <div><span className="text-black/50">Email:</span> <span className="font-medium">{org.contactEmail}</span></div>}
          {org.contactWhatsapp && <div><span className="text-black/50">WA:</span> <span className="font-medium">{org.contactWhatsapp}</span></div>}
        </div>
      ) : null}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4 border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Total Batches</p>
          <p className="text-2xl font-extrabold">{summary.totalBatches}</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">{summary.activeBatches} Active</p>
        </Card>
        <Card className="p-4 border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Peserta</p>
          <p className="text-2xl font-extrabold">{summary.totalParticipants}</p>
          <p className="text-xs text-black/40 mt-1">{summary.linkedParticipants} linked</p>
        </Card>
        <Card className="p-4 border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Assigned Courses</p>
          <p className="text-2xl font-extrabold">{summary.assignedCourses}</p>
        </Card>
        <Card className="p-4 border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Avg Progress</p>
          <p className="text-2xl font-extrabold">{summary.averageProgress}%</p>
        </Card>
        <Card className="p-4 border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Sertifikat</p>
          <p className="text-2xl font-extrabold text-blue-700">{summary.certificatesIssued}</p>
        </Card>
        <Card className="p-4 border-orange-100 bg-orange-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-800/50 mb-1">Follow-up</p>
          <p className="text-2xl font-extrabold text-orange-700">{summary.followUpNeededCount}</p>
        </Card>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Batches Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Batch Performance</h2>
          
          {batchSummaries.length > 0 ? (
            <Card className="p-0 overflow-hidden border-black/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/[0.03] border-b border-black/5">
                    <tr>
                      <th className="px-4 py-3 font-medium text-black/60">Batch</th>
                      <th className="px-4 py-3 font-medium text-black/60">Status</th>
                      <th className="px-4 py-3 font-medium text-black/60 text-right">Peserta</th>
                      <th className="px-4 py-3 font-medium text-black/60 text-right">Progress</th>
                      <th className="px-4 py-3 font-medium text-black/60"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 bg-white">
                    {batchSummaries.map((b) => {
                      const statusColor = BATCH_STATUS_COLORS[b.status as BatchStatus] || "bg-gray-100 text-gray-600";
                      return (
                        <tr key={b.batchId} className="hover:bg-black/[0.01]">
                          <td className="px-4 py-3">
                            <Link href={`/admin/batches/${b.batchId}`} className="font-medium text-black/90 hover:text-[#1E3A8A] hover:underline">
                              {b.title}
                            </Link>
                            <div className="text-[10px] text-black/40 mt-0.5">{BATCH_FORMAT_LABELS[b.format as BatchFormat] || b.format}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor}`}>
                              {BATCH_STATUS_LABELS[b.status as BatchStatus] || b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-medium">{b.participantCount}</span>
                            <span className="text-[10px] text-black/40 block">({b.linkedParticipantCount} linked)</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-medium">{b.averageProgress}%</span>
                            <span className="text-[10px] text-orange-600 block">{b.followUpNeededCount} alerts</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link href={`/admin/batches/${b.batchId}`} className="text-xs font-semibold text-[#1E3A8A] hover:underline">
                              Manage →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center border border-dashed border-black/10 bg-[#FFFDF9]">
              <p className="text-black/50 mb-4">Belum ada training batch untuk organisasi ini.</p>
              <Link
                href={`/admin/batches/new?organizationId=${org.id}`}
                className="text-sm font-medium px-5 py-2.5 bg-black text-white rounded-lg hover:bg-black/80 transition-colors inline-block"
              >
                + Buat Batch Pertama
              </Link>
            </Card>
          )}
        </div>

        {/* Right Col: Follow-ups */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Perlu Perhatian</h2>
            {totalFollowUpItemsCount > 10 && (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">10 dari {totalFollowUpItemsCount}</span>
            )}
          </div>

          {followUpItems.length > 0 ? (
            <div className="space-y-3">
              {followUpItems.map((item, idx) => (
                <Card key={idx} className="p-3 border-orange-100 bg-orange-50/50">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-xs font-bold text-black/80">{item.participantName}</p>
                      <p className="text-[10px] text-black/50 truncate max-w-[150px]">{item.courseTitle}</p>
                    </div>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-orange-100 text-orange-800">
                      {item.reason}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] flex items-center justify-between">
                    <span className="text-black/40 truncate">Batch: {item.batchTitle}</span>
                    <Link href={`/admin/batches/${item.batchId}`} className="text-[#1E3A8A] font-medium hover:underline ml-2">
                      Review
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center border border-dashed border-black/10 bg-[#FFFDF9]">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-sm text-black/60 font-medium">Semua Terkendali</p>
              <p className="text-xs text-black/40 mt-1">Tidak ada peserta yang memerlukan tindak lanjut saat ini.</p>
            </Card>
          )}

          {org.notes && (
            <div className="pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2">Catatan Internal</h3>
              <p className="text-sm text-black/70 leading-relaxed whitespace-pre-wrap">{org.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
