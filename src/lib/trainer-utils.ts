import { TRAINERS } from "@/data/trainers";
import type { SkillaryTrainer } from "@/types/trainer-types";

export const getTrainer = (slug: string) => TRAINERS.find((trainer) => trainer.slug === slug);
export const verifiedTrainerCount = () => TRAINERS.filter((trainer) => trainer.status === "verified").length;
export const trainerStatusLabel = (status: SkillaryTrainer["status"]) => status === "verified" ? "Skillary Verified Trainer" : "Selected Skillary Trainer";
export function isCredentialActive(expiresAt?: string) { return !expiresAt || new Date(expiresAt).getTime() >= Date.now(); }
export function trainerJsonLd(trainer: SkillaryTrainer) {
  return { "@context": "https://schema.org", "@type": "Person", name: trainer.name, description: trainer.shortBio, url: `https://skillary.my.id/trainers/${trainer.slug}`, knowsAbout: trainer.expertise, sameAs: [trainer.linkedinUrl, trainer.websiteUrl].filter(Boolean) };
}
