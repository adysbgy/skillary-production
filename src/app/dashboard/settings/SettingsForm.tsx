"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/Button";

interface UserData {
    name: string;
    email: string;
}

export default function SettingsForm({ user }: { user: UserData }) {
    const router = useRouter();
    const [name, setName] = useState(user.name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [status, setStatus] = useState<{ type: "error" | "success" | "", msg: string }>({ type: "", msg: "" });
    const [saving, setSaving] = useState(false);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setStatus({ type: "", msg: "" });
        setSaving(true);
        try {
            const payload: any = { name };
            if (currentPassword && newPassword) {
                payload.currentPassword = currentPassword;
                payload.newPassword = newPassword;
            }

            const res = await fetch("/api/user/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed.");

            setStatus({ type: "success", msg: "Account updated successfully!" });
            setCurrentPassword("");
            setNewPassword("");
            router.refresh();
        } catch (err: any) {
            setStatus({ type: "error", msg: err.message });
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSave} className="space-y-8">
            {status.msg && (
                <div className={`p-4 rounded-xl text-sm font-medium border ${status.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                    {status.msg}
                </div>
            )}

            <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/45 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs text-black/50 mb-1.5 font-medium">Full Name (used for Certificates)</label>
                        <input value={name} onChange={e => setName(e.target.value)} required className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[rgb(255,138,0)] font-medium transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs text-black/50 mb-1.5 font-medium">Email Address</label>
                        <input type="email" value={user.email} disabled className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/25 font-medium opacity-60 cursor-not-allowed bg-black/5" />
                        <p className="text-[10px] text-black/40 mt-1.5 pl-2 font-medium">Contact support to migrate emails.</p>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-black/5">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/45 mb-4">Security</h3>
                <div className="flex flex-col gap-4 rounded-2xl bg-[#FFFDF9] p-6 border border-black/5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    <p className="text-sm font-semibold text-black/80 border-b border-black/5 pb-3">Update Password</p>
                    <div className="grid sm:grid-cols-2 gap-6 w-full pt-2">
                        <div>
                            <label className="block text-xs text-black/50 mb-1.5 font-medium">Current Password</label>
                            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[rgb(255,138,0)] transition-colors" placeholder="••••••••" />
                        </div>
                        <div>
                            <label className="block text-xs text-black/50 mb-1.5 font-medium">New Password</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[rgb(255,138,0)] transition-colors" placeholder="••••••••" />
                        </div>
                    </div>
                    <p className="text-xs text-black/40 mt-1 italic">Leave fields blank if you do not wish to change your password.</p>
                </div>
            </div>

            <div className="pt-6 flex justify-end border-t border-black/5">
                <PrimaryButton type="submit" disabled={saving} className="px-8 py-3.5 text-sm shadow-sm hover:shadow-md transition-shadow">
                    {saving ? "Saving Changes..." : "Save Configuration"}
                </PrimaryButton>
            </div>
        </form>
    );
}
