import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { OrganizationForm } from "@/components/admin/OrganizationForm";

export const dynamic = "force-dynamic";

export default async function EditOrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const org = await prisma.organization.findUnique({ where: { id } });

  if (!org) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Organisasi Tidak Ditemukan</h1>
        <Link href="/admin/organizations" className="text-sm text-[#1E3A8A] font-semibold hover:underline">← Kembali</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href={`/admin/organizations/${org.id}`} className="text-sm text-black/50 hover:text-black">← {org.name}</Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Edit Organisasi</h1>

      <Card className="p-6 border-black/5">
        <OrganizationForm mode="edit" initialData={org} />
      </Card>
    </div>
  );
}
