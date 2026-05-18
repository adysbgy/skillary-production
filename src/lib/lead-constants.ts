import { z } from "zod";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "WAITING_FOR_DETAILS",
  "PROPOSAL_NEEDED",
  "PROPOSAL_SENT",
  "FOLLOW_UP",
  "WON",
  "LOST",
  "NURTURE",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  WAITING_FOR_DETAILS: "Waiting for Details",
  PROPOSAL_NEEDED: "Proposal Needed",
  PROPOSAL_SENT: "Proposal Sent",
  FOLLOW_UP: "Follow Up",
  WON: "Won",
  LOST: "Lost",
  NURTURE: "Nurture",
};

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-sky-100 text-sky-700",
  QUALIFIED: "bg-emerald-100 text-emerald-700",
  WAITING_FOR_DETAILS: "bg-amber-100 text-amber-700",
  PROPOSAL_NEEDED: "bg-orange-100 text-orange-700",
  PROPOSAL_SENT: "bg-violet-100 text-violet-700",
  FOLLOW_UP: "bg-yellow-100 text-yellow-700",
  WON: "bg-green-100 text-green-700",
  LOST: "bg-red-100 text-red-700",
  NURTURE: "bg-gray-100 text-gray-600",
};

export const INQUIRY_TYPE_OPTIONS = [
  "In-House Training",
  "Assessment Program",
  "Managed Learning Program",
  "Platform / LMS Discussion",
  "Expert Partner Collaboration",
  "General Inquiry",
] as const;

export const LEAD_NEXT_ACTION: Record<LeadStatus, string> = {
  NEW: "Hubungi lead dan kualifikasi kebutuhan.",
  CONTACTED: "Tunggu respons atau follow-up dalam 3 hari.",
  QUALIFIED: "Siapkan intake proposal.",
  WAITING_FOR_DETAILS: "Follow-up klien untuk melengkapi data.",
  PROPOSAL_NEEDED: "Susun dan kirim proposal.",
  PROPOSAL_SENT: "Follow-up dalam 3 hari kerja.",
  FOLLOW_UP: "Tanyakan feedback dan keputusan.",
  WON: "Eksekusi program. Kumpulkan proof setelah selesai.",
  LOST: "Catat alasan. Evaluasi internal.",
  NURTURE: "Masukkan ke list edukasi / newsletter.",
};

// --- Lifecycle timestamp mapping ---

export const STATUS_TIMESTAMP_MAP: Partial<Record<LeadStatus, string>> = {
  CONTACTED: "lastContactedAt",
  PROPOSAL_SENT: "proposalSentAt",
  WON: "wonAt",
  LOST: "lostAt",
};

// --- Anti-spam helpers ---

const URL_REGEX = /https?:\/\//gi;
const MAX_URLS_IN_MESSAGE = 3;

export function detectSpam(body: {
  _honeypot?: string;
  message?: string;
}): boolean {
  // Honeypot filled = bot
  if (body._honeypot && body._honeypot.trim().length > 0) return true;
  // Excessive URLs in message
  if (body.message) {
    const urlCount = (body.message.match(URL_REGEX) || []).length;
    if (urlCount > MAX_URLS_IN_MESSAGE) return true;
  }
  return false;
}

// --- Validation Schemas ---

export const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
  email: z.string().trim().email("Format email tidak valid").max(180),
  whatsapp: z.string().trim().max(80).optional().default(""),
  organization: z.string().trim().max(180).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  inquiryType: z.string().trim().min(1, "Jenis kebutuhan wajib diisi").max(80),
  programInterest: z.string().trim().max(160).optional().default(""),
  sourcePage: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(5000),
  _honeypot: z.string().optional().default(""),
});

export const updateLeadSchema = z.object({
  status: z.string().refine((v) => LEAD_STATUSES.includes(v as LeadStatus), {
    message: "Status tidak valid",
  }).optional(),
  notes: z.string().max(5000).optional(),
  archived: z.boolean().optional(),
});
