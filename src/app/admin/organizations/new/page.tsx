import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { OrganizationForm } from "@/components/admin/OrganizationForm";

export const dynamic = "force-dynamic";

export default async function NewOrganizationPage() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/organizations" className="text-sm text-black/50 hover:text-black">← Organizations</Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Organisasi Baru</h1>

      <Card className="p-6 border-black/5">
        <OrganizationForm mode="create" />
      </Card>
    </div>
  );
}
