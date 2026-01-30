"use client";

import React from "react";
import Link from "next/link";
import { 
  FiHelpCircle,
  FiActivity,
  FiSend,
  FiCalendar,
  FiUserPlus,
  FiArrowRight,
  FiInfo
} from "react-icons/fi";

export default function MahasiswaDashboard() {
  const STEPS = [
    {
      title: "Enroll Dosen",
      desc: "Daftar pembimbing masih kosong? Lakukan Enroll Dosen terlebih dahulu agar bisa terhubung.",
      icon: <FiUserPlus />,
      tag: "Langkah Awal",
      color: "blue",
      href: "/dashboard/enroll"
    },
    {
      title: "Bimbingan Saya",
      desc: "Pantau status bimbingan dan update revisi dari dosen pembimbing Anda.",
      icon: <FiActivity />,
      tag: "Kelola Bimbingan",
      color: "orange",
      href: "/dashboard/bimbingan"
    },
    {
      title: "Ajukan Sesi",
      desc: "Buat pengajuan jadwal bimbingan langsung dengan dosen pembimbing.",
      icon: <FiSend />,
      tag: "Buat Jadwal",
      color: "emerald",
      href: "/dashboard/ajukan"
    },
    {
      title: "Cek Agenda",
      desc: "Lihat jadwal bimbingan yang sudah disetujui dan akan berlangsung.",
      icon: <FiCalendar />,
      tag: "Lihat Jadwal",
      color: "purple",
      href: "/dashboard/agenda"
    }
  ];

  const colorVariants: Record<string, { bg: string; text: string; hover: string; iconBg: string }> = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      hover: "hover:border-blue-300 hover:shadow-blue-50",
      iconBg: "group-hover:bg-blue-600"
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      hover: "hover:border-orange-300 hover:shadow-orange-50",
      iconBg: "group-hover:bg-orange-600"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      hover: "hover:border-emerald-300 hover:shadow-emerald-50",
      iconBg: "group-hover:bg-emerald-600"
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      hover: "hover:border-purple-300 hover:shadow-purple-50",
      iconBg: "group-hover:bg-purple-600"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* GREETING */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-slate-900">
            Halo, Zam! 👋
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            Selamat datang kembali. Gunakan menu di bawah untuk mengelola proses bimbingan skripsi Anda.
          </p>
        </div>

        {/* NAVIGATION GUIDE */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FiHelpCircle size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Panduan Navigasi</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, index) => {
              const colors = colorVariants[step.color];
              
              return (
                <Link 
                  key={index}
                  href={step.href}
                  className="group block"
                >
                  <div className={`p-6 bg-white border border-slate-200 rounded-xl ${colors.hover} hover:shadow-lg transition-all duration-200 h-full flex flex-col`}>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 ${colors.iconBg} group-hover:text-white transition-all ${colors.text}`}>
                      {React.cloneElement(step.icon, { size: 20 } as any)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <span className={`text-xs font-semibold ${colors.text} mb-2 block`}>
                        {step.tag}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                        Lihat selengkapnya
                      </span>
                      <FiArrowRight className={`${colors.text} group-hover:translate-x-1 transition-transform`} size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
                Semua aktivitas pengerjaan dan interaksi bimbingan akan tersimpan secara otomatis sebagai rekam jejak akademik Anda.
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

      </div>
    </div>
  );
}