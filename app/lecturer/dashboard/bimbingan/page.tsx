"use client";

import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiBell,
  FiArrowRight,
  FiMoreVertical,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useRouter, useParams } from "next/navigation";

export default function DaftarMahasiswaBimbingan() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const MAHASISWA_LIST = [
    {
      id: 1,
      nama: "Andi Pratama",
      nim: "20101140001",
      status: "MENUNGGU REVIEW",
      progress: "Bab 3: Metodologi",
      lastUpdate: 2,
      color: "blue",
    },
    {
      id: 2,
      nama: "Rina Wijaya",
      nim: "20101140045",
      status: "REVISI",
      progress: "Bab 2: Landasan Teori",
      lastUpdate: 8,
      color: "rose",
    },
    {
      id: 3,
      nama: "Budi Setiadi",
      nim: "20101140102",
      status: "DISETUJUI",
      progress: "Bab 1: Pendahuluan",
      lastUpdate: 1,
      color: "emerald",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Daftar Mahasiswa
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Kelola dan pantau seluruh mahasiswa bimbingan Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Cari Nama / NIM..."
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none w-64 transition-all shadow-sm"
            />
          </div>
          <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <FiFilter size={20} />
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  Mahasiswa
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  Status Terakhir
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  Progres
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  Update
                </th>
                <th className="p-6 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {MAHASISWA_LIST.map((mhs) => (
                <tr
                  key={mhs.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-500 text-xs">
                        {mhs.nama.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none">
                          {mhs.nama}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                          {mhs.nim}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        mhs.status === "REVISI"
                          ? "bg-rose-50 border-rose-100 text-rose-600"
                          : mhs.status === "MENUNGGU REVIEW"
                            ? "bg-blue-50 border-blue-100 text-blue-600"
                            : "bg-emerald-50 border-emerald-100 text-emerald-600"
                      }`}
                    >
                      {mhs.status === "REVISI" && <FiAlertCircle />}
                      {mhs.status === "DISETUJUI" && <FiCheckCircle />}
                      {mhs.status === "MENUNGGU REVIEW" && <FiClock />}
                      {mhs.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-slate-700">{mhs.progress}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span
                        className={`font-black ${mhs.lastUpdate > 7 ? "text-rose-500" : "text-slate-900"}`}
                      >
                        {mhs.lastUpdate} Hari Lalu
                      </span>
                      {mhs.lastUpdate > 7 && (
                        <span className="text-[9px] font-bold text-rose-400 uppercase tracking-tighter italic">
                          Warning: Pasif
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Kirim Reminder"
                        className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all"
                      >
                        <FiBell size={18} />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/lecturer/dashboard/bimbingan/${mhs.id}`)
                        }
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 group-hover:-translate-x-1"
                      >
                        Buka Progres <FiArrowRight />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] flex flex-wrap gap-8 justify-center md:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p className="text-[10px] font-black text-slate-500 uppercase">
            1 Menunggu Review
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          <p className="text-[10px] font-black text-slate-500 uppercase">
            1 Perlu Revisi
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <p className="text-[10px] font-black text-slate-500 uppercase">
            1 Sudah Disetujui
          </p>
        </div>
      </div>
    </div>
  );
}
