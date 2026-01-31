"use client";

import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiChevronLeft,
  FiSearch,
  FiGrid,
  FiUser,
  FiSend,
  FiInfo
} from "react-icons/fi";
import { getAllLecturers } from "../../services/lecturers";

interface Lecturer {
  id: string;
  name: string;
  nuptk: string;
  interests: string[];
  image: string;
  password: string;
  createdAt: string;
}

export default function AjukanBimbingan() {
  const [status, setStatus] = useState("idle");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDosen, setSelectedDosen] = useState<Lecturer | null>(null);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await getAllLecturers();
        setLecturers(response.data);
      } catch (error) {
        console.error("Failed to fetch lecturers:", error);
      }
    };
    fetchLecturers();
  }, []);

  const filteredDosen = lecturers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDosen) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto py-32 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
          <FiCheckCircle size={40} className="text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Permintaan Dikirim</h2>
          <p className="text-slate-500 text-sm">
            Topik bimbingan telah diajukan ke <span className="font-bold text-slate-800">{selectedDosen?.name}</span>. 
            Tunggu notifikasi jadwal dari Dosen.
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 px-4">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
          <FiChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ajukan Pembahasan</h1>
          <p className="text-slate-500 text-xs font-medium">Pilih dosen dan tentukan topik yang ingin dikonsultasikan.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: SELECT DOSEN */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
                Pilih Dosen Pembimbing
              </label>
              
              {/* SEARCH BAR */}
              <div className="relative group">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Cari nama atau minat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-slate-200 outline-none transition-all text-slate-700"
                />
              </div>

              {/* LIST DOSEN */}
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredDosen.map((dosen) => (
                  <button
                    key={dosen.id}
                    type="button"
                    onClick={() => setSelectedDosen(dosen)}
                    className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center gap-4 ${
                      selectedDosen?.id === dosen.id 
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm shadow-blue-100' 
                        : 'border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedDosen?.id === dosen.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <FiUser size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate">{dosen.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">NUPTK: {dosen.nuptk}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{dosen.interests.join(', ')}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: TOPIK PEMBAHASAN */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 h-full flex flex-col">
            <div className="space-y-4 flex-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 px-1">
                <FiGrid /> Detail Topik Pembahasan
              </label>
              <textarea 
                required
                rows={10}
                placeholder={selectedDosen ? `Apa yang ingin Anda bahas dengan ${selectedDosen.name}?` : "Pilih dosen terlebih dahulu..."}
                disabled={!selectedDosen}
                className="w-full p-6 bg-slate-50 border border-transparent rounded-[2rem] text-sm focus:bg-white focus:border-slate-200 outline-none transition-all resize-none text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-blue-600">
                <FiInfo size={16} />
                <p className="text-[10px] font-bold uppercase tracking-wider">Jadwal akan ditentukan oleh dosen</p>
              </div>
              
              <button 
                type="submit"
                disabled={!selectedDosen || status === "submitting"}
                className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  !selectedDosen 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200 active:scale-95'
                }`}
              >
                {status === "submitting" ? "Mengirim..." : (
                  <>Kirim Request <FiSend /></>
                )}
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}