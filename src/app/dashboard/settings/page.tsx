import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight mb-8">Account Settings</h1>

            <Card className="overflow-hidden shadow-sm border border-black/5 bg-[#FFFdf9]">
                <div className="border-b border-black/5 bg-[#FFF8EC] p-6 lg:p-8">
                    <div className="flex items-center gap-5">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[rgb(255,138,0)] to-[rgb(255,90,95)] flex items-center justify-center text-white text-3xl font-semibold shadow-inner border-[3px] border-white ring-1 ring-black/5">
                            {session.user?.name?.charAt(0).toUpperCase() || "L"}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-black/90">{session.user?.name}</h2>
                            <p className="text-black/60 font-medium text-sm mt-0.5">{session.user?.role === "ADMIN" ? "Administrator Platform Access" : "Learner Account"}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 lg:p-8">
                    <SettingsForm
                        user={{
                            name: session.user?.name || "",
                            email: session.user?.email || ""
                        }}
                    />
                </div>
            </Card>
        </div>
    );
}
