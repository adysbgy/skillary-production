export const PAYMENT_HOLD_MESSAGE = "Pembayaran online sedang ditahan sampai verifikasi penyedia pembayaran selesai.";

export function isPaymentEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.PAYMENTS_ENABLED === "true" && Boolean(env.MIDTRANS_SERVER_KEY);
}
