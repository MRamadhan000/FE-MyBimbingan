"use client";

import React from "react";
import { 
  FiHelpCircle,
  FiActivity,
  FiSend,
  FiCalendar,
  FiBookOpen,
  FiUserPlus
} from "react-icons/fi";

export default function MahasiswaDashboardPanduanOnly() {
  const STEPS = [
    {
      title: "Enroll Dosen",
      desc: "Daftar pembimbing masih kosong? Lakukan Enroll Dosen terlebih dahulu agar bisa terhubung.",
      icon: <FiUserPlus className="text-blue-500" />,
      tag: "Langkah Awal"
    },
    {
      title: "Cek & Update",
      desc: "Untuk memantau status atau update revisi, silakan menuju halaman Bimbingan Saya.",
      icon: <FiActivity className="text-orange-500" />,
      tag: "Menu Bimbingan"
    },
    {
      title: "Ajukan Sesi",
      desc: "Ingin bimbingan langsung? Silakan buat pengajuan jadwal di halaman Ajukan.",
      icon: <FiSend className="text-emerald-500" />,
      tag: "Ajukan Sesi"
    },
    {
      title: "Cek Agenda",
      desc: "Lihat jadwal bimbingan yang sudah disetujui dosen di halaman Agenda.",
      icon: <FiCalendar className="text-purple-500" />,
      tag: "Cek Jadwal"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-12 px-4">
      
      {/* 1️⃣ GREETING (CENTERED) */}
      <div className="space-y-3 text-center">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
          Halo, Zam! 👋
        </h1>
        <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto leading-relaxed">
          Selamat datang kembali. Gunakan panduan di bawah untuk mulai mengelola skripsimu.
        </p>
      </div>

      {/* 2️⃣ USER GUIDE SECTION (MAIN CONTENT) */}
      <div className="space-y-8">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <FiHelpCircle size={20} />
          </div>
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Panduan Navigasi</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div 
              key={index} 
              className="p-8 bg-white border border-slate-100 rounded-[3rem] hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group flex flex-col h-full text-center items-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {React.cloneElement(step.icon as React.ReactElement, { size: 24 } as any)}
              </div>
              
              <div className="flex-1">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 block">
                  {step.tag}
                </span>
                <h3 className="font-black text-slate-900 text-base mb-3 leading-tight">{step.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3️⃣ FOOTER INFO (DARK THEME) */}
      <div className="p-8 bg-slate-900 rounded-[3rem] flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center shrink-0">
          <FiBookOpen size={24} />
        </div>
        <div className="text-center md:text-left">
          <p className="text-blue-400 uppercase tracking-widest text-[10px] font-black mb-1">Informasi Penting</p>
          <p className="text-xs font-bold text-slate-300 leading-relaxed">
            Semua aktivitas pengerjaan dan interaksi bimbingan akan tersimpan secara otomatis sebagai rekam jejak akademik Anda.
          </p>
        </div>
      </div>

    </div>
  );
}