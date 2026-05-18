"use client";

import { Suspense } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/Button";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password.");
            setLoading(false);
        } else {
            router.push(redirect);
            router.refresh();
        }
    }

    return (
        <Card className="w-full max-w-md p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold tracking-[-0.04em]">Welcome back</h1>
                <p className="mt-2 text-sm text-black/55">Sign in to continue your learning journey.</p>
            </div>

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
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black/70 mb-1.5">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20"
                        placeholder="••••••••"
                    />
                </div>

                <div className="flex items-center justify-end">
                    <Link href="/forgot-password" className="text-sm font-medium text-black/60 hover:text-[#FF8A00] transition-colors">
                        Forgot password?
                    </Link>
                </div>

                {error && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <PrimaryButton className="w-full" disabled={loading}>
                    {loading ? "Signing in…" : "Sign In"}
                </PrimaryButton>
            </form>

            <p className="mt-6 text-center text-sm text-black/55">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-[#FF8A00] hover:underline">
                    Create one
                </Link>
            </p>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <section className="relative overflow-hidden bg-[#FFFDF9]">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
            <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />
            <Container className="relative flex items-center justify-center py-16 lg:py-24">
                <Suspense fallback={
                    <Card className="w-full max-w-md p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] text-center">
                        <p className="text-sm text-black/40">Loading…</p>
                    </Card>
                }>
                    <LoginForm />
                </Suspense>
            </Container>
        </section>
    );
}
