"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BATCH_FORMATS, BATCH_FORMAT_LABELS, BATCH_STATUSES, BATCH_STATUS_LABELS } from "@/lib/batch-constants";

interface OrgOption {
  id: string;
  name: string;
}

interface TrainingBatchFormProps {
  mode: "create" | "edit";
  organizations: OrgOption[];
  initialData?: {
    id: string;
    organizationId: string;
    title: string;
    description: string | null;
    format: string;
    status: string;
    startDate: string | null;
    endDate: string | null;
    notes: string | null;
  };
  defaultOrganizationId?: string;
}

function toDateInputValue(d: string | Date | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

export function TrainingBatchForm({
  mode,
  organizations,
  initialData,
  defaultOrganizationId,
}: TrainingBatchFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [organizationId, setOrganizationId] = useState(
    initialData?.organizationId || defaultOrganizationId || ""
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [format, setFormat] = useState(initialData?.format || "ONLINE");
  const [status, setStatus] = useState(initialData?.status || "DRAFT");
  const [startDate, setStartDate] = useState(toDateInputValue(initialData?.startDate || null));
  const [endDate, setEndDate] = useState(toDateInputValue(initialData?.endDate || null));
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      organizationId,
      title,
      description,
      format,
      status,
      startDate: startDate || "",
      endDate: endDate || "",
      notes,
    };

    try {
      const url =
        mode === "edit"
          ? `/api/admin/batches/${initialData!.id}`
          : "/api/admin/batches";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/batches/${data.id}`);
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Gagal menyimpan.");
      }
    } catch {
      setError("Koneksi gagal.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none placeholder:text-black/30 transition-colors focus:border-[#1E3A8A] focus:bg-white focus:ring-1 focus:ring-[#1E3A8A]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">
          Organisasi <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          className={inputBase}
        >
          <option value="">— Pilih organisasi —</option>
          {organizations.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">
          Judul Batch <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pelatihan Power BI untuk PT X"
          className={inputBase}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Deskripsi singkat training batch..."
          className={`${inputBase} resize-y`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className={inputBase}>
            {BATCH_FORMATS.map((f) => (
              <option key={f} value={f}>{BATCH_FORMAT_LABELS[f]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputBase}>
            {BATCH_STATUSES.map((s) => (
              <option key={s} value={s}>{BATCH_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Tanggal Mulai</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Tanggal Selesai</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Catatan Internal</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Catatan tentang batch ini..."
          className={`${inputBase} resize-y`}
        />
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-black text-white font-bold py-3 px-6 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-70 text-sm"
      >
        {saving ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Buat Training Batch"}
      </button>
    </form>
  );
}
