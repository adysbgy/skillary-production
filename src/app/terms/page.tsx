import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Skillary",
    description: "Terms and conditions for using the Skillary learning platform.",
};

export default function TermsPage() {
    return (
        <MarketingShell showFooter={false}>
            <PageHero
                eyebrow="Legal"
                title="Terms of Service"
                description="Last updated: April 15, 2025"
            />
            <Container className="py-16 lg:py-24">
                <div className="prose prose-neutral mx-auto max-w-3xl text-black/70 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-black [&_p]:leading-7 [&_ul]:space-y-2 [&_ul]:leading-7 [&_li]:pl-1">

                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using Skillary (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use the Platform.</p>

                    <h2>2. Description of Service</h2>
                    <p>Skillary is a modern learning platform that provides curated courses, guided projects, learning paths, and certificates for business and digital skills. The Platform serves as a catalog of learning programs and a lead generation channel for educational services.</p>

                    <h2>3. Use of the Platform</h2>
                    <p>You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                    <ul>
                        <li>Use the Platform in any way that violates applicable laws or regulations.</li>
                        <li>Attempt to interfere with the proper functioning of the Platform.</li>
                        <li>Reproduce, distribute, or create derivative works from any content without express permission.</li>
                        <li>Use automated tools to scrape, crawl, or extract content from the Platform.</li>
                    </ul>

                    <h2>4. Intellectual Property</h2>
                    <p>All content on the Platform—including text, graphics, logos, images, course materials, and software—is the property of Skillary or its content licensors and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written permission.</p>

                    <h2>5. Program Enrollment & Payments</h2>
                    <p>Some programs may require enrollment or payment. Specific terms related to pricing, refunds, and enrollment processes will be communicated at the time of registration. Skillary reserves the right to modify program pricing and availability at any time.</p>

                    <h2>6. User Submissions</h2>
                    <p>When you submit information through contact forms or other features on the Platform, you grant Skillary the right to use that information for the purpose of responding to your inquiry and improving our services. We will handle your personal data in accordance with our Privacy Policy.</p>

                    <h2>7. Disclaimers</h2>
                    <p>The Platform and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied. Skillary does not guarantee that:</p>
                    <ul>
                        <li>The Platform will be available at all times without interruption.</li>
                        <li>Any specific learning outcomes or career results will be achieved.</li>
                        <li>All information on the Platform is completely accurate or current.</li>
                    </ul>

                    <h2>8. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Skillary shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Platform, even if we have been advised of the possibility of such damages.</p>

                    <h2>9. Modifications</h2>
                    <p>Skillary reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Platform following any changes constitutes acceptance of the updated Terms.</p>

                    <h2>10. Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia, without regard to conflict of law provisions.</p>

                    <h2>11. Contact</h2>
                    <p>For questions about these Terms, please contact us at <a href="mailto:hello@skillary.id" className="font-semibold underline decoration-[rgb(255,138,0)]/30 hover:decoration-[rgb(255,138,0)]" style={{ color: 'rgb(255, 138, 0)' }}>hello@skillary.id</a>.</p>

                </div>
            </Container>
        </MarketingShell>
    );
}
