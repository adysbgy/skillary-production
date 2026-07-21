import { createHash, timingSafeEqual } from "node:crypto";

export interface MidtransSignatureFields {
  orderId: string;
  statusCode: string;
  grossAmount: string;
}

export function createMidtransSignature(fields: MidtransSignatureFields, serverKey: string): string {
  return createHash("sha512")
    .update(`${fields.orderId}${fields.statusCode}${fields.grossAmount}${serverKey}`)
    .digest("hex");
}

export function verifyMidtransSignature(
  fields: MidtransSignatureFields,
  serverKey: string,
  providedSignature: string,
): boolean {
  if (!fields.orderId || !fields.statusCode || !fields.grossAmount || !serverKey || !providedSignature) return false;
  const expected = Buffer.from(createMidtransSignature(fields, serverKey), "utf8");
  const provided = Buffer.from(providedSignature, "utf8");
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}
