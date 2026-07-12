"use client";

import { useState } from "react";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

interface ToolbarProps {
    uniqueCode: string;
    courseSlug?: string | null;
    eventSlug?: string | null;
}

export default function CertificateToolbar({ uniqueCode, courseSlug, eventSlug }: ToolbarProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = `${window.location.origin}/certificate/${uniqueCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-black/5 rounded-2xl shadow-sm relative z-20">
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                    onClick={handleCopy}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-black/[0.03] hover:bg-black/10 text-black/80 font-semibold text-sm rounded-xl transition-colors border border-black/5 flex items-center justify-center gap-2"
                >
                    {copied ? (
                        <>
                            <span className="text-green-600">✓</span> Copied to Clipboard
                        </>
                    ) : (
                        <>
                            🔗 Copy Verification Link
                        </>
                    )}
                </button>
            </div>
            {(courseSlug || eventSlug) && (
                <div className="w-full sm:w-auto flex items-center gap-3">
                    <Link href={courseSlug ? `/program/${courseSlug}` : `/v2/events/${eventSlug}`} className="w-full sm:w-auto">
                        <PrimaryButton className="w-full sm:w-auto px-6 py-2.5 shadow-sm text-sm">
                            {courseSlug ? "View Course Details →" : "View Event Details →"}
                        </PrimaryButton>
                    </Link>
                </div>
            )}
        </div>
    );
}
