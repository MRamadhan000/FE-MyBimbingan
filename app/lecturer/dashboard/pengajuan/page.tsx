"use client";

import React, { useState } from "react";
import { 
  FiCheck, FiX, FiCalendar, FiMessageCircle, 
  FiAlertCircle, FiClock, FiSend, FiInfo 
} from "react-icons/fi";

export default function ManajemenPengajuanDosenMinimal() {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState<number | null>(null);
  const [scheduledTime, setScheduledTime] = useState<{[key: number]: string}>({});

  const REQUESTS = [
    {
      id: 1,
      nama: "Budi Setiadi",
      nim: "20101140102",
      topik: "Diskusi Hasil Pengujian Algoritma Bab 4",
      pesan: "Prof, saya sudah menyelesaikan coding. Mohon waktunya untuk bimbingan langsung di kampus.",
      waktuKirim: "2 jam yang lalu"
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      nim: "20101140089",
      topik: "Review Bab 3 - Metodologi Penelitian",
      pesan: "Selamat pagi Prof, saya ingin konsultasi mengenai pemilihan metode sampling yang tepat untuk penelitian saya.",
      waktuKirim: "5 jam yang lalu"
    }
  ];

  const quickReasons = [
    "Jadwal saya penuh minggu ini",
    "Silakan perbaiki dokumen terlebih dahulu",
    "Lakukan bimbingan via chat terlebih dahulu",
    "Maaf, ada kegiatan mendadak"
  ];

  const handleApprove = (id: number) => {
    if (!scheduledTime[id]) {
      alert("Pilih waktu pertemuan terlebih dahulu");
      return;
    }
    alert(`Pengajuan disetujui untuk ${new Date(scheduledTime[id]).toLocaleString('id-ID')}`);
  };

  const handleReject = (id: number) => {
    if (!rejectReason.trim()) {
      alert("Masukkan alasan penolakan");
      return;
    }
    alert(`Pengajuan ditolak dengan alasan: ${rejectReason}`);
    setRejectReason("");
    setShowRejectModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        
        {/* HEADER - Clean and Simple */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">Pengajuan Bimbingan</h1>
          <p className="text-sm text-slate-600">Kelola jadwal pertemuan dengan mahasiswa bimbingan Anda</p>
        </div>

        {/* REQUEST CARDS */}
        <div className="space-y-4">
          {REQUESTS.map((req) => (
            <div 
              key={req.id} 
              className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Main Content */}
              <div className="p-6 space-y-4">
                
                {/* Student Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-semibold text-lg">
                      {req.nama.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{req.nama}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{req.nim}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <FiClock size={13} />
                    <span>{req.waktuKirim}</span>
                  </div>
                </div>

                {/* Topic & Message */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <FiMessageCircle size={14} className="text-blue-600" />
                    <span>Topik Bimbingan</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-slate-900 text-sm">{req.topik}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{req.pesan}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-3">
                  
                  {/* Schedule Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <FiCalendar size={13} />
                      Jadwalkan Pertemuan
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="datetime-local" 
                        value={scheduledTime[req.id] || ''}
                        onChange={(e) => setScheduledTime({...scheduledTime, [req.id]: e.target.value})}
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                      <button 
                        onClick={() => handleApprove(req.id)}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-600 hover:to-green-700 transition-all shadow-sm flex items-center gap-2"
                      >
                        <FiCheck size={16} strokeWidth={2.5} />
                        Setujui
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200"></span>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-slate-400 font-medium">atau</span>
                    </div>
                  </div>

                  {/* Reject Button */}
                  <button 
                    onClick={() => setShowRejectModal(showRejectModal === req.id ? null : req.id)}
                    className="w-full py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg font-semibold text-sm hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FiX size={16} strokeWidth={2.5} />
                    Tolak Pengajuan
                  </button>
                </div>
              </div>

              {/* Expandable Reject Section */}
              {showRejectModal === req.id && (
                <div className="border-t border-rose-100 bg-rose-50/50 p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Quick Reasons */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-rose-700 flex items-center gap-1.5">
                      <FiAlertCircle size={13} />
                      Pilih Alasan (Opsional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickReasons.map((text, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setRejectReason(text)}
                          className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-all"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Reason */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-rose-700">
                      Alasan Penolakan
                    </label>
                    <textarea 
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Tulis alasan penolakan di sini..."
                      className="w-full p-4 bg-white border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none min-h-[100px] resize-none transition-all"
                    />
                  </div>

                  {/* Submit Reject */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowRejectModal(null)}
                      className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-all"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-lg font-semibold text-sm hover:from-rose-600 hover:to-red-700 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <FiSend size={14} />
                      Kirim Penolakan
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <FiInfo size={16} />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-blue-900">Informasi</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Mahasiswa akan menerima notifikasi otomatis melalui sistem dan email setelah Anda menyetujui atau menolak pengajuan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}