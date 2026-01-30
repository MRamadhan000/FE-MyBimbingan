"use client";

import React, { useState } from "react";
import { 
  FiPlus, FiClock, FiMapPin, FiLink, FiGlobe, 
  FiMap, FiX, FiCheck, FiEdit3, FiTrash2, FiCalendar, FiSave
} from "react-icons/fi";

interface Slot {
  id: number;
  type: "OFFLINE" | "ONLINE";
  date: string;
  time: string;
  location: string;
  topic: string;
  category: "TODAY" | "UPCOMING" | "PAST";
}

export default function AgendaDosenEnhanced() {
  const [showModal, setShowModal] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    time: "",
    location: ""
  });

  const [slots, setSlots] = useState<Slot[]>([
    {
      id: 1,
      type: "OFFLINE",
      date: "30 Jan 2026",
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
      topic: "Review Metodologi Siti Nurhaliza",
      category: "UPCOMING"
    },
    {
      id: 3,
      type: "OFFLINE",
      date: "15 Feb 2026",
      time: "10:00 - 12:00",
      location: "Gedung C - Lab AI",
      topic: "Sidang Sempro Budi Santoso",
      category: "UPCOMING"
    },
    {
      id: 4,
      type: "ONLINE",
      date: "20 Feb 2026",
      time: "15:00 - 16:30",
      location: "https://meet.google.com/xyz-abc",
      topic: "Konsultasi Bab 4 - Hasil Penelitian",
      category: "UPCOMING"
    }
  ]);

  const openCreateModal = () => {
    setEditingSlot(null);
    setFormData({ topic: "", date: "", time: "", location: "" });
    setIsOnline(false);
    setShowModal(true);
  };

  const openEditModal = (slot: Slot) => {
    setEditingSlot(slot);
    setFormData({
      topic: slot.topic,
      date: slot.date,
      time: slot.time,
      location: slot.location
    });
    setIsOnline(slot.type === "ONLINE");
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.topic || !formData.date || !formData.time || !formData.location) {
      alert("Semua field harus diisi!");
      return;
    }

    if (editingSlot) {
      // UPDATE
      setSlots(slots.map(slot => 
        slot.id === editingSlot.id 
          ? {
              ...slot,
              type: isOnline ? "ONLINE" : "OFFLINE",
              topic: formData.topic,
              date: formData.date,
              time: formData.time,
              location: formData.location
            }
          : slot
      ));
    } else {
      // CREATE
      const newSlot: Slot = {
        id: Date.now(),
        type: isOnline ? "ONLINE" : "OFFLINE",
        date: formData.date,
        time: formData.time,
        location: formData.location,
        topic: formData.topic,
        category: "UPCOMING"
      };
      setSlots([...slots, newSlot]);
    }

    setShowModal(false);
    setFormData({ topic: "", date: "", time: "", location: "" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus slot ini?")) {
      setSlots(slots.filter(slot => slot.id !== id));
    }
  };

  const todaySlots = slots.filter(s => s.category === "TODAY");
  const upcomingSlots = slots.filter(s => s.category === "UPCOMING");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10">
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Agenda Bimbingan</h1>
            <p className="text-sm text-slate-600 mt-1">Kelola jadwal pertemuan dengan mahasiswa</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200/50"
          >
            <FiPlus size={18} strokeWidth={2.5} />
            Buka Slot Baru
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{todaySlots.length}</div>
            <div className="text-xs text-slate-600 font-medium mt-1">Hari Ini</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-600">{upcomingSlots.length}</div>
            <div className="text-xs text-slate-600 font-medium mt-1">Mendatang</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold text-slate-900">{slots.length}</div>
            <div className="text-xs text-slate-600 font-medium mt-1">Total Slot</div>
          </div>
        </div>

        {/* TODAY SECTION */}
        {todaySlots.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                <FiCalendar size={16} />
                Hari Ini
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent"></div>
            </div>

            <div className="space-y-3">
              {todaySlots.map((slot) => (
                <div 
                  key={slot.id} 
                  className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-200/50">
                        {slot.type === "ONLINE" ? <FiGlobe size={20} /> : <FiMap size={20} />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-base mb-2">{slot.topic}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <FiClock size={13} />
                            {slot.time}
                          </span>
                          <span className="flex items-center gap-1.5 text-blue-700 font-medium truncate">
                            {slot.type === "ONLINE" ? <FiLink size={13} /> : <FiMapPin size={13} />}
                            <span className="truncate max-w-[200px]">{slot.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(slot)}
                        className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-200"
                        title="Edit"
                      >
                        <FiEdit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(slot.id)}
                        className="p-2 bg-white text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-200"
                        title="Hapus"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UPCOMING SECTION */}
        {upcomingSlots.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <FiCalendar size={16} />
                Mendatang
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingSlots.map((slot) => (
                <div 
                  key={slot.id} 
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-100 rounded-lg text-slate-600 border border-slate-200">
                        <span className="text-[10px] font-bold uppercase leading-none">
                          {slot.date.split(' ')[1]}
                        </span>
                        <span className="text-lg font-bold leading-none mt-0.5">
                          {slot.date.split(' ')[0]}
                        </span>
                      </div>
                      
                      {/* Type Badge */}
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        slot.type === "ONLINE" 
                          ? "bg-indigo-100 text-indigo-700" 
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {slot.type}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(slot)}
                        className="p-1.5 bg-slate-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                        title="Edit"
                      >
                        <FiEdit3 size={13} />
                      </button>
                      <button 
                        onClick={() => handleDelete(slot.id)}
                        className="p-1.5 bg-slate-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                        title="Hapus"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">{slot.topic}</h3>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <FiClock size={12} />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {slot.type === "ONLINE" ? <FiLink size={12} /> : <FiMapPin size={12} />}
                      <span className="truncate">{slot.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {slots.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar size={28} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Belum Ada Slot</h3>
            <p className="text-sm text-slate-600 mb-6">Buka slot baru untuk memulai penjadwalan bimbingan</p>
            <button 
              onClick={openCreateModal}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all inline-flex items-center gap-2"
            >
              <FiPlus size={16} />
              Buka Slot Pertama
            </button>
          </div>
        )}
      </div>

      {/* MODAL CREATE/EDIT */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">
                {editingSlot ? "Edit Slot Bimbingan" : "Buka Slot Baru"}
              </h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              {/* Type Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Tipe Pertemuan</label>
                <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                  <button 
                    onClick={() => setIsOnline(false)} 
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      !isOnline 
                        ? 'bg-white shadow-sm text-slate-900' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FiMapPin size={14} />
                      Offline
                    </div>
                  </button>
                  <button 
                    onClick={() => setIsOnline(true)} 
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isOnline 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm text-white' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FiGlobe size={14} />
                      Online
                    </div>
                  </button>
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Topik Bimbingan</label>
                <input 
                  type="text" 
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  placeholder="Contoh: Bimbingan Bab 3 - Metodologi"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Tanggal</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Waktu</label>
                  <input 
                    type="text" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    placeholder="09:00 - 10:30"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">
                  {isOnline ? "Link Meeting" : "Lokasi"}
                </label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder={isOnline ? "https://zoom.us/..." : "Ruang Dosen 402"}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200/50 flex items-center justify-center gap-2"
              >
                {editingSlot ? <FiSave size={16} /> : <FiCheck size={16} />}
                {editingSlot ? "Simpan" : "Buat Slot"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}