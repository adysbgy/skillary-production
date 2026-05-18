import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { parseCSV, mapRowsToObjects, validateRequiredHeaders } from "@/lib/csv-import";
import { batchParticipantCreateSchema, normalizeEmail } from "@/lib/batch-constants";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId } = await params;

  try {
    const batch = await prisma.trainingBatch.findUnique({
      where: { id: batchId },
      select: { id: true },
    });

    if (!batch) {
      return NextResponse.json({ error: "Batch tidak ditemukan." }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "File CSV tidak ditemukan." }, { status: 400 });
    }

    const csvText = await file.text();
    const rawRows = parseCSV(csvText);

    if (rawRows.length < 2) {
      return NextResponse.json({ error: "File CSV kosong atau tidak memiliki data." }, { status: 400 });
    }

    const headers = rawRows[0];
    const dataRows = rawRows.slice(1);

    if (!validateRequiredHeaders(headers, ["name", "email"])) {
      return NextResponse.json({ error: "Header CSV harus memiliki kolom 'name' dan 'email'." }, { status: 400 });
    }

    if (dataRows.length > 500) {
      return NextResponse.json({ error: "Maksimal 500 baris dalam satu kali import." }, { status: 400 });
    }

    const mappedData = mapRowsToObjects(headers, dataRows);
    
    // Existing DB check
    const existingParticipants = await prisma.batchParticipant.findMany({
      where: { batchId },
      select: { email: true },
    });
    const existingEmails = new Set(existingParticipants.map(p => p.email.toLowerCase()));

    let created = 0;
    let linkedUsers = 0;
    let skippedDuplicates = 0;
    let skippedExisting = 0;
    let invalidRows = 0;
    const errors: Array<{ row: number; email: string; reason: string }> = [];

    const processedEmailsInCsv = new Set<string>();

    for (let i = 0; i < mappedData.length; i++) {
      const rowObj = mappedData[i];
      const rowNum = i + 2; // +1 for 0-index, +1 for header
      
      const rawEmail = rowObj.email || "";
      const rawName = rowObj.name || "";
      const email = normalizeEmail(rawEmail);

      if (!email) {
        invalidRows++;
        errors.push({ row: rowNum, email: "KOSONG", reason: "Email wajib diisi" });
        continue;
      }

      if (processedEmailsInCsv.has(email)) {
        skippedDuplicates++;
        continue;
      }
      processedEmailsInCsv.add(email);

      if (existingEmails.has(email)) {
        skippedExisting++;
        continue;
      }

      const parsed = batchParticipantCreateSchema.safeParse({
        name: rawName,
        email,
        whatsapp: rowObj.whatsapp,
        role: rowObj.role,
        notes: rowObj.notes,
        status: "INVITED",
      });

      if (!parsed.success) {
        invalidRows++;
        errors.push({ row: rowNum, email, reason: parsed.error.issues[0]?.message || "Data tidak valid" });
        continue;
      }

      const data = parsed.data;

      // Check if user account exists
      const existingUser = await prisma.user.findUnique({ where: { email } });

      await prisma.batchParticipant.create({
        data: {
          batchId,
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp || null,
          role: data.role || null,
          notes: data.notes || null,
          status: data.status,
          userId: existingUser?.id || null,
          invitedAt: new Date(),
        },
      });

      created++;
      if (existingUser) linkedUsers++;
    }

    return NextResponse.json({
      ok: true,
      totalRows: dataRows.length,
      created,
      linkedUsers,
      skippedDuplicates,
      skippedExisting,
      invalidRows,
      errors,
    });
  } catch (err: any) {
    console.error("Batch participant import error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses import." }, { status: 500 });
  }
}
