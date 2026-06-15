'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AnimatedCard({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ label, value, sub, icon, trend, color = 'emerald' }: {
  label: string; value: string | number; sub?: string; icon: ReactNode; trend?: string; color?: string;
}) {
  return (
    <div className="card-premium p-5 group cursor-default">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-xl bg-${color}-50 flex items-center justify-center text-${color}-600 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight text-surface-900">{value}</div>
      {sub && <div className="text-xs text-surface-400 mt-1">{sub}</div>}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>{trend}</span>
          <span className="text-xs text-surface-400">vs last month</span>
        </div>
      )}
    </div>
  );
}

export function ProgressRing({ percentage, size = 48, strokeWidth = 4 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const offset = circum - (percentage / 100) * circum;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e4e4e7" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#10b981"
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circum}
          initial={{ strokeDashoffset: circum }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute text-xs font-bold text-surface-700">{percentage}%</span>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    complete: { cls: 'badge-green', label: 'Complete' },
    pending: { cls: 'badge-amber', label: 'Pending' },
    missing: { cls: 'badge-rose', label: 'Missing' },
    'ai-detected': { cls: 'badge-blue', label: 'AI Detected' },
    active: { cls: 'badge-blue', label: 'Active' },
    urgent: { cls: 'badge-rose', label: 'Urgent' },
    completed: { cls: 'badge-green', label: 'Completed' },
    draft: { cls: 'badge-gray', label: 'Draft' },
    sent: { cls: 'badge-green', label: 'Sent' },
    scheduled: { cls: 'badge-blue', label: 'Scheduled' },
    failed: { cls: 'badge-rose', label: 'Failed' },
  };
  const s = map[status] || { cls: 'badge-gray', label: status };
  return <span className={s.cls}>{s.label}</span>;
}

export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center text-surface-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-surface-700 mb-1">{title}</h3>
      <p className="text-sm text-surface-400 max-w-sm">{description}</p>
    </div>
  );
}

export function QuickAction({ icon, label, onClick, variant = 'normal' }: { icon: ReactNode; label: string; onClick?: () => void; variant?: 'normal' | 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
        variant === 'primary'
          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
          : 'bg-surface-50 text-surface-700 hover:bg-surface-100 border border-surface-100'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        variant === 'primary' ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-surface-500'
      }`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">{title}</h1>
        {subtitle && <p className="text-sm text-surface-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
