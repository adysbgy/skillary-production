import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Skillary",
    description: "How Skillary collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    return (
        <MarketingShell showFooter={false}>
            <PageHero
                eyebrow="Legal"
                title="Privacy Policy"
                description="Last updated: April 15, 2025"
            />
            <Container className="py-16 lg:py-24">
                <div className="prose prose-neutral mx-auto max-w-3xl text-black/70 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-black [&_p]:leading-7 [&_ul]:space-y-2 [&_ul]:leading-7 [&_li]:pl-1">

                    <h2>1. Information We Collect</h2>
                    <p>When you use Skillary, we may collect the following types of information:</p>
                    <ul>
                        <li><strong>Contact Information:</strong> Name, email address, and organization name when you submit a form or register interest in our programs.</li>
                        <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and general browsing patterns for improving our platform experience.</li>
                        <li><strong>Device Information:</strong> Browser type, operating system, and screen resolution to optimize display and performance.</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Respond to your inquiries and provide information about our programs.</li>
                        <li>Send relevant updates about courses, events, and learning opportunities you have expressed interest in.</li>
                        <li>Improve our website, content, and overall user experience.</li>
                        <li>Comply with legal obligations and protect our rights.</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Trusted third-party tools that help us operate our platform (e.g., form processing, analytics). These providers are obligated to protect your data.</li>
                        <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                    </ul>

                    <h2>4. Cookies & Analytics</h2>
                    <p>Skillary may use cookies and similar technologies to enhance your browsing experience and collect anonymous usage statistics. You can manage cookie preferences through your browser settings at any time.</p>

                    <h2>5. Data Security</h2>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

                    <h2>6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Request access to the personal data we hold about you.</li>
                        <li>Request correction or deletion of your personal data.</li>
                        <li>Opt out of marketing communications at any time.</li>
                        <li>Withdraw consent where processing is based on consent.</li>
                    </ul>

                    <h2>7. Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies independently.</p>

                    <h2>8. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of Skillary after changes constitutes acceptance of the revised policy.</p>

                    <h2>9. Contact Us</h2>
                    <p>If you have questions about this Privacy Policy or how we handle your data, please contact us at <a href="mailto:hello@skillary.id" className="font-semibold underline decoration-[rgb(255,138,0)]/30 hover:decoration-[rgb(255,138,0)]" style={{ color: 'rgb(255, 138, 0)' }}>hello@skillary.id</a>.</p>

                </div>
            </Container>
        </MarketingShell>
    );
}
