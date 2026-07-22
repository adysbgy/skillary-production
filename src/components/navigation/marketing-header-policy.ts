export type HeaderMode = "marketing" | "fallback" | "hidden";

export const MARKETING_HEADER_EXACT_ROUTES = [
  "/",
  "/programs",
  "/resources",
  "/events",
  "/untuk-organisasi",
  "/about",
  "/contact",
  "/portofolio",
  "/trainers",
  "/trainers/apply",
  "/trainer-verification",
] as const;

export const MARKETING_HEADER_DESCENDANT_ROOTS = ["/trainers"] as const;

export const MARKETING_SHELL_ROUTES = [
  "/about",
  "/untuk-organisasi",
  "/programs",
  "/resources",
  "/events",
  "/contact",
  "/portofolio",
  "/trainers",
  "/trainers/apply",
  "/trainer-verification",
] as const;

export const HIDDEN_HEADER_EXACT_ROUTES = [] as const;

export const HIDDEN_HEADER_PREFIXES = [
  "/lp",
  "/skillary-campus",
  "/admin",
  "/dashboard",
  "/learn",
  "/login",
  "/register",
] as const;

function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  const withoutQueryOrHash = pathname.split(/[?#]/, 1)[0] || "/";
  if (withoutQueryOrHash === "/") return "/";
  return withoutQueryOrHash.replace(/\/+$/, "") || "/";
}

export function matchesRouteBoundary(pathname: string, route: string) {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedRoute = normalizePathname(route);
  return normalizedPathname === normalizedRoute || normalizedPathname.startsWith(`${normalizedRoute}/`);
}

export function isCheckoutRoute(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  return matchesRouteBoundary(normalizedPathname, "/checkout") || normalizedPathname.endsWith("/checkout");
}

export function isMarketingHeaderRoute(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  if (MARKETING_HEADER_EXACT_ROUTES.some((route) => normalizedPathname === route)) return true;
  return MARKETING_HEADER_DESCENDANT_ROOTS.some((route) => matchesRouteBoundary(normalizedPathname, route));
}

export function isHiddenHeaderRoute(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  if (isCheckoutRoute(normalizedPathname)) return true;
  if (HIDDEN_HEADER_EXACT_ROUTES.some((route) => normalizedPathname === route)) return true;
  return HIDDEN_HEADER_PREFIXES.some((route) => matchesRouteBoundary(normalizedPathname, route));
}

export function resolveHeaderMode(pathname: string): HeaderMode {
  if (isHiddenHeaderRoute(pathname)) return "hidden";
  if (isMarketingHeaderRoute(pathname)) return "marketing";
  return "fallback";
}

export function needsMarketingHeaderSpacer(pathname: string) {
  if (resolveHeaderMode(pathname) !== "marketing") return false;
  const normalizedPathname = normalizePathname(pathname);
  return !MARKETING_SHELL_ROUTES.some((route) => matchesRouteBoundary(normalizedPathname, route));
}
