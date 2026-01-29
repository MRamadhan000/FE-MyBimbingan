"use client";

import React, { useState } from "react";
import { 
  FiPlus, FiClock, FiMapPin, FiLink, FiGlobe, 
  FiMap, FiX, FiCheck, FiMoreHorizontal, FiCalendar , FiEdit3
} from "react-icons/fi";

export default function AgendaDosenSimple() {
  const [showModal, setShowModal] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const SLOTS = [
    {
      id: 1,
      type: "OFFLINE",
      date: "Today",
      time: "09:00 - 10:30",
      location: "Ruang Dosen 402",
      topic: "Bimbingan Skripsi Andi Pratama",
      category: "TODAY"
    },
    {
      id: 2,
      type: "ONLINE",
      date: "12 Feb 2026",
      time: "14:00 - 15:00",
      location: "https://zoom.us/abc-defg-hij",
      topic: "Review Metodologi Siti",
      category: "UPCOMING"
    },
    {
      id: 3,
      type: "OFFLINE",
      date: "15 Feb 2026",
      time: "10:00 - 12:00",
      location: "Gedung C - Lab AI",
      topic: "Sidang Sempro Budi",
      category: "UPCOMING"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 min-h-screen bg-[#FAFAFA]">
      
      {/* HEADER SIMPLE */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Agenda</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Jadwal Bimbingan Dosen</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100"
        >
          <FiPlus size={16} /> Buka Slot
        </button>
      </div>

      {/* SECTION: TODAY */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Hari Ini</h2>
          <div className="h-[1px] flex-1 bg-blue-100"></div>
        </div>

        {SLOTS.filter(s => s.category === "TODAY").map((slot) => (
          <div key={slot.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                {slot.type === "ONLINE" ? <FiGlobe size={24} /> : <FiMap size={24} />}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg leading-tight">{slot.topic}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <FiClock /> {slot.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-blue-500 truncate max-w-[200px]">
                    {slot.type === "ONLINE" ? <FiLink /> : <FiMapPin />} {slot.location}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
              <FiMoreHorizontal size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* SECTION: UPCOMING */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Mendatang</h2>
          <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SLOTS.filter(s => s.category === "UPCOMING").map((slot) => (
            <div key={slot.id} className="bg-white/50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between opacity-80 hover:opacity-100 transition-all">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-100 rounded-2xl text-slate-500 text-center">
                  <span className="text-[8px] font-black uppercase leading-none">{slot.date.split(' ')[1]}</span>
                  <span className="text-lg font-black leading-none">{slot.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 text-base">{slot.topic}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-2 mt-0.5">
                    <FiClock /> {slot.time} • {slot.type}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><FiEdit3 size={16} /></button>
                <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><FiX size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CREATE (SIMPEL) */}
      {showModal && (
        <div className="fixed inset-0 z-[999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Setup Slot</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900"><FiX size={24} /></button>
            </div>

            <div className="flex p-1 bg-slate-100 rounded-2xl">
              <button onClick={() => setIsOnline(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isOnline ? 'bg-white shadow-sm' : 'text-slate-400'}`}>Offline</button>
              <button onClick={() => setIsOnline(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isOnline ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400'}`}>Online</button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Topik Bimbingan</label>
                <input type="text" placeholder="Bimbingan Bab..." className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="p-4 bg-slate-50 rounded-2xl text-xs outline-none" />
                <input type="text" placeholder="Jam" className="p-4 bg-slate-50 rounded-2xl text-xs outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">{isOnline ? 'Link Zoom' : 'Lokasi'}</label>
                <input type="text" placeholder={isOnline ? 'https://...' : 'Ruang...'} className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none border border-slate-100" />
              </div>
            </div>

            <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all">
              Publish Slot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}