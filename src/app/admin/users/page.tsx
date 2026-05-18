"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";

interface UserRow {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    _count: { enrollments: number; courses: number; certificates: number };
}

const ROLE_TABS = ["ALL", "LEARNER", "INSTRUCTOR", "ADMIN"] as const;
const ROLE_COLORS: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    INSTRUCTOR: "bg-blue-100 text-blue-700",
    LEARNER: "bg-black/5 text-black/60",
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>("ALL");
    const [changingId, setChangingId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

    const fetchUsers = useCallback(async (roleFilter?: string) => {
        setLoading(true);
        try {
            const url = roleFilter && roleFilter !== "ALL"
                ? `/api/admin/users?role=${roleFilter}`
                : `/api/admin/users`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch {
            setFeedback({ type: "err", msg: "Failed to load users." });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchUsers(activeTab); }, [activeTab, fetchUsers]);

    async function handleRoleChange(userId: string, newRole: string) {
        const user = users.find(u => u.id === userId);
        if (!user) return;
        const confirmed = confirm(`Change ${user.name}'s role from ${user.role} to ${newRole}?`);
        if (!confirmed) return;

        setChangingId(userId);
        setFeedback(null);
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newRole }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Role change failed");

            setFeedback({ type: "ok", msg: data.message });
            setTimeout(() => setFeedback(null), 4000);
            fetchUsers(activeTab);
        } catch (err: any) {
            setFeedback({ type: "err", msg: err.message });
        } finally {
            setChangingId(null);
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-[-0.02em]">User Management</h1>
                <p className="text-sm text-black/55 mt-1">View all platform users and manage roles.</p>
            </div>

            {feedback && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${feedback.type === "ok" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                    {feedback.msg}
                </div>
            )}

            {/* Role Filter Tabs */}
            <div className="flex gap-1 mb-6 bg-black/[0.03] p-1 rounded-xl w-fit">
                {ROLE_TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-white text-black shadow-sm" : "text-black/50 hover:text-[#FF8A00]"}`}
                    >
                        {tab === "ALL" ? "All Users" : `${tab.charAt(0)}${tab.slice(1).toLowerCase()}s`}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="p-12 text-center text-black/40">Loading users…</div>
            ) : users.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-black/50">No users found{activeTab !== "ALL" ? ` with role ${activeTab}` : ""}.</p>
                </Card>
            ) : (
                <Card className="overflow-hidden bg-white" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-black/5 bg-black/[0.02]">
                                <th className="px-4 py-3 text-left font-medium text-black/55">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Email</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Role</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Courses</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Enrolled</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Joined</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
                                    <td className="px-4 py-3 font-medium">{u.name}</td>
                                    <td className="px-4 py-3 text-black/60">{u.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${ROLE_COLORS[u.role] || "bg-black/5 text-black/60"}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-black/70">{u._count.courses}</td>
                                    <td className="px-4 py-3 text-black/70">{u._count.enrollments}</td>
                                    <td className="px-4 py-3 text-black/55">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={u.role}
                                            disabled={changingId === u.id}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            className="rounded-lg border border-black/10 px-2 py-1.5 text-xs outline-none focus:border-black/25 bg-white font-medium disabled:opacity-50"
                                        >
                                            <option value="LEARNER">Learner</option>
                                            <option value="INSTRUCTOR">Instructor</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}

            <p className="mt-4 text-[10px] text-black/35 leading-4">
                Role changes take effect immediately. The user must log out and log back in for their session to reflect the new role.
            </p>
        </div>
    );
}
