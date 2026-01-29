"use client";

import React from "react";
import Link from "next/link";
import { 
  FiUser, 
  FiChevronRight, 
  FiBookOpen, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle
} from "react-icons/fi";

// Data Dummy Daftar Pembimbing (Tanpa Pesan & Progress Bar)
const MY_SUPERVISORS = [
  {
    id: "p1",
    name: "Dr. Ir. Budi Santoso",
    role: "Pembimbing Utama (I)",
    title: "Implementasi Sistem Monitoring Skripsi Real-time",
    lastUpdate: "30 Jan 2026",
    status: "DISETUJUI",
    slug: "budi-santoso"
  },
  {
    id: "p2",
    name: "Siti Aminah, M.Kom",
    role: "Pembimbing Pendamping (II)",
    title: "Analisis Algoritma Penjadwalan pada MyBim",
    lastUpdate: "26 Jan 2026",
    status: "REVISI",
    slug: "siti-aminah"
  }
];

export default function BimbinganGeneral() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bimbingan Saya</h1>
        <p className="text-slate-500 font-medium">Klik pada dosen pembimbing untuk melihat riwayat aktivitas dan feedback.</p>
      </div>

      {/* LIST DOSEN PEMBIMBING */}
      <div className="grid grid-cols-1 gap-5">
        {MY_SUPERVISORS.map((dosen) => (
          <Link 
            key={dosen.id} 
            href={`/dashboard/bimbingan/${dosen.slug}`}
            className="group block"
          >
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 relative">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                
                {/* INFO DOSEN & JUDUL */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                      <FiUser size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{dosen.role}</p>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">{dosen.name}</h2>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-500 max-w-2xl">
                    <FiBookOpen className="mt-1 shrink-0 text-slate-300" size={18} />
                    <p className="text-sm font-semibold leading-relaxed italic">"{dosen.title}"</p>
                  </div>
                </div>

                {/* STATUS & UPDATE */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-50">
                  <div className="text-left lg:text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      dosen.status === 'DISETUJUI' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {dosen.status === 'DISETUJUI' ? <FiCheckCircle /> : <FiAlertCircle />} {dosen.status}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Terakhir Update</p>
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase">
                      <FiClock size={14} className="text-slate-300" /> {dosen.lastUpdate}
                    </div>
                  </div>
                </div>

                {/* ARROW ACTION */}
                <div className="hidden lg:flex bg-slate-50 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all self-center shadow-sm">
                  <FiChevronRight size={24} />
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* INFO BOX */}
      <div className="p-6 bg-slate-900 rounded-[2.5rem] flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0">
            <FiAlertCircle size={24} />
          </div>
          <div className="text-white">
            <h4 className="font-black text-[11px] uppercase tracking-widest text-blue-400">Pemberitahuan</h4>
            <p className="text-xs font-medium text-slate-300 mt-0.5">Silakan hubungi admin prodi jika ada ketidaksesuaian data dosen pembimbing.</p>
          </div>
        </div>
        <FiUser size={120} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />
      </div>

    </div>
  );
}