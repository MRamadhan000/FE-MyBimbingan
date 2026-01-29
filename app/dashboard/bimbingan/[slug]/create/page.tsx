"use client";

import React, { useState } from "react";
import {
  FiUpload,
  FiFile,
  FiX,
  FiSend,
  FiInfo,
  FiCheckCircle,
  FiChevronLeft,
  FiRefreshCw,
  FiPlus,
} from "react-icons/fi";

// Data Dummy Revisi yang tersedia untuk diperbaiki
const REVISION_LIST = [
  { id: 101, date: "26 Jan 2026", note: "Persempit populasi penelitian ke skala UKM.", type: "Bab 3" },
  { id: 102, date: "24 Jan 2026", note: "Perbaiki instrumen kuesioner pada variabel X.", type: "Instrumen" },
];

export default function UploadProgress() {
  const [context, setContext] = useState<"NEW" | "REVISION">("NEW");
  const [selectedRevisionId, setSelectedRevisionId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Validasi tombol submit
  const isFormValid = context === "NEW" ? !!selectedFile : (!!selectedFile && !!selectedRevisionId);

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-bounce">
            <FiCheckCircle size={40} />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Berhasil Terkirim!</h2>
        <p className="text-slate-500">Laporan {context === 'NEW' ? 'progres baru' : 'perbaikan revisi'} Anda telah diteruskan ke dosen.</p>
        <button onClick={() => setIsSuccess(false)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
          <FiChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Kirim Laporan Progres</h1>
          <p className="text-sm text-slate-500 font-medium">Dokumentasikan pengerjaan skripsi Anda secara berkala.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-10">
        
        {/* --- PILIH KONTEKS (Radio Button Utama) --- */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Apa yang ingin Anda kirim?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setContext("NEW")}
              className={`flex items-center justify-center gap-3 p-5 rounded-[2rem] border-2 transition-all font-black text-xs uppercase tracking-widest ${
                context === "NEW" ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-lg shadow-blue-500/10" : "border-slate-50 text-slate-400 hover:border-slate-200"
              }`}
            >
              <FiPlus size={18} /> Progres Baru
            </button>
            <button
              type="button"
              onClick={() => setContext("REVISION")}
              className={`flex items-center justify-center gap-3 p-5 rounded-[2rem] border-2 transition-all font-black text-xs uppercase tracking-widest ${
                context === "REVISION" ? "border-orange-500 bg-orange-50/50 text-orange-600 shadow-lg shadow-orange-500/10" : "border-slate-50 text-slate-400 hover:border-slate-200"
              }`}
            >
              <FiRefreshCw size={18} /> Fix Revisi
            </button>
          </div>
        </div>

        {/* --- DAFTAR REVISI (Muncul hanya jika pilih REVISION) --- */}
        {context === "REVISION" && (
          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 ml-1">
              Pilih Revisi yang Diperbaiki:
            </label>
            <div className="grid grid-cols-1 gap-3">
              {REVISION_LIST.map((rev) => (
                <div
                  key={rev.id}
                  onClick={() => setSelectedRevisionId(rev.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    selectedRevisionId === rev.id ? "border-orange-500 bg-white shadow-md" : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                  }`}
                >
                  <div className={`mt-1 ${selectedRevisionId === rev.id ? "text-orange-500" : "text-slate-300"}`}>
                    <FiCheckCircle size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded uppercase tracking-tighter">ID: #{rev.id}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{rev.date}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 italic">"{rev.note}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- UPLOAD AREA --- */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Unggah File Laporan
          </label>
          <div className="relative group">
            <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept=".pdf,.docx" />
            <div className={`p-10 border-2 border-dashed rounded-[2.5rem] transition-all flex flex-col items-center justify-center gap-4 ${
              selectedFile ? 'border-blue-500 bg-blue-50/20' : 'border-slate-100 group-hover:border-blue-400 bg-slate-50/30'
            }`}>
              <div className={`p-5 rounded-[1.5rem] shadow-xl ${selectedFile ? 'bg-blue-600 text-white' : 'bg-white text-slate-300'}`}>
                <FiUpload size={28} />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-800 tracking-tight">
                  {selectedFile ? selectedFile.name : "Seret file dokumen ke sini"}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">
                  PDF, DOCX (Maks. 10MB)
                </p>
              </div>
              {selectedFile && (
                <button type="button" onClick={() => setSelectedFile(null)} className="mt-2 text-[10px] font-black text-rose-500 flex items-center gap-1 uppercase tracking-[0.2em] hover:opacity-70 transition-all">
                  <FiX /> Ganti File
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- DESKRIPSI --- */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Ringkasan Pengerjaan <span className="text-slate-300 font-medium tracking-normal lowercase">(opsional)</span>
          </label>
          <textarea 
            rows={4}
            placeholder="Tuliskan poin-poin perubahan atau progres yang Anda lakukan..."
            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-6">
          <button 
            disabled={isSubmitting || !isFormValid}
            className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
              isSubmitting || !isFormValid
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-blue-600 shadow-2xl shadow-blue-500/20'
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Kirim Laporan</span>
                <FiSend size={18} />
              </>
            )}
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
             <FiInfo size={14} />
             <p className="text-[9px] font-bold uppercase tracking-widest text-center">
               Dosen akan menerima notifikasi segera setelah data terkirim
             </p>
          </div>
        </div>
      </form>
    </div>
  );
}