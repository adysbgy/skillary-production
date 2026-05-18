"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PARTICIPANT_STATUSES, PARTICIPANT_STATUS_LABELS, PARTICIPANT_STATUS_COLORS, type ParticipantStatus } from "@/lib/batch-constants";

interface BatchParticipantFormProps {
  batchId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: any;
}

export function BatchParticipantForm({ batchId, onSuccess, onCancel, initialData }: BatchParticipantFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [status, setStatus] = useState(initialData?.status || "INVITED");
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { name, email, whatsapp, role, status, notes };

    try {
      const url = isEdit
        ? `/api/admin/batches/${batchId}/participants/${initialData.id}`
        : `/api/admin/batches/${batchId}/participants`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.refresh();
        onSuccess();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Gagal menyimpan peserta.");
      }
    } catch {
      setError("Koneksi gagal.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none placeholder:text-black/30 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black/[0.02] p-4 rounded-xl border border-black/5">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <h3 className="font-semibold text-sm">{isEdit ? "Edit Peserta" : "Tambah Peserta Baru"}</h3>
        <button type="button" onClick={onCancel} className="text-black/40 hover:text-black text-sm">✕</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Nama *</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputBase} placeholder="Nama lengkap" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Email *</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} placeholder="email@contoh.com" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">WhatsApp</label>
          <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputBase} placeholder="08xxxxxxxxxx" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Role/Jabatan</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className={inputBase} placeholder="Staff, Manager..." />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputBase}>
            {PARTICIPANT_STATUSES.map((s) => (
              <option key={s} value={s}>{PARTICIPANT_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Catatan</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className={inputBase} placeholder="Opsional" />
        </div>
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      <div className="flex justify-end gap-2 pt-2 border-t border-black/5">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-medium text-black/60 hover:text-black transition-colors">Batal</button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-xs font-medium bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
          {saving ? "Menyimpan..." : "Simpan Peserta"}
        </button>
      </div>
    </form>
  );
}

export function BatchParticipantsPanel({ batchId }: { batchId: string }) {
  const router = useRouter();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Import states
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [importError, setImportError] = useState("");

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/batches/${batchId}/participants`);
      if (res.ok) {
        const data = await res.json();
        setParticipants(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [batchId]);

  const handleRemove = async (id: string, name: string) => {
    if (!confirm(`Hapus peserta ${name}? Status akan diubah menjadi REMOVED.`)) return;
    try {
      const res = await fetch(`/api/admin/batches/${batchId}/participants/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchParticipants();
        router.refresh(); // Update parent counts
      } else {
        alert("Gagal menghapus peserta.");
      }
    } catch {
      alert("Koneksi gagal.");
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportError("");
    setImportResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/admin/batches/${batchId}/participants/import`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImportResult(data);
        fetchParticipants();
        router.refresh(); // Update parent counts
      } else {
        setImportError(data.error || "Gagal melakukan import CSV.");
      }
    } catch {
      setImportError("Koneksi gagal.");
    } finally {
      setImporting(false);
      e.target.value = ""; // reset input
    }
  };

  if (loading) return <div className="text-center py-6 text-sm text-black/40">Memuat peserta...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/5 pb-3 gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Peserta ({participants.length})</h2>
          <p className="text-xs text-black/50 mt-0.5">Peserta yang belum terhubung dengan akun tidak akan menerima akses course sampai akun dibuat dan terhubung.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowImport(!showImport); setShowAdd(false); setImportResult(null); setImportError(""); }}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${showImport ? "bg-black text-white" : "bg-black/5 hover:bg-black/10"}`}
          >
            {showImport ? "Tutup Import" : "Import CSV"}
          </button>
          {!showAdd && (
            <button
              onClick={() => { setShowAdd(true); setShowImport(false); }}
              className="text-xs font-medium px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-md transition-colors"
            >
              + Tambah Peserta
            </button>
          )}
        </div>
      </div>

      {showImport && (
        <div className="bg-[#FFFDF9] p-4 rounded-xl border border-black/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold">Import via CSV</h3>
              <p className="text-xs text-black/50 mt-1 max-w-md leading-relaxed">
                CSV import hanya menambahkan peserta ke batch. Import tidak membuat akun user dan tidak memberikan akses course. Maksimal 500 baris.
              </p>
            </div>
            <a
              href={`/api/admin/batches/${batchId}/participants/template.csv`}
              download
              className="text-xs font-medium px-4 py-2 bg-black/5 border border-black/10 rounded-lg hover:bg-black/10 transition-colors shrink-0 whitespace-nowrap text-center"
            >
              ⬇ Download Template
            </a>
          </div>

          <div className="pt-2 border-t border-black/5">
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              disabled={importing}
              className="block w-full text-sm text-black/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1E3A8A] file:text-white hover:file:bg-[#1E3A8A]/90 disabled:opacity-50 cursor-pointer"
            />
            {importing && <p className="text-xs text-[#1E3A8A] font-medium mt-2 animate-pulse">Memproses file...</p>}
          </div>

          {importError && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg font-medium">
              {importError}
            </div>
          )}

          {importResult && (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-xs">
                <p className="font-bold text-emerald-800 mb-2">Hasil Import</p>
                <ul className="space-y-1 text-emerald-700">
                  <li>✅ Total Baris Diproses: <strong>{importResult.totalRows}</strong></li>
                  <li>✅ Peserta Baru Dibuat: <strong>{importResult.created}</strong></li>
                  <li>🔗 Akun User Terhubung: <strong>{importResult.linkedUsers}</strong></li>
                  {importResult.skippedDuplicates > 0 && <li>⏭️ Duplikat di CSV (Dilewati): <strong>{importResult.skippedDuplicates}</strong></li>}
                  {importResult.skippedExisting > 0 && <li>⏭️ Sudah Ada di Batch (Dilewati): <strong>{importResult.skippedExisting}</strong></li>}
                  {importResult.invalidRows > 0 && <li className="text-red-600">❌ Baris Invalid/Gagal: <strong>{importResult.invalidRows}</strong></li>}
                </ul>
              </div>

              {importResult.errors && importResult.errors.length > 0 && (
                <div className="max-h-40 overflow-y-auto border border-red-100 rounded-lg">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-red-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1.5 font-semibold text-red-800">Baris</th>
                        <th className="px-2 py-1.5 font-semibold text-red-800">Email</th>
                        <th className="px-2 py-1.5 font-semibold text-red-800">Alasan Gagal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100 bg-white">
                      {importResult.errors.map((err: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-2 py-1.5 text-red-700 font-medium">{err.row}</td>
                          <td className="px-2 py-1.5 text-red-700">{err.email}</td>
                          <td className="px-2 py-1.5 text-red-600">{err.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showAdd && (
        <BatchParticipantForm
          batchId={batchId}
          onSuccess={() => { setShowAdd(false); fetchParticipants(); }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {participants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02]">
                <th className="px-3 py-2.5 font-medium text-black/60">Nama / Email</th>
                <th className="px-3 py-2.5 font-medium text-black/60 hidden md:table-cell">Detail</th>
                <th className="px-3 py-2.5 font-medium text-black/60">Akun User</th>
                <th className="px-3 py-2.5 font-medium text-black/60">Status</th>
                <th className="px-3 py-2.5 font-medium text-black/60 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {participants.map((p) => {
                if (editingId === p.id) {
                  return (
                    <tr key={p.id}>
                      <td colSpan={5} className="p-0">
                        <BatchParticipantForm
                          batchId={batchId}
                          initialData={p}
                          onSuccess={() => { setEditingId(null); fetchParticipants(); }}
                          onCancel={() => setEditingId(null)}
                        />
                      </td>
                    </tr>
                  );
                }

                const statusColor = PARTICIPANT_STATUS_COLORS[p.status as ParticipantStatus] || "bg-gray-100 text-gray-600";
                
                return (
                  <tr key={p.id} className={`hover:bg-black/[0.01] transition-colors ${p.status === "REMOVED" ? "opacity-50" : ""}`}>
                    <td className="px-3 py-3">
                      <div className="font-medium text-black/90">{p.name}</div>
                      <div className="text-[11px] text-black/50">{p.email}</div>
                    </td>
                    <td className="px-3 py-3 text-xs hidden md:table-cell">
                      {p.role && <div className="text-black/80">{p.role}</div>}
                      {p.whatsapp && <div className="text-black/50">{p.whatsapp}</div>}
                      {!p.role && !p.whatsapp && "—"}
                    </td>
                    <td className="px-3 py-3">
                      {p.userId ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Linked
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-black/30">Not Registered</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor}`}>
                        {PARTICIPANT_STATUS_LABELS[p.status as ParticipantStatus] || p.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingId(p.id)} className="text-xs text-[#1E3A8A] hover:underline">Edit</button>
                        {p.status !== "REMOVED" && (
                          <button onClick={() => handleRemove(p.id, p.name)} className="text-xs text-red-600 hover:underline">Remove</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !showAdd && !showImport && (
          <div className="text-center py-8 bg-[#FFFDF9] rounded-xl border border-dashed border-black/10">
            <p className="text-black/50 text-sm mb-2">Belum ada peserta di batch ini.</p>
            <p className="text-xs text-black/40 mb-4 max-w-md mx-auto">Tambahkan peserta berdasarkan daftar dari organisasi. Peserta yang emailnya cocok dengan akun user akan otomatis terhubung.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowAdd(true)} className="text-xs font-medium px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors">
                + Tambah Manual
              </button>
              <button onClick={() => setShowImport(true)} className="text-xs font-medium px-4 py-2 bg-black/5 border border-black/10 text-black rounded-lg hover:bg-black/10 transition-colors">
                Import CSV
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
