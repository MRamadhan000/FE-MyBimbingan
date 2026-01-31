"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginStudent } from '../../services/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginStudent({ studentNumber: username, password });
      console.log("Login successful:", response);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Card Putih dengan Shadow Outline yang Kuat */}
      <div className="w-full max-w-md h-[80vh] flex flex-col justify-center bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] border border-gray-100 p-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
            MyBimbingan
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Login sebagai mahasiswa
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="username">
              NIM
            </label>
            <input
              id="username"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="NIM"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol Biru */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-200"
          >
            Masuk Sekarang
          </button>
        </form>

        {/* Link Register */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Daftar di sini
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}