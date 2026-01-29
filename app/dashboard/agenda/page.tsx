"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiVideo,
  FiInfo,
  FiZap,
  FiExternalLink,
  FiX,
  FiNavigation
} from "react-icons/fi";

const AGENDA_DATA = [
  {
    id: 1,
    date: "Kamis, 29 Jan 2026", // Set ke hari ini
    time: "09:00 - 12:00",
    type: "OFFLINE",
    location: "Ruang Jurusan Lt. 2",
    lecturer: "Dr. Ir. Budi Santoso",
    isToday: true,
    link: null
  },
  {
    id: 2,
    date: "Kamis, 29 Jan 2026", // Contoh jika ada 2 agenda hari ini
    time: "13:00 - 15:00",
    type: "ONLINE",
    location: "Zoom Meeting",
    lecturer: "Siti Aminah, M.Kom",
    isToday: true,
    link: "https://zoom.us/j/123456789"
  },
  {
    id: 3,
    date: "Kamis, 05 Feb 2026",
    time: "10:00 - 12:00",
    type: "ONLINE",
    location: "Zoom Meeting",
    lecturer: "Dr. Ir. Budi Santoso",
    isToday: false,
    link: "https://zoom.us/j/123456789"
  },
];

export default function AgendaDosen() {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  const todayAgenda = AGENDA_DATA.filter(item => item.isToday);
  const upcomingAgenda = AGENDA_DATA.filter(item => !item.isToday);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-4">
      
      {/* HEADER */}
      <div className="flex flex-col gap-1 mt-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Agenda Dosen</h1>
        <p className="text-slate-500 font-medium text-sm">Jadwal bimbingan hari ini dan sesi mendatang.</p>
      </div>

      {/* SECTION 1: HARI INI */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
            <FiZap size={20} />
          </div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Hari Ini</h2>
          <div className="flex-1 h-[2px] bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {todayAgenda.length > 0 ? (
            todayAgenda.map((item) => {
              const isOnline = item.type === "ONLINE";
              
              return (
                <div 
                  key={item.id}
                  className={`relative group p-8 rounded-[3rem] border-4 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 overflow-hidden shadow-2xl ${
                    isOnline 
                    ? "bg-indigo-950 border-indigo-500/30 shadow-indigo-200" 
                    : "bg-white border-orange-500/20 shadow-orange-100"
                  }`}
                >
                  {/* Background Decoration */}
                  <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 opacity-20 animate-pulse ${
                    isOnline ? "bg-indigo-400" : "bg-orange-400"
                  }`} />

                  <div className="flex items-center gap-6 z-10">
                    <div className={`w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-xl shrink-0 ${
                      isOnline ? "bg-indigo-500 shadow-indigo-500/40" : "bg-orange-500 shadow-orange-500/40"
                    }`}>
                      <FiClock size={32} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isOnline ? "text-indigo-300" : "text-orange-500"}`}>
                           {isOnline ? "Virtual Session" : "Physical Meeting"}
                         </span>
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <h3 className={`text-2xl font-black ${isOnline ? "text-white" : "text-slate-900"}`}>{item.time}</h3>
                      <p className={`text-sm font-bold ${isOnline ? "text-slate-400" : "text-slate-500"}`}>{item.date}</p>
                    </div>
                  </div>

                  {/* LECTURER */}
                  <div className={`flex-1 lg:border-l lg:pl-10 z-10 ${isOnline ? "border-white/10 text-white" : "border-slate-100 text-slate-900"}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isOnline ? "text-slate-500" : "text-slate-400"}`}>Dosen Pengampu</p>
                    <div className="flex items-center gap-3 font-bold text-lg">
                      <FiUser className={isOnline ? "text-indigo-400" : "text-orange-400"} /> {item.lecturer}
                    </div>
                  </div>

                  {/* ACTION / LOCATION */}
                  <div className={`flex-1 lg:border-l lg:pl-10 z-10 ${isOnline ? "border-white/10" : "border-slate-100"}`}>
                    {isOnline ? (
                      <button 
                        onClick={() => setSelectedLink(item.link)}
                        className="w-full md:w-fit px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                      >
                        <FiVideo /> Masuk Sesi
                      </button>
                    ) : (
                      <div>
                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Lokasi Ruangan</p>
                         <div className="flex items-center gap-3 font-bold text-slate-700 text-lg text-slate-900">
                           <FiMapPin className="text-orange-500" /> {item.location}
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
               <p className="text-slate-400 font-medium">Tidak ada agenda bimbingan hari ini.</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: MENDATANG */}
      <div className="space-y-6 pt-10">
        <h2 className="text-xl font-black text-slate-400 uppercase tracking-tight pl-2">Jadwal Mendatang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingAgenda.map((item) => (
            <div 
              key={item.id}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                  item.type === "ONLINE" ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-orange-50 text-orange-600 border-orange-100"
                }`}>
                  {item.type === "ONLINE" ? <FiVideo size={20} /> : <FiMapPin size={20} />}
                </div>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                  item.type === "ONLINE" ? "bg-indigo-100 text-indigo-700" : "bg-orange-100 text-orange-700"
                }`}>
                  {item.type}
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.date}</h3>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <FiClock size={14} /> {item.time}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center gap-3 text-sm font-bold text-slate-600">
                 <FiUser className="text-slate-300" /> {item.lecturer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL POPUP (Sama seperti sebelumnya) */}
      {selectedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLink(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 text-center space-y-6">
            <button onClick={() => setSelectedLink(null)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-900"><FiX size={20} /></button>
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto"><FiVideo size={32} /></div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Sesi Online</h3>
              <p className="text-slate-500 text-sm mt-1">Gunakan link di bawah untuk bergabung.</p>
            </div>
            <a href={selectedLink} target="_blank" className="block w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
               Buka Google Meet / Zoom
            </a>
          </div>
        </div>
      )}
    </div>
  );
}