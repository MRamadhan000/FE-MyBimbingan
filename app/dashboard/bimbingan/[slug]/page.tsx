"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiDownload,
  FiEdit3,
  FiMessageCircle,
} from "react-icons/fi";
import { getSubmissionsByEnrollment, Submission } from '../../../services/submission';

type FeedbackStatus = 'NEEDS_REVISION' | 'APPROVED';

const FEEDBACK_STATUS_CONFIG: Record<FeedbackStatus, { label: string; icon: React.ReactElement; bg: string; text: string; border: string }> = {
  NEEDS_REVISION: {
    label: "Perlu Revisi",
    icon: <FiEdit3 size={16} />,
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200"
  },
  APPROVED: {
    label: "Disetujui",
    icon: <FiCheckCircle size={16} />,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200"
  },
};

export default function BimbinganSaya() {
  const router = useRouter();
  const { slug } = useParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!slug) return;
      try {
        const response = await getSubmissionsByEnrollment(slug as string);
        // Sort by createdAt descending (newest first)
        const sortedSubmissions = response.data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSubmissions(sortedSubmissions);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <h1 className="text-3xl font-bold text-slate-900">Log Aktivitas Bimbingan</h1>
            <button 
              onClick={() => router.push(`/dashboard/bimbingan/${slug}/create`)} 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all active:scale-[0.98]"
            >
              <FiUploadCloud size={18} />
              <span>Update Progres</span>
            </button>
          </div>
          <p className="text-slate-600 text-sm">Riwayat pengajuan dan feedback dari dosen pembimbing</p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-slate-200 to-transparent hidden sm:block" />

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600">Memuat riwayat bimbingan...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Belum ada submission</h3>
              <p className="text-slate-600 mb-6">Mulai kirim laporan progres pertama Anda</p>
              <button 
                onClick={() => router.push(`/dashboard/bimbingan/${slug}/create`)} 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all"
              >
                <FiUploadCloud size={18} />
                <span>Kirim Laporan Progres</span>
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {submissions.map((submission, index) => {
                const isLatest = index === 0;
                const latestFeedback = submission.feedbacks.length > 0 ? submission.feedbacks[submission.feedbacks.length - 1] : null;

                return (
                  <div key={submission.id} className="relative">
                    
                    {/* Timeline Dot */}
                    <div className={`absolute left-[9px] top-8 w-6 h-6 rounded-full border-4 border-white shadow-md z-10 hidden sm:block ${
                      isLatest ? 'bg-blue-500' : 'bg-slate-300'
                    }`} />

                    {/* Card Container */}
                    <div className="sm:pl-16 space-y-3">
                      
                      {/* DOSEN RESPONSE (if has feedback) */}
                      {latestFeedback && (
                        <div className={`bg-white rounded-xl border overflow-hidden shadow-sm ml-0 sm:ml-8 ${FEEDBACK_STATUS_CONFIG[latestFeedback.status as FeedbackStatus]?.border || 'border-slate-200'}`}>
                          <div className="p-5">
                            {/* Response Header */}
                            <div className="flex items-start justify-between mb-4 gap-3">
                              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${FEEDBACK_STATUS_CONFIG[latestFeedback.status as FeedbackStatus]?.bg || 'bg-slate-50'} ${FEEDBACK_STATUS_CONFIG[latestFeedback.status as FeedbackStatus]?.text || 'text-slate-700'} ${FEEDBACK_STATUS_CONFIG[latestFeedback.status as FeedbackStatus]?.border || 'border-slate-200'} border`}>
                                {FEEDBACK_STATUS_CONFIG[latestFeedback.status as FeedbackStatus]?.icon || <FiClock size={16} />}
                                <span>{FEEDBACK_STATUS_CONFIG[latestFeedback.status as FeedbackStatus]?.label || latestFeedback.status}</span>
                              </div>
                              <span className="text-xs text-slate-500 whitespace-nowrap">
                                {new Date(latestFeedback.createdAt).toLocaleDateString('id-ID')}
                              </span>
                            </div>

                            {/* Feedback Comment */}
                            <div className="flex gap-3">
                              <FiMessageCircle size={18} className="text-slate-300 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-slate-700 leading-relaxed italic">
                                "{latestFeedback.content}"
                              </p>
                            </div>
                          </div>

                          {/* Success Banner (only for approved latest) */}
                          {latestFeedback.status === 'APPROVED' && isLatest && (
                            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-t border-emerald-200 px-5 py-3">
                              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-2">
                                <FiCheckCircle size={14} />
                                Progres disetujui, siap lanjut ke tahap berikutnya
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* STUDENT SUBMISSION */}
                      <div className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                        isLatest ? 'border-blue-100 shadow-blue-50' : 'border-slate-200'
                      }`}>
                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4 gap-3">
                            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                              <FiUser size={14} />
                              <span>Pengajuan Anda</span>
                            </div>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {new Date(submission.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>

                          {/* Title and Description */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">{submission.title}</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {submission.description}
                            </p>
                          </div>

                          {/* File Attachments */}
                          {submission.attachments.length > 0 && (
                            <div className="space-y-2">
                              {submission.attachments.map((attachment) => (
                                <div key={attachment.id} className="inline-flex items-center gap-3 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer group">
                                  <FiFileText size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-slate-700 truncate">{attachment.fileName}</p>
                                    <p className="text-xs text-slate-500">{attachment.fileSize} bytes</p>
                                  </div>
                                  <FiDownload size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* End of Timeline Indicator */}
          {!loading && submissions.length > 0 && (
            <div className="sm:pl-16 mt-8">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span>Awal riwayat bimbingan</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}