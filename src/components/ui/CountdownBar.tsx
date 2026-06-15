'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CountdownBarProps {
  targetDate: string | Date;
  dealName: string;
}

const REGISTRATION_WINDOW_DAYS = 30;

export default function CountdownBar({ targetDate, dealName }: CountdownBarProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(interval);
  }, []);

  const {
    days,
    isUrgent,
    isExpired,
    progress,
    label,
  } = useMemo(() => {
    const target = new Date(targetDate);
    const diffMs = target.getTime() - now.getTime();
    const totalSec = diffMs / 1_000;

    if (totalSec <= 0) {
      return {
        days: 0,
        isUrgent: false,
        isExpired: true,
        progress: 100,
        label: 'Registration closed',
      };
    }

    const totalHours = totalSec / 3_600;
    const d = Math.floor(totalHours / 24);
    const urgent = d <= 3;

    // Progress: % of registration window elapsed (0% at day 30 out, 100% at deadline)
    const pct = Math.min(100, Math.max(0, ((REGISTRATION_WINDOW_DAYS - d) / REGISTRATION_WINDOW_DAYS) * 100));

    let lbl: string;
    if (urgent && d === 0) {
      lbl = `Registration closes in ${totalHours.toFixed(0)}h`;
    } else if (urgent) {
      lbl = `Registration in ${d}d ${Math.floor(totalHours % 24)}h`;
    } else {
      lbl = `Registration in ${d} days`;
    }

    return {
      days: d,
      isUrgent: urgent,
      isExpired: false,
      progress: pct,
      label: lbl,
    };
  }, [now, targetDate]);

  // --- Style selection ---
  const urgency = isExpired ? 'expired' : isUrgent ? 'urgent' : 'normal';

  const bgStyle: Record<string, string> = {
    expired: 'bg-slate-100 border-slate-200',
    urgent: 'bg-rose-50 border-rose-200',
    normal: 'bg-emerald-50 border-emerald-200',
  };

  const accentStyle: Record<string, string> = {
    expired: 'text-slate-500',
    urgent: 'text-rose-600',
    normal: 'text-emerald-600',
  };

  const barBgStyle: Record<string, string> = {
    expired: 'bg-slate-200',
    urgent: 'bg-rose-100',
    normal: 'bg-emerald-100',
  };

  const barFillStyle: Record<string, string> = {
    expired: 'bg-slate-400',
    urgent: 'bg-rose-500',
    normal: 'bg-emerald-500',
  };

  const iconMap = {
    expired: <CheckCircle2 className="w-5 h-5" />,
    urgent: <AlertTriangle className="w-5 h-5" />,
    normal: <Calendar className="w-5 h-5" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border p-5 shadow-lg ${bgStyle[urgency]}`}
    >
      {/* Subtle animated background pulse for urgent */}
      {urgency === 'urgent' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.06, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-rose-400 rounded-2xl" />
        </motion.div>
      )}

      {/* Top row: icon + deal name + time label */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${
              urgency === 'expired'
                ? 'bg-slate-100 text-slate-500'
                : urgency === 'urgent'
                ? 'bg-rose-100 text-rose-600'
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            {iconMap[urgency]}
          </div>
          <div>
            <p className="text-xs font-medium text-surface-400 uppercase tracking-wider">
              {dealName}
            </p>
            <p className={`text-sm font-bold tracking-tight ${accentStyle[urgency]}`}>
              {label}
            </p>
          </div>
        </div>

        {/* Days count badge — prominent */}
        {!isExpired && (
          <div
            className={`flex flex-col items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-xl ${
              urgency === 'urgent'
                ? 'bg-rose-100 text-rose-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            <span className="text-2xl font-bold leading-none">{days}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">days</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className={`relative z-10 w-full h-3 rounded-full ${barBgStyle[urgency]}`}>
        <motion.div
          className={`h-full rounded-full ${barFillStyle[urgency]}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        {/* Glint / shimmer dot at the leading edge */}
        {!isExpired && progress > 5 && (
          <motion.div
            className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/70 shadow-sm`}
            style={{ left: `calc(${progress}% - 4px)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Progress percentage label */}
      <div className="relative z-10 flex items-center justify-between mt-2">
        <span className="text-[11px] font-medium text-surface-400">
          Registration opens
        </span>
        <span className={`text-[11px] font-semibold ${accentStyle[urgency]}`}>
          {Math.round(progress)}% filled
        </span>
      </div>
    </motion.div>
  );
}
