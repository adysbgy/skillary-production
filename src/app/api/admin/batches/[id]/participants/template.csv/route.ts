import { requireAdminAPI } from "@/lib/auth-guards";

export async function GET() {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const csvContent = `name,email,whatsapp,role,notes
Budi Santoso,budi@example.com,08123456789,Staff Finance,Contoh baris template`;

  return new Response(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="skillary-batch-participants-template.csv"',
    },
  });
}
