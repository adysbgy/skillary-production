"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN_HEADER_PREFIXES = exports.HIDDEN_HEADER_EXACT_ROUTES = exports.MARKETING_SHELL_ROUTES = exports.MARKETING_HEADER_DESCENDANT_ROOTS = exports.MARKETING_HEADER_EXACT_ROUTES = void 0;
exports.matchesRouteBoundary = matchesRouteBoundary;
exports.isCheckoutRoute = isCheckoutRoute;
exports.isMarketingHeaderRoute = isMarketingHeaderRoute;
exports.isHiddenHeaderRoute = isHiddenHeaderRoute;
exports.resolveHeaderMode = resolveHeaderMode;
exports.needsMarketingHeaderSpacer = needsMarketingHeaderSpacer;
exports.MARKETING_HEADER_EXACT_ROUTES = [
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
    "/privacy",
    "/terms",
    "/learning-paths",
    "/expert-partner",
    "/community",
    "/blog",
];
exports.MARKETING_HEADER_DESCENDANT_ROOTS = ["/trainers"];
exports.MARKETING_SHELL_ROUTES = [
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
    "/privacy",
    "/terms",
    "/learning-paths",
    "/expert-partner",
    "/community",
    "/blog",
];
exports.HIDDEN_HEADER_EXACT_ROUTES = [];
exports.HIDDEN_HEADER_PREFIXES = [
    "/lp",
    "/skillary-campus",
    "/admin",
    "/dashboard",
    "/learn",
    "/login",
    "/register",
];
function normalizePathname(pathname) {
    if (!pathname)
        return "/";
    const withoutQueryOrHash = pathname.split(/[?#]/, 1)[0] || "/";
    if (withoutQueryOrHash === "/")
        return "/";
    return withoutQueryOrHash.replace(/\/+$/, "") || "/";
}
function matchesRouteBoundary(pathname, route) {
    const normalizedPathname = normalizePathname(pathname);
    const normalizedRoute = normalizePathname(route);
    return normalizedPathname === normalizedRoute || normalizedPathname.startsWith(`${normalizedRoute}/`);
}
function isCheckoutRoute(pathname) {
    const normalizedPathname = normalizePathname(pathname);
    return matchesRouteBoundary(normalizedPathname, "/checkout") || normalizedPathname.endsWith("/checkout");
}
function isMarketingHeaderRoute(pathname) {
    const normalizedPathname = normalizePathname(pathname);
    if (exports.MARKETING_HEADER_EXACT_ROUTES.some((route) => normalizedPathname === route))
        return true;
    return exports.MARKETING_HEADER_DESCENDANT_ROOTS.some((route) => matchesRouteBoundary(normalizedPathname, route));
}
function isHiddenHeaderRoute(pathname) {
    const normalizedPathname = normalizePathname(pathname);
    if (isCheckoutRoute(normalizedPathname))
        return true;
    if (exports.HIDDEN_HEADER_EXACT_ROUTES.some((route) => normalizedPathname === route))
        return true;
    return exports.HIDDEN_HEADER_PREFIXES.some((route) => matchesRouteBoundary(normalizedPathname, route));
}
function resolveHeaderMode(pathname) {
    if (isHiddenHeaderRoute(pathname))
        return "hidden";
    if (isMarketingHeaderRoute(pathname))
        return "marketing";
    return "fallback";
}
function needsMarketingHeaderSpacer(pathname) {
    if (resolveHeaderMode(pathname) !== "marketing")
        return false;
    const normalizedPathname = normalizePathname(pathname);
    return !exports.MARKETING_SHELL_ROUTES.some((route) => matchesRouteBoundary(normalizedPathname, route));
}
