"use client";

import React from "react";
import { 
  FiUsers, FiClock, FiCalendar, FiAlertCircle, 
  FiCheck, FiX, FiArrowRight, FiBell, FiPlus 
} from "react-icons/fi";

export default function LecturerDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 py-8 px-4">
      
      {/* HEADER & QUICK ACTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Dosen 👨‍🏫</h1>
          <p className="text-slate-500 font-medium">Selamat pagi, Prof. Anda memiliki 4 tugas mendesak hari ini.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
            <FiPlus /> Set Jadwal
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all">
            <FiBell /> Kirim Pengumuman
          </button>
        </div>
      </div>

      {/* 1️⃣ SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Mahasiswa Aktif", val: "12", icon: <FiUsers />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pengajuan Pending", val: "4", icon: <FiClock />, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Agenda Hari Ini", val: "2", icon: <FiCalendar />, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Belum Update >7 Hari", val: "3", icon: <FiAlertCircle />, color: "text-slate-600", bg: "bg-slate-100" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 text-xl shadow-inner`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2️⃣ AGENDA HARI INI (Kiri) */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 px-2">
            <FiCalendar className="text-blue-600" /> Agenda Terdekat
          </h2>
          <div className="space-y-4">
            {[
              { time: "09:00", name: "Andi Pratama", room: "Ruang D-203", topic: "Revisi Bab 3", type: "OFFLINE" },
              { time: "13:30", name: "Siti Zubaidah", room: "Zoom Meeting", topic: "Final Laporan", type: "ONLINE" },
            ].map((agenda, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-lg">{agenda.time}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{agenda.type}</span>
                </div>
                <h4 className="font-bold text-slate-900">{agenda.name}</h4>
                <p className="text-xs text-slate-500 mb-4">{agenda.topic} • {agenda.room}</p>
                <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all flex items-center justify-center gap-2">
                  Lihat Detail <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3️⃣ PENGAJUAN PENDING (Tengah/Kanan) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 px-2">
            <FiClock className="text-rose-500" /> Pengajuan Pending
          </h2>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Mahasiswa</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Topik</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Tanggal</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Budi Setiadi", topic: "Diskusi Bab 2", date: "12 Feb" },
                  { name: "Rina Wijaya", topic: "Validasi Instrumen", date: "14 Feb" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-slate-900 text-sm">{row.name}</p>
                    </td>
                    <td className="p-6 text-xs font-medium text-slate-600">{row.topic}</td>
                    <td className="p-6 text-xs font-bold text-slate-900">{row.date}</td>
                    <td className="p-6">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                          <FiCheck size={16} />
                        </button>
                        <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                          <FiX size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4️⃣ MAHASISWA PERLU PERHATIAN */}
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 px-2 pt-4">
            <FiAlertCircle className="text-amber-500" /> Perlu Perhatian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Rina Putri", status: "Revisi (6 hari)", last: "Bab 3" },
              { name: "Deni Aris", status: "Tidak Update (10 hari)", last: "Proposal" },
            ].map((mhs, i) => (
              <div key={i} className="bg-white p-5 rounded-[2rem] border border-amber-100 flex items-center justify-between group hover:border-amber-400 transition-all">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{mhs.name}</h4>
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">{mhs.status}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Progress Terakhir: {mhs.last}</p>
                </div>
                <button className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <FiArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}