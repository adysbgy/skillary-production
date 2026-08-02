export const ROUTE_GROUP_MIGRATION_MODE = "baseline" as const;
export const STATIC_SHELL_FAMILIES = { auth: false, standalone: false, app: false, admin: false, checkout: false, fallback: false, marketing: false } as const;
export type StaticShellFamily = keyof typeof STATIC_SHELL_FAMILIES;
export function assertBaselineShellRegistry() { return ROUTE_GROUP_MIGRATION_MODE === "baseline" && Object.values(STATIC_SHELL_FAMILIES).every(value => value === false); }
