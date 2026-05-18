"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BatchGrantAccessPanelProps {
  batchId: string;
  totalActiveParticipants: number;
  linkedParticipantsCount: number;
  courseCount: number;
}

export function BatchGrantAccessPanel({
  batchId,
  totalActiveParticipants,
  linkedParticipantsCount,
  courseCount,
}: BatchGrantAccessPanelProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const unlinkedCount = totalActiveParticipants - linkedParticipantsCount;
  const maxPossibleNewEnrollments = linkedParticipantsCount * courseCount;

  const handleGrantAccess = async () => {
    if (!confirm("Apakah Anda yakin ingin memberikan akses course sekarang?\n\nAksi ini akan membuat Enrollment MANUAL untuk peserta yang sudah memiliki akun. Aksi ini tidak dapat dibatalkan secara massal di Phase 3D.")) {
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/admin/batches/${batchId}/grant-access`, {
        method: "POST",
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.summary);
        router.refresh();
      } else {
        setError(data.error || "Gagal memberikan akses.");
      }
    } catch {
      setError("Koneksi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight border-b border-black/5 pb-3">Grant Access (Phase 3D)</h2>
      
      <div className="bg-black/5 rounded-xl p-4 text-sm text-black/80">
        <ul className="space-y-2 mb-4">
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
            <span className="text-black/60">Estimasi Enrollment Baru/Diperbarui:</span>
            <span className="font-bold">{maxPossibleNewEnrollments}</span>
          </li>
        </ul>

        <p className="text-xs text-black/50 leading-relaxed mb-4">
          Grant Access akan membuat <code className="bg-white px-1 py-0.5 rounded border border-black/10 text-[10px]">Enrollment (source: MANUAL)</code> untuk peserta yang sudah memiliki akun (Linked). Peserta yang belum memiliki akun akan dilewati secara otomatis. Enrollment PAID yang sudah ada tidak akan pernah ditimpa (PAID protection active). Progress dan sertifikat tidak akan di-generate secara otomatis.
        </p>

        {linkedParticipantsCount === 0 && totalActiveParticipants > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs mb-4">
            ⚠️ Belum ada peserta yang terhubung dengan akun. Grant access akan melewati semua peserta saat ini.
          </div>
        )}

        {courseCount === 0 && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs mb-4">
            ⚠️ Belum ada course yang dihubungkan. Grant access belum dapat menghasilkan enrollment.
          </div>
        )}

        {error && <div className="text-red-600 font-medium text-xs mb-4">{error}</div>}

        {result && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs space-y-1 mb-4">
            <p className="font-bold mb-2">Eksekusi Berhasil!</p>
            <p>✅ Akses Baru Diberikan: <strong>{result.created}</strong></p>
            <p>✅ Akses Diaktifkan Ulang: <strong>{result.reactivated}</strong></p>
            <p>⏭️ Dilewati (Sudah Aktif): <strong>{result.skippedExisting}</strong></p>
            <p>🔒 Dilewati (Akses PAID): <strong>{result.skippedPaid}</strong></p>
          </div>
        )}

        <button
          onClick={handleGrantAccess}
          disabled={loading || linkedParticipantsCount === 0 || courseCount === 0}
          className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? "Memproses..." : "Eksekusi Grant Access"}
        </button>
      </div>
    </div>
  );
}
