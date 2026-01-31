"use client";

import React, { useState } from "react";
import { useParams } from 'next/navigation';
import {
  FiUpload,
  FiFile,
  FiX,
  FiSend,
  FiInfo,
  FiCheckCircle,
  FiChevronLeft,
} from "react-icons/fi";
import { createSubmission } from '../../../../services/submission';

export default function UploadProgress() {
  const { slug } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title.trim() || !slug) return;

    setIsSubmitting(true);
    try {
      const submissionData = {
        title: title.trim(),
        description: description.trim(),
        enrollmentId: slug as string,
        files: [selectedFile],
      };

      await createSubmission(submissionData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Gagal mengirim submission. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validasi tombol submit
  const isFormValid = !!selectedFile && !!title.trim();

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-bounce">
            <FiCheckCircle size={40} />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Berhasil Terkirim!</h2>
        <p className="text-slate-500">Laporan progres Anda telah diteruskan ke dosen.</p>
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
        
        {/* --- JUDUL --- */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Judul Submission
          </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul submission..."
            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
            required
          />
        </div>

        {/* --- DESKRIPSI --- */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Ringkasan Pengerjaan <span className="text-slate-300 font-medium tracking-normal lowercase">(opsional)</span>
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Tuliskan poin-poin perubahan atau progres yang Anda lakukan..."
            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
          />
        </div>

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