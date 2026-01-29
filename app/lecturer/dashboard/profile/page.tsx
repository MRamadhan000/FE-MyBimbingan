"use client";

import React from "react";
import { FiEdit3, FiAward, FiShield, FiMail, FiMapPin } from "react-icons/fi";

export default function LecturerProfileSimple() {
  const lecturer = {
    name: "Prof. Dr. Andi Pratama, M.Kom",
    nuptk: "20101140001992",
    title: "Senior Lecturer & Head of AI Lab",
    imgUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200", // Ganti dengan path foto asli
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        
        {/* TOP ACCENT BORDER */}
        <div className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600 w-full" />

        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          
          {/* PROFILE IMAGE */}
          <div className="relative group">
            <div className="w-40 h-40 rounded-[3rem] border-8 border-slate-50 overflow-hidden shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <img 
                src={lecturer.imgUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-blue-600 transition-all border-4 border-white">
              <FiEdit3 size={18} />
            </button>
          </div>

          {/* IDENTITY INFO */}
          <div className="mt-10 space-y-3">
            <div className="flex items-center justify-center gap-2">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-full">Lecturer Verified</span>
            </div>
            
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              {lecturer.name}
            </h1>
            
            <p className="text-lg font-bold text-slate-400">
              {lecturer.title}
            </p>
          </div>

          {/* NUPTK BADGE */}
          <div className="mt-8 flex items-center gap-3 px-8 py-4 bg-slate-50 rounded-[2rem] border border-slate-100">
            <FiShield className="text-blue-600" size={20} />
            <div className="text-left">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">NUPTK Official</p>
              <p className="text-base font-black text-slate-900 tracking-tight">{lecturer.nuptk}</p>
            </div>
          </div>

          {/* QUICK LINKS (OPTIONAL) */}
          <div className="mt-12 flex gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
              <FiMail className="text-blue-500" /> andi@university.ac.id
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
              <FiMapPin className="text-rose-500" /> Room 402
            </div>
          </div>

        </div>

        {/* BOTTOM DECORATION */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-center gap-10">
           <div className="text-center">
              <p className="text-xl font-black text-slate-900">42</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Students</p>
           </div>
           <div className="w-[1px] h-10 bg-slate-200"></div>
           <div className="text-center">
              <p className="text-xl font-black text-slate-900">12</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Research</p>
           </div>
           <div className="w-[1px] h-10 bg-slate-200"></div>
           <div className="text-center">
              <p className="text-xl font-black text-slate-900">08</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Awards</p>
           </div>
        </div>

      </div>
    </div>
  );
}