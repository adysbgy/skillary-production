import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import CertificateToolbar from "./CertificateToolbar";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CertificateVerificationPage({ params }: { params: Promise<{ uniqueCode: string }> }) {
    const { uniqueCode } = await params;
    const certificate = await prisma.certificate.findUnique({
        where: { uniqueCode },
        include: { user: true, course: true }
    });

    if (!certificate) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white border border-black/10 rounded-2xl p-10 max-w-lg w-full shadow-lg text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    <div className="mx-auto h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <span className="text-red-500 text-2xl font-bold">✕</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 text-black">Certificate Not Found</h2>
                    <p className="text-black/60 mb-8">
                        This credential link is invalid or no longer available. Please verify the unique code and try again.
                    </p>
                    <Link href="/" className="inline-block bg-[white] text-black border border-black/20 px-6 py-3 rounded-lg text-sm font-medium hover:bg-black/5 transition shadow-sm">
                        Return to Skillary
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF9] py-12 md:py-20 flex flex-col items-center px-4">
            <Container className="max-w-3xl w-full flex flex-col gap-6">

                <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-black mb-4 md:mb-0">Credential Verification</h1>
                </div>

                <div className="bg-white border border-black/10 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden w-full">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-[6px]" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }} />

                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-black/5">
                        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                            <span className="text-green-600 text-xl font-bold">✓</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-black">Verified Credential</h2>
                            <p className="text-sm text-black/60">This certificate is permanently verifiable via Skillary.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        <div>
                            <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-1">Issued To</p>
                            <p className="text-lg font-medium text-black">{certificate.user.name}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-1">Program</p>
                            <p className="text-lg font-medium text-black line-clamp-2">{certificate.course.title}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-1">Issuer</p>
                            <p className="text-lg font-medium text-black">Skillary Platform</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-1">Issue Date</p>
                            <p className="text-lg font-medium text-black">{certificate.issuedAt.toLocaleDateString()}</p>
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-1">Verification ID</p>
                            <p className="text-sm font-mono text-black/70 bg-black/5 px-3 py-2 rounded border border-black/10 inline-block">
                                {certificate.uniqueCode}
                            </p>
                        </div>
                    </div>
                </div>

                <CertificateToolbar uniqueCode={certificate.uniqueCode} courseSlug={certificate.course.slug} />

                <div className="text-center mt-2">
                    <p className="text-xs text-black/40">
                        Skillary guarantees the cryptographically secured issuing record of this credential.
                    </p>
                </div>
            </Container>
        </div>
    );
}
