export type MidtransEnvironment = "sandbox" | "production";

export interface MidtransEndpoints {
  environment: MidtransEnvironment;
  apiBaseUrl: string;
  snapScriptUrl: string;
}

const ENDPOINTS: Record<MidtransEnvironment, Omit<MidtransEndpoints, "environment">> = {
  sandbox: {
    apiBaseUrl: "https://app.sandbox.midtrans.com",
    snapScriptUrl: "https://app.sandbox.midtrans.com/snap/snap.js",
  },
  production: {
    apiBaseUrl: "https://app.midtrans.com",
    snapScriptUrl: "https://app.midtrans.com/snap/snap.js",
  },
};

export function resolveMidtransEnvironment(value: string | undefined): MidtransEnvironment {
  if (!value || value === "sandbox") return "sandbox";
  if (value === "production") return "production";
  throw new Error(`Unsupported MIDTRANS_ENV: ${value}`);
}

export function getMidtransEndpoints(value: string | undefined): MidtransEndpoints {
  const environment = resolveMidtransEnvironment(value);
  return { environment, ...ENDPOINTS[environment] };
}

export function isLikelySandboxKey(key: string): boolean {
  return key.startsWith("SB-");
}

export function validateMidtransKeyEnvironment(key: string, environment: MidtransEnvironment): boolean {
  return environment === "sandbox" ? isLikelySandboxKey(key) : !isLikelySandboxKey(key);
}
