"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveNavigationItem = getActiveNavigationItem;
const ROUTE_OWNERS = [
    { id: "trainers", roots: ["/trainers"] },
    { id: "portfolio", roots: ["/portofolio"] },
    { id: "events", roots: ["/events"] },
    { id: "programs", roots: ["/programs", "/resources", "/learning-paths"] },
    { id: "services", roots: ["/untuk-organisasi"] },
    { id: "about", roots: ["/about", "/contact", "/privacy", "/terms", "/trainer-verification"] },
];
function normalizePathname(pathname) {
    const path = pathname.split(/[?#]/, 1)[0] || "/";
    return path === "/" ? path : path.replace(/\/+$/, "") || "/";
}
function matchesBoundary(pathname, root) {
    return pathname === root || pathname.startsWith(`${root}/`);
}
function getActiveNavigationItem(pathname) {
    const normalized = normalizePathname(pathname);
    return ROUTE_OWNERS.find((owner) => owner.roots.some((root) => matchesBoundary(normalized, root)))?.id ?? null;
}
