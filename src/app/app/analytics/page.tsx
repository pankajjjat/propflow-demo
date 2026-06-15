'use client';
import { motion } from 'framer-motion';
import {
  Users, CheckCircle,
  ArrowUp, ArrowDown, IndianRupee, Target
} from 'lucide-react';
import { deals, stats, monthlyData } from '@/data/demo-data';
import { AnimatedCard, StatCard, PageHeader } from '@/components/ui';

function BarChart({ data }: { data: typeof monthlyData }) {
  const max = Math.max(...data.map(d => d.deals));
  return (
    <div className="flex items-end gap-2 h-32 pt-4">
      {data.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-0.5 w-full justify-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.completed / max) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-2.5 rounded-t bg-emerald-500"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.pending / max) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-2.5 rounded-t bg-amber-400"
            />
          </div>
          <span className="text-[10px] text-surface-400">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const totalDocs = deals.reduce((acc, d) => acc + d.documents.length, 0);
  const totalComplete = deals.reduce((acc, d) => acc + d.documents.filter(doc => doc.status === 'complete').length, 0);
  const avgCompletion = Math.round((totalComplete / totalDocs) * 100);
  const totalValue = deals.reduce((acc, d) => {
    const num = parseInt(d.dealValue.replace(/[₹,]/g, '').replace(/\s*\(.*\)/, ''));
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Real-time insights into your brokerage performance" />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnimatedCard delay={0.05}>
          <StatCard label="Total Deal Value" value={`₹${(totalValue / 10000000).toFixed(1)}Cr`} sub="Across all active deals"
            icon={<IndianRupee size={18} />} trend="+15%" />
        </AnimatedCard>
        <AnimatedCard delay={0.1}>
          <StatCard label="Monthly Completions" value={stats.completedDealsThisMonth} sub="This month"
            icon={<CheckCircle size={18} />} trend="+3" />
        </AnimatedCard>
        <AnimatedCard delay={0.15}>
          <StatCard label="Avg Completion" value={`${avgCompletion}%`} sub={`${totalComplete}/${totalDocs} docs`}
            icon={<Target size={18} />} trend="+5%" color="blue" />
        </AnimatedCard>
        <AnimatedCard delay={0.2}>
          <StatCard label="Clients Served" value={stats.clientsServed} sub="All time"
            icon={<Users size={18} />} trend="+12" color="violet" />
        </AnimatedCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="card-premium p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-surface-900">Monthly Deals</h2>
                  <p className="text-xs text-surface-400">Last 6 months · Completed vs Pending</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
                    <span className="text-[10px] text-surface-400">Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-amber-400" />
                    <span className="text-[10px] text-surface-400">Pending</span>
                  </div>
                </div>
              </div>
              <BarChart data={monthlyData} />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 mb-4">Deal Performance</h2>
              <div className="space-y-3">
                {deals.map((deal, i) => (
                  <div key={deal.id} className="flex items-center gap-4">
                    <div className="w-24 shrink-0">
                      <div className="text-xs font-medium text-surface-700 truncate">{deal.title}</div>
                      <div className="text-[10px] text-surface-400">{deal.dealValue}</div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-surface-200 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${deal.completion}%` }}
                          transition={{ duration: 1, delay: i * 0.05 }}
                          className={`h-full rounded-full ${
                            deal.completion === 100 ? 'bg-emerald-500' :
                            deal.completion > 60 ? 'bg-emerald-500' :
                            deal.completion > 30 ? 'bg-amber-500' :
                            'bg-rose-500'
                          }`}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-surface-600 w-8 text-right">{deal.completion}%</span>
                    <span className={`text-[10px] ${
                      deal.completion === 100 ? 'text-emerald-600' :
                      deal.status === 'urgent' ? 'text-rose-500' : 'text-surface-400'
                    } w-16 text-right`}>
                      {deal.status === 'completed' ? 'Done' : deal.registrationDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 text-sm mb-4">Document Overview</h2>
              <div className="space-y-3">
                {[
                  { label: 'Complete', value: totalComplete, total: totalDocs, color: 'emerald' },
                  { label: 'Pending', value: totalDocs - totalComplete, total: totalDocs, color: 'amber' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-surface-600">{item.label}</span>
                      <span className="font-medium text-surface-700">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / totalDocs) * 100}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 text-sm mb-4">Document Categories</h2>
              <div className="grid grid-cols-3 gap-2">
                {['buyer', 'seller', 'property'].map(cat => {
                  const docs = deals.flatMap(d => d.documents.filter(doc => doc.category === cat));
                  const complete = docs.filter(d => d.status === 'complete').length;
                  const pct = Math.round((complete / docs.length) * 100);
                  return (
                    <div key={cat} className="text-center p-3 rounded-xl bg-surface-50">
                      <div className="text-lg font-bold text-surface-900">{pct}%</div>
                      <div className="text-[10px] text-surface-400 capitalize">{cat}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 text-sm mb-4">Efficiency Metrics</h2>
              <div className="space-y-3">
                {[
                  { label: 'Avg. Days to Complete', value: '12 days', trend: 'down', change: '-2 days' },
                  { label: 'Reminder Response Rate', value: '68%', trend: 'up', change: '+5%' },
                  { label: 'Documents Per Deal', value: '14', trend: 'up', change: '+2' },
                  { label: 'Time Saved Per Broker', value: '3.2 hrs/day', trend: 'up', change: '+0.5' },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-50 transition-colors">
                    <div className="text-xs text-surface-500">{m.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-surface-700">{m.value}</span>
                      <span className={`text-[10px] flex items-center gap-0.5 ${
                        m.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'
                      }`}>
                        {m.trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                        {m.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
