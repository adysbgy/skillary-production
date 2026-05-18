import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  BATCH_STATUS_LABELS, BATCH_STATUS_COLORS, BATCH_STATUSES,
  BATCH_FORMAT_LABELS, BATCH_FORMATS,
  type BatchStatus, type BatchFormat,
} from "@/lib/batch-constants";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function AdminBatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; format?: string; organizationId?: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const params = await searchParams;
  const filterQ = params.q || "";
  const filterStatus = params.status || "";
  const filterFormat = params.format || "";
  const filterOrgId = params.organizationId || "";

  const where: any = {};
  if (filterStatus) where.status = filterStatus;
  if (filterFormat) where.format = filterFormat;
  if (filterOrgId) where.organizationId = filterOrgId;
  if (filterQ) {
    where.OR = [
      { title: { contains: filterQ } },
      { description: { contains: filterQ } },
      { organization: { name: { contains: filterQ } } },
    ];
  }

  const batches = await prisma.trainingBatch.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      organization: { select: { id: true, name: true } },
      _count: { select: { participants: true, courses: true } },
    },
    take: 200,
  });

  // Summary counts
  const allBatches = await prisma.trainingBatch.findMany({ select: { status: true } });
  const statusCounts: Record<string, number> = {};
  for (const b of allBatches) {
    statusCounts[b.status] = (statusCounts[b.status] || 0) + 1;
  }

  // Organization list for filter
  const organizations = await prisma.organization.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const summaryCards = [
    { label: "Total", count: allBatches.length, color: "bg-black/5 text-black border-black/10", filterVal: "" },
    { label: "Draft", count: statusCounts["DRAFT"] || 0, color: "bg-gray-50 text-gray-600 border-gray-200", filterVal: "DRAFT" },
    { label: "Active", count: statusCounts["ACTIVE"] || 0, color: "bg-emerald-50 text-emerald-700 border-emerald-200", filterVal: "ACTIVE" },
    { label: "Completed", count: statusCounts["COMPLETED"] || 0, color: "bg-blue-50 text-blue-700 border-blue-200", filterVal: "COMPLETED" },
    { label: "Archived", count: statusCounts["ARCHIVED"] || 0, color: "bg-black/5 text-black/50 border-black/10", filterVal: "ARCHIVED" },
  ];

  const hasFilters = filterQ || filterStatus || filterFormat || filterOrgId;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.02em]">Training Batches</h1>
          <p className="text-sm text-black/55 mt-1">Batch digunakan untuk mengelola pelatihan per organisasi, termasuk peserta, course, akses belajar, dan laporan.</p>
        </div>
        <Link
          href="/admin/batches/new"
          className="text-sm font-medium px-5 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity shrink-0" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
        >
          + Batch Baru
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {summaryCards.map((c) => (
          <Link key={c.label} href={c.filterVal ? `/admin/batches?status=${c.filterVal}` : "/admin/batches"}>
            <Card className={`p-4 border ${c.color} hover:shadow-md transition-shadow cursor-pointer`}>
              <h3 className="text-[9px] font-bold tracking-widest uppercase opacity-70 mb-0.5">{c.label}</h3>
              <p className="text-xl font-extrabold tracking-tight">{c.count}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 items-center" method="GET" action="/admin/batches">
        <input
          name="q"
          defaultValue={filterQ}
          placeholder="Cari judul/organisasi..."
          className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white w-48"
        />
        <select name="status" defaultValue={filterStatus} className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white">
          <option value="">All Status</option>
          {BATCH_STATUSES.map((s) => (
            <option key={s} value={s}>{BATCH_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <select name="format" defaultValue={filterFormat} className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white">
          <option value="">All Formats</option>
          {BATCH_FORMATS.map((f) => (
            <option key={f} value={f}>{BATCH_FORMAT_LABELS[f]}</option>
          ))}
        </select>
        <select name="organizationId" defaultValue={filterOrgId} className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white">
          <option value="">All Organizations</option>
          {organizations.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
        <button type="submit" className="text-sm font-medium px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
          Filter
        </button>
        {hasFilters && (
          <Link href="/admin/batches" className="text-sm text-black/50 hover:text-[#FF8A00] underline">Reset</Link>
        )}
      </form>

      {/* Table */}
      {batches.length > 0 ? (
        <Card className="p-0 overflow-hidden bg-white" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-black/[0.03]">
                  <th className="px-4 py-3 font-medium text-black/60">Batch</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden md:table-cell">Organisasi</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden lg:table-cell">Format</th>
                  <th className="px-4 py-3 font-medium text-black/60">Status</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden md:table-cell">Tanggal</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden lg:table-cell">Peserta</th>
                  <th className="px-4 py-3 font-medium text-black/60"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {batches.map((batch: any) => {
                  const statusColor = BATCH_STATUS_COLORS[batch.status as BatchStatus] || "bg-gray-100 text-gray-600";
                  return (
                    <tr key={batch.id} className="hover:bg-black/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-black/90">{batch.title}</div>
                        <div className="text-xs text-black/45">{batch._count.courses} course(s)</div>
                      </td>
                      <td className="px-4 py-3 text-black/70 text-xs hidden md:table-cell">{batch.organization.name}</td>
                      <td className="px-4 py-3 text-black/60 text-xs hidden lg:table-cell">
                        {BATCH_FORMAT_LABELS[batch.format as BatchFormat] || batch.format}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor}`}>
                          {BATCH_STATUS_LABELS[batch.status as BatchStatus] || batch.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-black/50 text-xs whitespace-nowrap hidden md:table-cell">
                        {batch.startDate ? fmtDate(batch.startDate) : "—"}
                      </td>
                      <td className="px-4 py-3 text-black/80 hidden lg:table-cell">{batch._count.participants}</td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/batches/${batch.id}`} className="text-xs font-semibold text-[#FF8A00] hover:underline">
                          Detail →
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
        <Card className="p-12 text-center border border-dashed bg-[#FFFDF9]" style={{ borderColor: 'rgb(240, 217, 200)' }}>
          <p className="text-black/50 mb-4">{hasFilters ? "Tidak ada batch yang sesuai filter." : "Belum ada training batch untuk organisasi."}</p>
          {!hasFilters && (
            <Link
              href="/admin/batches/new"
              className="text-sm font-medium px-5 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            >
              + Buat Batch Pertama
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}
