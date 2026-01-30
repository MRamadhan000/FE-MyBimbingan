"use client";

import React, { useState } from "react";
import {
  FiClock,
  FiCalendar,
  FiMapPin,
  FiVideo,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiExternalLink,
  FiMessageSquare
} from "react-icons/fi";

// Dummy Data Riwayat
const RIWAYAT_DATA = [
  {
    id: "REQ-001",
    lecturer: "Dr. Ir. Budi Santoso",
    topic: "Konsultasi BAB 3: Metodologi Penelitian dan Perancangan Sistem.",
    status: "SCHEDULED",
    date: "Senin, 02 Feb 2026",
    time: "09:00 - 10:30",
    type: "OFFLINE",
    location: "Ruang Dosen Lt. 2",
    note: "Bawa draft cetak bab 3 ya.",
    link: null
  },
  {
    id: "REQ-002",
    lecturer: "Siti Aminah, M.Kom",
    topic: "Diskusi revisi hasil pengujian algoritma pada BAB 4.",
    status: "PENDING",
    date: null,
    time: null,
    type: null,
    location: null,
    note: "Menunggu dosen menentukan jadwal...",
    link: null
  },
  {
    id: "REQ-003",
    lecturer: "Dr. Eng. Heru Wijaya",
    topic: "Pengajuan Judul Skripsi: Implementasi Blockchain pada Supply Chain.",
    status: "REJECTED",
    date: null,
    time: null,
    type: null,
    location: null,
    note: "Topik terlalu luas, silakan persempit lagi cakupannya.",
    link: null
  }
];

export default function RiwayatBimbingan() {
  const [filter, setFilter] = useState("ALL");

  const filteredData = filter === "ALL" 
    ? RIWAYAT_DATA 
    : RIWAYAT_DATA.filter(item => item.status === filter);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return {
          label: "Terjadwal",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: <FiCheckCircle size={14} />
        };
      case "REJECTED":
        return {
          label: "Ditolak",
          bg: "bg-rose-50",
          text: "text-rose-700",
          border: "border-rose-200",
          icon: <FiXCircle size={14} />
        };
      default:
        return {
          label: "Menunggu",
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: <FiClock size={14} />
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER & FILTER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Riwayat Pengajuan</h1>
            <p className="text-sm text-slate-600 mt-1">Pantau status persetujuan dan jadwal dari dosen</p>
          </div>
          
          <div className="inline-flex bg-white border border-slate-200 p-1 rounded-lg gap-1 shadow-sm">
            {["ALL", "PENDING", "SCHEDULED", "REJECTED"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                  filter === t 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {t === "ALL" ? "Semua" : t === "PENDING" ? "Menunggu" : t === "SCHEDULED" ? "Terjadwal" : "Ditolak"}
              </button>
            ))}
          </div>
        </div>

        {/* LIST RIWAYAT */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              const statusConfig = getStatusConfig(item.status);
              const isScheduled = item.status === "SCHEDULED";
              
              return (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all"
                >
                  {/* Status Bar */}
                  <div className={`h-1 ${
                    item.status === "SCHEDULED" ? "bg-emerald-500" : 
                    item.status === "REJECTED" ? "bg-rose-500" : 
                    "bg-amber-500"
                  }`} />

                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      
                      {/* INFO UTAMA */}
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            {statusConfig.icon}
                            <span>{statusConfig.label}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">{item.id}</span>
                        </div>

                        {/* Lecturer & Topic */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FiUser size={16} className="text-slate-400" />
                            <h3 className="text-base font-bold text-slate-900">{item.lecturer}</h3>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed pl-6">
                            {item.topic}
                          </p>
                        </div>

                        {/* Note dari Dosen */}
                        <div className={`p-4 rounded-lg border-l-4 ${
                          item.status === "REJECTED" ? "bg-rose-50 border-rose-300" : "bg-slate-50 border-slate-300"
                        }`}>
                          <div className="flex items-start gap-2">
                            <FiMessageSquare size={16} className={`flex-shrink-0 mt-0.5 ${
                              item.status === "REJECTED" ? "text-rose-500" : "text-slate-400"
                            }`} />
                            <div>
                              <p className="text-xs font-semibold text-slate-700 mb-1">Catatan Dosen</p>
                              <p className="text-sm text-slate-600">{item.note}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* JADWAL INFO */}
                      <div className="lg:w-80">
                        {isScheduled ? (
                          <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                            <div className="space-y-4">
                              {/* Date & Time */}
                              <div className="space-y-3">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jadwal Pertemuan</p>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <FiCalendar size={16} className="text-blue-400" />
                                    <span className="text-sm font-medium">{item.date}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <FiClock size={16} className="text-blue-400" />
                                    <span className="text-sm font-medium">{item.time}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Location */}
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lokasi</p>
                                <div className="flex items-center gap-3">
                                  {item.type === "ONLINE" ? (
                                    <FiVideo size={16} className="text-purple-400" />
                                  ) : (
                                    <FiMapPin size={16} className="text-amber-400" />
                                  )}
                                  <span className="text-sm font-medium">{item.location}</span>
                                </div>
                              </div>

                              {/* Join Button for Online */}
                              {item.type === "ONLINE" && (
                                <button className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                                  <FiVideo size={16} />
                                  Join Meeting
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
                              <FiCalendar size={20} className="text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">
                              {item.status === "REJECTED" ? "Pengajuan Ditolak" : "Jadwal Belum Ditentukan"}
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white border-2 border-dashed border-slate-200 rounded-xl">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiAlertCircle className="text-slate-400" size={24} />
              </div>
              <p className="text-sm text-slate-500 font-medium">Tidak ada data sesuai filter</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}