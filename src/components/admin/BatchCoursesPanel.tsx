"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BatchCourseFormProps {
  batchId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: any;
}

export function BatchCourseForm({ batchId, onSuccess, onCancel, initialData }: BatchCourseFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [courseId, setCourseId] = useState(initialData?.courseId || "");
  const [required, setRequired] = useState(initialData?.required ?? true);
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);

  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  useEffect(() => {
    if (!isEdit) {
      // Fetch all courses for assignment
      fetch("/api/admin/courses")
        .then((res) => res.json())
        .then((data) => setAvailableCourses(data.courses || data))
        .catch(() => {});
    }
  }, [isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = isEdit 
      ? { required, sortOrder: parseInt(sortOrder.toString(), 10) }
      : { courseId, required, sortOrder: parseInt(sortOrder.toString(), 10) };

    try {
      const url = isEdit
        ? `/api/admin/batches/${batchId}/courses/${initialData.id}`
        : `/api/admin/batches/${batchId}/courses`;
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
        setError(data?.error || "Gagal menyimpan course.");
      }
    } catch {
      setError("Koneksi gagal.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black/[0.02] p-4 rounded-xl border border-black/5">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <h3 className="font-semibold text-sm">{isEdit ? "Edit Course Assignment" : "Assign Course Baru"}</h3>
        <button type="button" onClick={onCancel} className="text-black/40 hover:text-black text-sm">✕</button>
      </div>

      {!isEdit && (
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Pilih Course *</label>
          <select required value={courseId} onChange={(e) => setCourseId(e.target.value)} className={inputBase}>
            <option value="">— Pilih Course —</option>
            {availableCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} {c.status === "DRAFT" ? "(DRAFT)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} className="rounded border-black/20 text-[#1E3A8A] focus:ring-[#1E3A8A]" />
            Wajib diselesaikan (Required)
          </label>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-black/45 uppercase tracking-wider mb-1.5">Urutan (Sort Order)</label>
          <input type="number" min="0" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputBase} />
        </div>
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      <div className="flex justify-end gap-2 pt-2 border-t border-black/5">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-medium text-black/60 hover:text-black transition-colors">Batal</button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-xs font-medium bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
          {saving ? "Menyimpan..." : "Simpan Course"}
        </button>
      </div>
    </form>
  );
}

export function BatchCoursesPanel({ batchId }: { batchId: string }) {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/batches/${batchId}/courses`);
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [batchId]);

  const handleRemove = async (id: string, title: string) => {
    if (!confirm(`Hapus assignment untuk course "${title}" dari batch ini?\n\nPerhatian: Menghapus course di Phase 3C aman, tetapi di Phase 3D/3E penghapusan dapat berdampak pada laporan peserta.`)) return;
    try {
      const res = await fetch(`/api/admin/batches/${batchId}/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCourses();
        router.refresh();
      } else {
        alert("Gagal menghapus course.");
      }
    } catch {
      alert("Koneksi gagal.");
    }
  };

  if (loading) return <div className="text-center py-6 text-sm text-black/40">Memuat courses...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <h2 className="text-lg font-semibold tracking-tight">Courses ({courses.length})</h2>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="text-xs font-medium px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-md transition-colors"
          >
            + Assign Course
          </button>
        )}
      </div>

      {showAdd && (
        <BatchCourseForm
          batchId={batchId}
          onSuccess={() => { setShowAdd(false); fetchCourses(); }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {courses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02]">
                <th className="px-3 py-2.5 font-medium text-black/60 w-12 text-center">No</th>
                <th className="px-3 py-2.5 font-medium text-black/60">Course</th>
                <th className="px-3 py-2.5 font-medium text-black/60 hidden md:table-cell">Kategori</th>
                <th className="px-3 py-2.5 font-medium text-black/60">Tipe</th>
                <th className="px-3 py-2.5 font-medium text-black/60 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {courses.map((bc) => {
                if (editingId === bc.id) {
                  return (
                    <tr key={bc.id}>
                      <td colSpan={5} className="p-0">
                        <BatchCourseForm
                          batchId={batchId}
                          initialData={bc}
                          onSuccess={() => { setEditingId(null); fetchCourses(); }}
                          onCancel={() => setEditingId(null)}
                        />
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={bc.id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="px-3 py-3 text-center text-black/50">{bc.sortOrder}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-black/90 flex items-center gap-2">
                        {bc.course.title}
                        {bc.course.status === "DRAFT" && (
                          <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">DRAFT</span>
                        )}
                      </div>
                      <div className="text-[11px] text-black/50 mt-0.5 capitalize">{bc.course.level || "Semua Level"}</div>
                    </td>
                    <td className="px-3 py-3 text-xs hidden md:table-cell text-black/60">
                      {bc.course.category || "—"}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        bc.required ? "bg-[#1E3A8A]/10 text-[#1E3A8A]" : "bg-black/5 text-black/50"
                      }`}>
                        {bc.required ? "Wajib (Required)" : "Opsional"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingId(bc.id)} className="text-xs text-[#1E3A8A] hover:underline">Edit</button>
                        <button onClick={() => handleRemove(bc.id, bc.course.title)} className="text-xs text-red-600 hover:underline">Remove</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !showAdd && (
          <div className="text-center py-8 bg-[#FFFDF9] rounded-xl border border-dashed border-black/10">
            <p className="text-black/50 text-sm mb-2">Belum ada course yang dihubungkan ke batch ini.</p>
            <p className="text-xs text-black/40 mb-4 max-w-md mx-auto">Assign course terlebih dahulu sebelum memberikan akses belajar (grant access).</p>
            <button onClick={() => setShowAdd(true)} className="text-xs font-medium px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors">
              + Assign Course Pertama
            </button>
          </div>
        )
      )}
    </div>
  );
}
