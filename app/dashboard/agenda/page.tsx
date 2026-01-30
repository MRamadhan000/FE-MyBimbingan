"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiVideo,
  FiInfo,
  FiExternalLink,
  FiX,
} from "react-icons/fi";

const AGENDA_DATA = [
  {
    id: 1,
    date: "Kamis, 29 Jan 2026",
    time: "09:00 - 12:00",
    type: "OFFLINE",
    location: "Ruang Jurusan Lt. 2",
    lecturer: "Dr. Ir. Budi Santoso",
    isToday: true,
    link: null
  },
  {
    id: 2,
    date: "Kamis, 29 Jan 2026",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Agenda Bimbingan</h1>
          <p className="text-sm text-slate-600">Jadwal bimbingan hari ini dan sesi mendatang</p>
        </div>

        {/* SECTION 1: HARI INI */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Hari Ini</h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-4">
            {todayAgenda.length > 0 ? (
              todayAgenda.map((item) => {
                const isOnline = item.type === "ONLINE";
                
                return (
                  <div 
                    key={item.id}
                    className={`relative bg-white border-2 rounded-xl overflow-hidden shadow-sm ${
                      isOnline 
                      ? "border-blue-200 hover:border-blue-300 hover:shadow-blue-50" 
                      : "border-amber-200 hover:border-amber-300 hover:shadow-amber-50"
                    } hover:shadow-md transition-all`}
                  >
                    {/* Status Bar */}
                    <div className={`h-1.5 ${isOnline ? "bg-blue-500" : "bg-amber-500"}`} />

                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        
                        {/* Time & Type */}
                        <div className="flex items-center gap-4 lg:w-64">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isOnline ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                          }`}>
                            <FiClock size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                                isOnline ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                              }`}>
                                {isOnline ? <FiVideo size={12} /> : <FiMapPin size={12} />}
                                {isOnline ? "Online" : "Offline"}
                              </span>
                            </div>
                            <p className="text-lg font-bold text-slate-900">{item.time}</p>
                          </div>
                        </div>

                        {/* Lecturer Info */}
                        <div className="flex-1 lg:border-l lg:pl-6 border-slate-100">
                          <p className="text-xs text-slate-500 mb-1">Dosen Pembimbing</p>
                          <div className="flex items-center gap-2">
                            <FiUser size={16} className="text-slate-400" />
                            <p className="text-sm font-semibold text-slate-900">{item.lecturer}</p>
                          </div>
                        </div>

                        {/* Location / Action */}
                        <div className="lg:w-64">
                          {isOnline ? (
                            <button 
                              onClick={() => setSelectedLink(item.link)}
                              className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
                            >
                              <FiVideo size={16} />
                              Join Meeting
                            </button>
                          ) : (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Lokasi</p>
                              <div className="flex items-center gap-2">
                                <FiMapPin size={16} className="text-amber-500" />
                                <p className="text-sm font-semibold text-slate-900">{item.location}</p>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiCalendar className="text-slate-400" size={20} />
                </div>
                <p className="text-sm text-slate-500 font-medium">Tidak ada agenda bimbingan hari ini</p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: MENDATANG */}
        {upcomingAgenda.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">Jadwal Mendatang</h2>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingAgenda.map((item) => {
                const isOnline = item.type === "ONLINE";
                
                return (
                  <div 
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isOnline ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                      }`}>
                        {isOnline ? <FiVideo size={18} /> : <FiMapPin size={18} />}
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        isOnline ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </div>

                    {/* Date & Time */}
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-slate-900 mb-1">{item.date}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <FiClock size={14} className="text-slate-400" />
                        <span>{item.time}</span>
                      </div>
                    </div>

                    {/* Lecturer */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <FiUser size={14} className="text-slate-400" />
                        <span className="font-medium">{item.lecturer}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* INFO BOX */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
              <FiInfo size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Tips Bimbingan</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pastikan Anda sudah menyiapkan dokumen dan pertanyaan sebelum sesi bimbingan dimulai.
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

      </div>

      {/* MODAL POPUP */}
      {selectedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
            onClick={() => setSelectedLink(null)} 
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <button 
              onClick={() => setSelectedLink(null)} 
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <FiX size={20} />
            </button>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <FiVideo size={28} />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Join Online Meeting</h3>
                <p className="text-sm text-slate-600">
                  Klik tombol di bawah untuk membuka meeting
                </p>
              </div>

              <a 
                href={selectedLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all active:scale-[0.98] shadow-sm"
              >
                Buka Meeting
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}