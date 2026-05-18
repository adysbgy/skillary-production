"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BatchAccessControlPanelProps {
  batchId: string;
  totalActiveParticipants: number;
  linkedParticipantsCount: number;
  courseCount: number;
}

export function BatchAccessControlPanel({
  batchId,
  totalActiveParticipants,
  linkedParticipantsCount,
  courseCount,
}: BatchAccessControlPanelProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"GRANT" | "REVOKE" | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const unlinkedCount = totalActiveParticipants - linkedParticipantsCount;
  const maxPossibleNewEnrollments = linkedParticipantsCount * courseCount;

  const handleGrantAccess = async () => {
    if (!confirm("Apakah Anda yakin ingin memberikan akses course sekarang?\n\nAksi ini akan membuat Enrollment MANUAL untuk peserta yang sudah memiliki akun.")) {
      return;
    }

    setLoading(true);
    setActionType("GRANT");
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/admin/batches/${batchId}/grant-access`, {
        method: "POST",
      });

      const data = await res.json();
      if (res.ok) {
        setResult({ type: "GRANT", summary: data.summary });
        router.refresh();
      } else {
        setError(data.error || "Gagal memberikan akses.");
      }
    } catch {
      setError("Koneksi gagal.");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleRevokeAccess = async () => {
    if (!confirm("⚠️ PERINGATAN\n\nApakah Anda yakin ingin MENCABUT AKSES (Revoke) untuk batch ini?\n\nEnrollment MANUAL akan dinonaktifkan. Enrollment PAID tidak akan terpengaruh.")) {
      return;
    }

    setLoading(true);
    setActionType("REVOKE");
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/admin/batches/${batchId}/revoke-access`, {
        method: "POST",
      });

      const data = await res.json();
      if (res.ok) {
        setResult({ type: "REVOKE", summary: data.summary });
        router.refresh();
      } else {
        setError(data.error || "Gagal mencabut akses.");
      }
    } catch {
      setError("Koneksi gagal.");
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3">Access Control</h2>
      
      <div className="bg-black/5 rounded-xl p-4 text-sm text-black/80 space-y-4">
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-black/60">Total Peserta Aktif:</span>
            <span className="font-semibold">{totalActiveParticipants}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-black/60">Peserta dengan Akun (Linked):</span>
            <span className="font-semibold text-emerald-700">{linkedParticipantsCount}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-black/60">Peserta Tanpa Akun (Dilewati):</span>
            <span className="font-semibold text-red-600">{unlinkedCount}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-black/60">Total Course:</span>
            <span className="font-semibold">{courseCount}</span>
          </li>
          <li className="flex justify-between pt-2 border-t border-black/10">
            <span className="text-black/60">Estimasi Interaksi Enrollment:</span>
            <span className="font-bold">{maxPossibleNewEnrollments}</span>
          </li>
        </ul>

        <div className="space-y-2 text-xs text-black/50 leading-relaxed border-t border-black/10 pt-4">
          <p>
            <strong>Grant Access</strong> akan membuat atau mengaktifkan ulang <code className="bg-white px-1 py-0.5 rounded border border-black/10 text-[10px]">Enrollment (MANUAL)</code> untuk peserta yang terhubung.
          </p>
          <p>
            <strong>Revoke Access</strong> akan menonaktifkan <code className="bg-white px-1 py-0.5 rounded border border-black/10 text-[10px]">Enrollment (MANUAL)</code> untuk peserta dalam batch ini.
          </p>
          <p className="text-amber-700 font-medium bg-amber-50 p-2 rounded border border-amber-200">
            🔒 Enrollment PAID dilindungi dan tidak akan pernah dicabut atau ditimpa oleh fitur ini.
          </p>
        </div>

        {linkedParticipantsCount === 0 && totalActiveParticipants > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs">
            ⚠️ Belum ada peserta yang terhubung dengan akun. Access control akan melewati semua peserta saat ini.
          </div>
        )}

        {courseCount === 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs">
            ⚠️ Belum ada course yang dihubungkan. Access control belum dapat menghasilkan/mencabut enrollment.
          </div>
        )}

        {error && <div className="text-red-600 font-medium text-xs p-3 bg-red-50 rounded-lg">{error}</div>}

        {result && result.type === "GRANT" && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs space-y-1">
            <p className="font-bold mb-2">Eksekusi Grant Access Berhasil!</p>
            <p>✅ Akses Baru Diberikan: <strong>{result.summary.created}</strong></p>
            <p>✅ Akses Diaktifkan Ulang: <strong>{result.summary.reactivated}</strong></p>
            <p>⏭️ Dilewati (Sudah Aktif): <strong>{result.summary.skippedExisting}</strong></p>
            <p>🔒 Dilewati (Akses PAID): <strong>{result.summary.skippedPaid}</strong></p>
          </div>
        )}

        {result && result.type === "REVOKE" && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-xs space-y-1">
            <p className="font-bold mb-2">Eksekusi Revoke Access Berhasil!</p>
            <p>❌ Akses Dicabut (MANUAL): <strong>{result.summary.revoked}</strong></p>
            <p>⏭️ Dilewati (Sudah Dicabut): <strong>{result.summary.skippedAlreadyRevoked}</strong></p>
            <p>⏭️ Dilewati (Tidak Ada Akses): <strong>{result.summary.skippedNoEnrollment}</strong></p>
            <p>🔒 Dilewati (Akses PAID): <strong>{result.summary.skippedPaid}</strong></p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleGrantAccess}
            disabled={loading || linkedParticipantsCount === 0 || courseCount === 0}
            className="flex-1 bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading && actionType === "GRANT" ? "Memproses..." : "Grant Access"}
          </button>
          
          <button
            onClick={handleRevokeAccess}
            disabled={loading || linkedParticipantsCount === 0 || courseCount === 0}
            className="flex-1 bg-white border border-red-200 text-red-600 font-semibold py-3 px-4 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading && actionType === "REVOKE" ? "Memproses..." : "Revoke Access"}
          </button>
        </div>
      </div>
    </div>
  );
}
