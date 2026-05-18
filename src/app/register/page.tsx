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
