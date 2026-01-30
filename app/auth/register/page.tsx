"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiHash, FiBook, FiLock, FiArrowRight } from 'react-icons/fi';

export default function RegisterMahasiswaPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    nim: '',
    major: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mahasiswa Register Attempt:", formData);
    alert(`Pendaftaran Berhasil: ${formData.fullname}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Card Putih - Tinggi disesuaikan agar pas dengan banyak field */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border border-gray-100 p-10 my-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
            Join Us
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Buat akun mahasiswa baru
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="fullname">
              Nama Lengkap
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="fullname"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="Andi Pratama"
                value={formData.fullname}
                onChange={(e) => setFormData({...formData, fullname: e.target.value})}
              />
            </div>
          </div>

          {/* NIM */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="nim">
              NIM
            </label>
            <div className="relative">
              <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="nim"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="2010114000xx"
                value={formData.nim}
                onChange={(e) => setFormData({...formData, nim: e.target.value})}
              />
            </div>
          </div>

          {/* Major */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="major">
              Program Studi
            </label>
            <div className="relative">
              <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="major"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="Teknik Informatika"
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-4 px-4 bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-900 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
          >
            Daftar Sekarang <FiArrowRight />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-gray-50 pt-8">
          <p className="text-xs text-gray-500 font-medium">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">
              Login di sini
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}