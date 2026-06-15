'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bell, CheckCircle, Upload, MessageSquare, AlertTriangle, Sparkles,
  FileText, Clock, CheckCheck, ChevronRight, X
} from 'lucide-react';
import { notifications } from '@/data/demo-data';
import { AnimatedCard, PageHeader } from '@/components/ui';

const typeIcons: Record<string, { icon: any; color: string; bg: string }> = {
  upload: { icon: Upload, color: 'text-blue-600', bg: 'bg-blue-50' },
  ai: { icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  reminder: { icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
  alert: { icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
  complete: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  report: { icon: FileText, color: 'text-violet-600', bg: 'bg-violet-50' },
};

function NotificationItem({ n }: { n: any }) {
  const [dismissed, setDismissed] = useState(false);
  const style = typeIcons[n.type] || typeIcons.upload;
  const Icon = style.icon;

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card-premium p-4 flex items-start gap-4 group ${
        !n.read ? 'border-l-2 border-l-emerald-500 bg-emerald-50/30' : ''
      }`}
    >
      <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center ${style.color} shrink-0`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-surface-900">{n.title}</span>
          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
        </div>
        <p className="text-xs text-surface-500 mt-0.5">{n.message}</p>
        <span className="text-[10px] text-surface-400 mt-1 block">{n.time}</span>
      </div>
      <button onClick={() => setDismissed(true)}
        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-all"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<string>('all');
  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = filter === 'all'
    ? notifications
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: `Unread (${unreadCount})` },
    { key: 'upload', label: 'Uploads' },
    { key: 'reminder', label: 'Reminders' },
    { key: 'ai', label: 'AI' },
    { key: 'alert', label: 'Alerts' },
  ];

  return (
    <div>
      <PageHeader title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notifications` : 'No unread notifications'}
        action={
          <button className="btn-ghost text-sm"><CheckCheck size={14} /> Mark all read</button>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto">
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              filter === f.key ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Bell size={28} className="text-surface-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-surface-700">All caught up</h3>
            <p className="text-xs text-surface-400 mt-1">No notifications match this filter.</p>
          </div>
        ) : (
          filtered.map((n, i) => (
            <AnimatedCard key={n.id} delay={i * 0.05}>
              <NotificationItem n={n} />
            </AnimatedCard>
          ))
        )}
      </div>
    </div>
  );
}
