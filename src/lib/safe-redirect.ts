/**
 * Returns a same-origin application path or the supplied fallback.
 * Protocol-relative URLs, absolute URLs, backslashes and control characters
 * are rejected to prevent redirecting authentication flows off-site.
 */
export function safeInternalRedirect(value: string | null | undefined, fallback = "/dashboard") {
    if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || /[\u0000-\u001F\u007F]/.test(value)) {
        return fallback;
    }
    try {
        const parsed = new URL(value, "https://skillary.invalid");
        return parsed.origin === "https://skillary.invalid" ? `${parsed.pathname}${parsed.search}${parsed.hash}` : fallback;
    } catch {
        return fallback;
    }
}
