"use client";

import { 
  FiUser, 
  FiBriefcase, 
  FiArrowRight, 
  FiCheckCircle, 
  FiShield, 
  FiZap 
} from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* NAVBAR SIMPEL */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <FiZap size={24} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">MyBimbingan</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Panduan</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Kontak IT</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center md:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              <FiShield /> Terintegrasi dengan Sistem Kampus
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Bimbingan <br /> 
              <span className="text-blue-600">Tanpa Hambatan.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
              Platform manajemen tugas akhir yang menghubungkan mahasiswa dan dosen secara real-time. Pantau progres, ajukan jadwal, dan terima feedback dalam satu tempat.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <FiCheckCircle className="text-emerald-500" /> Monitoring Progres
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <FiCheckCircle className="text-emerald-500" /> Penjadwalan Cerdas
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <FiCheckCircle className="text-emerald-500" /> Log Aktivitas Aman
              </div>
            </div>
          </div>

          {/* RIGHT: LOGIN CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
            
            {/* LOGIN MAHASISWA */}
            <div className="group bg-white p-8 rounded-[3rem] border-2 border-slate-100 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer" onClick={() => router.push('/auth/login')}>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <FiUser size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Mahasiswa</h3>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
                Akses dashboard bimbingan, upload progres, dan cek jadwal dosen.
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-2 transition-transform">
                Masuk <FiArrowRight />
              </div>
            </div>

            {/* LOGIN DOSEN */}
            <div className="group bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-900 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer" onClick={() => router.push('/lecturer/auth/login')}>
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
                <FiBriefcase size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Dosen</h3>
              <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
                Kelola bimbingan mahasiswa, atur jadwal, dan berikan feedback revisi.
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400 group-hover:translate-x-2 transition-transform">
                Masuk <FiArrowRight />
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2026 MyBimbingan System • Universitas Indonesia
          </p>
          <div className="flex gap-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">
              All Systems Operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}