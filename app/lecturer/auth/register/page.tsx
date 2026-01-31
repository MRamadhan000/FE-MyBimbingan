"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiHash, FiBook, FiLock, FiArrowRight, FiImage } from 'react-icons/fi';
import { registerLecturer } from '../../../services/auth';

export default function RegisterLecturerPage() {
  const [formData, setFormData] = useState({
    name: '',
    nuptk: '',
    interests: '',
    password: '',
    image: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const interestsArray = formData.interests.split(',').map(i => i.trim()).filter(i => i);
      const response = await registerLecturer({
        name: formData.name,
        nuptk: formData.nuptk,
        interests: interestsArray,
        password: formData.password,
        image: formData.image,
      });
      console.log("Registration successful:", response);
      alert(`Registration successful: ${response.data.name}`);
      router.push('/lecturer/auth/login');
    } catch (error: any) {
      console.error("Registration failed:", error);
      alert(`Registration failed: ${error.message}`);
    }
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
            Buat akun dosen baru
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="name">
              Nama Lengkap
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="Dr. Jane Smith"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          {/* NUPTK */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="nuptk">
              NUPTK
            </label>
            <div className="relative">
              <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="nuptk"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="987654321"
                value={formData.nuptk}
                onChange={(e) => setFormData({...formData, nuptk: e.target.value})}
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="interests">
              Minat (pisahkan dengan koma)
            </label>
            <div className="relative">
              <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="interests"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="Machine Learning, Data Science"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
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

          {/* Image URL */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1" htmlFor="image">
              Image URL
            </label>
            <div className="relative">
              <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="image"
                type="url"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
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
            <Link href="/lecturer/auth/login" className="font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">
              Login di sini
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}