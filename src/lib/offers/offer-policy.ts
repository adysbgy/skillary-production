import { isPaymentEnabled } from "../payments/payment-availability.js";

export const OFFER_TYPES = [
  "WEBINAR",
  "SELF_PACED_COURSE",
  "GUIDED_PROGRAM",
  "IN_HOUSE_TRAINING",
  "COMPANY_LEARNING_SERIES",
  "ASSESSED_CREDENTIAL",
] as const;
export const OFFER_AUDIENCES = ["INDIVIDUAL", "ORGANIZATION", "BOTH"] as const;
export const OFFER_ACTIONS = ["REGISTER_INTEREST", "REQUEST_PROPOSAL", "CHECKOUT", "ENROLL", "VIEW_CRITERIA"] as const;
export const PUBLIC_OFFER_STATUSES = ["APPROVED", "SCHEDULED", "LIVE", "SOLD_OUT"] as const;
export const ACTIVE_ASSIGNMENT_STATUSES = ["ACCEPTED", "ACTIVE", "COMPLETED"] as const;

export type OfferPolicyInput = {
  type: string;
  audience: string;
  status: string;
  title: string;
  summary: string;
  slug: string;
  primaryAction: string;
  priceAmount: number | null;
  capacity: number | null;
  registrationOpensAt: Date | null;
  registrationClosesAt: Date | null;
  publishedAt: Date | null;
  trainerAssignments: readonly { status: string }[];
  productionRecords: readonly {
    stage: string;
    items: readonly { requirement: string; status: string }[];
  }[];
};

export type OfferPolicyResult = { allowed: boolean; reasons: string[] };

function requiredProductionItemsAreApproved(offer: OfferPolicyInput): boolean {
  return offer.productionRecords.some(
    (record) =>
      record.stage === "APPROVED" &&
      record.items.length > 0 &&
      record.items.every((item) => item.status === "APPROVED"),
  );
}

function hasAcceptedTrainer(offer: OfferPolicyInput): boolean {
  return offer.trainerAssignments.some((assignment) => ACTIVE_ASSIGNMENT_STATUSES.includes(assignment.status as (typeof ACTIVE_ASSIGNMENT_STATUSES)[number]));
}

export function evaluateOfferPublication(offer: OfferPolicyInput): OfferPolicyResult {
  const reasons: string[] = [];
  if (!OFFER_TYPES.includes(offer.type as (typeof OFFER_TYPES)[number])) reasons.push("unsupported offer type");
  if (!OFFER_AUDIENCES.includes(offer.audience as (typeof OFFER_AUDIENCES)[number])) reasons.push("unsupported audience");
  if (!PUBLIC_OFFER_STATUSES.includes(offer.status as (typeof PUBLIC_OFFER_STATUSES)[number])) reasons.push("offer status is not public");
  if (!offer.title.trim()) reasons.push("title is required");
  if (!offer.summary.trim()) reasons.push("summary is required");
  if (!offer.slug.trim()) reasons.push("slug is required");
  if (!OFFER_ACTIONS.includes(offer.primaryAction as (typeof OFFER_ACTIONS)[number])) reasons.push("unsupported primary action");
  if (!offer.publishedAt) reasons.push("published timestamp is required");
  if (!hasAcceptedTrainer(offer)) reasons.push("accepted trainer assignment is required");
  if (!requiredProductionItemsAreApproved(offer)) reasons.push("approved production kit is required");
  return { allowed: reasons.length === 0, reasons };
}

export function evaluateOfferCheckout(
  offer: OfferPolicyInput,
  env: NodeJS.ProcessEnv = process.env,
  now = new Date(),
): OfferPolicyResult {
  const publication = evaluateOfferPublication(offer);
  const reasons = [...publication.reasons];
  if (offer.primaryAction !== "CHECKOUT") reasons.push("offer action is not checkout");
  if (offer.status !== "SCHEDULED" && offer.status !== "LIVE") reasons.push("offer is not scheduled or live");
  if (offer.priceAmount === null || offer.priceAmount < 0) reasons.push("authoritative price is required");
  if (offer.capacity === null || offer.capacity <= 0) reasons.push("positive capacity is required");
  if (!offer.registrationOpensAt || offer.registrationOpensAt > now) reasons.push("registration is not open");
  if (!offer.registrationClosesAt || offer.registrationClosesAt <= now) reasons.push("registration is closed or unset");
  if (!isPaymentEnabled(env)) reasons.push("global payment gate is disabled");
  return { allowed: reasons.length === 0, reasons: [...new Set(reasons)] };
}

export function isCanonicalOffersEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CANONICAL_OFFERS_ENABLED === "true";
}
