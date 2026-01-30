"use client";

import React from "react";
import Link from "next/link";
import { 
  FiUser, 
  FiChevronRight, 
  FiBookOpen, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiInfo
} from "react-icons/fi";

// Data Dummy Daftar Pembimbing
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Bimbingan Saya</h1>
          <p className="text-sm text-slate-600">Pilih dosen pembimbing untuk melihat riwayat dan feedback bimbingan</p>
        </div>

        {/* LIST DOSEN PEMBIMBING */}
        <div className="grid grid-cols-1 gap-4">
          {MY_SUPERVISORS.map((dosen) => {
            const isApproved = dosen.status === 'DISETUJUI';
            
            return (
              <Link 
                key={dosen.id} 
                href={`/dashboard/bimbingan/${dosen.slug}`}
                className="group block"
              >
                <div className="bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">
                  
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      
                      {/* AVATAR & INFO DOSEN */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:from-blue-600 group-hover:to-blue-700 transition-all shadow-sm">
                          <FiUser size={20} />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-blue-600 mb-1">{dosen.role}</p>
                              <h2 className="text-lg font-bold text-slate-900 leading-tight">{dosen.name}</h2>
                            </div>
                            
                            {/* Status Badge - Mobile Position */}
                            <div className="lg:hidden">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                                isApproved 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-orange-50 text-orange-700 border-orange-200'
                              }`}>
                                {isApproved ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                                <span>{dosen.status === 'DISETUJUI' ? 'Disetujui' : 'Revisi'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Judul Skripsi */}
                          <div className="flex items-start gap-2 mt-3">
                            <FiBookOpen className="text-slate-400 mt-0.5 flex-shrink-0" size={16} />
                            <p className="text-sm text-slate-600 leading-relaxed italic line-clamp-2">
                              "{dosen.title}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* STATUS & DATE - Desktop */}
                      <div className="hidden lg:flex items-center gap-4">
                        {/* Last Update */}
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-1">Terakhir Update</p>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                            <FiClock size={14} className="text-slate-400" />
                            <span>{dosen.lastUpdate}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          isApproved 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {isApproved ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                          <span>{dosen.status === 'DISETUJUI' ? 'Disetujui' : 'Revisi'}</span>
                        </div>

                        {/* Arrow */}
                        <div className="bg-slate-100 p-2.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <FiChevronRight size={18} />
                        </div>
                      </div>

                    </div>

                    {/* Last Update - Mobile */}
                    <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <FiClock size={14} className="text-slate-400" />
                        <span>Update: {dosen.lastUpdate}</span>
                      </div>
                      <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                        <FiChevronRight size={18} />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        {/* INFO BOX */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
              <FiInfo size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Informasi Penting</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Silakan hubungi admin prodi jika ada ketidaksesuaian data dosen pembimbing.
              </p>
            </div>
          </div>
          
          {/* Decorative Element */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

      </div>
    </div>
  );
}