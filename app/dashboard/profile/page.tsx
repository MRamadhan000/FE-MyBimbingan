"use client";

import React, { useState } from "react";
import { FiUser, FiHash, FiBook, FiCamera, FiSave, FiCheck } from "react-icons/fi";

export default function PengaturanProfilSingkat() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profil Saya</h1>
        <p className="text-slate-500 font-medium">Kelola informasi dasar identitas Anda.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          
          {/* FOTO PROFIL */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://ui-avatars.com/api/?name=Haikal+Rozhan&background=0284c7&color=fff&size=128" 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 p-3 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-slate-900 transition-all shadow-lg">
                <FiCamera size={18} />
                <input type="file" className="hidden" />
              </label>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ketuk icon untuk ganti foto</p>
          </div>

          {/* INPUT DATA */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <FiUser size={12}/> Nama Lengkap
              </label>
              <input 
                type="text" 
                defaultValue="Haikal Rozhan"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <FiHash size={12}/> NIM
              </label>
              <input 
                type="text" 
                defaultValue="20101140000"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <FiBook size={12}/> Jurusan
              </label>
              <input 
                type="text" 
                defaultValue="Teknik Informatika"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button 
            type="submit"
            disabled={isSaving}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              saved ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl'
            }`}
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <>Tersimpan <FiCheck size={18}/></>
            ) : (
              <>Simpan Profil <FiSave size={18}/></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}