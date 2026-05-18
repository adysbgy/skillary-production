"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, SoftCard } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import type { CertificateDisplayState } from "@/lib/certificate-display";
import type { CertificateEligibilityState } from "@/lib/certificate-eligibility";

interface CertProps {
    state: CertificateDisplayState;
    hasAssessment: boolean;
    isPaid: boolean;
    programSlug: string;
    uniqueCode?: string;
    certificateMode?: string;
    eligibilityState?: CertificateEligibilityState;
    digitalCertificatePrice?: number | null;
    courseId?: string;
    pendingOrderId?: string;
}

export function CertificatePromoBanner({ hasAssessment, isPaid, certificateMode }: CertProps) {
    if (certificateMode === "DISABLED") return null;

    const conditionText = hasAssessment ? "Selesaikan kelas dan lulus assessment" : "Selesaikan seluruh materi";
    const isPaidDigital = certificateMode === "PAID_DIGITAL";

    return (
        <div className="bg-gradient-to-r from-[#FFF8EC] to-[#FFFDF9] border border-[rgb(255,138,0)]/30 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[rgb(255,138,0)]/20 text-3xl">
                🎓
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold tracking-tight text-black/90">
                    {isPaid ? "Sertifikat Digital Termasuk" : isPaidDigital ? "Sertifikat Digital Premium" : "Dapatkan Sertifikat Skillary"}
                </h3>
                <p className="mt-2 text-black/70 leading-relaxed max-w-3xl">
                    {isPaid
                        ? `Kelas ini sudah termasuk sertifikat digital terverifikasi setelah Anda menyelesaikan materi ${hasAssessment ? "dan lulus assessment" : ""}.`
                        : isPaidDigital
                            ? `${conditionText}, lalu buka sertifikat digital terverifikasi. Sertifikat dapat digunakan sebagai bukti pembelajaran, portofolio, atau dokumentasi pelatihan.`
                            : `${conditionText} untuk membuka sertifikat digital terverifikasi. Sertifikat dapat digunakan sebagai bukti pembelajaran, portofolio, atau dokumentasi pelatihan.`}
                </p>
            </div>
            <div className="shrink-0 mt-4 md:mt-0">
                <a href="#certificate-benefits">
                    <SecondaryButton className="bg-white">Lihat Benefit Sertifikat</SecondaryButton>
                </a>
            </div>
        </div>
    );
}

const formatIDR = (num: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

export function SidebarCertificateCard({
    state,
    hasAssessment,
    programSlug,
    uniqueCode,
    certificateMode,
    eligibilityState,
    digitalCertificatePrice,
    courseId,
    pendingOrderId,
}: CertProps) {
    const [claiming, setClaiming] = useState(false);
    const [claimResult, setClaimResult] = useState<{ code?: string; error?: string } | null>(null);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    if (certificateMode === "DISABLED" || state === "DISABLED") return null;

    const conditionText = hasAssessment ? "selesaikan materi, dan lulus assessment" : "selesaikan materi";
    const lockedConditionText = hasAssessment ? "Selesaikan seluruh materi dan lulus assessment" : "Selesaikan seluruh materi";
    const isPaidDigital = certificateMode === "PAID_DIGITAL";

    // --- PAID_DIGITAL state-specific content ---
    if (isPaidDigital && eligibilityState) {
        const paidContent = getPaidDigitalContent({
            eligibilityState,
            conditionText,
            lockedConditionText,
            programSlug,
            uniqueCode,
            digitalCertificatePrice,
            pendingOrderId,
        });

        if (!paidContent) return null;

        return (
            <Card className="p-6 border-2 border-[rgb(255,138,0)]/20 bg-[#FFFDF9]">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{paidContent.icon}</span>
                    <h3 className="font-bold text-lg">{paidContent.title}</h3>
                </div>
                <p className="text-sm text-black/70 leading-relaxed mb-4">
                    {paidContent.body}
                </p>

                {paidContent.price && (
                    <div className="mb-4 p-3 bg-[rgb(255,138,0)]/10 border border-[rgb(255,138,0)]/20 rounded-xl">
                        <p className="text-xs font-bold text-[#D48924] uppercase tracking-wider mb-1">Harga Sertifikat</p>
                        <p className="text-xl font-extrabold text-black/90">{formatIDR(paidContent.price)}</p>
                    </div>
                )}

                {claimResult?.code && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl">
                        <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-1">Sertifikat Diterbitkan!</p>
                        <Link href={`/certificate/${claimResult.code}`} className="text-sm font-bold text-green-700 hover:underline">
                            Lihat Sertifikat →
                        </Link>
                    </div>
                )}

                {claimResult?.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-xs text-red-600">{claimResult.error}</p>
                    </div>
                )}

                {uniqueCode && eligibilityState === "ISSUED" && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-xl">
                        <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-1">Verification ID</p>
                        <p className="text-sm font-mono text-green-900">{uniqueCode}</p>
                    </div>
                )}

                {paidContent.actionType === "link" && paidContent.href && (
                    <Link href={paidContent.href} className="block w-full">
                        <PrimaryButton className="w-full justify-center">{paidContent.cta}</PrimaryButton>
                    </Link>
                )}

                {paidContent.actionType === "checkout" && courseId && (
                    <button
                        disabled={checkoutLoading}
                        onClick={async () => {
                            setCheckoutLoading(true);
                            setClaimResult(null);
                            try {
                                const res = await fetch("/api/checkout/certificate", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ courseId }),
                                });
                                const data = await res.json();
                                if (!res.ok) {
                                    setClaimResult({ error: data.error || "Checkout failed." });
                                    return;
                                }
                                if (data.redirect) {
                                    window.location.href = data.redirect;
                                }
                            } catch {
                                setClaimResult({ error: "Terjadi kesalahan. Coba lagi." });
                            } finally {
                                setCheckoutLoading(false);
                            }
                        }}
                        className="w-full rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {checkoutLoading ? "Memproses…" : paidContent.cta}
                    </button>
                )}

                {paidContent.actionType === "claim" && courseId && (
                    <button
                        disabled={claiming}
                        onClick={async () => {
                            setClaiming(true);
                            setClaimResult(null);
                            try {
                                const res = await fetch("/api/certificates/claim", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ courseId }),
                                });
                                const data = await res.json();
                                if (!res.ok) {
                                    setClaimResult({ error: data.error || "Gagal mengklaim sertifikat." });
                                    return;
                                }
                                setClaimResult({ code: data.certificateCode });
                            } catch {
                                setClaimResult({ error: "Terjadi kesalahan. Coba lagi." });
                            } finally {
                                setClaiming(false);
                            }
                        }}
                        className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {claiming ? "Mengklaim…" : paidContent.cta}
                    </button>
                )}

                <CertificateBenefitList />
            </Card>
        );
    }

    // --- INCLUDED mode (existing behavior) ---
    const content = {
        NOT_LOGGED_IN: {
            title: "Sertifikat Skillary Tersedia",
            body: "Masuk atau daftar untuk mulai belajar dan membuka sertifikat setelah menyelesaikan kelas.",
            cta: "Masuk untuk Mulai",
            href: `/login?redirect=/program/${programSlug}`,
            primary: false,
            actionType: "link" as const,
        },
        NOT_ENROLLED: {
            title: "Sertifikat Tersedia",
            body: `Enroll ke kelas ini, ${conditionText} untuk membuka Sertifikat Skillary.`,
            cta: "Enroll Kelas",
            href: `#`,
            primary: true,
            actionType: "none" as const,
        },
        LOCKED: {
            title: "Sertifikat Terkunci",
            body: `${lockedConditionText} untuk membuka Sertifikat Skillary.`,
            cta: "Lanjutkan Belajar",
            href: `/learn/${programSlug}`,
            primary: true,
            actionType: "link" as const,
        },
        READY: {
            title: "Sertifikat Siap Diklaim",
            body: "Anda telah menyelesaikan kelas ini. Klaim sertifikat Anda sekarang.",
            cta: "Klaim Sertifikat",
            href: "#",
            primary: true,
            actionType: "claim" as const,
        },
        ISSUED: {
            title: "Sertifikat Terverifikasi",
            body: "Sertifikat Anda sudah tersedia dan dapat dibagikan sebagai bukti pembelajaran.",
            cta: "Lihat Sertifikat",
            href: `/certificate/${uniqueCode || ""}`,
            primary: true,
            actionType: "link" as const,
        },
        DISABLED: {
            title: "",
            body: "",
            cta: "",
            href: "",
            primary: false,
            actionType: "none" as const,
        },
    }[state];

    return (
        <Card className="p-6 border-2 border-[rgb(255,138,0)]/20 bg-[#FFFDF9]">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎓</span>
                <h3 className="font-bold text-lg">{content.title}</h3>
            </div>
            <p className="text-sm text-black/70 leading-relaxed mb-6">
                {content.body}
            </p>

            {state === "ISSUED" && uniqueCode && (
                <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-xl">
                    <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-1">Verification ID</p>
                    <p className="text-sm font-mono text-green-900">{uniqueCode}</p>
                </div>
            )}

            {claimResult?.code && (
                <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl">
                    <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-1">Sertifikat Diterbitkan!</p>
                    <Link href={`/certificate/${claimResult.code}`} className="text-sm font-bold text-green-700 hover:underline">
                        Lihat Sertifikat →
                    </Link>
                </div>
            )}

            {claimResult?.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs text-red-600">{claimResult.error}</p>
                </div>
            )}

            {content.actionType === "none" ? (
                <p className="text-xs text-black/50 text-center mb-2 italic">Gunakan tombol Enroll di sebelah kiri</p>
            ) : content.actionType === "claim" && courseId ? (
                <button
                    disabled={claiming}
                    onClick={async () => {
                        setClaiming(true);
                        setClaimResult(null);
                        try {
                            const res = await fetch("/api/certificates/claim", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ courseId }),
                            });
                            const data = await res.json();
                            if (!res.ok) {
                                setClaimResult({ error: data.error || "Gagal mengklaim sertifikat." });
                                return;
                            }
                            setClaimResult({ code: data.certificateCode });
                        } catch {
                            setClaimResult({ error: "Terjadi kesalahan. Coba lagi." });
                        } finally {
                            setClaiming(false);
                        }
                    }}
                    className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {claiming ? "Mengklaim…" : content.cta}
                </button>
            ) : (
                <Link href={content.href} className="block w-full">
                    {content.primary ? (
                        <PrimaryButton className="w-full justify-center">{content.cta}</PrimaryButton>
                    ) : (
                        <SecondaryButton className="w-full justify-center">{content.cta}</SecondaryButton>
                    )}
                </Link>
            )}

            <CertificateBenefitList />
        </Card>
    );
}

function CertificateBenefitList() {
    return (
        <div className="mt-6 pt-6 border-t border-black/5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-4">Benefit</p>
            {["Sertifikat Digital PDF", "Verification ID", "Shareable Link", "Bukti Pembelajaran"].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-black/60">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{b}</span>
                </div>
            ))}
        </div>
    );
}

function getPaidDigitalContent(opts: {
    eligibilityState: CertificateEligibilityState;
    conditionText: string;
    lockedConditionText: string;
    programSlug: string;
    uniqueCode?: string;
    digitalCertificatePrice?: number | null;
    pendingOrderId?: string;
}) {
    const { eligibilityState, lockedConditionText, programSlug, uniqueCode, digitalCertificatePrice, pendingOrderId } = opts;

    switch (eligibilityState) {
        case "NOT_ENROLLED":
            return {
                icon: "🎓",
                title: "Sertifikat Digital Premium",
                body: "Enroll ke kelas ini dan selesaikan materi untuk membuka sertifikat digital premium.",
                cta: "",
                href: "",
                actionType: "none" as const,
                price: digitalCertificatePrice,
            };
        case "NOT_COMPLETED":
            return {
                icon: "🔒",
                title: "Sertifikat Terkunci",
                body: `${lockedConditionText} untuk membuka akses pembelian sertifikat digital.`,
                cta: "Lanjutkan Belajar",
                href: `/learn/${programSlug}`,
                actionType: "link" as const,
                price: digitalCertificatePrice,
            };
        case "ASSESSMENT_NOT_PASSED":
            return {
                icon: "📝",
                title: "Assessment Belum Lulus",
                body: "Anda harus lulus assessment yang diwajibkan sebelum dapat membeli sertifikat digital.",
                cta: "Lanjutkan Belajar",
                href: `/learn/${programSlug}`,
                actionType: "link" as const,
                price: null,
            };
        case "PAYMENT_REQUIRED":
            return {
                icon: "🎓",
                title: "Sertifikat Digital Siap Dibuka",
                body: "Selamat! Anda telah menyelesaikan kelas ini. Buka sertifikat digital terverifikasi Anda.",
                cta: "Unlock Digital Certificate",
                href: "",
                actionType: "checkout" as const,
                price: digitalCertificatePrice,
            };
        case "PAYMENT_PENDING":
            return {
                icon: "⏳",
                title: "Pembayaran Sertifikat Menunggu",
                body: "Pembayaran sertifikat Anda sedang diproses. Selesaikan pembayaran atau cek status.",
                cta: pendingOrderId ? "Lanjutkan Pembayaran" : "Cek Status Pembayaran",
                href: pendingOrderId ? `/checkout/${pendingOrderId}` : "#",
                actionType: "link" as const,
                price: null,
            };
        case "PAID_READY_TO_CLAIM":
            return {
                icon: "✅",
                title: "Sertifikat Siap Diklaim",
                body: "Pembayaran berhasil! Klaim sertifikat digital terverifikasi Anda sekarang.",
                cta: "Klaim Sertifikat",
                href: "",
                actionType: "claim" as const,
                price: null,
            };
        case "ISSUED":
            return {
                icon: "🏆",
                title: "Sertifikat Terverifikasi",
                body: "Sertifikat Anda sudah tersedia dan dapat dibagikan sebagai bukti pembelajaran.",
                cta: "Lihat Sertifikat",
                href: `/certificate/${uniqueCode || ""}`,
                actionType: "link" as const,
                price: null,
            };
        default:
            return null;
    }
}

export function CertificateBenefitSection({ hasAssessment, programTitle }: { hasAssessment: boolean; programTitle: string }) {
    const conditionText = hasAssessment ? "completion dan assessment" : "penyelesaian kelas";

    return (
        <section id="certificate-benefits" className="py-16 lg:py-24 border-t border-black/5 bg-[#FFFDF9]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-center">
                    <div className="space-y-8">
                        <div>
                            <p className="text-sm font-bold tracking-[0.2em] uppercase text-[rgb(255,90,95)] mb-3">Official Credential</p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Kenapa Sertifikat Skillary?</h2>
                            <p className="mt-4 text-lg text-black/60 leading-relaxed max-w-xl">
                                Sertifikat Skillary bukan hanya tanda selesai. Setiap sertifikat dilengkapi Verification ID dan dapat digunakan sebagai bukti pembelajaran, portofolio, maupun dokumentasi pelatihan.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Terverifikasi dengan Verification ID",
                                "Bisa dibagikan secara digital",
                                "Dapat digunakan sebagai bukti pelatihan",
                                `Diterbitkan setelah ${conditionText}`,
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-black/80 font-medium">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 -translate-x-4 translate-y-4 bg-[rgb(255,138,0)]/10 rounded-3xl" />
                        <div className="relative bg-white border border-black/10 shadow-2xl rounded-3xl p-8 lg:p-12 aspect-[1.414/1] flex flex-col justify-between overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[rgb(255,138,0)]/20 to-transparent rounded-bl-full -mr-20 -mt-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[rgb(255,90,95)]/10 to-transparent rounded-tr-full -ml-10 -mb-10 pointer-events-none" />

                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <p className="text-3xl font-black tracking-tighter">Skillary</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold uppercase tracking-widest text-[rgb(255,90,95)]">Certificate of Completion</p>
                                    <p className="text-[10px] text-black/40 mt-1 font-mono">VERIFIED CREDENTIAL</p>
                                </div>
                            </div>

                            <div className="text-center relative z-10 space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">This is to certify that</p>
                                    <h3 className="text-3xl font-serif text-black/90 pb-2 border-b-2 border-black/10 inline-block px-8">Nama Peserta</h3>
                                </div>
                                <div>
                                    <p className="text-sm text-black/60 mb-2">has successfully completed the program</p>
                                    <h4 className="text-xl font-bold tracking-tight text-black">{programTitle}</h4>
                                </div>
                            </div>

                            <div className="flex justify-between items-end relative z-10">
                                <div className="flex gap-8">
                                    <div>
                                        <div className="w-24 h-px bg-black/20 mb-2" />
                                        <p className="text-[10px] uppercase tracking-wider text-black/50">Date Issued</p>
                                        <p className="text-xs font-medium">DD / MM / YYYY</p>
                                    </div>
                                    <div>
                                        <div className="w-32 h-px bg-black/20 mb-2" />
                                        <p className="text-[10px] uppercase tracking-wider text-black/50">Verification ID</p>
                                        <p className="text-xs font-mono">SKL-XXXXX-XXXXX</p>
                                    </div>
                                </div>
                                <div className="w-16 h-16 border-4 border-black/5 rounded-lg flex items-center justify-center p-1">
                                    {/* Mock QR */}
                                    <div className="w-full h-full bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:4px_4px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
