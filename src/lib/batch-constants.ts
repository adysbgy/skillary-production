import { z } from "zod";

// --- Organization ---

export const ORGANIZATION_SECTOR_SUGGESTIONS = [
  "Perusahaan / Korporasi",
  "Pendidikan / Yayasan",
  "Lembaga Keuangan",
  "Instansi / Pemerintahan",
  "Komunitas Profesional",
  "Lainnya",
] as const;

export const organizationCreateSchema = z.object({
  name: z.string().trim().min(2, "Nama organisasi minimal 2 karakter").max(200),
  sector: z.string().trim().max(120).optional().default(""),
  contactName: z.string().trim().max(120).optional().default(""),
  contactEmail: z
    .string()
    .trim()
    .max(180)
    .optional()
    .default("")
    .refine((v) => !v || z.string().email().safeParse(v).success, {
      message: "Format email tidak valid",
    }),
  contactWhatsapp: z.string().trim().max(80).optional().default(""),
  notes: z.string().trim().max(5000).optional().default(""),
});

export const organizationUpdateSchema = organizationCreateSchema.partial();

// --- Training Batch ---

export const BATCH_FORMATS = ["ONLINE", "OFFLINE", "HYBRID"] as const;
export type BatchFormat = (typeof BATCH_FORMATS)[number];

export const BATCH_FORMAT_LABELS: Record<BatchFormat, string> = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  HYBRID: "Hybrid",
};

export const BATCH_STATUSES = [
  "DRAFT",
  "ACTIVE",
  "COMPLETED",
  "ARCHIVED",
] as const;
export type BatchStatus = (typeof BATCH_STATUSES)[number];

export const BATCH_STATUS_LABELS: Record<BatchStatus, string> = {
  DRAFT: "Draft",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

export const BATCH_STATUS_COLORS: Record<BatchStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-600",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  ARCHIVED: "bg-black/10 text-black/50",
};

// --- Batch Participant ---

export const PARTICIPANT_STATUSES = [
  "INVITED",
  "JOINED",
  "COMPLETED",
  "NEEDS_FOLLOW_UP",
  "REMOVED",
] as const;
export type ParticipantStatus = (typeof PARTICIPANT_STATUSES)[number];

export const PARTICIPANT_STATUS_LABELS: Record<ParticipantStatus, string> = {
  INVITED: "Invited",
  JOINED: "Joined",
  COMPLETED: "Completed",
  NEEDS_FOLLOW_UP: "Perlu Follow-up",
  REMOVED: "Removed",
};

export const PARTICIPANT_STATUS_COLORS: Record<ParticipantStatus, string> = {
  INVITED: "bg-amber-100 text-amber-700",
  JOINED: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  NEEDS_FOLLOW_UP: "bg-orange-100 text-orange-700",
  REMOVED: "bg-red-100 text-red-600",
};

// --- Training Batch Validation ---

export const trainingBatchCreateSchema = z
  .object({
    organizationId: z.string().min(1, "Organisasi wajib dipilih"),
    title: z.string().trim().min(2, "Judul minimal 2 karakter").max(200),
    description: z.string().trim().max(5000).optional().default(""),
    format: z
      .string()
      .optional()
      .default("ONLINE")
      .refine((v) => BATCH_FORMATS.includes(v as BatchFormat), {
        message: "Format tidak valid",
      }),
    status: z
      .string()
      .optional()
      .default("DRAFT")
      .refine((v) => BATCH_STATUSES.includes(v as BatchStatus), {
        message: "Status tidak valid",
      }),
    startDate: z
      .string()
      .optional()
      .default("")
      .transform((v) => (v ? v : null)),
    endDate: z
      .string()
      .optional()
      .default("")
      .transform((v) => (v ? v : null)),
    notes: z.string().trim().max(5000).optional().default(""),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    { message: "Tanggal selesai tidak boleh sebelum tanggal mulai", path: ["endDate"] }
  );

export const trainingBatchUpdateSchema = z
  .object({
    organizationId: z.string().min(1).optional(),
    title: z.string().trim().min(2).max(200).optional(),
    description: z.string().trim().max(5000).optional(),
    format: z
      .string()
      .refine((v) => BATCH_FORMATS.includes(v as BatchFormat), {
        message: "Format tidak valid",
      })
      .optional(),
    status: z
      .string()
      .refine((v) => BATCH_STATUSES.includes(v as BatchStatus), {
        message: "Status tidak valid",
      })
      .optional(),
    startDate: z
      .string()
      .optional()
      .transform((v) => (v ? v : null)),
    endDate: z
      .string()
      .optional()
      .transform((v) => (v ? v : null)),
    notes: z.string().trim().max(5000).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    { message: "Tanggal selesai tidak boleh sebelum tanggal mulai", path: ["endDate"] }
  );

// --- Helpers ---

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// --- Batch Participant Validation ---

export const batchParticipantCreateSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
  email: z.string().trim().email("Format email tidak valid").max(180),
  whatsapp: z.string().trim().max(80).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  status: z
    .string()
    .optional()
    .default("INVITED")
    .refine((v) => PARTICIPANT_STATUSES.includes(v as ParticipantStatus), {
      message: "Status tidak valid",
    }),
  notes: z.string().trim().max(5000).optional().default(""),
});

export const batchParticipantUpdateSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email("Format email tidak valid").max(180).optional(),
  whatsapp: z.string().trim().max(80).optional(),
  role: z.string().trim().max(120).optional(),
  status: z
    .string()
    .refine((v) => PARTICIPANT_STATUSES.includes(v as ParticipantStatus), {
      message: "Status tidak valid",
    })
    .optional(),
  notes: z.string().trim().max(5000).optional(),
});

// --- Batch Course Validation ---

export const batchCourseCreateSchema = z.object({
  courseId: z.string().min(1, "Course wajib dipilih"),
  required: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).optional().default(0),
});

export const batchCourseUpdateSchema = z.object({
  required: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});
