"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

interface OrderData {
    id: string;
    amount: number;
    status: string;
    gatewayRef?: string;
    course: { title: string; slug: string; level: string; duration: string; };
}

export default function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params);
    const router = useRouter();
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`/api/checkout/${orderId}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) { setError(data.error); }
                else { setOrder(data); }
                setLoading(false);
            })
            .catch(() => { setError("Failed to load order"); setLoading(false); });
    }, [orderId]);

    // Simulate payment confirmation (replaces Midtrans Snap popup in production)
    async function handleSimulatePayment() {
        setProcessing(true);
        setError("");
        try {
            const res = await fetch("/api/checkout/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: orderId, transaction_status: "settlement", status: "PAID" }),
            });
            const data = await res.json();
            if (data.success && data.status === "PAID") {
                setOrder(prev => prev ? { ...prev, status: "PAID" } : prev);
                setTimeout(() => router.push(`/learn/${order?.course.slug}`), 1500);
            } else {
                setError("Payment processing failed. Please try again.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setProcessing(false);
        }
    }

    if (loading) return <div className="flex items-center justify-center min-h-[60vh] text-black/50">Loading checkout...</div>;
    if (error && !order) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Link href="/explore"><SecondaryButton>Back to Catalog</SecondaryButton></Link>
        </div>
    );

    if (!order) return null;

    const isPaid = order.status === "PAID";

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <Link href="/explore" className="text-sm text-black/45 hover:text-black transition mb-6 inline-block font-medium">← Back to Catalog</Link>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] mb-2">Checkout</h1>
            <p className="text-black/50 text-sm mb-8">Complete your payment to start learning.</p>

            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">{error}</div>}

            <Card className="p-6 border border-black/10 mb-6">
                <h2 className="text-xs uppercase tracking-widest text-black/40 font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg">{order.course.title}</h3>
                            <p className="text-sm text-black/50">{order.course.level} · {order.course.duration || "Self-paced"}</p>
                        </div>
                    </div>
                    <div className="border-t border-black/5 pt-3 flex justify-between items-center">
                        <span className="font-medium text-black/60">Total</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(255,138,0)] to-[rgb(255,90,95)]">
                            Rp {order.amount.toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            </Card>

            {isPaid ? (
                <Card className="p-8 text-center border-green-200 bg-green-50/50 border">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Confirmed!</h3>
                    <p className="text-sm text-green-700/70 mb-4">You&apos;re now enrolled. Redirecting to your course...</p>
                    <Link href={`/learn/${order.course.slug}`}>
                        <PrimaryButton className="px-8">Start Learning →</PrimaryButton>
                    </Link>
                </Card>
            ) : (
                <div className="space-y-4">
                    <Script
                        src="https://app.sandbox.midtrans.com/snap/snap.js"
                        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                        strategy="lazyOnload"
                    />

                    <Card className="p-6 border border-[rgb(255,138,0)]/30 bg-[#FFF8EC]">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">💳</span>
                            <div>
                                <h3 className="font-semibold text-sm mb-1">Payment Gateway</h3>
                                <p className="text-xs text-black/50 leading-5">
                                    Midtrans integration is natively active. Selecting Pay will launch the Snap payment popup securely.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {order.gatewayRef && process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ? (
                        <button
                            onClick={() => {
                                // @ts-ignore
                                if (window.snap) {
                                    // @ts-ignore
                                    window.snap.pay(order.gatewayRef, {
                                        onSuccess: async () => {
                                            setOrder(prev => prev ? { ...prev, status: "PAID" } : prev);
                                            setTimeout(() => router.push(`/learn/${order.course.slug}`), 1500);
                                        },
                                        onPending: () => {
                                            setError("Payment is pending completion.");
                                        },
                                        onError: () => {
                                            setError("Payment failed.");
                                        },
                                        onClose: () => {
                                            // Optional handler
                                        }
                                    });
                                }
                            }}
                            className="w-full p-4 rounded-xl bg-gradient-to-r from-[rgb(255,138,0)] to-[rgb(255,90,95)] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            Pay Rp {order.amount.toLocaleString("id-ID")}
                        </button>
                    ) : (
                        <button
                            onClick={handleSimulatePayment}
                            disabled={processing}
                            className="w-full p-4 rounded-xl bg-black text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            {processing ? "Simulating..." : `Fallback Simulator: Rp ${order.amount.toLocaleString("id-ID")}`}
                        </button>
                    )}

                    <p className="text-xs text-center text-black/30 mt-2">
                        Real sandbox transactions will route natively through Midtrans.
                    </p>
                </div>
            )}
        </div>
    );
}
