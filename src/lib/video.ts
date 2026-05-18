/**
 * Video normalization and validation for Skillary LMS
 */

export const ALLOWED_VIDEO_DOMAINS = [
    "youtube.com",
    "youtu.be",
    "vimeo.com",
    "loom.com",
    "drive.google.com",
    "wistia.com",
    "wistia.net"
];

/**
 * Checks if a URL uses an allowlisted video domain.
 */
export function isValidVideoDomain(url: string | null | undefined): boolean {
    if (!url || url.trim() === "") return false;
    try {
        const u = new URL(url);
        return ALLOWED_VIDEO_DOMAINS.some(domain => u.hostname.endsWith(domain));
    } catch {
        return false;
    }
}

/**
 * Attempts to normalize a raw watch/share URL into a proper embed URL.
 * Falls back to returning the original URL if it can't be normalized,
 * as long as it's from an allowed domain.
 */
export function normalizeVideoUrl(rawUrl: string | null | undefined): string | null {
    if (!rawUrl || rawUrl.trim() === "") return null;
    let urlStr = rawUrl.trim();

    try {
        const u = new URL(urlStr);

        // YouTube
        if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
            let videoId = "";
            if (u.hostname.includes("youtu.be")) {
                videoId = u.pathname.slice(1);
            } else if (u.pathname.includes("/embed/")) {
                return urlStr; // Already embed
            } else {
                videoId = u.searchParams.get("v") || u.pathname.split("/").pop() || "";
            }
            // Strip any query params from the video ID
            videoId = videoId.split("?")[0].split("&")[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Vimeo
        if (u.hostname.includes("vimeo.com") && !u.hostname.includes("player.vimeo.com")) {
            const videoId = u.pathname.split("/").pop();
            if (videoId && /^\d+$/.test(videoId)) {
                return `https://player.vimeo.com/video/${videoId}`;
            }
        }

        // Loom
        if (u.hostname.includes("loom.com") && u.pathname.includes("/share/")) {
            const videoId = u.pathname.split("/").pop();
            if (videoId) {
                return `https://www.loom.com/embed/${videoId}`;
            }
        }

        // Google Drive
        if (u.hostname.includes("drive.google.com") && u.pathname.includes("/file/d/")) {
            const match = urlStr.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        }

        return isValidVideoDomain(urlStr) ? urlStr : null;
    } catch {
        return null;
    }
}
