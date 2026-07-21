const SENSITIVE_KEY = /password|secret|token|cookie|authorization|signature|serverkey|clientsecret|gatewaydata/i;
const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE = /(?:\+?62|0)\d{8,13}/g;

export function redactValue(key: string, value: unknown): unknown {
  if (SENSITIVE_KEY.test(key)) return "[REDACTED]";
  if (typeof value === "string") return value.replace(EMAIL, "[REDACTED_EMAIL]").replace(PHONE, "[REDACTED_PHONE]");
  return value;
}

export function redactRecord(input: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => [
    key,
    value && typeof value === "object" && !Array.isArray(value)
      ? redactRecord(value as Record<string, unknown>)
      : redactValue(key, value),
  ]));
}
