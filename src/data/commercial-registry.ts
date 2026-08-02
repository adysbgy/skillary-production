/**
 * Commercial truth registry for every public Skillary offer.
 *
 * No offer may be surfaced as scheduled or purchasable unless its readiness,
 * ownership, evidence, schedule, and commercial action are explicit here.
 */
export type OfferKind =
  | "webinar"
  | "self-paced-course"
  | "guided-program"
  | "in-house-training"
  | "company-learning-series"
  | "assessed-credential";

export type OfferStatus =
  | "draft"
  | "pilot"
  | "scheduled"
  | "live"
  | "sold-out"
  | "completed"
  | "archived";

export type OfferAudience = "individual" | "organization" | "both";
export type OfferAction = "register-interest" | "request-proposal" | "checkout";
export type CredentialEligibility = "none" | "participation" | "completion" | "assessed" | "partner";

export type OfferReadiness = {
  trainerApproved: boolean;
  syllabusApproved: boolean;
  learningAssetsApproved: boolean;
  scheduleConfirmed: boolean;
  priceConfirmed: boolean;
  capacityConfirmed: boolean;
  credentialCriteriaApproved: boolean;
};

export type CommercialOffer = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  kind: OfferKind;
  status: OfferStatus;
  audience: OfferAudience;
  action: OfferAction;
  trainerIds: readonly string[];
  readiness: OfferReadiness;
  credentialEligibility: CredentialEligibility;
  evidenceIds: readonly string[];
  runtimeCourseId?: string;
  scheduledAt?: string;
  capacity?: number;
  priceIdr?: number;
  reviewedAt: string;
};

export const COMMERCIAL_OFFERS: readonly CommercialOffer[] = [];

export function isPublicOffer(offer: CommercialOffer): boolean {
  return offer.status === "scheduled" || offer.status === "live" || offer.status === "sold-out";
}

export function isPurchasableOffer(offer: CommercialOffer): boolean {
  return (
    offer.action === "checkout" &&
    (offer.status === "scheduled" || offer.status === "live") &&
    offer.priceIdr !== undefined &&
    offer.readiness.trainerApproved &&
    offer.readiness.syllabusApproved &&
    offer.readiness.learningAssetsApproved &&
    offer.readiness.scheduleConfirmed &&
    offer.readiness.priceConfirmed &&
    offer.readiness.capacityConfirmed &&
    offer.readiness.credentialCriteriaApproved
  );
}

export function getPublicOffers(kind?: OfferKind): CommercialOffer[] {
  return COMMERCIAL_OFFERS.filter((offer) => isPublicOffer(offer) && (!kind || offer.kind === kind));
}
