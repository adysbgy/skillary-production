import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, type LeadStatus } from "@/lib/lead-constants";
import { LeadStatusForm } from "@/components/admin/LeadStatusForm";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });

  if (!lead) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Lead Tidak Ditemukan</h1>
        <Link href="/admin/leads" className="text-sm text-[#1E3A8A] font-semibold hover:underline">← Kembali ke Lead CRM</Link>
      </div>
    );
  }

  const statusColor = LEAD_STATUS_COLORS[lead.status as LeadStatus] || "bg-gray-100 text-gray-600";
  const isArchived = !!lead.archivedAt;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 flex-wrap">
        <Link href="/admin/leads" className="text-sm text-black/50 hover:text-black">← Lead CRM</Link>
        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor}`}>
          {LEAD_STATUS_LABELS[lead.status as LeadStatus] || lead.status}
        </span>
        {isArchived && (
          <span className="text-[10px] font-bold bg-black/10 text-black/50 px-2 py-1 rounded-full uppercase">Archived</span>
        )}
      </div>

      <h1 className="text-3xl font-semibold tracking-[-0.02em]">{lead.name}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Lead Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-black/5 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3">Informasi Kontak</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Email</p>
                <p className="text-black/90">{lead.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">WhatsApp</p>
                <p className="text-black/90">{lead.whatsapp || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Organisasi</p>
                <p className="text-black/90">{lead.organization || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Jabatan</p>
                <p className="text-black/90">{lead.role || "—"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-black/5 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3">Detail Kebutuhan</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Jenis Kebutuhan</p>
                <p className="text-black/90">{lead.inquiryType}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Program Interest</p>
                <p className="text-black/90">{lead.programInterest || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Source Page</p>
                <p className="text-black/90">{lead.sourcePage || "direct"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Tanggal Masuk</p>
                <p className="text-black/90">{fmtDate(lead.createdAt)}</p>
              </div>
            </div>
          </Card>

          {/* Lifecycle Timestamps */}
          <Card className="p-6 border-black/5 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3">Timeline</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Last Contacted</p>
                <p className="text-black/90">{fmtDate(lead.lastContactedAt)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Proposal Sent</p>
                <p className="text-black/90">{fmtDate(lead.proposalSentAt)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Won</p>
                <p className="text-black/90">{fmtDate(lead.wonAt)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Lost</p>
                <p className="text-black/90">{fmtDate(lead.lostAt)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-black/5">
            <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3 mb-4">Pesan</h2>
            <p className="text-sm text-black/80 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
          </Card>
        </div>

        {/* Right: Status & Notes */}
        <div className="lg:col-span-1">
          <Card className="p-6 border-black/5 sticky top-24">
            <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3 mb-5">Update Status</h2>
            <LeadStatusForm
              leadId={lead.id}
              currentStatus={lead.status}
              currentNotes={lead.notes}
              isArchived={isArchived}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
