import type { DirectNavigationId, NavigationPanelId } from "./navigation-contract";

export type ActiveNavigationItem = NavigationPanelId | DirectNavigationId | null;

const ROUTE_OWNERS: ReadonlyArray<Readonly<{ id: Exclude<ActiveNavigationItem, null>; roots: readonly string[] }>> = [
  { id: "faculty", roots: ["/trainers"] },
  { id: "portfolio", roots: ["/portofolio"] },
  { id: "programs", roots: ["/programs", "/events", "/resources", "/learning-paths"] },
  { id: "organizations", roots: ["/untuk-organisasi"] },
  { id: "about", roots: ["/about", "/contact", "/privacy", "/terms", "/trainer-verification"] },
];

function normalizePathname(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  return path === "/" ? path : path.replace(/\/+$/, "") || "/";
}

function matchesBoundary(pathname: string, root: string) {
  return pathname === root || pathname.startsWith(`${root}/`);
}

export function getActiveNavigationItem(pathname: string): ActiveNavigationItem {
  const normalized = normalizePathname(pathname);
  return ROUTE_OWNERS.find((owner) => owner.roots.some((root) => matchesBoundary(normalized, root)))?.id ?? null;
}
