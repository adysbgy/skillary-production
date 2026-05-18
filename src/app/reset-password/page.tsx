"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/Button";

function ResetForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    if (!token) {
        return (
            <div className="text-center py-6">
                <p className="text-red-500 font-medium mb-4">Invalid or missing reset token.</p>
                <Link href="/forgot-password" className="text-sm text-[#FF8A00] font-semibold hover:underline">
                    Request a new link
                </Link>
            </div>
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setStatus("error");
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
            } else {
                setErrorMessage(data.error || "Failed to reset password. The link might be expired.");
                setStatus("error");
            }
        } catch {
            setErrorMessage("An unexpected error occurred.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="text-center py-4">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                </div>
                <h3 className="text-lg font-medium text-black">Password Reset Complete</h3>
                <p className="mt-2 text-sm text-black/60 mb-6">Your password has been successfully updated.</p>
                <Link href="/login">
                    <PrimaryButton className="w-full">Go to Login</PrimaryButton>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-black/70 mb-1.5">New Password</label>
                <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20"
                    placeholder="••••••••"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black/70 mb-1.5">Confirm New Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20"
                    placeholder="••••••••"
                />
            </div>

            {status === "error" && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{errorMessage}</p>
            )}

            <PrimaryButton className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Resetting..." : "Update Password"}
            </PrimaryButton>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <section className="relative overflow-hidden bg-[#FFFDF9] min-h-[80vh]">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
            <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />

            <Container className="relative flex items-center justify-center py-16 lg:py-24 h-full">
                <Card className="w-full max-w-md p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Create New Password</h1>
                        <p className="mt-2 text-sm text-black/55">Enter a strong, new password below.</p>
                    </div>

                    <Suspense fallback={<p className="text-sm text-center text-black/40">Loading token details...</p>}>
                        <ResetForm />
                    </Suspense>
                </Card>
            </Container>
        </section>
    );
}
