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
  FiSearch
} from "react-icons/fi";

// Dummy Data Riwayat
const RIWAYAT_DATA = [
  {
    id: "REQ-001",
    lecturer: "Dr. Ir. Budi Santoso",
    topic: "Konsultasi BAB 3: Metodologi Penelitian dan Perancangan Sistem.",
    status: "SCHEDULED", // Status: PENDING, SCHEDULED, REJECTED
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "SCHEDULED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SCHEDULED": return <FiCheckCircle />;
      case "REJECTED": return <FiXCircle />;
      default: return <FiClock className="animate-spin-slow" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-10 px-4">
      
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Riwayat Pengajuan</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Pantau status persetujuan dan jadwal dari dosen.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          {["ALL", "PENDING", "SCHEDULED"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t === "ALL" ? "Semua" : t}
            </button>
          ))}
        </div>
      </div>

      {/* LIST RIWAYAT */}
      <div className="space-y-6">
        {filteredData.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              
              {/* INFO UTAMA */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 ${getStatusStyle(item.status)}`}>
                    {getStatusIcon(item.status)} {item.status}
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{item.id}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-slate-900 mb-1">
                    <FiUser size={16} className="text-slate-400" />
                    <h3 className="text-lg font-black">{item.lecturer}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed italic">"{item.topic}"</p>
                </div>

                {/* NOTE DARI DOSEN */}
                <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <FiAlertCircle /> Catatan Dosen
                  </p>
                  <p className="text-xs text-slate-600 font-medium">{item.note}</p>
                </div>
              </div>

              {/* JADWAL DARI DOSEN (Hanya muncul jika SCHEDULED) */}
              <div className={`lg:w-72 shrink-0 transition-all ${item.status === 'SCHEDULED' ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`h-full rounded-[2rem] p-6 flex flex-col justify-between border-2 ${
                  item.status === 'SCHEDULED' ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-slate-200' : 'bg-slate-50 border-dashed border-slate-200'
                }`}>
                  {item.status === "SCHEDULED" ? (
                    <>
                      <div className="space-y-4 text-white">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Waktu Pertemuan</p>
                          <div className="flex items-center gap-3">
                            <FiCalendar className="text-blue-400" />
                            <span className="text-sm font-bold">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <FiClock className="text-blue-400" />
                            <span className="text-sm font-bold">{item.time}</span>
                          </div>
                        </div>

                        <div className="space-y-1 pt-4 border-t border-white/10">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Lokasi / Link</p>
                          <div className="flex items-center gap-3">
                            {item.type === "ONLINE" ? <FiVideo className="text-purple-400" /> : <FiMapPin className="text-orange-400" />}
                            <span className="text-sm font-bold truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {item.type === "ONLINE" && (
                        <button className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                          Gabung Sesi <FiExternalLink />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                      <FiCalendar size={24} className="text-slate-300" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Jadwal Belum<br/>Tersedia</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}