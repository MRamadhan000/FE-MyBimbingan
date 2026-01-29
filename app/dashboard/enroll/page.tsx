"use client";

import React, { useState } from "react";
import { 
  FiSearch, 
  FiUserPlus, 
  FiCheckCircle, 
  FiChevronLeft,
  FiUser,
  FiAward,
  FiAlertCircle
} from "react-icons/fi";

// Data Dosen (Tanpa Quota)
const AVAILABLE_LECTURERS = [
  { id: 1, name: "Dr. Ir. Budi Santoso", nidn: "0412038401", expert: "Software Engineering" },
  { id: 2, name: "Siti Aminah, M.Kom", nidn: "0415058802", expert: "Data Science" },
  { id: 3, name: "Dr. Eng. Heru Wijaya", nidn: "0422087501", expert: "Artificial Intelligence" },
  { id: 4, name: "Andini Putri, Ph.D", nidn: "0401019003", expert: "Cyber Security" },
  { id: 5, name: "Bambang Pamungkas, M.T", nidn: "0409088102", expert: "Network Architecture" },
];

export default function EnrollBimbingan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState<number | null>(null);

  const filteredDosen = AVAILABLE_LECTURERS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.expert.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnroll = () => {
    if (selectedDosen) {
      setTimeout(() => setIsSuccess(true), 800);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-slate-200">
          <FiCheckCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Enroll Berhasil</h2>
          <p className="text-slate-500 font-medium italic">Dosen telah berhasil ditambahkan ke daftar pembimbing Anda.</p>
        </div>
        <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all">
          Masuk ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
          <FiChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Daftar Pembimbing</h1>
          <p className="text-slate-500 text-sm font-medium">Pilih dosen yang akan mendampingi tugas akhir Anda.</p>
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="relative group">
        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Cari nama dosen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-transparent rounded-[2rem] text-sm focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm"
        />
      </div>

      {/* DOSEN LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDosen.map((dosen) => {
          const isSelected = selectedDosen === dosen.id;

          return (
            <div 
              key={dosen.id}
              onClick={() => setSelectedDosen(dosen.id)}
              className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer relative group ${
                isSelected 
                  ? "border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-200" 
                  : "border-slate-100 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isSelected ? "bg-white/10 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <FiUser size={24} />
                </div>
                {isSelected && <FiCheckCircle size={20} className="text-blue-400" />}
              </div>

              <div className="space-y-1">
                <h3 className={`font-black ${isSelected ? "text-white" : "text-slate-900"}`}>{dosen.name}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
                   NIDN: {dosen.nidn}
                </p>
                <div className={`flex items-center gap-2 text-[11px] font-bold mt-2 ${isSelected ? "text-blue-300" : "text-blue-600"}`}>
                   <FiAward /> {dosen.expert}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* NOTE & ACTION */}
      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4 bg-orange-50 p-6 rounded-3xl border border-orange-100 flex-1">
          <FiAlertCircle size={24} className="text-orange-500 shrink-0" />
          <p className="text-[11px] font-black text-orange-800 uppercase tracking-widest leading-relaxed">
            Note: Pastikan dosen yang telah dipilih telah menyetujui <br className="hidden md:block"/> permintaan Anda secara personal sebelumnya.
          </p>
        </div>
        
        <button 
          onClick={handleEnroll}
          disabled={!selectedDosen}
          className={`w-full md:w-auto px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
            selectedDosen 
              ? "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200 active:scale-95" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          Enroll Dosen <FiUserPlus size={18} />
        </button>
      </div>

    </div>
  );
}