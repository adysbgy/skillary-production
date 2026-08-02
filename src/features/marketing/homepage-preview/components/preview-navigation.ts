import { SAFE_STATIC_DESTINATIONS } from "../data/homepage-preview-contract";

export const PREVIEW_PRIMARY_LINKS = [
  { label: "Program", href: SAFE_STATIC_DESTINATIONS.programSection },
  { label: "Workshop berikutnya", href: SAFE_STATIC_DESTINATIONS.workshopSection },
  { label: "Jalur Belajar", href: SAFE_STATIC_DESTINATIONS.learningPathSection },
] as const;

export const PREVIEW_PROOF_LINKS = [
  { label: "Sertifikasi", href: SAFE_STATIC_DESTINATIONS.certifications },
  { label: "Portfolio", href: SAFE_STATIC_DESTINATIONS.portfolio },
  { label: "Faculty", href: SAFE_STATIC_DESTINATIONS.faculty },
] as const;

export const PREVIEW_MORE_LINKS = [
  { label: "Materi Gratis", href: SAFE_STATIC_DESTINATIONS.resources },
  { label: "Untuk Organisasi", href: SAFE_STATIC_DESTINATIONS.organization },
  { label: "Hubungi Skillary", href: SAFE_STATIC_DESTINATIONS.contact },
] as const;
