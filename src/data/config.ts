// ============================================================
// Skillary — Site Configuration
// ============================================================
// Update these values before launch. This is the ONLY file you
// need to edit to connect all external services and links.
// ============================================================

/** Formspree form ID — get yours free at https://formspree.io */
export const FORMSPREE_ID = "YOUR_FORM_ID";

/** WhatsApp number in international format (no +, no dashes) */
export const WHATSAPP_NUMBER = "6282223617700";

/** Build a WhatsApp link with optional pre-filled message */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Contact emails */
export const EMAIL_GENERAL = "hello@skillary.id";
export const EMAIL_TEAMS = "teams@skillary.id";

/** Social links */
export const INSTAGRAM_URL = "https://instagram.com/skillary.id";

/** Site URL (used for OG images, sitemap, etc.) */
// Primary domain: skillary.my.id (added 2026-06-14). datacamp.id stays active.
export const SITE_URL = "https://skillary.my.id";
