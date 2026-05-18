/**
 * Legacy Portfolio Registry
 * 
 * Data in this registry represents documented digital proof of training programs 
 * conducted prior to the full digitization of Skillary (formerly operating under Allman since 1998).
 * 
 * IMPORTANT BRAND POSITIONING:
 * - This data is a curated subset of digital archives, NOT the total history.
 * - Always use framing like: "Sebagian pengalaman terdokumentasi dalam arsip digital"
 * - Do NOT claim these as "Skillary Clients", but rather "Pengalaman panjang Allman" or "Portofolio Pelatihan".
 */

export const legacyPortfolioMetrics = {
  total_posts_in_file: 500,
  caption_filled: 396,
  valid_posts_with_client: 117,
  unique_valid_events: 39,
  unique_clients_detected: 21,
  dominant_categories: {
    "AI & Digital Mindset": 2,
    "Data Analytics, Dashboard & Storytelling": 10,
    "Infographics & Visual Communication": 15,
    "Presentation, Reporting & Business Communication": 7,
    "Leadership & Problem Solving": 2,
    "Process Improvement, SOP & Quality": 3
  }
};

export const legacyServiceCatalog = [
  {
    category: "Infographics & Visual Communication",
    valid_event_count: 15,
    example_programs: [
      "Advanced Data Visualization & Infographics",
      "Advanced Visual Communication with Infographics",
      "Data Visualization & Infographics",
      "Infographics",
      "Infographics Design",
      "Infographics Design with PowerPoint",
      "Infographics for Business",
      "Story & Infographics",
      "Teknik Dasar Infografis"
    ],
    suggested_page: "Pelatihan Infografis & Visual Communication",
    description: "Mengubah data, laporan, dan ide kompleks menjadi visual infografis yang jelas, menarik, dan profesional.",
  },
  {
    category: "Data Analytics, Dashboard & Storytelling",
    valid_event_count: 10,
    example_programs: [
      "Business Analytics Using Power BI",
      "Data Analysis & Visualization",
      "Data Driven Decision Making",
      "Interactive Dashboard with Microsoft Excel",
      "Storytelling with Data"
    ],
    suggested_page: "Pelatihan Data Analytics, Dashboard & Storytelling",
    description: "Membantu tim membaca data, membangun dashboard, menemukan insight, dan menyampaikan rekomendasi bisnis secara meyakinkan.",
  },
  {
    category: "Presentation, Reporting & Business Communication",
    valid_event_count: 7,
    example_programs: [
      "Advanced PowerPoint",
      "Business Report with PowerPoint & Excel",
      "High Impact Presentation",
      "Integrated Presentation Management",
      "Presentation Skills"
    ],
    suggested_page: "Pelatihan Presentasi Bisnis & Reporting",
    description: "Meningkatkan kualitas presentasi bisnis, laporan manajemen, dan komunikasi visual agar lebih ringkas, strategis, dan berdampak.",
  },
  {
    category: "Process Improvement, SOP & Quality",
    valid_event_count: 3,
    example_programs: [
      "Business Process Management",
      "Pelatihan ISO",
      "SOP for Bank / Business Process Improvement"
    ],
    suggested_page: "Pelatihan SOP, Business Process & Quality",
    description: "Membantu organisasi merapikan proses, menyusun SOP, dan meningkatkan kualitas kerja melalui pendekatan proses bisnis.",
  },
  {
    category: "AI & Digital Mindset",
    valid_event_count: 2,
    example_programs: [
      "Data Analysis and Training For Trainers",
      "Kecerdasan Buatan / AI"
    ],
    suggested_page: "Pelatihan AI untuk Produktivitas Kerja",
    description: "Mengenalkan pemanfaatan AI untuk meningkatkan produktivitas, pembelajaran, komunikasi, dan pekerjaan sehari-hari.",
  },
  {
    category: "Leadership & Problem Solving",
    valid_event_count: 2,
    example_programs: [
      "Creative Problem Solving",
      "Motivational Leadership"
    ],
    suggested_page: "Pelatihan Leadership & Creative Problem Solving",
    description: "Membantu peserta memecahkan masalah, mengambil keputusan, dan membangun sikap kepemimpinan yang lebih adaptif.",
  }
];

export const legacyClientShowcase = [
  { name: "Bank Indonesia", sector: "Central Bank / Regulator", valid_event_count: 10 },
  { name: "Bank Indonesia Institute", sector: "Learning Institute / Central Bank", valid_event_count: 5 },
  { name: "Indofood / Indofood CBP", sector: "FMCG / Manufacturing", valid_event_count: 3 },
  { name: "BNI", sector: "Banking", valid_event_count: 2 },
  { name: "Kementerian PUPR", sector: "Government / Ministry", valid_event_count: 2 },
  { name: "Bank DKI", sector: "Banking", valid_event_count: 2 },
  { name: "Erlangga", sector: "Publishing / Education", valid_event_count: 1 },
  { name: "PPM", sector: "Management Education", valid_event_count: 1 },
  { name: "Prof. Rhenald Kasali", sector: "Academic / Thought Leadership", valid_event_count: 1 },
  { name: "Gunung Sewu Kencana", sector: "Corporate / Conglomerate", valid_event_count: 1 },
  { name: "PT Gapura Angkasa", sector: "Aviation Services", valid_event_count: 1 },
  { name: "KPPU", sector: "Government / Competition Authority", valid_event_count: 1 },
  { name: "Otoritas Jasa Keuangan (OJK)", sector: "Financial Regulator", valid_event_count: 1 },
  { name: "Mandiri University", sector: "Corporate University / Banking", valid_event_count: 1 },
  { name: "Ombudsman RI", sector: "Government Institution", valid_event_count: 1 },
  { name: "Kemendes RI", sector: "Government / Ministry", valid_event_count: 1 },
  { name: "Universitas Atmajaya", sector: "University / Education", valid_event_count: 1 },
  { name: "BRI Corporate University", sector: "Corporate University / Banking", valid_event_count: 1 },
  { name: "BCA", sector: "Banking", valid_event_count: 1 },
  { name: "Indosat", sector: "Telecommunications", valid_event_count: 1 },
  { name: "Freeport", sector: "Mining / Natural Resources", valid_event_count: 1 }
];

export interface PortfolioCard {
  id: number;
  program: string;
  category: string;
  client: string;
  sector: string;
  training_date: string | null;
  venue: string | null;
  city: string | null;
  supporting_posts: number;
  proof_urls: string[];
  short_copy: string;
  status: "case_candidate" | "portfolio";
}

export const legacyPortfolioCards: PortfolioCard[] = [
  { id: 1, program: "Kecerdasan Buatan / AI", category: "AI & Digital Mindset", client: "Erlangga", sector: "Publishing / Education", training_date: "Nov 2023", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C7URYyEhtIY/"], short_copy: "Kecerdasan Buatan / AI untuk Erlangga (Nov 2023)", status: "portfolio" },
  { id: 2, program: "Data Driven Decision Making", category: "Data Analytics, Dashboard & Storytelling", client: "PPM", sector: "Management Education", training_date: "Okt 2023", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C72wtVxB6D2/"], short_copy: "Data Driven Decision Making untuk PPM (Okt 2023)", status: "portfolio" },
  { id: 3, program: "Storytelling with Data", category: "Data Analytics, Dashboard & Storytelling", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "7-8 Jul 2023", venue: "Nusa Dua Bali", city: "Bali", supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C75YRnjBLXO/"], short_copy: "Storytelling with Data untuk Bank Indonesia di Bali (7-8 Jul 2023)", status: "case_candidate" },
  { id: 4, program: "Storytelling with Data", category: "Data Analytics, Dashboard & Storytelling", client: "Prof. Rhenald Kasali", sector: "Academic / Thought Leadership", training_date: "26 Jun 2023", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C75X79qh2EY/"], short_copy: "Storytelling with Data untuk Prof. Rhenald Kasali (26 Jun 2023)", status: "portfolio" },
  { id: 5, program: "Business Analytics Using Power BI", category: "Data Analytics, Dashboard & Storytelling", client: "Gunung Sewu Kencana", sector: "Corporate / Conglomerate", training_date: "4-5 Jan 2023", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C75YwsChrzi/"], short_copy: "Business Analytics Using Power BI untuk Gunung Sewu Kencana (4-5 Jan 2023)", status: "portfolio" },
  { id: 6, program: "Advanced Visual Communication with Infographics", category: "Infographics & Visual Communication", client: "PT Gapura Angkasa", sector: "Aviation Services", training_date: "2-3 Mar 2020", venue: null, city: null, supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B9TiMjBnZwK/", "https://www.instagram.com/p/B9TiPKmnp4I/", "https://www.instagram.com/p/B9TiRlbH2d7/"], short_copy: "Advanced Visual Communication with Infographics untuk PT Gapura Angkasa (2-3 Mar 2020)", status: "portfolio" },
  { id: 7, program: "Integrated Presentation Management", category: "Presentation, Reporting & Business Communication", client: "Bank Indonesia Institute", sector: "Learning Institute / Central Bank", training_date: "03 Mar 2020 | 05 Mar 2020", venue: null, city: null, supporting_posts: 6, proof_urls: ["https://www.instagram.com/p/B9V0vg6nC6c/", "https://www.instagram.com/p/B9YVe8kHREn/", "https://www.instagram.com/p/B9YVgs-HMMW/"], short_copy: "Integrated Presentation Management untuk Bank Indonesia Institute (Mar 2020)", status: "portfolio" },
  { id: 8, program: "High Impact Presentation", category: "Presentation, Reporting & Business Communication", client: "Bank Indonesia Institute", sector: "Learning Institute / Central Bank", training_date: "06 & 09 Mar 2020 | 10 & 11 Mar 2020", venue: null, city: null, supporting_posts: 6, proof_urls: ["https://www.instagram.com/p/B9gPvRUnUgt/", "https://www.instagram.com/p/B9lg6H_H4JL/", "https://www.instagram.com/p/B9noynwn235/"], short_copy: "High Impact Presentation untuk Bank Indonesia Institute (Mar 2020)", status: "portfolio" },
  { id: 9, program: "Presentation Skills", category: "Presentation, Reporting & Business Communication", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "Mar 2020", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C7py6ovhh5k/"], short_copy: "Presentation Skills untuk Bank Indonesia (Mar 2020)", status: "portfolio" },
  { id: 10, program: "Integrated Presentation Management", category: "Presentation, Reporting & Business Communication", client: "Bank Indonesia Institute", sector: "Learning Institute / Central Bank", training_date: "28 Feb 2020", venue: null, city: null, supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B9V0vg6nC6c/", "https://www.instagram.com/p/B9YVe8kHREn/", "https://www.instagram.com/p/B9YVgs-HMMW/"], short_copy: "Integrated Presentation Management untuk Bank Indonesia Institute (Feb 2020)", status: "portfolio" },
  { id: 11, program: "Advanced Visual Communication with Infographics", category: "Infographics & Visual Communication", client: "BNI", sector: "Banking", training_date: "10 - 11 Jan 2020", venue: null, city: "Jakarta", supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B7P9IttH3G3/", "https://www.instagram.com/p/B7P9FHQns77/", "https://www.instagram.com/p/B7P8Fd1nrQx/"], short_copy: "Advanced Visual Communication with Infographics untuk BNI di Jakarta (Jan 2020)", status: "case_candidate" },
  { id: 12, program: "Data Analysis and Training For Trainers", category: "AI & Digital Mindset", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "19 Des 2019 | 20 Des 2019", venue: "Hotel Fairmont Jakarta", city: "Jakarta", supporting_posts: 6, proof_urls: ["https://www.instagram.com/p/B6SYctwHBG3/", "https://www.instagram.com/p/B6SaLpdHie0/", "https://www.instagram.com/p/B6SaM8EH-xC/"], short_copy: "Data Analysis and Training For Trainers untuk Bank Indonesia di Jakarta (Des 2019)", status: "case_candidate" },
  { id: 13, program: "Interactive Dashboard with Microsoft Excel", category: "Data Analytics, Dashboard & Storytelling", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "5 & 6 Des 2019", venue: null, city: "Bali", supporting_posts: 2, proof_urls: ["https://www.instagram.com/p/B5uDvs3nSGI/", "https://www.instagram.com/p/B5uDsikn1n0/"], short_copy: "Interactive Dashboard with Microsoft Excel untuk Bank Indonesia di Bali (Des 2019)", status: "case_candidate" },
  { id: 14, program: "Advanced Data Visualization & Infographics", category: "Infographics & Visual Communication", client: "BNI", sector: "Banking", training_date: "Nov 2019", venue: "Gedung Graha BNI 46", city: null, supporting_posts: 15, proof_urls: ["https://www.instagram.com/p/B5KLwbaHZrA/", "https://www.instagram.com/p/B4_SQCZnBA8/", "https://www.instagram.com/p/B4_SMmwngx1/"], short_copy: "Advanced Data Visualization & Infographics untuk BNI (Nov 2019)", status: "case_candidate" },
  { id: 15, program: "Infographics Design", category: "Infographics & Visual Communication", client: "KPPU", sector: "Government / Competition Authority", training_date: "11 Okt 2019", venue: "The Valley Resort Bandung", city: "Bandung", supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B3gHvwdn5IJ/", "https://www.instagram.com/p/B3gHyzmnsRW/", "https://www.instagram.com/p/B3gHwyEHDI5/"], short_copy: "Infographics Design untuk KPPU di Bandung (Okt 2019)", status: "case_candidate" },
  { id: 16, program: "Data Analysis & Visualization", category: "Data Analytics, Dashboard & Storytelling", client: "Bank Indonesia Institute", sector: "Learning Institute / Central Bank", training_date: "28 Okt 2019 | 29 Okt 2019", venue: null, city: null, supporting_posts: 6, proof_urls: [], short_copy: "Data Analysis & Visualization untuk Bank Indonesia Institute (Okt 2019)", status: "portfolio" },
  { id: 17, program: "Infographics Design with PowerPoint", category: "Infographics & Visual Communication", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "3 Okt 2019", venue: null, city: "Bali", supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B4L9DPoHrjF/", "https://www.instagram.com/p/B4MaheQHI30/", "https://www.instagram.com/p/B4L8_MTHElz/"], short_copy: "Infographics Design with PowerPoint untuk Bank Indonesia di Bali (Okt 2019)", status: "case_candidate" },
  { id: 18, program: "Infographics", category: "Infographics & Visual Communication", client: "Otoritas Jasa Keuangan (OJK)", sector: "Financial Regulator", training_date: "20 Sep 2019", venue: null, city: null, supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B2oY8b2H33M/", "https://www.instagram.com/p/B2oYzq7nAVg/", "https://www.instagram.com/p/B2oYxRKnhLr/"], short_copy: "Infographics untuk OJK (Sep 2019)", status: "portfolio" },
  { id: 19, program: "Infographics", category: "Infographics & Visual Communication", client: "Indofood / Indofood CBP", sector: "FMCG / Manufacturing", training_date: "25 Sep 2019", venue: null, city: "Cibitung", supporting_posts: 3, proof_urls: ["https://www.instagram.com/p/B1pkWujHO88/", "https://www.instagram.com/p/B1pkUHkn-0q/", "https://www.instagram.com/p/B1pkRvzHSws/"], short_copy: "Infographics untuk Indofood di Cibitung (Sep 2019)", status: "case_candidate" },
  { id: 20, program: "Creative Problem Solving", category: "Leadership & Problem Solving", client: "Indofood / Indofood CBP", sector: "FMCG / Manufacturing", training_date: "16 Sep 2019 | 17 Sep 2019", venue: null, city: "Cibitung", supporting_posts: 6, proof_urls: ["https://www.instagram.com/p/B2dYZhhHJJf/", "https://www.instagram.com/p/B2dYdDznUyx/", "https://www.instagram.com/p/B2gDkLznyp4/"], short_copy: "Creative Problem Solving untuk Indofood di Cibitung (Sep 2019)", status: "case_candidate" },
  { id: 21, program: "Infographics", category: "Infographics & Visual Communication", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "7 Sep 2019", venue: "Hotel Tentrem Yogyakarta", city: "Yogyakarta", supporting_posts: 6, proof_urls: ["https://www.instagram.com/p/B4L9DPoHrjF/", "https://www.instagram.com/p/B4MaheQHI30/", "https://www.instagram.com/p/B4L8_MTHElz/"], short_copy: "Infographics untuk Bank Indonesia di Yogyakarta (Sep 2019)", status: "case_candidate" },
  { id: 22, program: "SOP for Bank / Business Process Improvement", category: "Process Improvement, SOP & Quality", client: "Mandiri University", sector: "Corporate University / Banking", training_date: "30-31 Agu 2019", venue: null, city: null, supporting_posts: 3, proof_urls: [], short_copy: "SOP for Bank untuk Mandiri University (Agu 2019)", status: "portfolio" },
  { id: 23, program: "Motivational Leadership", category: "Leadership & Problem Solving", client: "Indofood / Indofood CBP", sector: "FMCG / Manufacturing", training_date: "26 Agu 2019 | 27 Agu 2019", venue: null, city: "Cibitung", supporting_posts: 6, proof_urls: ["https://www.instagram.com/p/B1pkWujHO88/", "https://www.instagram.com/p/B1pkUHkn-0q/", "https://www.instagram.com/p/B1pkRvzHSws/"], short_copy: "Motivational Leadership untuk Indofood di Cibitung (Agu 2019)", status: "case_candidate" },
  { id: 24, program: "Pelatihan ISO", category: "Process Improvement, SOP & Quality", client: "Ombudsman RI", sector: "Government Institution", training_date: "1 Jul 2019 | 2 Jul 2019", venue: null, city: null, supporting_posts: 6, proof_urls: [], short_copy: "Pelatihan ISO untuk Ombudsman RI (Jul 2019)", status: "portfolio" },
  { id: 25, program: "Teknik Dasar Infografis", category: "Infographics & Visual Communication", client: "Kementerian PUPR", sector: "Government / Ministry", training_date: "11 - 13 Apr 2019", venue: null, city: null, supporting_posts: 2, proof_urls: ["https://www.instagram.com/p/BwI_0NQB-Nv/", "https://www.instagram.com/p/BwI_ochBUp2/"], short_copy: "Teknik Dasar Infografis untuk Kementerian PUPR (Apr 2019)", status: "portfolio" },
  { id: 26, program: "Infographics for Business", category: "Infographics & Visual Communication", client: "Kemendes RI", sector: "Government / Ministry", training_date: "22 Apr 2019", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/BwlZsYpBRrL/"], short_copy: "Infographics for Business untuk Kemendes RI (Apr 2019)", status: "portfolio" },
  { id: 27, program: "Infographics Design with PowerPoint", category: "Infographics & Visual Communication", client: "Universitas Atmajaya", sector: "University / Education", training_date: "12 Mar 2019", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/Bu7z_adBibD/"], short_copy: "Infographics Design with PowerPoint untuk Universitas Atmajaya (Mar 2019)", status: "portfolio" },
  { id: 28, program: "Business Report with PowerPoint & Excel", category: "Presentation, Reporting & Business Communication", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: "18 Mar 2019", venue: "Museum Bank Indonesia", city: "Jakarta", supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/B4L9DPoHrjF/"], short_copy: "Business Report with PowerPoint & Excel untuk Bank Indonesia di Jakarta (Mar 2019)", status: "case_candidate" },
  { id: 29, program: "Interactive Dashboard with Microsoft Excel", category: "Data Analytics, Dashboard & Storytelling", client: "Bank DKI", sector: "Banking", training_date: "Feb 2019", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C7iMLKnh4nz/"], short_copy: "Interactive Dashboard with Microsoft Excel untuk Bank DKI (Feb 2019)", status: "portfolio" },
  { id: 30, program: "Storytelling with Data", category: "Data Analytics, Dashboard & Storytelling", client: "BRI Corporate University", sector: "Corporate University / Banking", training_date: "Feb 2018", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C70OKQzhGoH/"], short_copy: "Storytelling with Data untuk BRI Corporate University (Feb 2018)", status: "portfolio" },
  { id: 31, program: "Story & Infographics", category: "Infographics & Visual Communication", client: "BCA", sector: "Banking", training_date: "Jan 2017", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C70NjhUBkwk/"], short_copy: "Story & Infographics untuk BCA (Jan 2017)", status: "portfolio" },
  { id: 32, program: "Business Process Management", category: "Process Improvement, SOP & Quality", client: "Indosat", sector: "Telecommunications", training_date: "2014", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C7p0QMfBwd2/"], short_copy: "Business Process Management untuk Indosat (2014)", status: "portfolio" },
  { id: 33, program: "Advanced PowerPoint", category: "Presentation, Reporting & Business Communication", client: "Freeport", sector: "Mining / Natural Resources", training_date: "Nov 2012", venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C7klyXKhCNm/"], short_copy: "Advanced PowerPoint untuk Freeport (Nov 2012)", status: "portfolio" },
  { id: 34, program: "Infographics Design with PowerPoint", category: "Infographics & Visual Communication", client: "Kementerian PUPR", sector: "Government / Ministry", training_date: null, venue: null, city: "Bali", supporting_posts: 1, proof_urls: [], short_copy: "Infographics Design with PowerPoint untuk Kementerian PUPR di Bali", status: "portfolio" },
  { id: 35, program: "Data Visualization & Infographics", category: "Infographics & Visual Communication", client: "Bank Indonesia Institute", sector: "Learning Institute / Central Bank", training_date: null, venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/Bu7xLd-hFSH/"], short_copy: "Data Visualization & Infographics untuk Bank Indonesia Institute", status: "portfolio" },
  { id: 36, program: "Integrated Presentation Management", category: "Presentation, Reporting & Business Communication", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: null, venue: null, city: "Jakarta", supporting_posts: 7, proof_urls: ["https://www.instagram.com/p/B9V0vg6nC6c/", "https://www.instagram.com/p/B9YVe8kHREn/", "https://www.instagram.com/p/B9YVgs-HMMW/"], short_copy: "Integrated Presentation Management untuk Bank Indonesia di Jakarta", status: "case_candidate" },
  { id: 37, program: "Data Analysis & Visualization", category: "Data Analytics, Dashboard & Storytelling", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: null, venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/BtxDzD5BLVF/"], short_copy: "Data Analysis & Visualization untuk Bank Indonesia", status: "portfolio" },
  { id: 38, program: "Infographics for Business", category: "Infographics & Visual Communication", client: "Bank Indonesia", sector: "Central Bank / Regulator", training_date: null, venue: "Museum Bank Indonesia", city: "Jakarta", supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/B4L9DPoHrjF/"], short_copy: "Infographics for Business untuk Bank Indonesia di Jakarta", status: "case_candidate" },
  { id: 39, program: "Interactive Dashboard with Microsoft Excel", category: "Data Analytics, Dashboard & Storytelling", client: "Bank DKI", sector: "Banking", training_date: null, venue: null, city: null, supporting_posts: 1, proof_urls: ["https://www.instagram.com/p/C7iMLKnh4nz/"], short_copy: "Interactive Dashboard with Microsoft Excel untuk Bank DKI", status: "portfolio" },
];

// ──────────────────────────────────────────────
// CASE STUDY DERIVATION
// ──────────────────────────────────────────────

const TRAINING_FOCUS: Record<string, string> = {
  "Data Analytics, Dashboard & Storytelling":
    "Membaca data, membangun dashboard, menemukan insight, dan menyampaikan rekomendasi bisnis melalui storytelling with data.",
  "Infographics & Visual Communication":
    "Mengubah informasi kompleks menjadi visual infografis yang jelas, menarik, dan mudah dipahami oleh berbagai audiens.",
  "Presentation, Reporting & Business Communication":
    "Menyusun laporan dan presentasi bisnis yang lebih ringkas, strategis, dan berdampak bagi pengambil keputusan.",
  "Leadership & Problem Solving":
    "Membangun keterampilan problem solving, pengambilan keputusan, dan komunikasi tim yang lebih adaptif.",
  "Process Improvement, SOP & Quality":
    "Merapikan proses bisnis, menyusun SOP, dan meningkatkan kualitas kerja melalui pendekatan improvement.",
  "AI & Digital Mindset":
    "Mengenalkan literasi digital dan pemanfaatan teknologi AI untuk meningkatkan produktivitas kerja sehari-hari.",
};

export interface CaseStudy {
  id: number;
  program: string;
  category: string;
  client: string;
  sector: string;
  trainingDate: string | null;
  city: string | null;
  venue: string | null;
  proofUrls: string[];
  supportingPosts: number;
  sourceBrand: "Allman";
  caseContext: string;
  trainingFocus: string;
  skillaryRelevance: string;
}

function deriveCaseStudy(card: PortfolioCard): CaseStudy {
  return {
    id: card.id,
    program: card.program,
    category: card.category,
    client: card.client,
    sector: card.sector,
    trainingDate: card.training_date,
    city: card.city,
    venue: card.venue,
    proofUrls: card.proof_urls,
    supportingPosts: card.supporting_posts,
    sourceBrand: "Allman",
    caseContext: `Program ini merepresentasikan pengalaman pelatihan Allman dalam bidang ${card.category} untuk organisasi dari sektor ${card.sector}.`,
    trainingFocus: TRAINING_FOCUS[card.category] || "Pengembangan kompetensi peserta melalui pendekatan pelatihan terstruktur.",
    skillaryRelevance:
      "Pengalaman seperti ini menjadi relevan dengan Skillary karena kini dapat didukung oleh alur digital: materi, assessment, sertifikat, progress peserta, dan laporan pelatihan.",
  };
}

/**
 * Curated case study IDs — selected for:
 * 1. Proof URL availability (all have proof)
 * 2. Supporting posts count (higher = more evidence)
 * 3. Sector diversity (Banking, Government, FMCG, etc.)
 * 4. Category diversity (covers 5 of 6 categories)
 * 5. Complete date/location data where possible
 * 6. No excessive repetition of the same client consecutively
 */
const CURATED_CASE_IDS = [14, 12, 20, 21, 15, 23, 3, 13, 11, 17, 36, 28];

export const legacyCaseStudies: CaseStudy[] = CURATED_CASE_IDS
  .map((id) => legacyPortfolioCards.find((c) => c.id === id))
  .filter((c): c is PortfolioCard => c !== undefined)
  .map(deriveCaseStudy);
