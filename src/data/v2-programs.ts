// ─────────────────────────────────────────────────────────────────────────
// V2 Program data — single source for the /v2/program/[slug] detail pages.
//
// PROGRAM_INDEX is the union of every program referenced across the V2
// surfaces (catalog grid + homepage ProgramsV2), so every "Lihat Detail"
// link resolves to a statically-generated page. PROGRAM_DETAILS holds the
// rich content for the most popular programs; anything without an entry
// falls back to a partial page rendered from its index data.
// ─────────────────────────────────────────────────────────────────────────

export type ProgramFormat = "In-house" | "Online" | "Hybrid";

export type ProgramModule = {
  title: string;
  items: string[];
};

export type ProgramPersona = {
  role: string;
  reason: string;
};

export type ProgramIndexEntry = {
  category: string;
  title: string;
  desc: string;
  duration: string;
  formats: ProgramFormat[];
  level: string;
};

export type ProgramDetailContent = {
  tagline: string;
  participants: string;
  modules: ProgramModule[];
  outcomes: string[];
  forWhom: ProgramPersona[];
};

export type ResolvedProgram = ProgramIndexEntry & {
  slug: string;
  gradient: string;
  tagline: string;
  participants: string;
  modules: ProgramModule[];
  outcomes: string[];
  forWhom: ProgramPersona[];
  hasFullDetail: boolean;
};

// Category → gradient (mirrors CATEGORY_STYLE in the catalog & ProgramsV2).
export const CATEGORY_GRADIENT: Record<string, string> = {
  "Data & Analytics": "linear-gradient(135deg, rgb(59,130,246), rgb(99,102,241))",
  "AI & Digital": "linear-gradient(135deg, rgb(20,184,166), rgb(59,130,246))",
  "Presentasi": "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))",
  "Leadership": "linear-gradient(135deg, rgb(245,158,11), rgb(220,38,38))",
  "SOP & Quality": "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))",
};

const FALLBACK_GRADIENT = "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))";

/** Turn a program title into a URL slug. "Power BI Business Dashboard" → "power-bi-business-dashboard". */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Union of all programs surfaced across V2 (catalog 16 + the homepage
// "Creative Problem Solving & Decision Making" variant).
export const PROGRAM_INDEX: ProgramIndexEntry[] = [
  { category: "Data & Analytics", title: "Power BI Business Dashboard", desc: "Membangun dashboard interaktif dari data mentah hingga insight siap presentasi.", duration: "2 hari", formats: ["In-house", "Hybrid"], level: "Menengah" },
  { category: "Data & Analytics", title: "Data-Driven Decision Making", desc: "Membaca, menganalisis, dan mengkomunikasikan data untuk keputusan berbasis fakta.", duration: "2 hari", formats: ["In-house", "Online"], level: "Menengah" },
  { category: "Data & Analytics", title: "Interactive Dashboard with Excel", desc: "Membangun dashboard dinamis di Microsoft Excel tanpa coding — cocok semua divisi.", duration: "1 hari", formats: ["Online", "Hybrid"], level: "Dasar" },
  { category: "Data & Analytics", title: "SQL untuk Analis Bisnis", desc: "Query database, agregasi, dan join untuk kebutuhan pelaporan operasional.", duration: "3 hari", formats: ["In-house"], level: "Menengah" },
  { category: "AI & Digital", title: "AI Productivity for Teams", desc: "Memanfaatkan AI tools untuk meningkatkan produktivitas kerja harian tim.", duration: "1 hari", formats: ["In-house", "Online", "Hybrid"], level: "Semua Level" },
  { category: "AI & Digital", title: "Prompt Engineering Esensial", desc: "Menyusun prompt efektif untuk menulis, menganalisis, dan menyelesaikan tugas.", duration: "1 hari", formats: ["Online"], level: "Dasar" },
  { category: "AI & Digital", title: "Digital Transformation Mindset", desc: "Membangun pola pikir adaptif menghadapi perubahan teknologi di organisasi.", duration: "2 hari", formats: ["In-house", "Hybrid"], level: "Manajerial" },
  { category: "Presentasi", title: "Business Presentation & Reporting", desc: "Menyusun presentasi bisnis yang persuasif, ringkas, dan mudah dipahami manajemen.", duration: "2 hari", formats: ["In-house", "Online", "Hybrid"], level: "Semua Level" },
  { category: "Presentasi", title: "Business Storytelling", desc: "Merangkai narasi data dan ide menjadi cerita yang meyakinkan audiens.", duration: "1 hari", formats: ["In-house", "Online"], level: "Menengah" },
  { category: "Presentasi", title: "Infographics & Visual Communication", desc: "Mengubah data kompleks menjadi infografis visual yang jelas dan menarik.", duration: "2 hari", formats: ["In-house", "Hybrid"], level: "Lanjutan" },
  { category: "Leadership", title: "Creative Problem Solving", desc: "Meningkatkan kemampuan berpikir kritis dan memecahkan masalah kompleks.", duration: "2 hari", formats: ["In-house"], level: "Manajerial" },
  { category: "Leadership", title: "Creative Problem Solving & Decision Making", desc: "Meningkatkan kemampuan berpikir kritis, memecahkan masalah, dan membangun mindset kepemimpinan.", duration: "2 hari", formats: ["In-house"], level: "Manajerial" },
  { category: "Leadership", title: "Effective Decision Making", desc: "Kerangka pengambilan keputusan di bawah ketidakpastian dan tekanan waktu.", duration: "1 hari", formats: ["In-house", "Online"], level: "Manajerial" },
  { category: "Leadership", title: "Coaching & Mentoring untuk Manajer", desc: "Teknik coaching praktis untuk mengembangkan performa anggota tim.", duration: "3 hari", formats: ["In-house", "Hybrid"], level: "Manajerial" },
  { category: "SOP & Quality", title: "SOP & Business Process Improvement", desc: "Merapikan proses kerja, menyusun SOP efektif, dan meningkatkan kualitas operasional.", duration: "2 hari", formats: ["In-house"], level: "Semua Level" },
  { category: "SOP & Quality", title: "ISO 9001 Awareness", desc: "Memahami prinsip sistem manajemen mutu dan penerapannya di organisasi.", duration: "1 hari", formats: ["In-house", "Online"], level: "Dasar" },
  { category: "SOP & Quality", title: "Lean Process & Continuous Improvement", desc: "Mengidentifikasi pemborosan dan menerapkan perbaikan berkelanjutan.", duration: "3 hari", formats: ["In-house", "Hybrid"], level: "Menengah" },
];

// Rich detail content for the most popular programs (keyed by slug).
const POWER_BI: ProgramDetailContent = {
  tagline: "Ubah data mentah perusahaan menjadi dashboard interaktif yang siap dipresentasikan ke manajemen.",
  participants: "10–25 orang",
  modules: [
    { title: "Fondasi Power BI & Model Data", items: ["Mengenal Power BI Desktop & Service", "Import data dari Excel, CSV, dan database", "Membersihkan data dengan Power Query", "Membangun relasi antar tabel"] },
    { title: "DAX untuk Perhitungan Bisnis", items: ["Measure vs calculated column", "Fungsi agregasi & time intelligence", "Menyusun KPI dan rasio bisnis", "Best practice penamaan & struktur"] },
    { title: "Desain Visualisasi Efektif", items: ["Memilih chart yang tepat per jenis data", "Prinsip visual yang tidak menyesatkan", "Interaktivitas: slicer, drill-down, tooltip", "Tema & konsistensi warna brand"] },
    { title: "Dashboard Siap Presentasi", items: ["Menyusun layout dengan alur storytelling", "Menyorot insight utama untuk manajemen", "Publish & sharing yang aman", "Refresh data terjadwal"] },
  ],
  outcomes: [
    "Membangun dashboard interaktif dari nol tanpa bergantung pada tim IT",
    "Menerjemahkan kebutuhan manajemen menjadi metrik yang terukur",
    "Mengotomasi laporan rutin yang sebelumnya dikerjakan manual",
    "Menyajikan insight data dengan visual yang jelas dan meyakinkan",
  ],
  forWhom: [
    { role: "Data & Business Analyst", reason: "Mempercepat pembuatan laporan dan analisis ad-hoc." },
    { role: "Tim Finance & Operasional", reason: "Memantau KPI dan performa tanpa menunggu laporan IT." },
    { role: "Manajer & Supervisor", reason: "Mengambil keputusan harian berbasis dashboard real-time." },
    { role: "Staf yang sering olah Excel", reason: "Naik level dari spreadsheet manual ke dashboard dinamis." },
  ],
};

const DATA_DRIVEN: ProgramDetailContent = {
  tagline: "Bangun budaya keputusan berbasis data — dari membaca angka hingga mengkomunikasikan rekomendasi.",
  participants: "10–30 orang",
  modules: [
    { title: "Mindset & Literasi Data", items: ["Apa itu keputusan berbasis data", "Membedakan korelasi vs kausalitas", "Bias umum dalam interpretasi data", "Merumuskan pertanyaan yang tepat"] },
    { title: "Membaca & Menganalisis Data", items: ["Statistik deskriptif yang praktis", "Membaca tren, distribusi, dan outlier", "Membandingkan segmen & periode", "Analisis cepat dengan Excel/Sheets"] },
    { title: "Dari Data ke Insight", items: ["Menyusun hipotesis bisnis", "Validasi dengan data yang tersedia", "Menerjemahkan angka menjadi rekomendasi", "Menghindari kesimpulan yang menyesatkan"] },
    { title: "Mengkomunikasikan Keputusan", items: ["Framing rekomendasi untuk stakeholder", "Visual pendukung yang ringkas", "Menangani keberatan berbasis data", "Mengukur hasil dari keputusan"] },
  ],
  outcomes: [
    "Mengambil keputusan dengan dasar data, bukan sekadar asumsi",
    "Mengidentifikasi metrik yang benar-benar relevan dengan tujuan bisnis",
    "Menyusun rekomendasi yang dapat dipertanggungjawabkan",
    "Mengkomunikasikan temuan data secara persuasif ke manajemen",
  ],
  forWhom: [
    { role: "Manajer & Team Lead", reason: "Memimpin tim dengan keputusan berbasis bukti." },
    { role: "Tim Product & Marketing", reason: "Mengukur dampak inisiatif dan beriterasi lebih cepat." },
    { role: "Tim Operasional", reason: "Mengoptimasi proses berdasarkan data lapangan." },
    { role: "Analis Junior", reason: "Memperkuat kemampuan interpretasi dan komunikasi data." },
  ],
};

const BUSINESS_PRESENTATION: ProgramDetailContent = {
  tagline: "Susun dan bawakan presentasi bisnis yang ringkas, persuasif, dan menggerakkan keputusan.",
  participants: "10–25 orang",
  modules: [
    { title: "Struktur Pesan yang Jelas", items: ["Prinsip piramida: kesimpulan lebih dulu", "Menentukan satu pesan utama", "Alur logis untuk audiens sibuk", "Menyesuaikan pesan dengan level audiens"] },
    { title: "Desain Slide Profesional", items: ["Satu ide per slide", "Hirarki visual & tipografi", "Mengubah teks padat menjadi visual", "Konsistensi dengan brand perusahaan"] },
    { title: "Menyajikan Data & Laporan", items: ["Memilih chart yang tepat", "Menyoroti angka yang penting", "Menyusun tabel yang mudah dibaca", "Membuat executive summary yang efektif"] },
    { title: "Delivery & Tanya Jawab", items: ["Mengelola gugup & bahasa tubuh", "Membuka dan menutup dengan kuat", "Teknik menangani pertanyaan sulit", "Latihan & feedback langsung"] },
  ],
  outcomes: [
    "Menyusun presentasi bisnis yang fokus pada satu pesan utama",
    "Merancang slide yang bersih, profesional, dan mudah dipahami",
    "Menyajikan data dan laporan tanpa membuat audiens kewalahan",
    "Membawakan presentasi dengan percaya diri di depan manajemen",
  ],
  forWhom: [
    { role: "Manajer & Supervisor", reason: "Mempresentasikan progress dan proposal ke pimpinan." },
    { role: "Tim Sales & Business Dev", reason: "Membawakan pitch yang meyakinkan ke klien." },
    { role: "Konsultan & Analis", reason: "Menyampaikan temuan dan rekomendasi dengan jelas." },
    { role: "Siapa pun yang sering meeting", reason: "Membuat setiap laporan lebih ringkas dan berdampak." },
  ],
};

const AI_PRODUCTIVITY: ProgramDetailContent = {
  tagline: "Manfaatkan AI tools secara praktis untuk mempercepat pekerjaan harian seluruh tim.",
  participants: "Fleksibel",
  modules: [
    { title: "Lanskap AI untuk Kerja", items: ["Mengenal AI generatif & kegunaannya", "Use case nyata per divisi", "Batasan & risiko yang perlu diwaspadai", "Etika & kerahasiaan data"] },
    { title: "Prompting yang Efektif", items: ["Anatomi prompt yang baik", "Memberi konteks & contoh", "Iterasi untuk hasil yang lebih tajam", "Template prompt siap pakai"] },
    { title: "AI untuk Tugas Harian", items: ["Menulis email, ringkasan, & laporan", "Brainstorming & riset cepat", "Merapikan data & spreadsheet", "Membuat draf materi presentasi"] },
    { title: "Integrasi ke Alur Kerja Tim", items: ["Memilih tools yang tepat", "Menyusun SOP penggunaan AI", "Menjaga kualitas & verifikasi output", "Mengukur penghematan waktu"] },
  ],
  outcomes: [
    "Menggunakan AI tools untuk menyelesaikan tugas harian lebih cepat",
    "Menyusun prompt yang menghasilkan output relevan dan akurat",
    "Mengidentifikasi pekerjaan yang tepat untuk dibantu AI",
    "Menerapkan AI secara aman dengan tetap menjaga kerahasiaan data",
  ],
  forWhom: [
    { role: "Seluruh staf operasional", reason: "Mengurangi pekerjaan repetitif sehari-hari." },
    { role: "Tim Marketing & Konten", reason: "Mempercepat ideasi, draf, dan riset." },
    { role: "Admin & Support", reason: "Mengotomasi penulisan dan perapian data." },
    { role: "Manajer", reason: "Mendorong adopsi AI yang terukur di timnya." },
  ],
};

const STORYTELLING: ProgramDetailContent = {
  tagline: "Rangkai data dan ide menjadi cerita yang diingat dan menggerakkan audiens untuk bertindak.",
  participants: "10–25 orang",
  modules: [
    { title: "Kenapa Cerita Bekerja", items: ["Psikologi cerita & memori", "Cerita vs sekadar data", "Elemen inti narasi bisnis", "Menentukan tujuan cerita"] },
    { title: "Kerangka Narasi", items: ["Struktur konflik → resolusi", "Menempatkan audiens sebagai 'hero'", "Story arc untuk proposal & laporan", "Menyusun hook pembuka yang kuat"] },
    { title: "Data sebagai Cerita", items: ["Memilih satu angka 'bintang'", "Memberi konteks pada data", "Visual yang memperkuat narasi", "Menghindari grafik yang membingungkan"] },
    { title: "Membawakan & Menyempurnakan", items: ["Tempo, jeda, dan penekanan", "Latihan storytelling singkat", "Feedback antar peserta", "Menyesuaikan cerita per audiens"] },
  ],
  outcomes: [
    "Mengubah laporan dan data menjadi narasi yang menarik",
    "Menyusun cerita bisnis dengan struktur yang jelas dan tujuan tegas",
    "Membuat pesan lebih mudah diingat oleh audiens",
    "Menggerakkan stakeholder untuk mengambil keputusan",
  ],
  forWhom: [
    { role: "Leader & Manajer", reason: "Menyampaikan visi dan inisiatif dengan lebih meyakinkan." },
    { role: "Sales & Business Dev", reason: "Membuat pitch yang melekat di benak klien." },
    { role: "Marketing & Komunikasi", reason: "Membangun pesan brand yang konsisten dan kuat." },
    { role: "Analis & Konsultan", reason: "Mengemas temuan agar berdampak, bukan sekadar angka." },
  ],
};

const PROBLEM_SOLVING: ProgramDetailContent = {
  tagline: "Pecahkan masalah kompleks secara terstruktur dan ambil keputusan yang tepat di bawah tekanan.",
  participants: "10–25 orang",
  modules: [
    { title: "Mendefinisikan Masalah", items: ["Membedakan gejala vs akar masalah", "Teknik 5 Whys & fishbone diagram", "Merumuskan problem statement", "Menghindari solusi yang prematur"] },
    { title: "Berpikir Kreatif & Divergen", items: ["Teknik brainstorming terstruktur", "Mendorong ide tanpa menghakimi", "Reframing & analogi", "Mengelola dinamika tim saat ideasi"] },
    { title: "Mengevaluasi Opsi", items: ["Menyusun kriteria keputusan yang jelas", "Decision matrix & pembobotan", "Analisis risiko & trade-off", "Mengenali bias kognitif"] },
    { title: "Memutuskan & Mengeksekusi", items: ["Keputusan di bawah ketidakpastian", "Membangun komitmen tim atas keputusan", "Rencana aksi & kepemilikan", "Evaluasi hasil & pembelajaran"] },
  ],
  outcomes: [
    "Mendefinisikan akar masalah sebelum mencari solusi",
    "Menghasilkan opsi solusi yang lebih beragam dan kreatif",
    "Mengevaluasi pilihan dengan kerangka yang objektif",
    "Mengambil keputusan yang tepat meski di bawah tekanan waktu",
  ],
  forWhom: [
    { role: "Manajer & Team Lead", reason: "Memimpin tim memecahkan masalah operasional yang berulang." },
    { role: "Project Manager", reason: "Mengambil keputusan cepat saat proyek menghadapi hambatan." },
    { role: "Calon Pemimpin", reason: "Membangun kerangka berpikir kritis untuk peran lebih besar." },
    { role: "Tim Lintas Fungsi", reason: "Menyelesaikan masalah kompleks secara kolaboratif." },
  ],
};

// slug → rich detail. Both Creative Problem Solving variants share one detail.
const PROGRAM_DETAILS: Record<string, ProgramDetailContent> = {
  "power-bi-business-dashboard": POWER_BI,
  "data-driven-decision-making": DATA_DRIVEN,
  "business-presentation-reporting": BUSINESS_PRESENTATION,
  "ai-productivity-for-teams": AI_PRODUCTIVITY,
  "business-storytelling": STORYTELLING,
  "creative-problem-solving": PROBLEM_SOLVING,
  "creative-problem-solving-decision-making": PROBLEM_SOLVING,
};

/** All slugs surfaced in V2 — used by generateStaticParams. Deduplicated. */
export function getAllProgramSlugs(): string[] {
  return Array.from(new Set(PROGRAM_INDEX.map((p) => slugify(p.title))));
}

/** Resolve a slug to a renderable program, merging rich detail when available. */
export function getProgramBySlug(slug: string): ResolvedProgram | null {
  const entry = PROGRAM_INDEX.find((p) => slugify(p.title) === slug);
  if (!entry) return null;

  const detail = PROGRAM_DETAILS[slug];
  return {
    ...entry,
    slug,
    gradient: CATEGORY_GRADIENT[entry.category] ?? FALLBACK_GRADIENT,
    tagline:
      detail?.tagline ??
      `Program pelatihan ${entry.category} yang dapat disesuaikan dengan kebutuhan dan konteks organisasi Anda.`,
    participants: detail?.participants ?? "Fleksibel",
    modules: detail?.modules ?? [],
    outcomes: detail?.outcomes ?? [],
    forWhom: detail?.forWhom ?? [],
    hasFullDetail: Boolean(detail),
  };
}
