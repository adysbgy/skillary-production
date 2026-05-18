// Training image asset definitions.
// Set isRealDocumentation to true only when the image is from an actual Skillary training session.
// If isRealDocumentation is false, the UI must show "Ilustrasi suasana pelatihan".

export interface TrainingImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
  isRealDocumentation: boolean;
}

export const trainingImages: Record<string, TrainingImage> = {
  // --- Priority Assets (Homepage 2.0) ---
  heroTrainingSession: {
    src: "/images/training/hero-training-session.webp",
    alt: "Ilustrasi suasana pelatihan korporat dengan trainer dan peserta",
    title: "Sesi Pelatihan Korporat",
    caption: "Ilustrasi suasana pelatihan",
    isRealDocumentation: false,
  },
  hrReportReview: {
    src: "/images/training/hr-report-review.webp",
    alt: "Ilustrasi tim HR meninjau laporan pelatihan",
    title: "Review Laporan Training",
    caption: "Ilustrasi review laporan training",
    isRealDocumentation: false,
  },
  assessmentSession: {
    src: "/images/training/assessment-session-v2.webp",
    alt: "Ilustrasi peserta mengerjakan assessment pelatihan",
    title: "Assessment Program",
    caption: "Ilustrasi assessment peserta",
    isRealDocumentation: false,
  },

  // --- Supporting Assets ---
  groupDiscussion: {
    src: "/images/training/group-discussion-v2.webp",
    alt: "Ilustrasi diskusi kelompok dalam pelatihan",
    title: "Diskusi Peserta",
    caption: "Ilustrasi diskusi kelompok",
    isRealDocumentation: false,
  },
  trainerGuidance: {
    src: "/images/training/trainer-guidance-v2.webp",
    alt: "Ilustrasi trainer mendampingi peserta pelatihan",
    title: "Pendampingan Trainer",
    caption: "Ilustrasi pendampingan trainer",
    isRealDocumentation: false,
  },
  certificateMoment: {
    src: "/images/training/certificate-moment.webp",
    alt: "Ilustrasi momen penutupan pelatihan dan penyerahan sertifikat",
    title: "Penutupan Pelatihan",
    caption: "Ilustrasi penutupan pelatihan",
    isRealDocumentation: false,
  },

  // --- Legacy Assets (kept for backward compatibility) ---
  trainingSession: {
    src: "/images/training/training-session.webp",
    alt: "Ilustrasi sesi pelatihan korporat",
    title: "Sesi Pelatihan",
    caption: "Ilustrasi suasana pelatihan",
    isRealDocumentation: false,
  },
};

export function getImageCaption(img: TrainingImage): string {
  return img.isRealDocumentation ? "Dokumentasi kegiatan pelatihan" : img.caption;
}
