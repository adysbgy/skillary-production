// ─────────────────────────────────────────────────────────────────────────
// V2 Trainers — single source for instructor/pengajar profiles.
//
// Premium placement: trainers are NOT advertised in nav or a loud homepage
// roster. They are *revealed in context* — subtly on event cards, and in full
// on the event detail page (the moment a visitor is already interested in the
// topic). Quality of each profile builds authority; discovery does the rest.
//
// NOTE: these are placeholder profiles. Swap name/role/avatar/bio/stats for
// the real trainers once their details are confirmed.
// ─────────────────────────────────────────────────────────────────────────

export type Trainer = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  experience: string; // e.g. "12 tahun"
  participants: string; // e.g. "2.500+ profesional"
  expertise: string[];
};

export const TRAINERS: Record<string, Trainer> = {
  "dimas-aditya": {
    slug: "dimas-aditya",
    name: "Dimas Aditya",
    role: "AI & Digital Productivity Trainer",
    avatar: "/images/avatars/av3.svg",
    bio: "Selama satu dekade lebih mendampingi tim korporat mengadopsi tools digital. Kini fokus membantu profesional memanfaatkan AI assistant untuk mempercepat kerja harian — dari riset, dokumen, hingga automasi.",
    experience: "12 tahun",
    participants: "2.500+ profesional",
    expertise: ["AI untuk Produktivitas", "Prompt Engineering", "Automasi Kerja", "Transformasi Digital"],
  },
  "anisa-putri": {
    slug: "anisa-putri",
    name: "Anisa Putri",
    role: "Data Analytics Trainer",
    avatar: "/images/avatars/av5.svg",
    bio: "Praktisi data analytics yang terbiasa membantu tim HR dan operasional menyusun laporan berbasis data — tanpa perlu tools rumit. Pendekatannya praktis: dari data mentah ke dashboard yang bisa dibaca manajemen.",
    experience: "9 tahun",
    participants: "1.800+ peserta",
    expertise: ["Data Analytics", "Excel & Dashboard", "Business Intelligence", "Pelaporan Data"],
  },
  "rangga-prasetyo": {
    slug: "rangga-prasetyo",
    name: "Rangga Prasetyo",
    role: "Communication & Presentation Coach",
    avatar: "/images/avatars/av7.svg",
    bio: "Telah melatih ribuan profesional dan eksekutif membawakan presentasi bisnis yang jelas, ringkas, dan persuasif. Fokus pada struktur pesan dan pembawaan yang membuat audiens mengambil keputusan.",
    experience: "14 tahun",
    participants: "3.000+ profesional",
    expertise: ["Public Speaking", "Business Presentation", "Storytelling", "Executive Communication"],
  },
  "siti-rahmawati": {
    slug: "siti-rahmawati",
    name: "Siti Rahmawati",
    role: "Leadership & People Development Trainer",
    avatar: "/images/avatars/av2.svg",
    bio: "Membimbing manajer baru di berbagai industri membangun fondasi kepemimpinan sejak masa transisi jabatan — delegasi, umpan balik, dan mengelola tim lintas generasi dengan percaya diri.",
    experience: "11 tahun",
    participants: "2.000+ manajer",
    expertise: ["Leadership", "Coaching & Mentoring", "Manajemen Tim", "People Development"],
  },
};

export function getTrainer(slug: string): Trainer | undefined {
  return TRAINERS[slug];
}
