/**
 * Lead notification via Resend.
 *
 * Sends an email notification to the configured admin address
 * when a new lead is created. Fails silently if env vars are
 * not configured so that lead creation is never blocked.
 *
 * Required env vars:
 *   RESEND_API_KEY          — Resend API key
 *   LEAD_NOTIFICATION_EMAIL — Admin email address to notify
 * Optional:
 *   RESEND_FROM_EMAIL       — Sender address (default: Skillary onboarding@resend.dev)
 *   NEXT_PUBLIC_APP_URL     — Base URL for admin link
 */

import { Resend } from "resend";

interface LeadData {
  id: string;
  name: string;
  email: string;
  whatsapp?: string | null;
  organization?: string | null;
  role?: string | null;
  inquiryType: string;
  programInterest?: string | null;
  sourcePage?: string | null;
  message: string;
}

export async function notifyNewLead(lead: LeadData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    // Not configured — skip silently
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const adminLink = `${baseUrl}/admin/leads/${lead.id}`;
    const orgLabel = lead.organization || lead.name;
    const subject = `New Skillary Lead: ${lead.inquiryType} — ${orgLabel}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Skillary CRM <onboarding@resend.dev>",
      to: notifyEmail,
      subject,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; color: #111; line-height: 1.6;">
          <h2 style="margin-bottom: 4px;">📩 New Lead Received</h2>
          <p style="color: #666; font-size: 13px; margin-top: 0;">From the Skillary website contact form</p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
            <tr><td style="padding: 6px 0; color: #888; width: 130px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${lead.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${lead.email}</td></tr>
            ${lead.whatsapp ? `<tr><td style="padding: 6px 0; color: #888;">WhatsApp</td><td style="padding: 6px 0;">${lead.whatsapp}</td></tr>` : ""}
            ${lead.organization ? `<tr><td style="padding: 6px 0; color: #888;">Organization</td><td style="padding: 6px 0;">${lead.organization}</td></tr>` : ""}
            ${lead.role ? `<tr><td style="padding: 6px 0; color: #888;">Role</td><td style="padding: 6px 0;">${lead.role}</td></tr>` : ""}
            <tr><td style="padding: 6px 0; color: #888;">Inquiry Type</td><td style="padding: 6px 0; font-weight: 600;">${lead.inquiryType}</td></tr>
            ${lead.programInterest ? `<tr><td style="padding: 6px 0; color: #888;">Program</td><td style="padding: 6px 0;">${lead.programInterest}</td></tr>` : ""}
            ${lead.sourcePage ? `<tr><td style="padding: 6px 0; color: #888;">Source</td><td style="padding: 6px 0;">${lead.sourcePage}</td></tr>` : ""}
          </table>

          <div style="background: #F8FAFC; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 14px;">
            <p style="margin: 0 0 4px 0; font-weight: 600; color: #444;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #333;">${lead.message}</p>
          </div>

          <a href="${adminLink}" style="display: inline-block; padding: 12px 24px; background: #1E3A8A; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 8px 0;">View in Lead CRM →</a>

          <p style="color: #999; font-size: 12px; margin-top: 20px;">This is an automated notification from Skillary Lead CRM.</p>
        </div>
      `,
    });
  } catch (err) {
    console.warn("Lead notification email failed:", err);
    // Never throw — lead creation must not be blocked by email failure
  }
}
