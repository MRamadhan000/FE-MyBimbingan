"use client";

import React, { useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiX } from "react-icons/fi";

export interface ToastProps {
  type: "success" | "error" | "warning";
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Toast({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 4000
}: ToastProps) {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-50 border-green-200",
          icon: "text-green-600",
          title: "text-green-900",
          message: "text-green-700",
          IconComponent: FiCheckCircle
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200",
          icon: "text-red-600",
          title: "text-red-900",
          message: "text-red-700",
          IconComponent: FiXCircle
        };
      case "warning":
        return {
          container: "bg-orange-50 border-orange-200",
          icon: "text-orange-600",
          title: "text-orange-900",
          message: "text-orange-700",
          IconComponent: FiAlertTriangle
        };
      default:
        return {
          container: "bg-slate-50 border-slate-200",
          icon: "text-slate-600",
          title: "text-slate-900",
          message: "text-slate-700",
          IconComponent: FiCheckCircle
        };
    }
  };

  const styles = getTypeStyles();

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div className={`${styles.container} border-2 rounded-2xl p-4 shadow-xl shadow-black/5 max-w-sm w-full`}>
        <div className="flex items-start gap-3">
          <div className={`${styles.icon} shrink-0 mt-0.5`}>
            <styles.IconComponent size={20} />
          </div>
          
          <div className="flex-1 space-y-1">
            <h4 className={`${styles.title} font-bold text-sm`}>{title}</h4>
            <p className={`${styles.message} text-xs leading-relaxed`}>{message}</p>
          </div>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook untuk menggunakan Toast lebih mudah
export function useToast() {
  const [toast, setToast] = React.useState<{
    type: "success" | "error" | "warning";
    title: string;
    message: string;
    isVisible: boolean;
  } | null>(null);

  const showToast = (
    type: "success" | "error" | "warning",
    title: string,
    message: string
  ) => {
    setToast({
      type,
      title,
      message,
      isVisible: true
    });
  };

  const hideToast = () => {
    setToast(prev => prev ? { ...prev, isVisible: false } : null);
    setTimeout(() => setToast(null), 300);
  };

  const showSuccess = (title: string, message: string) => showToast("success", title, message);
  const showError = (title: string, message: string) => showToast("error", title, message);
  const showWarning = (title: string, message: string) => showToast("warning", title, message);

  return {
    toast,
    showSuccess,
    showError,
    showWarning,
    hideToast
  };
}