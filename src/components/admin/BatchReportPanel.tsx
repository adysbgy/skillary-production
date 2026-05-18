"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

interface BatchReportPanelProps {
  batchId: string;
  summary: {
    totalParticipants: number;
    linkedParticipants: number;
    unlinkedParticipants: number;
    assignedCourses: number;
    totalRows: number;
    activeEnrollments: number;
    completedRows: number;
    certificatesIssued: number;
    followUpNeededCount: number;
    averageProgress: number;
  };
  previewRows: any[];
}

export function BatchReportPanel({ batchId, summary, previewRows }: BatchReportPanelProps) {
  const handleExport = () => {
    window.location.href = `/api/admin/batches/${batchId}/report.csv`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Report & Progress Summary</h2>
          <p className="text-xs text-black/50 mt-1">
            CSV dapat digunakan oleh HR/L&D untuk rekap progress, assessment, sertifikat, dan follow-up peserta.
          </p>
          <p className="text-[10px] text-black/40 mt-1">
            Catatan: Report membaca data existing dari enrollment, progress, quiz attempt, dan certificate.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="shrink-0 text-sm font-medium px-5 py-2.5 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors shadow-sm"
        >
          ⬇ Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-black/5 bg-black/[0.01]">
          <p className="text-xs text-black/50 mb-1">Average Progress</p>
          <p className="text-2xl font-bold">{summary.averageProgress}%</p>
        </Card>
        <Card className="p-4 border-black/5 bg-black/[0.01]">
          <p className="text-xs text-black/50 mb-1">Active Enrollments</p>
          <p className="text-2xl font-bold">{summary.activeEnrollments}</p>
        </Card>
        <Card className="p-4 border-black/5 bg-black/[0.01]">
          <p className="text-xs text-black/50 mb-1">Certificates Issued</p>
          <p className="text-2xl font-bold">{summary.certificatesIssued}</p>
        </Card>
        <Card className="p-4 border-black/5 bg-orange-50 border-orange-100">
          <p className="text-xs text-orange-800/60 mb-1">Needs Follow-up</p>
          <p className="text-2xl font-bold text-orange-700">{summary.followUpNeededCount}</p>
        </Card>
      </div>

      {summary.totalRows === 0 && (
        <div className="text-center py-6 bg-[#FFFDF9] rounded-xl border border-dashed border-black/10">
          <p className="text-black/50 text-sm">Report belum tersedia karena batch belum memiliki peserta dan course.</p>
        </div>
      )}

      {summary.totalRows > 0 && summary.activeEnrollments === 0 && (
        <div className="text-center py-6 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-amber-800 text-sm font-medium">Report tersedia, tetapi akses belajar belum diberikan kepada peserta.</p>
        </div>
      )}

      {previewRows.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold">Preview (First 10 rows)</h3>
          <div className="overflow-x-auto rounded-lg border border-black/5">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/[0.02] border-b border-black/5">
                <tr>
                  <th className="px-3 py-2 font-medium text-black/60">Peserta</th>
                  <th className="px-3 py-2 font-medium text-black/60">Course</th>
                  <th className="px-3 py-2 font-medium text-black/60">Enrollment</th>
                  <th className="px-3 py-2 font-medium text-black/60">Progress</th>
                  <th className="px-3 py-2 font-medium text-black/60">Sertifikat</th>
                  <th className="px-3 py-2 font-medium text-black/60">Follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {previewRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.01]">
                    <td className="px-3 py-2">
                      <div className="font-medium">{row.participantName}</div>
                      <div className="text-[10px] text-black/50">{row.userLinked === "Yes" ? "Linked" : "No Account"}</div>
                    </td>
                    <td className="px-3 py-2 max-w-[150px] truncate">{row.courseTitle}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                        row.enrollmentStatus === "ACTIVE" || row.enrollmentStatus === "PAID" || row.enrollmentStatus === "MANUAL"
                          ? "bg-emerald-100 text-emerald-700" 
                          : row.enrollmentStatus === "REVOKED" ? "bg-red-50 text-red-600"
                          : row.enrollmentStatus === "NOT_GRANTED" ? "bg-amber-100 text-amber-700" 
                          : row.enrollmentStatus === "NO_USER" ? "bg-red-100 text-red-700" 
                          : "bg-black/5 text-black/50"
                      }`}>
                        {row.enrollmentStatus === "NO_USER" ? "Needs Account" : row.enrollmentStatus === "NOT_GRANTED" ? "Not Granted" : row.enrollmentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-black/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1E3A8A]" style={{ width: `${row.progressPercent}%` }} />
                        </div>
                        <span className="text-[10px] text-black/60 font-medium">{row.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-[10px] font-medium">
                      <span className={`px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${row.certificateStatus === "ISSUED" ? "bg-blue-100 text-blue-700" : "text-black/40"}`}>
                        {row.certificateStatus === "NO_USER" ? "—" : row.certificateStatus.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {row.followUpNeeded === "Yes" ? (
                        <span className="inline-block bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">Yes</span>
                      ) : (
                        <span className="text-black/30 text-xs font-medium">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {summary.totalRows > 10 && (
            <p className="text-xs text-black/40 text-center pt-2">
              Menampilkan 10 baris pertama dari {summary.totalRows} baris. Klik Export CSV Report untuk melihat data lengkap.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
