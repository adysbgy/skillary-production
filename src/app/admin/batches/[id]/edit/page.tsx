import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TrainingBatchForm } from "@/components/admin/TrainingBatchForm";

export const dynamic = "force-dynamic";

export default async function EditBatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const batch = await prisma.trainingBatch.findUnique({ where: { id } });

  if (!batch) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Batch Tidak Ditemukan</h1>
        <Link href="/admin/batches" className="text-sm text-[#1E3A8A] font-semibold hover:underline">← Kembali</Link>
      </div>
    );
  }

  const organizations = await prisma.organization.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href={`/admin/batches/${batch.id}`} className="text-sm text-black/50 hover:text-black">← {batch.title}</Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Edit Training Batch</h1>

      <Card className="p-6 border-black/5">
        <TrainingBatchForm
          mode="edit"
          organizations={organizations}
          initialData={{
            id: batch.id,
            organizationId: batch.organizationId,
            title: batch.title,
            description: batch.description,
            format: batch.format,
            status: batch.status,
            startDate: batch.startDate ? batch.startDate.toISOString() : null,
            endDate: batch.endDate ? batch.endDate.toISOString() : null,
            notes: batch.notes,
          }}
        />
      </Card>
    </div>
  );
}
