import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card, SoftCard } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getCertificateState } from "@/lib/certificate-display";
import { CertificatePromoBanner, SidebarCertificateCard, CertificateBenefitSection } from "@/components/certificate/CertificateUpsell";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const program = await prisma.course.findUnique({ where: { slug: id } });
    if (!program) return { title: "Program Not Found | Skillary" };
    return {
        title: `${program.title} | Skillary`,
        description: program.description,
        alternates: { canonical: `/program/${program.slug}` },
    };
}

export default async function ProgramDetailPage({ params }: Props) {
    const { id } = await params;
    const session = await auth();
    const program = await prisma.course.findUnique({ where: { slug: id }, include: { modules: true } });
    if (!program) notFound();

    if (program.status !== "PUBLISHED") {
        const { canPreviewCourse } = await import("@/lib/entitlements");
        const canPreview = await canPreviewCourse(session?.user?.id, program.id);
        if (!canPreview) notFound();
    }

    const { state: certState, hasAssessment, uniqueCode, certificateMode } = await getCertificateState(program.id, session?.user?.id);

    // Fetch certificate eligibility for logged-in users (needed for PAID_DIGITAL flow)
    let eligibilityState: string | undefined;
    let digitalCertificatePrice: number | null = null;
    let pendingOrderId: string | undefined;
    if (session?.user?.id) {
        const { getCertificateEligibility } = await import("@/lib/certificate-eligibility");
        const elig = await getCertificateEligibility(session.user.id, program.id);
        eligibilityState = elig.state;
        digitalCertificatePrice = elig.price;
        pendingOrderId = elig.pendingCertificateOrder?.id ?? undefined;
    } else {
        digitalCertificatePrice = (program as any).digitalCertificatePrice ?? null;
    }

    let outcomes: string[] = [];
    let audience: string[] = [];
    let prerequisites: string[] = [];
    try {
        if ((program as any).outcomesData) outcomes = JSON.parse((program as any).outcomesData);
        if ((program as any).audienceData) audience = JSON.parse((program as any).audienceData);
        if ((program as any).prerequisitesData) prerequisites = JSON.parse((program as any).prerequisitesData);
    } catch { }

    async function handleFreeEnroll() {
        "use server";
        const session = await auth();
        if (!session?.user?.email) redirect(`/login?redirect=/program/${program!.slug}`);

        const { isCourseFree } = await import("@/lib/entitlements");
        const trulyFree = await isCourseFree(program!.id);

        if (!trulyFree) {
            throw new Error("This course is not free. Please use standard checkout.");
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) throw new Error("User record not found");

        const existing = await (prisma as any).enrollment.findUnique({
            where: { userId_courseId: { userId: user.id, courseId: program!.id } }
        });

        if (!existing) {
            await (prisma as any).enrollment.create({
                data: { userId: user.id, courseId: program!.id, source: "FREE" }
            });
        } else if (existing.revokedAt !== null) {
            throw new Error("Access revoked. Please contact support.");
        }

        redirect(`/learn/${program!.slug}`);
    }

    async function handlePaidCheckout() {
        "use server";
        const session = await auth();
        if (!session?.user?.id) redirect(`/login?redirect=/program/${program!.slug}`);

        // Check if already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: { userId_courseId: { userId: session.user.id, courseId: program!.id } },
        });
        if (existingEnrollment) redirect(`/learn/${program!.slug}`);

        // Check for existing pending order
        const pendingOrder = await (prisma as any).paymentOrder.findFirst({
            where: { userId: session.user.id, courseId: program!.id, status: "PENDING" },
            orderBy: { createdAt: "desc" },
        });
        if (pendingOrder) redirect(`/checkout/${pendingOrder.id}`);

        // Create new payment order
        const order = await (prisma as any).paymentOrder.create({
            data: {
                userId: session.user.id,
                courseId: program!.id,
                productType: "COURSE",
                amount: (program as any).price,
                status: "PENDING",
            },
        });

        try {
            const serverKey = process.env.MIDTRANS_SERVER_KEY;
            if (serverKey) {
                const isProd = process.env.NODE_ENV === "production" && !serverKey.includes("SB-");
                const apiUrl = isProd ? "https://app.midtrans.com/snap/v1/transactions" : "https://app.sandbox.midtrans.com/snap/v1/transactions";
                const midtransRes = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${btoa(serverKey + ":")}`
                    },
                    body: JSON.stringify({
                        transaction_details: {
                            order_id: order.id,
                            gross_amount: Math.round((program as any).price)
                        }
                    })
                });
                const midtransData = await midtransRes.json();
                if (midtransData?.token) {
                    await (prisma as any).paymentOrder.update({
                        where: { id: order.id },
                        data: { gatewayRef: midtransData.token }
                    });
                }
            }
        } catch (error) {
            console.error("Midtrans handshake failed:", error);
        }

        redirect(`/checkout/${order.id}`);
    }

    return (
        <>
            <section className="relative overflow-hidden bg-white" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
                <div className="absolute right-0 top-10 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />
                <Container className="relative py-16 lg:py-24">
                    <Link href="/explore">
                        <button className="mb-6 px-4 py-2 rounded-full bg-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>← Kembali ke Explore</button>
                    </Link>
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                        <div className="animate-fade-in-up">
                            <div className="mb-4 flex flex-wrap gap-3">
                                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>Self-Paced Core</span>
                                <Pill>{program.level}</Pill>
                                <Pill>{program.duration || "Accelerated"}</Pill>
                                <Pill>Certificate</Pill>
                            </div>
                            <h1 className="max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                                {program.title.split(" ").slice(0, -1).join(" ")}{" "}
                                <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                    {program.title.split(" ").slice(-1)[0] || ""}
                                </span>
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">{program.description}</p>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                {(program as any).price > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl font-bold tracking-tight text-black/50">Rp {((program as any).price).toLocaleString('id-ID')}</span>
                                            <form action={handlePaidCheckout}>
                                                <PrimaryButton type="button" disabled className="opacity-60 cursor-not-allowed hover:-translate-y-0 text-black/70 bg-black/10 shadow-none">Closed for Beta</PrimaryButton>
                                            </form>
                                        </div>
                                        <p className="text-xs font-semibold tracking-wide text-[rgb(255,90,95)]">This paid course is not available during the current free beta.</p>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">Free</span>
                                        <form action={handleFreeEnroll}>
                                            <PrimaryButton type="submit">Enroll Now — Free</PrimaryButton>
                                        </form>
                                    </>
                                )}
                                <Link href="/explore" className="inline-block">
                                    <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>Lihat Program Lain</button>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Thumbnail */}
                            {(program as any).thumbnailUrl ? (
                                <div className="rounded-2xl overflow-hidden shadow-xl border border-black/5">
                                    <img src={(program as any).thumbnailUrl} alt={program.title} className="w-full h-48 lg:h-56 object-cover" />
                                </div>
                            ) : (
                                <div className="rounded-2xl h-48 lg:h-56 flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0, 0.1), rgb(255, 244, 232), rgb(255, 90, 95, 0.08))', border: '1.5px solid rgb(240, 217, 200)' }}>
                                    <span className="text-4xl font-bold text-black/[0.06] tracking-tight">Skillary</span>
                                </div>
                            )}

                            <Card className="p-6">
                                <SectionTitle eyebrow="Snapshot" title="Program overview" description={`A practical flow designed for ${program.level.toLowerCase()}-level learners.`} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {[["Format", "Self-Paced"], ["Duration", program.duration || "Self-Paced"], ["Level", program.level], ["Certificate", "Included"], ["Price", (program as any).price > 0 ? `Rp ${((program as any).price).toLocaleString('id-ID')}` : "Free"]].map(([label, value]) => (
                                        <SoftCard key={label} className="p-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">{label}</p>
                                            <p className="mt-2 text-sm font-semibold text-black/75">{value}</p>
                                        </SoftCard>
                                    ))}
                                </div>
                            </Card>

                            <SidebarCertificateCard 
                                state={certState} 
                                hasAssessment={hasAssessment} 
                                isPaid={(program as any).price > 0} 
                                programSlug={program.slug} 
                                uniqueCode={uniqueCode}
                                certificateMode={certificateMode}
                                eligibilityState={eligibilityState as any}
                                digitalCertificatePrice={digitalCertificatePrice}
                                courseId={program.id}
                                pendingOrderId={pendingOrderId}
                            />
                        </div>
                    </div>
                </Container>
            </section>

            <Container className="py-8">
                <CertificatePromoBanner 
                    state={certState} 
                    hasAssessment={hasAssessment} 
                    isPaid={(program as any).price > 0} 
                    programSlug={program.slug}
                    certificateMode={certificateMode}
                />
            </Container>

            <Container className="py-16 lg:py-24">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
                    <div className="space-y-8">
                        {outcomes.length > 0 && (
                            <Card className="p-6 lg:p-8">
                                <SectionTitle eyebrow="What You'll Learn" title="Clear practical outcomes" />
                                <div className="grid gap-4 md:grid-cols-2">
                                    {outcomes.map((item) => (
                                        <SoftCard key={item} className="p-4"><p className="text-sm font-medium leading-7 text-black/75">{item}</p></SoftCard>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    <div className="space-y-8">
                        {audience.length > 0 && (
                            <Card className="p-6">
                                <SectionTitle eyebrow="Who It's For" title="Designed for learners who need clarity" />
                                <div className="space-y-3">
                                    {audience.map((item) => (
                                        <SoftCard key={item} className="flex items-start gap-3 px-4 py-3">
                                            <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#181818]" />
                                            <p className="text-sm leading-7 text-black/70">{item}</p>
                                        </SoftCard>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {prerequisites.length > 0 && (
                            <Card className="p-6">
                                <SectionTitle eyebrow="Requirements" title="Before you start" />
                                <div className="space-y-3">
                                    {prerequisites.map((item) => (
                                        <SoftCard key={item} className="flex items-start gap-3 px-4 py-3 bg-red-50/30 border-red-100">
                                            <span className="text-red-500 font-bold shrink-0 mt-0.5">!</span>
                                            <p className="text-sm leading-7 text-black/70">{item}</p>
                                        </SoftCard>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </Container>

            <Container className="py-16 pb-24 lg:py-24 lg:pb-32">
                <Card className="p-6 lg:p-8">
                    <SectionTitle eyebrow="Modules" title="A structured learning flow" description={`Move from understanding into practical application through ${program.modules.length} clear modules.`} />
                    <div className="space-y-4">
                        {program.modules.map((module, index) => (
                            <div key={module.id} className="rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', background: 'rgb(255, 251, 245)' }}>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>0{index + 1}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold tracking-tight">{module.title}</h3>
                                        <p className="mt-2 text-sm leading-7 text-black/60">Module objectives and implementation strategy.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </Container>

            <CertificateBenefitSection 
                hasAssessment={hasAssessment} 
                programTitle={program.title} 
            />
        </>
    );
}
