import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TrainingBatchForm } from "@/components/admin/TrainingBatchForm";

export const dynamic = "force-dynamic";

export default async function NewBatchPage({
  searchParams,
}: {
  searchParams: Promise<{ organizationId?: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const params = await searchParams;
  const prefillOrgId = params.organizationId || "";

  const organizations = await prisma.organization.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  if (organizations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/admin/batches" className="text-sm text-black/50 hover:text-black">← Batches</Link>
        <h1 className="text-3xl font-semibold tracking-[-0.02em]">Training Batch Baru</h1>
        <Card className="p-10 text-center border border-dashed border-black/10 bg-[#FFFDF9]">
          <p className="text-black/60 mb-3">Buat organisasi terlebih dahulu sebelum membuat batch training.</p>
          <Link
            href="/admin/organizations/new"
            className="text-sm font-medium px-5 py-2.5 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            + Buat Organisasi
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link href="/admin/batches" className="text-sm text-black/50 hover:text-black">← Batches</Link>
      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Training Batch Baru</h1>
      <Card className="p-6 border-black/5">
        <TrainingBatchForm
          mode="create"
          organizations={organizations}
          defaultOrganizationId={prefillOrgId}
        />
      </Card>
    </div>
  );
}
