"use client";

import React, { useState } from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiDownload,
  FiSend,
  FiChevronLeft,
  FiUser,
  FiX,
  FiMaximize2,
  FiEdit3,
  FiTrash2,
  FiMoreVertical,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";

type Status = "REVISI" | "SETUJUI";

export default function WorkspaceDosenFullControl() {
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // Data simulasi bimbingan yang panjang (Bab 1 sampai Bab 3)
  const [timelineData, setTimelineData] = useState([
    {
      id: 8,
      date: "12 Feb 2026",
      sender: "MAHASISWA",
      file: "BAB_3_Metodologi_V2_Final.pdf",
      fileUrl: "/data.pdf",
      note: "Sudah saya perbaiki bagian populasi dan sampel sesuai arahan Prof. Mohon dicek kembali untuk bab 3 ini.",
      type: "UPLOAD",
    },
    {
      id: 7,
      date: "08 Feb 2026",
      sender: "DOSEN",
      file: null,
      note: "Teknik sampling sudah oke secara teori, tapi tolong perjelas lagi kriteria inklusi untuk responden UKM-nya di lapangan.",
      type: "REVISI",
    },
    {
      id: 6,
      date: "01 Feb 2026",
      sender: "MAHASISWA",
      file: "BAB_3_Metodologi_V1.pdf",
      fileUrl: "/data.pdf",
      note: "Izin menyerahkan draf Bab 3 Prof. Saya menggunakan metode kuantitatif dengan penyebaran kuesioner.",
      type: "UPLOAD",
    },
    {
      id: 5,
      date: "25 Jan 2026",
      sender: "DOSEN",
      file: null,
      note: "Bab 2 sudah cukup komprehensif. Referensi sudah up-to-date. Silakan lanjut ke metodologi penelitian.",
      type: "SETUJUI",
    },
    {
      id: 4,
      date: "20 Jan 2026",
      sender: "MAHASISWA",
      file: "BAB_2_Landasan_Teori_Final.pdf",
      fileUrl: "/data.pdf",
      note: "Penambahan referensi jurnal internasional 5 tahun terakhir untuk teori TAM sesuai saran sebelumnya.",
      type: "UPLOAD",
    },
    {
      id: 3,
      date: "15 Jan 2026",
      sender: "DOSEN",
      file: null,
      note: "Landasan teori masih kurang kuat di bagian AI-nya. Cari jurnal yang membahas implementasi AI khusus di bidang pendidikan.",
      type: "REVISI",
    },
    {
      id: 2,
      date: "10 Jan 2026",
      sender: "MAHASISWA",
      file: "BAB_2_Landasan_Teori_V1.pdf",
      fileUrl: "/data.pdf",
      note: "Izin bimbingan Bab 2 Prof, sudah saya kumpulkan drafnya.",
      type: "UPLOAD",
    },
    {
      id: 1,
      date: "05 Jan 2026",
      sender: "DOSEN",
      file: null,
      note: "Latar belakang masalah sudah sangat kuat. Bab 1 disetujui. Segera masuk ke Bab 2.",
      type: "SETUJUI",
    },
  ]);

  const handleEditFeedback = (item: any) => {
    setSelectedLog(item);
    setStatus(item.type as Status);
    setComment(item.note);
    setIsEditing(true);
  };

  const handleDeleteFeedback = (id: number) => {
    if (confirm("Hapus feedback ini?")) {
      setTimelineData(timelineData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-12 bg-slate-50/30 min-h-screen">
      {/* 1️⃣ HEADER */}
      <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-slate-900 rounded-full border-4 border-slate-50 flex items-center justify-center text-white shadow-lg font-black">
            AP
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Andi Pratama
            </h1>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-1">
              NIM: 20101140001
            </p>
          </div>
        </div>
        <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all">
          <FiChevronLeft size={20} />
        </button>
      </div>

      {/* 2️⃣ SPLIT TIMELINE */}
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {timelineData.map((item) => {
            const isMahasiswa = item.sender === "MAHASISWA";

            return (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row items-center w-full group"
              >
                {/* Center Node */}
                <div
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full z-20 items-center justify-center border-4 border-white shadow-md ${
                    isMahasiswa
                      ? "bg-blue-600 text-white"
                      : item.type === "SETUJUI"
                        ? "bg-emerald-500 text-white"
                        : "bg-orange-500 text-white"
                  }`}
                >
                  {isMahasiswa ? (
                    <FiArrowRight size={12} />
                  ) : (
                    <FiArrowLeft size={12} />
                  )}
                </div>

                {/* LEFT: MAHASISWA CARD */}
                <div
                  className={`w-full md:w-1/2 flex ${isMahasiswa ? "justify-start md:pr-12" : "hidden md:flex md:opacity-0 pointer-events-none"}`}
                >
                  {isMahasiswa && (
                    <div
                      onClick={() => {
                        setSelectedLog(item);
                        setIsEditing(false);
                      }}
                      className="w-full bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-lg hover:border-blue-500 transition-all cursor-pointer relative"
                    >
                      <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest block mb-3">
                        Update Mahasiswa • {item.date}
                      </span>
                      <p className="text-slate-800 font-bold text-sm mb-4 leading-relaxed">
                        "{item.note}"
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 p-3 rounded-xl">
                        <FiFileText className="text-blue-500" /> {item.file}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE: DOSEN CARD */}
                <div
                  className={`w-full md:w-1/2 flex mt-4 md:mt-0 ${!isMahasiswa ? "justify-end md:pl-12" : "hidden md:flex md:opacity-0 pointer-events-none"}`}
                >
                  {!isMahasiswa && (
                    <div className="w-full bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl relative group/card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit ${
                              item.type === "SETUJUI"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            Feedback {item.type}
                          </span>
                          {/* TANGGAL DITAMBAHKAN DISINI */}
                          <span className="text-[9px] font-bold text-slate-500 ml-1 mt-1 uppercase tracking-tighter italic">
                            Diberikan pada: {item.date}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditFeedback(item)}
                            className="p-2 bg-slate-800 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                            title="Edit Feedback"
                          >
                            <FiEdit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteFeedback(item.id)}
                            className="p-2 bg-slate-800 text-rose-400 rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                            title="Hapus Feedback"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-300 font-medium text-sm leading-relaxed italic border-l-2 border-slate-700 pl-4">
                        "{item.note}"
                      </p>

                      {/* Decorative tail for bubble */}
                      <div className="absolute left-0 top-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 hidden md:block border-l border-b border-slate-800" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3️⃣ OVERLAY MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 z-[999] bg-white flex flex-col md:flex-row animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex-1 bg-slate-800 flex flex-col relative">
            <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FiFileText className="text-blue-500" />
                <span className="text-xs font-black uppercase tracking-widest">
                  {selectedLog.file || "Update Feedback"}
                </span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="md:hidden"
              >
                <FiX />
              </button>
            </div>
            <iframe
              src={selectedLog.fileUrl || "/data.pdf"}
              className="flex-1 w-full border-none bg-white"
            />
          </div>

          <div className="w-full md:w-[450px] bg-slate-50 border-l border-slate-200 flex flex-col">
            <div className="p-8 flex justify-between items-center bg-white border-b border-slate-100">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                {isEditing ? "Update Feedback" : "Beri Keputusan"}
              </h2>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStatus("REVISI")}
                  className={`py-6 rounded-3xl font-black text-[10px] flex flex-col items-center gap-2 transition-all ${status === "REVISI" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-slate-400 border border-slate-200"}`}
                >
                  <FiAlertCircle size={20} /> REVISI
                </button>
                <button
                  onClick={() => setStatus("SETUJUI")}
                  className={`py-6 rounded-3xl font-black text-[10px] flex flex-col items-center gap-2 transition-all ${status === "SETUJUI" ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-slate-400 border border-slate-200"}`}
                >
                  <FiCheckCircle size={20} /> SETUJUI
                </button>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis catatan..."
                className="w-full h-80 p-6 bg-white border border-slate-200 rounded-[2rem] text-sm focus:ring-4 focus:ring-blue-500/5 outline-none resize-none"
              ></textarea>
              <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all">
                {isEditing ? "Simpan Perubahan" : "Kirim Feedback"}{" "}
                <FiSend className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
