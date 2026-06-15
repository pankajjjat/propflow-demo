'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, FolderKanban, ArrowRight } from 'lucide-react';
import { deals } from '@/data/demo-data';
import { AnimatedCard, StatusBadge, PageHeader } from '@/components/ui';

export default function DealsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filteredDeals = useMemo(() => {
    let result = deals;
    if (filter !== 'all') result = result.filter(d => d.status === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.buyer.name.toLowerCase().includes(q) ||
        d.seller.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, filter]);

  const filters = ['all', 'active', 'urgent', 'completed', 'draft'];

  return (
    <div>
      <PageHeader title="Deals" subtitle={`${deals.length} total · ${deals.filter(d => d.status === 'active').length} active`}
        action={
          <button className="btn-primary"><Plus size={16} /> New Deal</button>
        }
      />

      {/* Search & Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text" placeholder="Search deals, clients..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="input-premium pl-10"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filter === f ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && <span className="ml-1.5 opacity-60">({deals.filter(d => d.status === f).length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="space-y-3">
        {filteredDeals.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
              <FolderKanban size={28} className="text-surface-400" />
            </div>
            <h3 className="text-lg font-semibold text-surface-700 mb-1">No deals found</h3>
            <p className="text-sm text-surface-400">Try adjusting your search or filter.</p>
          </div>
        ) : (
          filteredDeals.map((deal, i) => (
            <AnimatedCard key={deal.id} delay={i * 0.04}>
              <Link href={`/app/deals/${deal.id}`}
                className="card-premium p-5 flex items-center gap-5 group hover:border-emerald-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  deal.status === 'urgent' ? 'bg-rose-50 text-rose-500' :
                  deal.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                  deal.status === 'draft' ? 'bg-surface-100 text-surface-400' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  <FolderKanban size={22} />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-4 gap-3">
                  <div>
                    <div className="font-medium text-surface-900 text-sm">{deal.title}</div>
                    <div className="text-xs text-surface-400 mt-0.5">{deal.id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-surface-500">Buyer</div>
                    <div className="text-sm text-surface-700">{deal.buyer.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-surface-500">Value</div>
                    <div className="text-sm text-surface-700">{deal.dealValue}</div>
                  </div>
                  <div className="flex items-center justify-between md:justify-start gap-3">
                    <div>
                      <div className="text-xs text-surface-500">Completion</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-16 h-1.5 rounded-full bg-surface-200 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${deal.completion}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className={`h-full rounded-full ${
                              deal.completion === 100 ? 'bg-emerald-500' :
                              deal.completion > 60 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                        </div>
                        <span className="text-xs text-surface-400">{deal.completion}%</span>
                      </div>
                    </div>
                    <StatusBadge status={deal.status} />
                  </div>
                </div>
                <ArrowRight size={16} className="text-surface-300 group-hover:text-surface-500 transition-colors shrink-0" />
              </Link>
            </AnimatedCard>
          ))
        )}
      </div>
    </div>
  );
}
