"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiUser,
  FiChevronRight,
  FiBookOpen,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiLoader
} from "react-icons/fi";
import { getMyEnrollments } from "../../services/enrollment";
import Toast, { useToast } from "../../components/Toast";

interface Enrollment {
  id: string;
  student: {
    id: string;
    name: string;
  };
  lecturer: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export default function BimbinganGeneral() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showError } = useToast();

  const fetchEnrollments = async () => {
    try {
      const response = await getMyEnrollments();
      setEnrollments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
      showError(
        "Gagal Memuat Data",
        error instanceof Error ? error.message : "Tidak dapat memuat daftar pembimbing. Silakan refresh halaman."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []); // <- dependency array kosong agar hanya fetch sekali
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Bimbingan Saya</h1>
          <p className="text-sm text-slate-600">Pilih dosen pembimbing untuk melihat riwayat dan feedback bimbingan</p>
        </div>

        {/* LIST DOSEN PEMBIMBING */}
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="flex items-center justify-center gap-3">
                <FiLoader className="animate-spin text-blue-600" size={24} />
                <p className="text-slate-600 font-medium">Memuat daftar pembimbing...</p>
              </div>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <FiUser className="mx-auto text-slate-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Belum ada pembimbing</h3>
              <p className="text-slate-600 mb-4">Anda belum terdaftar dengan dosen pembimbing manapun.</p>
              <Link
                href="/dashboard/enroll"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FiUser size={16} />
                Cari Pembimbing
              </Link>
            </div>
          ) : (
            enrollments.map((enrollment, index) => {
              const lecturerSlug = enrollment.lecturer.name.toLowerCase().replace(/\s+/g, '-');
              const createdDate = new Date(enrollment.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <Link
                  key={enrollment.id}
                  href={`/dashboard/bimbingan/${enrollment.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">

                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">

                        {/* AVATAR & INFO DOSEN */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:from-blue-600 group-hover:to-blue-700 transition-all shadow-sm">
                            <FiUser size={20} />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-blue-600 mb-1">
                                  Pembimbing {index === 0 ? 'Utama (I)' : `Pendamping (${index + 1})`}
                                </p>
                                <h2 className="text-lg font-bold text-slate-900 leading-tight">{enrollment.lecturer.name}</h2>
                              </div>

                              {/* Status Badge - Mobile Position */}
                              <div className="lg:hidden">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                                  <FiCheckCircle size={14} />
                                  <span>Aktif</span>
                                </div>
                              </div>
                            </div>

                            {/* Info Enrollment */}
                            <div className="flex items-start gap-2 mt-3">
                              <FiBookOpen className="text-slate-400 mt-0.5 flex-shrink-0" size={16} />
                              <p className="text-sm text-slate-600 leading-relaxed">
                                Terdaftar sejak {createdDate}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* STATUS & DATE - Desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                          {/* Enrollment Date */}
                          <div className="text-right">
                            <p className="text-xs text-slate-500 mb-1">Tanggal Daftar</p>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                              <FiClock size={14} className="text-slate-400" />
                              <span>{createdDate}</span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                            <FiCheckCircle size={14} />
                            <span>Aktif</span>
                          </div>

                          {/* Arrow */}
                          <div className="bg-slate-100 p-2.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <FiChevronRight size={18} />
                          </div>
                        </div>

                      </div>

                      {/* Enrollment Date - Mobile */}
                      <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <FiClock size={14} className="text-slate-400" />
                          <span>Didaftarkan: {createdDate}</span>
                        </div>
                        <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                          <FiChevronRight size={18} />
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* INFO BOX */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
              <FiInfo size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Informasi Penting</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Silakan hubungi admin prodi jika ada ketidaksesuaian data dosen pembimbing.
              </p>
            </div>
          </div>
          
          {/* Decorative Element */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            isVisible={toast.isVisible}
            onClose={() => {}}
          />
        )}

      </div>
    </div>
  );
}