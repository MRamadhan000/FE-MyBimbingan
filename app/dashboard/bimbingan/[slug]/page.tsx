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
  FiCornerDownRight,
  FiEdit3,
  FiAward,
  FiArrowDown,
} from "react-icons/fi";

type Status = 'MENUNGGU_REVIEW' | 'REVISI' | 'DISETUJUI';

const STATUS_CONFIG: Record<Status, { label: string; icon: React.ReactElement; bg: string; text: string }> = {
  MENUNGGU_REVIEW: {
    label: "MENUNGGU REVIEW",
    icon: <FiClock size={14} />,
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
  REVISI: {
    label: "PERLU REVISI",
    icon: <FiEdit3 size={14} />,
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  DISETUJUI: {
    label: "DISETUJUI",
    icon: <FiCheckCircle size={14} />,
    bg: "bg-emerald-500",
    text: "text-white",
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
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Log Aktivitas</h1>
          <p className="text-slate-500 font-medium mt-1">Seluruh riwayat bimbingan dan feedback dosen.</p>
        </div>
        <button onClick={() => router.push(`/dashboard/bimbingan/${slug}/create`)} className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 transition-all active:scale-95">
          <FiUploadCloud size={20} /> Update Progres
        </button>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="space-y-12 relative">
        {/* Garis Tengah Timeline */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-slate-100 hidden md:block" />

        {DETAILED_HISTORY.map((item, i) => {
          const statusMeta = STATUS_CONFIG[item.response.status];
          const isLatest = i === 0;

          return (
            <div key={item.id} className="relative">
              <div className="space-y-6">
                
                {/* 1. STUDENT LOG */}
                <div className="relative pl-0 md:pl-20">
                  {/* Dot Marker */}
                  <div className={`hidden md:flex absolute left-[23px] top-6 w-4 h-4 rounded-full border-4 border-white z-10 shadow-sm ${isLatest ? 'bg-blue-500' : 'bg-slate-300'}`} />
                  
                  <div className={`p-6 rounded-[2rem] border transition-all ${isLatest ? 'bg-white border-blue-100 shadow-xl shadow-slate-100' : 'bg-slate-50/50 border-slate-100 opacity-70'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                        <FiUser /> Kiriman Anda • {item.date}
                      </div>
                      {!isLatest && <span className="text-[8px] font-black bg-slate-200 text-slate-500 px-2 py-0.5 rounded">ARCHIVED</span>}
                    </div>
                    
                    <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-6">{item.summary}</p>

                    <div className="flex items-center gap-3 bg-slate-100/50 p-3 rounded-xl w-fit border border-slate-100">
                      <FiFileText size={16} className="text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-600">{item.files[0].name}</span>
                      <FiDownload className="text-slate-400 ml-2 cursor-pointer hover:text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* 2. DOSEN FEEDBACK */}
                <div className="relative pl-8 md:pl-32">
                  <FiCornerDownRight className="absolute left-0 md:left-24 top-0 text-slate-200" size={24} />
                  
                  <div className={`p-6 md:p-8 rounded-[2.5rem] border-2 transition-all ${
                    item.response.status === 'DISETUJUI' 
                    ? 'bg-emerald-50 border-emerald-100 shadow-lg shadow-emerald-100/20' 
                    : 'bg-white border-slate-100 shadow-sm'
                  } ${!isLatest && 'opacity-70'}`}>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center gap-2 text-[10px] font-black px-4 py-1.5 rounded-full ${statusMeta.bg} ${statusMeta.text}`}>
                        {statusMeta.icon} {statusMeta.label}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                         Dosen • {item.response.date}
                      </span>
                    </div>

                    <p className={`leading-relaxed ${item.response.status === 'DISETUJUI' ? 'text-slate-900 font-bold text-base' : 'text-slate-600 italic text-sm font-medium'}`}>
                      "{item.response.comment}"
                    </p>

                    {item.response.status === 'DISETUJUI' && isLatest && (
                      <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                        <FiAward className="animate-bounce" /> Progres Selesai & Disetujui
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Arrow Connector between groups */}
              {i < DETAILED_HISTORY.length - 1 && (
                <div className="flex justify-center md:justify-start md:pl-6 py-10">
                  <FiArrowDown className="text-slate-200" size={20} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}