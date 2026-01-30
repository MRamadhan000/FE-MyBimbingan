"use client";

import React, { useState } from "react";
import { 
  FiUsers, FiClock, FiCalendar, FiAlertCircle, 
  FiCheck, FiX, FiArrowRight, FiBell, FiPlus,
  FiFileText, FiUpload, FiMessageCircle, FiTrendingUp
} from "react-icons/fi";

export default function LecturerDashboardEnhanced() {
  // Sample data - in real app, this would come from API/database
  const [stats] = useState({
    agendaToday: 3,
    agendaUpcoming: 8,
    pendingSubmissions: 5,
    pendingRequests: 4,
    totalStudents: 12,
    needsAttention: 3,
  });

  const [todayAgenda] = useState([
    { id: 1, time: "09:00", name: "Andi Pratama", room: "Ruang D-203", topic: "Revisi Bab 3", type: "OFFLINE" },
    { id: 2, time: "11:00", name: "Dewi Lestari", room: "Ruang D-203", topic: "Bimbingan Bab 4", type: "OFFLINE" },
    { id: 3, time: "13:30", name: "Siti Zubaidah", room: "Zoom Meeting", topic: "Final Laporan", type: "ONLINE" },
  ]);

  const [pendingRequests] = useState([
    { id: 1, name: "Budi Setiadi", topic: "Diskusi Bab 2", date: "12 Feb", timeAgo: "2 jam" },
    { id: 2, name: "Rina Wijaya", topic: "Validasi Instrumen", date: "14 Feb", timeAgo: "5 jam" },
    { id: 3, name: "Ahmad Fauzi", topic: "Konsultasi Metodologi", date: "15 Feb", timeAgo: "1 hari" },
  ]);

  const [pendingSubmissions] = useState([
    { id: 1, name: "Rina Putri", lastSubmit: "Bab 3 - Draft 2", daysAgo: 6, status: "Menunggu Review" },
    { id: 2, name: "Deni Aris", lastSubmit: "Proposal Revisi", daysAgo: 10, status: "Belum Direview" },
    { id: 3, name: "Lisa Maulida", lastSubmit: "Bab 2 Final", daysAgo: 3, status: "Menunggu Review" },
  ]);

  const [upcomingAgenda] = useState([
    { id: 1, date: "12 Feb", time: "10:00", name: "Bambang S.", topic: "Sidang Proposal" },
    { id: 2, date: "13 Feb", time: "14:00", name: "Citra Dewi", topic: "Review Bab 1" },
    { id: 3, date: "15 Feb", time: "09:00", name: "Eka Pratama", topic: "Diskusi Hasil" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10">
      <div className="max-w-7xl mx-auto space-y-8 py-8 px-4">
        
        {/* HEADER & QUICK ACTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Dosen</h1>
            <p className="text-sm text-slate-600 mt-1">
              Selamat datang kembali, Prof. Anda memiliki <span className="font-semibold text-rose-600">{stats.pendingRequests} pengajuan</span> dan <span className="font-semibold text-amber-600">{stats.pendingSubmissions} submission</span> yang perlu ditinjau.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
              <FiPlus size={18} />
              Set Jadwal
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-200/50 hover:from-blue-700 hover:to-indigo-700 transition-all">
              <FiBell size={18} />
              Pengumuman
            </button>
          </div>
        </div>

        {/* MAIN STATISTICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          
          {/* Agenda Hari Ini */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <FiCalendar size={20} />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.agendaToday}</h3>
            <p className="text-xs font-semibold text-slate-600">Agenda Hari Ini</p>
          </div>

          {/* Agenda Upcoming */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <FiClock size={20} />
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Soon</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.agendaUpcoming}</h3>
            <p className="text-xs font-semibold text-slate-600">Agenda Mendatang</p>
          </div>

          {/* Pending Submissions */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                <FiFileText size={20} />
              </div>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Review</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.pendingSubmissions}</h3>
            <p className="text-xs font-semibold text-slate-600">Perlu Dicek</p>
          </div>

          {/* Pending Requests */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center">
                <FiMessageCircle size={20} />
              </div>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Pending</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.pendingRequests}</h3>
            <p className="text-xs font-semibold text-slate-600">Pengajuan Baru</p>
          </div>

          {/* Total Mahasiswa */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <FiUsers size={20} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.totalStudents}</h3>
            <p className="text-xs font-semibold text-slate-600">Total Mahasiswa</p>
          </div>

          {/* Needs Attention */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <FiAlertCircle size={20} />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Alert</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.needsAttention}</h3>
            <p className="text-xs font-semibold text-slate-600">Perlu Perhatian</p>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN - AGENDA HARI INI */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FiCalendar className="text-blue-600" size={20} />
                Agenda Hari Ini
              </h2>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {stats.agendaToday} Jadwal
              </span>
            </div>

            <div className="space-y-3">
              {todayAgenda.map((agenda) => (
                <div 
                  key={agenda.id} 
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg">
                      {agenda.time}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      agenda.type === 'ONLINE' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {agenda.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{agenda.name}</h4>
                  <p className="text-xs text-slate-600 mb-3">{agenda.topic}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <FiMapPin size={12} />
                    {agenda.room}
                  </div>
                  <button className="w-full py-2 bg-slate-50 hover:bg-blue-50 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 transition-all flex items-center justify-center gap-2">
                    Lihat Detail
                    <FiArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Upcoming Preview */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-indigo-900">Agenda Mendatang</h3>
                <span className="text-xs font-semibold text-indigo-600">{stats.agendaUpcoming} jadwal</span>
              </div>
              <div className="space-y-2">
                {upcomingAgenda.slice(0, 3).map((agenda) => (
                  <div key={agenda.id} className="text-xs bg-white/80 p-2 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900">{agenda.name}</span>
                      <span className="text-slate-500 ml-2">• {agenda.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-all">
                Lihat Semua Agenda
              </button>
            </div>
          </div>

          {/* MIDDLE & RIGHT COLUMNS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PENDING SUBMISSIONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FiFileText className="text-amber-600" size={20} />
                  Submission Perlu Dicek
                </h2>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  {stats.pendingSubmissions} Dokumen
                </span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-4 text-xs font-bold text-slate-600">Mahasiswa</th>
                        <th className="text-left p-4 text-xs font-bold text-slate-600">Dokumen Terakhir</th>
                        <th className="text-left p-4 text-xs font-bold text-slate-600">Status</th>
                        <th className="text-center p-4 text-xs font-bold text-slate-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pendingSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg flex items-center justify-center font-semibold text-sm">
                                {submission.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm">{submission.name}</p>
                                <p className="text-xs text-slate-500">{submission.daysAgo} hari yang lalu</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium text-slate-700">{submission.lastSubmit}</p>
                          </td>
                          <td className="p-4">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              submission.daysAgo > 7 
                                ? 'bg-rose-100 text-rose-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {submission.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all" title="Review">
                                <FiFileText size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* PENDING REQUESTS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FiMessageCircle className="text-rose-600" size={20} />
                  Pengajuan Pending
                </h2>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  {stats.pendingRequests} Pengajuan
                </span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-4 text-xs font-bold text-slate-600">Mahasiswa</th>
                        <th className="text-left p-4 text-xs font-bold text-slate-600">Topik</th>
                        <th className="text-left p-4 text-xs font-bold text-slate-600">Waktu</th>
                        <th className="text-center p-4 text-xs font-bold text-slate-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pendingRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-lg flex items-center justify-center font-semibold text-sm">
                                {request.name.charAt(0)}
                              </div>
                              <p className="font-semibold text-slate-900 text-sm">{request.name}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium text-slate-700">{request.topic}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-xs text-slate-500">{request.timeAgo} lalu</p>
                            <p className="text-xs font-semibold text-slate-700">{request.date}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all" title="Setujui">
                                <FiCheck size={16} />
                              </button>
                              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all" title="Tolak">
                                <FiX size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* STUDENTS NEED ATTENTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FiAlertCircle className="text-orange-600" size={20} />
                  Mahasiswa Perlu Perhatian
                </h2>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  {stats.needsAttention} Mahasiswa
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pendingSubmissions.filter(s => s.daysAgo > 7).map((student) => (
                  <div 
                    key={student.id} 
                    className="bg-white p-4 rounded-xl border border-orange-200 hover:border-orange-400 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-semibold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                          <p className="text-xs text-orange-600 font-semibold">Tidak update {student.daysAgo} hari</p>
                        </div>
                      </div>
                      <button className="p-2 bg-slate-50 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all">
                        <FiArrowRight size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600">Terakhir: {student.lastSubmit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component (add to top of file if needed)
import { FiMapPin } from "react-icons/fi";