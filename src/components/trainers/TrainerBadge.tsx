import type { TrainerStatus } from "@/types/trainer-types";
import { trainerStatusLabel } from "@/lib/trainer-utils";
export function TrainerBadge({ status }: { status: TrainerStatus }) {
  const verified = status === "verified";
  return <span title={verified ? "Identitas, pengalaman utama, dan bukti profil telah diperiksa Skillary." : "Dipilih untuk tampil dalam jaringan trainer Skillary."} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${verified ? "border-orange-200 bg-orange-50 text-orange-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M12 3l2.4 1.2 2.7-.15 1.35 2.35 2.4 1.2-.15 2.7L22 12.75l-1.3 2.4.15 2.7-2.4 1.2-1.35 2.35-2.7-.15L12 22.5l-2.4-1.25-2.7.15-1.35-2.35-2.4-1.2.15-2.7L2 12.75l1.3-2.45-.15-2.7 2.4-1.2L6.9 4.05l2.7.15L12 3Z"/></svg>
    {trainerStatusLabel(status)}
  </span>;
}
