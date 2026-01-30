"use client";

import React from "react";
import { useRouter, useParams } from 'next/navigation';
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiDownload,
  FiEdit3,
  FiMessageCircle,
} from "react-icons/fi";

type Status = 'MENUNGGU_REVIEW' | 'REVISI' | 'DISETUJUI';

const STATUS_CONFIG: Record<Status, { label: string; icon: React.ReactElement; bg: string; text: string; border: string }> = {
  MENUNGGU_REVIEW: {
    label: "Menunggu Review",
    icon: <FiClock size={16} />,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200"
  },
  REVISI: {
    label: "Perlu Revisi",
    icon: <FiEdit3 size={16} />,
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200"
  },
  DISETUJUI: {
    label: "Disetujui",
    icon: <FiCheckCircle size={16} />,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200"
  },
};

const DETAILED_HISTORY = [
  {
    id: 3,
    date: "29 Jan 2026",
    sender: "STUDENT",
    summary: "Submit Revisi - Sudah menyempitkan populasi ke skala UKM sesuai arahan pada diskusi sebelumnya.",
    files: [{ name: "Draf_Final_Revisi.pdf", size: "1.8 MB" }],
    response: {
      date: "30 Jan 2026",
      comment: "Bagus! Sekarang jauh lebih fokus. Revisi diterima, silakan lanjut ambil data ke lapangan.",
      status: "DISETUJUI" as Status
    }
  },
  {
    id: 2,
    date: "24 Jan 2026",
    sender: "STUDENT",
    summary: "Perbaikan draf sesuai arahan mengenai teknik sampling dan instrumen penelitian.",
    files: [{ name: "Draf_V2_Revision.pdf", size: "1.2 MB" }],
    response: {
      date: "26 Jan 2026",
      comment: "Teknik sampling perlu dipersempit lagi ke skala UKM saja. Silakan revisi bagian populasi.",
      status: "REVISI" as Status
    }
  },
  {
    id: 1,
    date: "12 Jan 2026",
    sender: "STUDENT",
    summary: "Pengajuan draf awal dengan penambahan 10 referensi jurnal terbaru.",
    files: [{ name: "Draf_Awal_Full.pdf", size: "2.5 MB" }],
    response: {
      date: "15 Jan 2026",
      comment: "Referensi sangat bagus. Argumentasi perlu diperkuat sedikit lagi. Selebihnya oke.",
      status: "DISETUJUI" as Status
    }
  }
];

export default function BimbinganSaya() {
  const router = useRouter();
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <h1 className="text-3xl font-bold text-slate-900">Log Aktivitas Bimbingan</h1>
            <button 
              onClick={() => router.push(`/dashboard/bimbingan/${slug}/create`)} 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all active:scale-[0.98]"
            >
              <FiUploadCloud size={18} />
              <span>Update Progres</span>
            </button>
          </div>
          <p className="text-slate-600 text-sm">Riwayat pengajuan dan feedback dari dosen pembimbing</p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-slate-200 to-transparent hidden sm:block" />

          <div className="space-y-16">
            {DETAILED_HISTORY.map((item, index) => {
              const statusMeta = STATUS_CONFIG[item.response.status];
              const isLatest = index === 0;

              return (
                <div key={item.id} className="relative">
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-[9px] top-8 w-6 h-6 rounded-full border-4 border-white shadow-md z-10 hidden sm:block ${
                    isLatest ? 'bg-blue-500' : 'bg-slate-300'
                  }`} />

                  {/* Card Container */}
                  <div className="sm:pl-16 space-y-3">
                    
                    {/* DOSEN RESPONSE */}
                    <div className={`bg-white rounded-xl border overflow-hidden shadow-sm ml-0 sm:ml-8 ${statusMeta.border}`}>
                      <div className="p-5">
                        {/* Response Header */}
                        <div className="flex items-start justify-between mb-4 gap-3">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border} border`}>
                            {statusMeta.icon}
                            <span>{statusMeta.label}</span>
                          </div>
                          <span className="text-xs text-slate-500 whitespace-nowrap">{item.response.date}</span>
                        </div>

                        {/* Feedback Comment */}
                        <div className="flex gap-3">
                          <FiMessageCircle size={18} className="text-slate-300 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700 leading-relaxed italic">
                            "{item.response.comment}"
                          </p>
                        </div>
                      </div>

                      {/* Success Banner (only for approved latest) */}
                      {item.response.status === 'DISETUJUI' && isLatest && (
                        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-t border-emerald-200 px-5 py-3">
                          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-2">
                            <FiCheckCircle size={14} />
                            Progres disetujui, siap lanjut ke tahap berikutnya
                          </p>
                        </div>
                      )}
                    </div>

                    {/* STUDENT SUBMISSION */}
                    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                      isLatest ? 'border-blue-100 shadow-blue-50' : 'border-slate-200'
                    }`}>
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4 gap-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                            <FiUser size={14} />
                            <span>Pengajuan Anda</span>
                          </div>
                          <span className="text-xs text-slate-500 whitespace-nowrap">{item.date}</span>
                        </div>

                        {/* Summary */}
                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                          {item.summary}
                        </p>

                        {/* File Attachment */}
                        <div className="inline-flex items-center gap-3 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer group">
                          <FiFileText size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-700 truncate">{item.files[0].name}</p>
                            <p className="text-xs text-slate-500">{item.files[0].size}</p>
                          </div>
                          <FiDownload size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* End of Timeline Indicator */}
          <div className="sm:pl-16 mt-8">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <span>Awal riwayat bimbingan</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}