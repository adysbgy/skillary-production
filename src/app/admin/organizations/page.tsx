import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function AdminOrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const params = await searchParams;
  const filterQ = params.q || "";

  const where: any = {};
  if (filterQ) {
    where.OR = [
      { name: { contains: filterQ } },
      { sector: { contains: filterQ } },
      { contactName: { contains: filterQ } },
      { contactEmail: { contains: filterQ } },
    ];
  }

  const organizations = await prisma.organization.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { batches: true } } },
    take: 200,
  });

  const totalOrgs = await prisma.organization.count();
  const withBatches = await prisma.organization.count({
    where: { batches: { some: {} } },
  });

  const summaryCards = [
    { label: "Total Organisasi", count: totalOrgs, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Dengan Batch", count: withBatches, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { label: "Baru Bulan Ini", count: organizations.filter((o) => {
      const now = new Date();
      const d = new Date(o.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length, color: "bg-violet-50 text-violet-700 border-violet-200" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.02em]">Organizations</h1>
          <p className="text-sm text-black/55 mt-1">Kelola organisasi dan client training Skillary.</p>
        </div>
        <Link
          href="/admin/organizations/new"
          className="text-sm font-medium px-5 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity shrink-0" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
        >
          + Organisasi Baru
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map((c) => (
          <Card key={c.label} className={`p-5 border ${c.color}`}>
            <h3 className="text-[9px] font-bold tracking-widest uppercase opacity-70 mb-0.5">{c.label}</h3>
            <p className="text-xl font-extrabold tracking-tight">{c.count}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <form className="flex gap-3 items-center" method="GET" action="/admin/organizations">
        <input
          name="q"
          defaultValue={filterQ}
          placeholder="Cari nama, sektor, kontak..."
          className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white w-64"
        />
        <button type="submit" className="text-sm font-medium px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
          Search
        </button>
        {filterQ && (
          <Link href="/admin/organizations" className="text-sm text-black/50 hover:text-[#FF8A00] underline">Reset</Link>
        )}
      </form>

      {/* Table */}
      {organizations.length > 0 ? (
        <Card className="p-0 overflow-hidden bg-white" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-black/[0.03]">
                  <th className="px-4 py-3 font-medium text-black/60">Nama</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden md:table-cell">Sektor</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden lg:table-cell">Contact</th>
                  <th className="px-4 py-3 font-medium text-black/60">Batches</th>
                  <th className="px-4 py-3 font-medium text-black/60 hidden md:table-cell">Dibuat</th>
                  <th className="px-4 py-3 font-medium text-black/60"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-black/90">{org.name}</div>
                    </td>
                    <td className="px-4 py-3 text-black/60 text-xs hidden md:table-cell">{org.sector || "—"}</td>
                    <td className="px-4 py-3 text-black/60 text-xs hidden lg:table-cell">
                      {org.contactName || org.contactEmail || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-black/80">{org._count.batches}</span>
                    </td>
                    <td className="px-4 py-3 text-black/50 text-xs whitespace-nowrap hidden md:table-cell">
                      {new Date(org.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/organizations/${org.id}`} className="text-xs font-semibold text-[#FF8A00] hover:underline">
                        Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center border border-dashed bg-[#FFFDF9]" style={{ borderColor: 'rgb(240, 217, 200)' }}>
          <p className="text-black/50">{filterQ ? "Tidak ada organisasi yang sesuai." : "Belum ada organisasi. Buat organisasi pertama Anda."}</p>
        </Card>
      )}
    </div>
  );
}
