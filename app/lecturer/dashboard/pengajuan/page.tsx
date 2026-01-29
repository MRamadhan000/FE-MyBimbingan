"use client";

import React, { useState } from "react";
import { 
  FiCheck, FiX, FiCalendar, FiMessageCircle, 
  FiAlertCircle, FiClock, FiSend, FiCornerDownRight 
} from "react-icons/fi";

export default function ManajemenPengajuanDosenV3() {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState<number | null>(null); // ID pengajuan

  const REQUESTS = [
    {
      id: 1,
      nama: "Budi Setiadi",
      nim: "20101140102",
      topik: "Diskusi Hasil Pengujian Algoritma Bab 4",
      pesan: "Prof, saya sudah menyelesaikan coding. Mohon waktunya untuk bimbingan langsung di kampus."
    },
    {
      id: 2,
      nama: "Budi Setiadi",
      nim: "20101140102",
      topik: "Diskusi Hasil Pengujian Algoritma Bab 4",
      pesan: "Prof, saya sudah menyelesaikan coding. Mohon waktunya untuk bimbingan langsung di kampus."
    }
  ];

  const quickReasons = [
    "Maaf, saya ada kegiatan mendadak.",
    "Jadwal saya penuh minggu ini.",
    "Silakan perbaiki dokumen dulu di sistem.",
    "Lakukan bimbingan via chat saja dulu."
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pengajuan Baru</h1>
        <p className="text-slate-500 font-medium">Tentukan waktu temu atau berikan alasan penolakan bimbingan.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {REQUESTS.map((req) => (
          <div key={req.id} className="bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/40 overflow-hidden group">
            <div className="flex flex-col lg:flex-row">
              
              {/* INFO MAHASISWA & PESAN */}
              <div className="p-8 lg:w-3/5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                    {req.nama.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 leading-none">{req.nama}</h3>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{req.nim}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <FiMessageCircle size={12} className="text-blue-500"/> Topik & Pesan
                    </p>
                    <h4 className="text-slate-900 font-bold mb-2">"{req.topik}"</h4>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                      {req.pesan}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pl-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <FiClock /> Dikirim Baru Saja
                  </div>
                </div>
              </div>

              {/* ACTION AREA (DOSEN DECISION) */}
              <div className="p-8 lg:w-2/5 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-100 space-y-6">
                
                {/* SET TIME & APPROVE */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Jadwalkan Pertemuan</label>
                  <div className="flex gap-2">
                    <input 
                      type="datetime-local" 
                      className="flex-1 p-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                    />
                    <button className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                      <FiCheck size={20} strokeWidth={3} />
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">*Pilih waktu untuk menyetujui</p>
                </div>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 bg-transparent px-2"><span className="bg-slate-50/50 px-2">Atau</span></div>
                </div>

                {/* REJECT BUTTON */}
                <button 
                  onClick={() => setShowRejectModal(showRejectModal === req.id ? null : req.id)}
                  className="w-full py-4 bg-white border border-rose-100 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all duration-300"
                >
                  Tolak Pengajuan
                </button>
              </div>
            </div>

            {/* EXPANDABLE REJECT REASON */}
            {showRejectModal === req.id && (
              <div className="p-8 bg-rose-50/30 border-t border-rose-50 space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase tracking-widest">
                    <FiAlertCircle /> Klik Pintasan Alasan:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickReasons.map((text, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setRejectReason(text)}
                        className="px-4 py-2 bg-white border border-rose-100 rounded-xl text-[10px] font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Atau tulis alasan kustom di sini..."
                    className="w-full p-6 bg-white border border-rose-100 rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-rose-500/5 outline-none min-h-[120px] transition-all resize-none shadow-inner"
                  />
                  <button className="absolute bottom-4 right-4 px-6 py-3 bg-rose-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all flex items-center gap-2 shadow-lg shadow-rose-200">
                    Kirim Penolakan <FiSend />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER TIP */}
      <div className="p-6 bg-slate-900 rounded-[2.5rem] flex items-center gap-4 shadow-2xl">
        <div className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center shrink-0">
          <FiCornerDownRight />
        </div>
        <p className="text-xs font-bold text-slate-300 leading-relaxed">
          <span className="text-blue-400 block uppercase tracking-widest text-[9px] mb-1">Informasi Sistem</span>
          Setelah waktu ditentukan, mahasiswa akan menerima notifikasi otomatis melalui sistem dan email.
        </p>
      </div>

    </div>
  );
}