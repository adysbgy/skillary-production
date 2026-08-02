"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section className="relative overflow-hidden bg-[#FFFDF9] min-h-[80vh]">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
            <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />

            <Container className="relative flex items-center justify-center py-16 lg:py-24 h-full">
                <Card className="w-full max-w-md p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
                    <div className="text-center mb-8">
                        <Link href="/login" className="inline-block mb-4 text-xs font-semibold uppercase tracking-wider text-black/40 hover:text-black/70">
                            ← Back to Login
                        </Link>
                        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Reset Password</h1>
                        <p className="mt-2 text-sm text-black/55">Enter your email and we will send you a reset link.</p>
                    </div>

                    {status === "success" ? (
                        <div className="text-center py-4">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                ✓
                            </div>
                            <h3 className="text-lg font-medium text-black">Check your email</h3>
                            <p className="mt-2 text-sm text-black/60">If an account exists for that email, we have sent password reset instructions.</p>
                            <p className="mt-6 text-xs font-semibold text-[#FF8A00] bg-[#FF8A00]/10 p-3 rounded-lg border border-[#FF8A00]/20">
                                🔔 Beta Note: Since email transport is bypassed, check your local server console output for the mock URL link.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-black/70 mb-1.5">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {status === "error" && (
                                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">Something went wrong. Please try again.</p>
                            )}

                            <PrimaryButton className="w-full" disabled={status === "loading"}>
                                {status === "loading" ? "Sending..." : "Send Reset Link"}
                            </PrimaryButton>
                        </form>
                    )}
                </Card>
            </Container>
        </section>
    );
}
