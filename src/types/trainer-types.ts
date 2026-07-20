export type TrainerStatus = "selected" | "verified";
export type DeliveryMode = "online" | "onsite" | "hybrid";

export type TrainerCredential = {
  title: string; issuer: string; credentialId?: string; credentialUrl?: string;
  issuedAt?: string; expiresAt?: string; status: "active" | "expired";
};
export type TrainerExperience = { role: string; organization: string; period: string; summary: string; verified?: boolean };
export type TrainerEvidence = { type: "workshop" | "video" | "article" | "material" | "case"; title: string; context: string; sourceUrl?: string; mediaUrl?: string; year?: string };
export type TrainerProgram = { title: string; audience: string; outcome: string; href?: string };
export type TrainerMetric = { value: string; label: string; sourceNote: string };
export type SkillaryTrainer = {
  slug: string; status: TrainerStatus; name: string; headline: string; shortBio: string; fullBio: string;
  portraitSrc: string; actionPhotoSrc?: string; location: string; languages: string[]; deliveryModes: DeliveryMode[];
  expertise: string[]; audiences: string[]; industryExposure: string[]; outcomes: string[];
  teachingApproach: { title: string; description: string }[]; experience: TrainerExperience[];
  credentials: TrainerCredential[]; programs: TrainerProgram[]; evidence: TrainerEvidence[]; metrics?: TrainerMetric[];
  linkedinUrl?: string; websiteUrl?: string; introVideoUrl?: string; verifiedAt?: string; updatedAt: string;
};
