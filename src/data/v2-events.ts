// ─────────────────────────────────────────────────────────────────────────
// V2 Events — mock data for the dedicated /v2/events listing page.
// Dates are illustrative (upcoming live webinars + one past/recorded item)
// and should be swapped for real schedule data once events are confirmed.
// ─────────────────────────────────────────────────────────────────────────

import { TRAINERS, type Trainer } from "./v2-trainers";

export type EventFormat = "Online" | "Hybrid" | "Offline";
export type EventKind = "Live Webinar" | "Free Workshop";
export type EventStatus = "Mendatang" | "Hampir Penuh" | "Selesai";

export type EventItem = {
  slug: string;
  title: string;
  desc: string;
  category: string;
  kind: EventKind;
  status: EventStatus;
  date: string; // ISO date, e.g. "2026-07-14"
  dateLabel: string; // human label, e.g. "Sel, 14 Jul 2026"
  time: string; // "19:00 WIB"
  durationMin: number;
  format: EventFormat;
  price: number; // 0 = gratis
  host: Trainer; // sourced from the shared trainer registry
  gradient: string;
  agenda: string[];
  benefits: string[];
  zoomMeetingId?: string; // set per real webinar; enables unique registrant links
};

const GOLD = "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))";
const BLUE = "linear-gradient(135deg, rgb(59,130,246), rgb(99,102,241))";
const GREEN = "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))";
const PURPLE = "linear-gradient(135deg, rgb(168,85,247), rgb(217,70,239))";

export const EVENTS: EventItem[] = [
  {
    slug: "ai-productivity-untuk-tim",
    title: "AI Productivity untuk Tim",
    desc: "Praktik langsung memakai AI assistant untuk mempercepat kerja harian tim — riset, dokumen, dan rapat.",
    category: "AI & Digital",
    kind: "Live Webinar",
    status: "Hampir Penuh",
    date: "2026-07-14",
    dateLabel: "Sel, 14 Jul 2026",
    time: "19:00 WIB",
    durationMin: 90,
    format: "Online",
    price: 149000,
    host: TRAINERS["dimas-aditya"],
    gradient: GOLD,
    agenda: [
      "Pemetaan pekerjaan harian yang bisa dipercepat dengan AI",
      "Praktik menyusun prompt untuk riset, dokumen, dan ringkasan rapat",
      "Studi kasus penerapan di tim korporat",
      "Sesi tanya jawab dan review langsung",
    ],
    benefits: [
      "Template prompt siap pakai untuk kerja sehari-hari",
      "E-sertifikat digital dengan ID terverifikasi",
      "Akses rekaman sesi selama 30 hari",
      "Grup diskusi pasca-webinar",
    ],
  },
  {
    slug: "data-dashboard-basics-excel",
    title: "Data Dashboard Basics (Excel)",
    desc: "Bangun dashboard sederhana dari data mentah — pivot table, chart, dan tampilan ringkas untuk laporan tim.",
    category: "Data & Analytics",
    kind: "Free Workshop",
    status: "Mendatang",
    date: "2026-07-17",
    dateLabel: "Jum, 17 Jul 2026",
    time: "10:00 WIB",
    durationMin: 60,
    format: "Online",
    price: 0,
    host: TRAINERS["anisa-putri"],
    gradient: BLUE,
    agenda: [
      "Struktur data mentah yang siap diolah",
      "Pivot table dan fungsi ringkasan cepat",
      "Menyusun chart yang mudah dibaca",
      "Menata dashboard satu halaman",
    ],
    benefits: [
      "Template dashboard Excel siap pakai",
      "E-sertifikat partisipasi",
      "Akses rekaman sesi selama 30 hari",
    ],
  },
  {
    slug: "business-presentation-clinic",
    title: "Business Presentation Clinic",
    desc: "Klinik menyusun dan membawakan presentasi bisnis yang persuasif, lengkap dengan sesi review langsung.",
    category: "Presentasi",
    kind: "Live Webinar",
    status: "Mendatang",
    date: "2026-07-20",
    dateLabel: "Sen, 20 Jul 2026",
    time: "14:00 WIB",
    durationMin: 120,
    format: "Hybrid",
    price: 199000,
    host: TRAINERS["rangga-prasetyo"],
    gradient: PURPLE,
    agenda: [
      "Struktur presentasi bisnis yang persuasif",
      "Menyusun slide yang ringkas dan mudah dicerna",
      "Teknik membawakan presentasi dengan percaya diri",
      "Sesi review langsung dari peserta",
    ],
    benefits: [
      "Template deck presentasi bisnis",
      "Feedback langsung dari coach",
      "E-sertifikat digital dengan ID terverifikasi",
      "Akses rekaman sesi selama 30 hari",
    ],
  },
  {
    slug: "leadership-untuk-manajer-baru",
    title: "Leadership untuk Manajer Baru",
    desc: "Fondasi kepemimpinan bagi yang baru naik jabatan — delegasi, umpan balik, dan mengelola tim lintas generasi.",
    category: "Leadership",
    kind: "Live Webinar",
    status: "Mendatang",
    date: "2026-07-24",
    dateLabel: "Jum, 24 Jul 2026",
    time: "19:00 WIB",
    durationMin: 90,
    format: "Online",
    price: 179000,
    host: TRAINERS["siti-rahmawati"],
    gradient: GREEN,
    agenda: [
      "Transisi dari individual contributor ke manajer",
      "Delegasi tugas dan menetapkan ekspektasi",
      "Memberi umpan balik yang membangun",
      "Mengelola tim lintas generasi",
    ],
    benefits: [
      "Panduan checklist manajer baru",
      "E-sertifikat digital dengan ID terverifikasi",
      "Akses rekaman sesi selama 30 hari",
      "Grup diskusi pasca-webinar",
    ],
  },
  {
    slug: "prompt-engineering-esensial",
    title: "Prompt Engineering Esensial",
    desc: "Teknik menyusun prompt yang efektif untuk pekerjaan sehari-hari — kini tersedia sebagai rekaman.",
    category: "AI & Digital",
    kind: "Free Workshop",
    status: "Selesai",
    date: "2026-07-05",
    dateLabel: "Min, 5 Jul 2026",
    time: "10:00 WIB",
    durationMin: 60,
    format: "Online",
    price: 0,
    host: TRAINERS["dimas-aditya"],
    gradient: GOLD,
    agenda: [
      "Dasar cara kerja large language model",
      "Pola prompt yang efektif untuk kerja sehari-hari",
      "Studi kasus dan latihan langsung",
    ],
    benefits: [
      "Template prompt siap pakai",
      "E-sertifikat partisipasi",
      "Akses rekaman penuh",
    ],
  },
];

export const EVENT_FILTERS: { label: string; match: (e: EventItem) => boolean }[] = [
  { label: "Semua", match: () => true },
  { label: "Live Webinar", match: (e) => e.kind === "Live Webinar" && e.status !== "Selesai" },
  { label: "Free Workshop", match: (e) => e.kind === "Free Workshop" && e.status !== "Selesai" },
  { label: "Rekaman", match: (e) => e.status === "Selesai" },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

// Precise start timestamp derived from date + time (WIB / UTC+7), used for
// scheduled reminders and calendar links.
export function getEventStart(event: EventItem): Date {
  const m = event.time.match(/(\d{1,2}):(\d{2})/);
  const hh = (m ? m[1] : "0").padStart(2, "0");
  const mm = m ? m[2] : "00";
  return new Date(`${event.date}T${hh}:${mm}:00+07:00`);
}

export function getAllEventSlugs(): string[] {
  return EVENTS.map((e) => e.slug);
}

export function formatEventPrice(price: number): string {
  if (price === 0) return "Gratis";
  return `Rp ${price.toLocaleString("id-ID")}`;
}
