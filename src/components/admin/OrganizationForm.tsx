"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ORGANIZATION_SECTOR_SUGGESTIONS } from "@/lib/batch-constants";

interface OrganizationFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    name: string;
    sector: string | null;
    contactName: string | null;
    contactEmail: string | null;
    contactWhatsapp: string | null;
    notes: string | null;
  };
}

export function OrganizationForm({ mode, initialData }: OrganizationFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [sector, setSector] = useState(initialData?.sector || "");
  const [contactName, setContactName] = useState(initialData?.contactName || "");
  const [contactEmail, setContactEmail] = useState(initialData?.contactEmail || "");
  const [contactWhatsapp, setContactWhatsapp] = useState(initialData?.contactWhatsapp || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { name, sector, contactName, contactEmail, contactWhatsapp, notes };

    try {
      const url =
        mode === "edit"
          ? `/api/admin/organizations/${initialData!.id}`
          : "/api/admin/organizations";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/organizations/${data.id}`);
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
          Nama Organisasi <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="PT Contoh Indonesia"
          className={inputBase}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Sektor</label>
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className={inputBase}
        >
          <option value="">— Pilih sektor —</option>
          {ORGANIZATION_SECTOR_SUGGESTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Contact Person</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Nama PIC"
            className={inputBase}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Email Kontak</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="pic@company.com"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">WhatsApp</label>
        <input
          type="text"
          value={contactWhatsapp}
          onChange={(e) => setContactWhatsapp(e.target.value)}
          placeholder="08xxxxxxxxxx"
          className={inputBase}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Catatan Internal</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Catatan tentang organisasi ini..."
          className={`${inputBase} resize-y`}
        />
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-black text-white font-bold py-3 px-6 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-70 text-sm"
      >
        {saving ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Buat Organisasi"}
      </button>
    </form>
  );
}
