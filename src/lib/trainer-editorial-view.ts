import type { SkillaryTrainer, TrainerEvidence, TrainerProgram } from "@/types/trainer-types";

export type EditorialProfile = SkillaryTrainer & { designationLabel: string; designationNote: string };
export function toEditorialProfile(trainer: SkillaryTrainer): EditorialProfile {
  const verified = trainer.status === "verified";
  return { ...trainer, designationLabel: verified ? "Verified Skillary Faculty" : "Selected Skillary Faculty", designationNote: verified ? "Identitas, pengalaman utama, dan bukti profil telah ditinjau Skillary." : "Praktisi ini dipilih dan diundang Skillary. Designation ini bukan sertifikasi profesi." };
}
export const safePrograms = (items: unknown): TrainerProgram[] => Array.isArray(items) ? items.filter((x): x is TrainerProgram => !!x && typeof x === "object" && typeof (x as TrainerProgram).title === "string" && typeof (x as TrainerProgram).audience === "string" && typeof (x as TrainerProgram).outcome === "string") : [];
export const safeEvidence = (items: unknown): TrainerEvidence[] => Array.isArray(items) ? items.filter((x): x is TrainerEvidence => !!x && typeof x === "object" && typeof (x as TrainerEvidence).title === "string" && typeof (x as TrainerEvidence).context === "string") : [];
export function safeExternalUrl(value?: string) { try { if (!value) return; const url = new URL(value); return url.protocol === "https:" ? url.toString() : undefined; } catch { return; } }
