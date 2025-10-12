'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const colors = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-500',
    text: 'text-green-900 dark:text-green-100',
    icon: 'bg-green-500 text-white',
    progress: 'bg-green-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-500',
    text: 'text-red-900 dark:text-red-100',
    icon: 'bg-red-500 text-white',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-100',
    icon: 'bg-yellow-500 text-white',
    progress: 'bg-yellow-500',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-500',
    text: 'text-blue-900 dark:text-blue-100',
    icon: 'bg-blue-500 text-white',
    progress: 'bg-blue-500',
  },
};

export function ToastItem({ toast, onClose }: ToastProps) {
  const color = colors[toast.type];
  const duration = toast.duration || 5000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`${color.bg} ${color.text} border-l-4 ${color.border} rounded-lg shadow-2xl overflow-hidden min-w-[320px] max-w-md backdrop-blur-sm`}
    >
      <div className="flex items-start p-4 gap-3">
        {/* Icon */}
        <div
          className={`${color.icon} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg`}
        >
          {icons[toast.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm mb-1">{toast.title}</h3>
          {toast.message && (
            <p className="text-xs opacity-90 leading-relaxed">{toast.message}</p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onClose(toast.id)}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className={`h-1 ${color.progress}`}
      />
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
