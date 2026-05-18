import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, INQUIRY_TYPE_OPTIONS, type LeadStatus } from "@/lib/lead-constants";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; inquiryType?: string; q?: string; includeArchived?: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const params = await searchParams;
  const filterStatus = params.status || "";
  const filterInquiry = params.inquiryType || "";
  const filterQ = params.q || "";
  const showArchived = params.includeArchived === "true";

  const where: any = {};
  if (filterStatus) where.status = filterStatus;
  if (filterInquiry) where.inquiryType = filterInquiry;
  if (!showArchived) where.archivedAt = null;
  if (filterQ) {
    where.OR = [
      { name: { contains: filterQ } },
      { email: { contains: filterQ } },
      { organization: { contains: filterQ } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  // --- Summary counts (active only) ---
  const activeLeads = await prisma.lead.findMany({
    where: { archivedAt: null },
    select: { status: true, inquiryType: true, sourcePage: true, programInterest: true },
  });
  const statusCounts: Record<string, number> = {};
  const inquiryCounts: Record<string, number> = {};
  const sourceCounts: Record<string, number> = {};
  const programCounts: Record<string, number> = {};

  for (const l of activeLeads) {
    statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
    inquiryCounts[l.inquiryType] = (inquiryCounts[l.inquiryType] || 0) + 1;
    const src = l.sourcePage || "direct";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    if (l.programInterest) {
      programCounts[l.programInterest] = (programCounts[l.programInterest] || 0) + 1;
    }
  }
  const totalActive = activeLeads.length;
  const totalArchived = await prisma.lead.count({ where: { archivedAt: { not: null } } });

  const summaryCards = [
    { label: "New", status: "NEW", count: statusCounts["NEW"] || 0, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Contacted", status: "CONTACTED", count: statusCounts["CONTACTED"] || 0, color: "bg-sky-50 text-sky-700 border-sky-200" },
    { label: "Proposal Needed", status: "PROPOSAL_NEEDED", count: statusCounts["PROPOSAL_NEEDED"] || 0, color: "bg-orange-50 text-orange-700 border-orange-200" },
    { label: "Proposal Sent", status: "PROPOSAL_SENT", count: statusCounts["PROPOSAL_SENT"] || 0, color: "bg-violet-50 text-violet-700 border-violet-200" },
    { label: "Won", status: "WON", count: statusCounts["WON"] || 0, color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Total Active", status: "", count: totalActive, color: "bg-black/5 text-black border-black/10" },
  ];

  // Top sources & programs (max 5 each, sorted desc)
  const topSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topPrograms = Object.entries(programCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const inquiryBreakdown = Object.entries(inquiryCounts).sort((a, b) => b[1] - a[1]);

  // Build export URL with current filters
  const exportParams = new URLSearchParams();
  if (filterStatus) exportParams.set("status", filterStatus);
  if (filterInquiry) exportParams.set("inquiryType", filterInquiry);
  if (filterQ) exportParams.set("q", filterQ);
  if (showArchived) exportParams.set("includeArchived", "true");
  const exportUrl = `/api/admin/leads/export${exportParams.toString() ? `?${exportParams.toString()}` : ""}`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.02em]">Lead CRM</h1>
          <p className="text-sm text-black/55 mt-1">Kelola inquiry dan prospek dari formulir kontak website.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-black/40">{totalActive} active · {totalArchived} archived</span>
          <a
            href={exportUrl}
            className="text-sm font-medium px-4 py-2 bg-black/5 border border-black/10 rounded-lg hover:bg-black/10 transition-colors"
          >
            Export CSV
          </a>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {summaryCards.map((c) => (
          <Link key={c.label} href={c.status ? `/admin/leads?status=${c.status}` : "/admin/leads"}>
            <Card className={`p-4 border ${c.color} hover:shadow-md transition-shadow cursor-pointer`}>
              <h3 className="text-[9px] font-bold tracking-widest uppercase opacity-70 mb-0.5">{c.label}</h3>
              <p className="text-xl font-extrabold tracking-tight">{c.count}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Analytics Row */}
      {totalActive > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Inquiry Breakdown */}
          <Card className="p-5 border-black/5">
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-3">By Inquiry Type</h3>
            <div className="space-y-2">
              {inquiryBreakdown.map(([type, count]) => (
                <div key={type} className="flex items-center justify-between text-sm">
                  <span className="text-black/70 truncate mr-2">{type}</span>
                  <span className="font-semibold text-black/90 shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Sources */}
          <Card className="p-5 border-black/5">
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-3">Top Source Pages</h3>
            {topSources.length > 0 ? (
              <div className="space-y-2">
                {topSources.map(([src, count]) => (
                  <div key={src} className="flex items-center justify-between text-sm">
                    <span className="text-black/70 truncate mr-2">{src}</span>
                    <span className="font-semibold text-black/90 shrink-0">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-black/40">No data</p>
            )}
          </Card>

          {/* Top Programs */}
          <Card className="p-5 border-black/5">
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-3">Top Programs</h3>
            {topPrograms.length > 0 ? (
              <div className="space-y-2">
                {topPrograms.map(([prog, count]) => (
                  <div key={prog} className="flex items-center justify-between text-sm">
                    <span className="text-black/70 truncate mr-2">{prog}</span>
                    <span className="font-semibold text-black/90 shrink-0">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-black/40">No program interest data yet</p>
            )}
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <form className="flex flex-wrap gap-3 items-center" method="GET" action="/admin/leads">
          <select name="status" defaultValue={filterStatus} className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white">
            <option value="">All Status</option>
            {Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select name="inquiryType" defaultValue={filterInquiry} className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white">
            <option value="">All Types</option>
            {INQUIRY_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input name="q" defaultValue={filterQ} placeholder="Search name/email/org..." className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white w-48" />
          <label className="flex items-center gap-1.5 text-sm text-black/60 cursor-pointer">
            <input type="checkbox" name="includeArchived" value="true" defaultChecked={showArchived} className="rounded" />
            Archived
          </label>
          <button type="submit" className="text-sm font-medium px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
            Filter
          </button>
          {(filterStatus || filterInquiry || filterQ || showArchived) && (
            <Link href="/admin/leads" className="text-sm text-black/50 hover:text-[#FF8A00] underline">Reset</Link>
          )}
        </form>
      </div>

      {/* Table */}
      {leads.length > 0 ? (
        <Card className="p-0 overflow-hidden bg-white" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-black/[0.03]">
                  <th className="px-4 py-3 font-medium text-black/60">Tanggal</th>
                  <th className="px-4 py-3 font-medium text-black/60">Nama</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden md:table-cell">Organisasi</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden lg:table-cell">Tipe</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden lg:table-cell">Source</th>
                  <th className="px-4 py-3 font-medium text-black/60">Status</th>
                  <th className="px-4 py-3 font-medium text-black/60"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {leads.map((lead: any) => {
                  const statusColor = LEAD_STATUS_COLORS[lead.status as LeadStatus] || "bg-gray-100 text-gray-600";
                  const isArchived = !!lead.archivedAt;
                  return (
                    <tr key={lead.id} className={`hover:bg-black/[0.02] transition-colors ${isArchived ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3 text-black/50 text-xs whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-black/90 flex items-center gap-1.5">
                          {lead.name}
                          {isArchived && <span className="text-[9px] font-bold bg-black/10 text-black/50 px-1.5 py-0.5 rounded uppercase">Archived</span>}
                        </div>
                        <div className="text-xs text-black/45">{lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-black/70 hidden md:table-cell">{lead.organization || "—"}</td>
                      <td className="px-4 py-3 text-black/70 text-xs hidden lg:table-cell">{lead.inquiryType}</td>
                      <td className="px-4 py-3 text-black/70 text-xs hidden lg:table-cell">{lead.sourcePage || "direct"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor}`}>
                          {LEAD_STATUS_LABELS[lead.status as LeadStatus] || lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/leads/${lead.id}`} className="text-xs font-semibold text-[#FF8A00] hover:underline">
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
          <p className="text-black/50">Belum ada lead yang sesuai filter.</p>
        </Card>
      )}
    </div>
  );
}
