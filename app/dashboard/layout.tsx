"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, 
  FiFileText, 
  FiUploadCloud, 
  FiPlusCircle, 
  FiCalendar, 
  FiClock, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiChevronRight,
  FiUser,
} from 'react-icons/fi';

const MENU_ITEMS = [
  { label: 'Dashboard', pintasan: 'Dashboard', href: '/dashboard', icon: <FiGrid size={20} /> },
  { label: 'Daftar Bimbingan', pintasan: 'Enroll', href: '/dashboard/enroll', icon: <FiUser size={20} /> },
  { label: 'Bimbingan Saya', pintasan: 'Bimbingan Saya', href: '/dashboard/bimbingan', icon: <FiFileText size={20} /> },
  { label: 'Ajukan Bimbingan', pintasan: 'Pengajuan Bimbingan Langsung', href: '/dashboard/ajukan', icon: <FiPlusCircle size={20} /> },
  { label: 'Agenda Dosen', pintasan: 'Jadwal Bimbingan Dosen', href: '/dashboard/agenda', icon: <FiCalendar size={20} /> },
  { label: 'Riwayat Pengajuan', pintasan: 'Riwayat Pengajuan Bimbingan', href: '/dashboard/riwayat-ajukan', icon: <FiClock size={20} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    // Menggunakan h-screen dan overflow-hidden pada root agar tidak ada scroll body utama
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Menggunakan h-full agar mengikuti tinggi layar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-full
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <FiGrid size={20} />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">MyBim.</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
            <FiX size={24} />
          </button>
        </div>
        
        {/* Menu Navigasi dengan scroll internal jika menu terlalu banyak */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center px-4 py-3.5 rounded-2xl font-bold text-[13px] transition-all group
                  ${isActive 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"}
                `}
              >
                <span className={`mr-3 transition-colors ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-600"}`}>
                  {item.icon}
                </span> 
                {item.pintasan}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-50 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold shrink-0">
          v1.0.2 • 2026
        </div>
      </aside>

      {/* MAIN CONTENT AREA - Menggunakan flex-1 dan h-full */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        
        {/* HEADER - Tetap di atas (Sticky/Fixed di dalam container) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 lg:hidden text-slate-600"
            >
              <FiMenu size={20} />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-[12px] font-bold tracking-wide">
              <span className="text-slate-400 uppercase">Pages</span>
              <FiChevronRight size={14} className="text-slate-300" />
              <span className="text-blue-600 uppercase tracking-widest">
                {MENU_ITEMS.find(i => i.href === pathname)?.label || 'Overview'}
              </span>
            </div>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 focus:outline-none group"
            >
              <div className="text-right hidden md:block">
                <p className="text-xs font-black text-slate-800 leading-none">Ahmad Syarif</p>
                <p className="text-[10px] text-blue-500 font-bold mt-1 uppercase tracking-tighter">Mahasiswa Tingkat Akhir</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center text-slate-700 font-black text-sm group-hover:border-blue-500 transition-all">
                AS
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 py-3 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-3 border-b border-slate-50 mb-2">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Akun Mahasiswa</p>
                </div>
                <button className="w-full text-left px-6 py-3 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center transition-colors">
                  <FiSettings className="mr-3" /> Profil Saya
                </button>
                <button 
                  onClick={() => alert("Logout Berhasil")}
                  className="w-full text-left px-6 py-3 text-[13px] font-bold text-red-500 hover:bg-red-50 flex items-center transition-colors"
                >
                  <FiLogOut className="mr-3" /> Keluar Sistem
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT - Inilah area yang bisa di-scroll */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}