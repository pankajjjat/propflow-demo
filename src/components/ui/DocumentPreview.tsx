'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FileImage, FileSpreadsheet, File as FileIcon, Download, Calendar, User, HardDrive, FileType } from 'lucide-react';

interface Document {
  name: string;
  type: string;
  status: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
}

interface DocumentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 28, stiffness: 300, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const statusConfig: Record<string, { label: string; cls: string }> = {
  complete: { label: 'Complete', cls: 'badge-green' },
  pending: { label: 'Pending', cls: 'badge-amber' },
  missing: { label: 'Missing', cls: 'badge-rose' },
  'ai-detected': { label: 'AI Detected', cls: 'badge-blue' },
  active: { label: 'Active', cls: 'badge-blue' },
  urgent: { label: 'Urgent', cls: 'badge-rose' },
  completed: { label: 'Completed', cls: 'badge-green' },
  draft: { label: 'Draft', cls: 'badge-gray' },
  sent: { label: 'Sent', cls: 'badge-green' },
  scheduled: { label: 'Scheduled', cls: 'badge-blue' },
  failed: { label: 'Failed', cls: 'badge-rose' },
};

function getDocIcon(type: string) {
  const lower = type.toLowerCase();
  if (lower.includes('pdf') || lower.includes('doc')) return <FileText className="w-5 h-5" />;
  if (lower.includes('image') || lower.includes('png') || lower.includes('jpg') || lower.includes('jpeg') || lower.includes('gif'))
    return <FileImage className="w-5 h-5" />;
  if (lower.includes('spreadsheet') || lower.includes('xls') || lower.includes('csv'))
    return <FileSpreadsheet className="w-5 h-5" />;
  return <FileIcon className="w-5 h-5" />;
}

function getDocColor(type: string): string {
  const lower = type.toLowerCase();
  if (lower.includes('pdf')) return 'bg-rose-50 text-rose-600';
  if (lower.includes('doc') || lower.includes('word')) return 'bg-blue-50 text-accent-blue';
  if (lower.includes('image') || lower.includes('png') || lower.includes('jpg'))
    return 'bg-violet-50 text-accent-violet';
  if (lower.includes('spreadsheet') || lower.includes('xls') || lower.includes('csv'))
    return 'bg-emerald-50 text-emerald-600';
  return 'bg-surface-100 text-surface-500';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function DocumentPreview({ isOpen, onClose, document }: DocumentPreviewProps) {
  if (!document) return null;

  const statusInfo = statusConfig[document.status] || { cls: 'badge-gray', label: document.status };
  const docColor = getDocColor(document.type);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-black/15 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl flex items-center justify-center
                         text-surface-400 hover:text-surface-700 hover:bg-surface-100
                         transition-all duration-200"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Document icon header */}
            <div className="flex flex-col items-center pt-10 pb-6 px-6 bg-gradient-to-b from-surface-50/80 to-white">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 mb-4 ${docColor}`}
              >
                {getDocIcon(document.type)}
              </div>
              <h2 className="text-lg font-semibold text-surface-900 text-center leading-snug max-w-xs truncate">
                {document.name}
              </h2>
              <span className={`mt-2 ${statusInfo.cls}`}>{statusInfo.label}</span>
            </div>

            {/* Details */}
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={<FileType className="w-4 h-4 text-surface-400" />}
                  label="Type"
                  value={document.type}
                />
                <DetailItem
                  icon={<HardDrive className="w-4 h-4 text-surface-400" />}
                  label="Size"
                  value={document.size}
                />
                <DetailItem
                  icon={<User className="w-4 h-4 text-surface-400" />}
                  label="Uploaded by"
                  value={document.uploadedBy}
                />
                <DetailItem
                  icon={<Calendar className="w-4 h-4 text-surface-400" />}
                  label="Uploaded at"
                  value={formatDate(document.uploadedAt)}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-surface-100" />

              {/* Download button */}
              <button
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                           bg-emerald-600 text-white font-medium text-sm
                           hover:bg-emerald-700 active:bg-emerald-800
                           transition-all duration-200 shadow-sm hover:shadow-md
                           group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
                Download Document
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 w-4 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-surface-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-surface-800 truncate">{value || '—'}</p>
      </div>
    </div>
  );
}
