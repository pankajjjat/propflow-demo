'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CheckSquare, CheckCircle, XCircle, Clock, AlertTriangle, Sparkles,
  User, Building2, Home, ArrowRight, Filter, Search
} from 'lucide-react';
import { deals, documentCategories } from '@/data/demo-data';
import { AnimatedCard, ProgressRing, StatusBadge, PageHeader } from '@/components/ui';

export default function ChecklistPage() {
  const [filter, setFilter] = useState<'all' | 'buyer' | 'seller' | 'property'>('all');
  const [search, setSearch] = useState('');

  const allMissing = deals.flatMap(d =>
    d.documents.filter(doc => doc.status === 'missing' || doc.status === 'pending')
      .map(doc => ({ ...doc, deal: d }))
  );

  const filteredMissing = allMissing.filter(item => {
    if (filter !== 'all' && item.category !== filter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.deal.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Document Checklist"
        subtitle="Track all documents across every deal. See what's missing at a glance."
      />

      {/* Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Documents', value: deals.reduce((a, d) => a + d.documents.length, 0), color: 'text-surface-900' },
          { label: 'Complete', value: deals.reduce((a, d) => a + d.documents.filter(doc => doc.status === 'complete').length, 0), color: 'text-emerald-600' },
          { label: 'Pending', value: deals.reduce((a, d) => a + d.documents.filter(doc => doc.status === 'pending').length, 0), color: 'text-amber-600' },
          { label: 'Missing', value: deals.reduce((a, d) => a + d.documents.filter(doc => doc.status === 'missing').length, 0), color: 'text-rose-500' },
        ].map((s, i) => (
          <AnimatedCard key={s.label} delay={i * 0.05}>
            <div className="card-premium p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-surface-400">{s.label}</div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input type="text" placeholder="Search documents or deals..." value={search} onChange={e => setSearch(e.target.value)}
            className="input-premium pl-9 text-sm" />
        </div>
        <div className="flex items-center gap-1.5">
          {(['all', 'buyer', 'seller', 'property'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === f ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Missing Documents Alert */}
      {filteredMissing.length > 0 && (
        <AnimatedCard>
          <div className="card-premium overflow-hidden mb-6">
            <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Documents Needing Attention</span>
              </div>
              <span className="text-xs text-amber-600 font-medium">{filteredMissing.length} items</span>
            </div>
            <div className="divide-y divide-surface-50">
              {filteredMissing.map((item, i) => (
                <Link key={item.id} href={`/app/deals/${item.deal.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    item.status === 'missing' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {item.status === 'missing' ? <XCircle size={18} /> : <Clock size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-surface-900">{item.name}</div>
                    <div className="text-xs text-surface-400 mt-0.5">
                      {item.deal.title} · {item.category === 'buyer' ? 'Buyer' : item.category === 'seller' ? 'Seller' : 'Property'}
                    </div>
                    {item.notes && (
                      <div className="text-xs text-amber-600 mt-0.5 flex items-center gap-1">
                        <Sparkles size={10} />
                        {item.notes}
                      </div>
                    )}
                  </div>
                  <StatusBadge status={item.status} />
                  <ArrowRight size={14} className="text-surface-300 group-hover:text-surface-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Per-deal overview */}
      <div className="space-y-3">
        <h2 className="font-semibold text-surface-900 text-sm">All Deals — Document Status</h2>
        {deals.filter(d => d.status !== 'completed').map((deal, i) => (
          <AnimatedCard key={deal.id} delay={i * 0.05}>
            <Link href={`/app/deals/${deal.id}`}
              className="card-premium p-4 flex items-center gap-4 group hover:border-emerald-200"
            >
              <ProgressRing percentage={deal.completion} size={48} strokeWidth={4} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-surface-900 text-sm">{deal.title}</span>
                  <StatusBadge status={deal.status} />
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-surface-400">
                  <span>Buyer {deal.documents.filter(d => d.category === 'buyer' && d.status === 'complete').length}/{deal.documents.filter(d => d.category === 'buyer').length}</span>
                  <span>Seller {deal.documents.filter(d => d.category === 'seller' && d.status === 'complete').length}/{deal.documents.filter(d => d.category === 'seller').length}</span>
                  <span>Property {deal.documents.filter(d => d.category === 'property' && d.status === 'complete').length}/{deal.documents.filter(d => d.category === 'property').length}</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-surface-300 group-hover:text-surface-500" />
            </Link>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
