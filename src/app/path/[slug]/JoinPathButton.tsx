"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/Button";

export function JoinPathButton({ pathSlug }: { pathSlug: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleJoin = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/paths/${pathSlug}/join`, {
                method: "POST"
            });
            if (res.ok) {
                router.refresh();
            } else if (res.status === 401) {
                router.push("/login");
            }
        } catch {
            alert("Error joining path");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PrimaryButton onClick={handleJoin} disabled={loading} className="w-full justify-center">
            {loading ? "Joining..." : "Join Learning Path"}
        </PrimaryButton>
    );
}
