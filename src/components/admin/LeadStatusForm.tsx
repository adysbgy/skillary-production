"use client";

import React, { useState } from "react";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, LEAD_NEXT_ACTION, type LeadStatus } from "@/lib/lead-constants";

interface LeadStatusFormProps {
  leadId: string;
  currentStatus: string;
  currentNotes: string | null;
  isArchived: boolean;
}

export function LeadStatusForm({ leadId, currentStatus, currentNotes, isArchived }: LeadStatusFormProps) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [archived, setArchived] = useState(isArchived);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
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

  const handleArchiveToggle = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: !archived }),
      });

      if (res.ok) {
        setArchived(!archived);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
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

  const nextAction = LEAD_NEXT_ACTION[status as LeadStatus];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full text-sm border border-black/10 rounded-lg px-3 py-2.5 bg-white"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {nextAction && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          <span className="font-semibold">Recommended:</span> {nextAction}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-black/45 uppercase tracking-wider mb-2">Catatan Internal</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Catatan tim tentang lead ini..."
          className="w-full text-sm border border-black/10 rounded-lg px-3 py-2.5 bg-white resize-y"
        />
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      {saved && <p className="text-sm text-green-600 font-medium">✓ Tersimpan</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-black text-white font-bold py-3 px-6 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-70 text-sm"
      >
        {saving ? "Menyimpan..." : "Simpan Perubahan"}
      </button>

      <div className="border-t border-black/5 pt-4">
        <button
          onClick={handleArchiveToggle}
          disabled={saving}
          className={`w-full text-sm font-medium py-2.5 px-4 rounded-lg border transition-colors disabled:opacity-70 ${
            archived
              ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
              : "border-black/10 text-black/50 bg-white hover:bg-black/5"
          }`}
        >
          {archived ? "↩ Restore Lead" : "Archive Lead"}
        </button>
      </div>
    </div>
  );
}
