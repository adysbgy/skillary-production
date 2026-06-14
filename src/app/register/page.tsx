"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/Button";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed.");
                setLoading(false);
                return;
            }

            // Auto-login after registration
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Account created but sign-in failed. Please log in manually.");
                setLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    }

    return (
        <section className="relative overflow-hidden bg-[#FFFDF9]">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
            <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />
            <Container className="relative flex items-center justify-center py-16 lg:py-24">
                <Card className="w-full max-w-md p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Create your account</h1>
                        <p className="mt-2 text-sm text-black/55">Start your learning journey with Skillary.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-black/70 mb-1.5">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20"
                                placeholder="Your full name"
                            />
                        </div>
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
                                placeholder="At least 6 characters"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black/70 mb-1.5">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20"
                                placeholder="Repeat your password"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                        )}

                        <PrimaryButton className="w-full" disabled={loading}>
                            {loading ? "Creating account…" : "Create Account"}
                        </PrimaryButton>
                    </form>

                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <div className="h-px bg-black/10 w-full" />
                        <span className="text-xs text-black/40 font-medium uppercase tracking-wider">or</span>
                        <div className="h-px bg-black/10 w-full" />
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black/70 shadow-sm transition hover:bg-black/5"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                            <path
                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                fill="#EA4335"
                            />
                            <path
                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M5.26498 14.2949C5.02498 13.5699 4.875 12.8 4.875 12C4.875 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 12C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                fill="#34A853"
                            />
                        </svg>
                        Sign up with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-black/55">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[#FF8A00] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </Card>
            </Container>
        </section>
    );
}
