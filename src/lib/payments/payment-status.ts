export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";
export type GatewayStatus = "capture" | "settlement" | "pending" | "deny" | "cancel" | "expire";

export function mapMidtransStatus(status: string, fraudStatus?: string): PaymentStatus | null {
  if (status === "capture" || status === "settlement") return fraudStatus === "challenge" ? "PENDING" : "PAID";
  if (status === "pending") return "PENDING";
  if (status === "deny" || status === "cancel") return "FAILED";
  if (status === "expire") return "EXPIRED";
  return null;
}

export function resolvePaymentTransition(current: PaymentStatus, requested: PaymentStatus): PaymentStatus | null {
  if (current === requested) return current;
  if (current === "PAID") return null;
  if (requested === "PENDING") return null;
  if (requested === "PAID") return "PAID";
  if (current === "PENDING" && (requested === "FAILED" || requested === "EXPIRED")) return requested;
  return null;
}
