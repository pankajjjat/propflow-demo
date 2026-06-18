'use client';

import { useMemo } from 'react';
import { Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CountdownBarProps {
  targetDate: string | Date;
  dealName: string;
}

const REGISTRATION_WINDOW_DAYS = 30;

export default function CountdownBar({ targetDate, dealName }: CountdownBarProps) {
  const { days, isUrgent, isExpired, progress, label } = useMemo(() => {
    const target = new Date(targetDate);
    const diffMs = target.getTime() - Date.now();
    const totalSec = diffMs / 1_000;

    if (totalSec <= 0) {
      return { days: 0, isUrgent: false, isExpired: true, progress: 100, label: 'Registration closed' };
    }

    const totalHours = totalSec / 3_600;
    const d = Math.floor(totalHours / 24);
    const urgent = d <= 3;
    const pct = Math.min(100, Math.max(0, ((REGISTRATION_WINDOW_DAYS - d) / REGISTRATION_WINDOW_DAYS) * 100));
    const lbl = urgent && d === 0
      ? `Registration closes in ${totalHours.toFixed(0)}h`
      : urgent
        ? `Registration in ${d}d ${Math.floor(totalHours % 24)}h`
        : `Registration in ${d} days`;

    return { days: d, isUrgent: urgent, isExpired: false, progress: pct, label: lbl };
  }, [targetDate]);

  const urgency = isExpired ? 'expired' : isUrgent ? 'urgent' : 'normal';

  const s = {
    bg: { expired: 'bg-slate-100 border-slate-200', urgent: 'bg-rose-50 border-rose-200', normal: 'bg-emerald-50 border-emerald-200' },
    accent: { expired: 'text-slate-500', urgent: 'text-rose-600', normal: 'text-emerald-600' },
    barBg: { expired: 'bg-slate-200', urgent: 'bg-rose-100', normal: 'bg-emerald-100' },
    barFill: { expired: 'bg-slate-400', urgent: 'bg-rose-500', normal: 'bg-emerald-500' },
    icon: { expired: <CheckCircle2 className="w-5 h-5" />, urgent: <AlertTriangle className="w-5 h-5" />, normal: <Calendar className="w-5 h-5" /> },
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border p-5 shadow-lg ${s.bg[urgency]}`}>
      {/* Subtle pulsing background for urgent state */}
      {urgency === 'urgent' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-rose-400 rounded-2xl opacity-[0.06] animate-pulse" />
        </div>
      )}

      {/* Top row: icon + deal name + label */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${urgency === 'expired' ? 'bg-slate-100 text-slate-500' : urgency === 'urgent' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
            {s.icon[urgency]}
          </div>
          <div>
            <p className="text-xs font-medium text-surface-400 uppercase tracking-wider">{dealName}</p>
            <p className={`text-sm font-bold tracking-tight ${s.accent[urgency]}`}>{label}</p>
          </div>
        </div>

        {/* Days badge */}
        {!isExpired && (
          <div className={`flex flex-col items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-xl ${urgency === 'urgent' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
            <span className="text-2xl font-bold leading-none">{days}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">days</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className={`relative z-10 w-full h-3 rounded-full ${s.barBg[urgency]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${s.barFill[urgency]}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage label */}
      <div className="relative z-10 flex items-center justify-between mt-2">
        <span className="text-[11px] font-medium text-surface-400">Registration opens</span>
        <span className={`text-[11px] font-semibold ${s.accent[urgency]}`}>{Math.round(progress)}% filled</span>
      </div>
    </div>
  );
}
