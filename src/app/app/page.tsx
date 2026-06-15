'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, FileText, AlertTriangle, CheckCircle, Clock, Calendar, ArrowRight, Upload, MessageSquare, Download, Eye, FolderKanban } from 'lucide-react';
import { deals, stats } from '@/data/demo-data';
import { AnimatedCard, StatCard, QuickAction } from '@/components/ui';

export default function DashboardPage() {
  const urgentDeals = deals.filter(d => d.status === 'urgent');
  const activeDeals = deals.filter(d => d.status !== 'completed' && d.status !== 'draft');

  return (
    <div>
      <AnimatedCard className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-surface-900">Dashboard</h1>
          <p className="text-sm text-surface-400 mt-1">Good morning, Vikram. You have {stats.pendingDocuments} pending documents today.</p>
        </div>
        <Link href="/app/deals" className="btn-primary">
          <Plus size={16} /> New Deal
        </Link>
      </AnimatedCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnimatedCard delay={0.05}>
          <StatCard label="Active Deals" value={stats.activeDeals} sub="Across all stages" icon={<FolderKanban size={18} />} trend="+2" />
        </AnimatedCard>
        <AnimatedCard delay={0.1}>
          <StatCard label="Pending Documents" value={stats.pendingDocuments} sub="Needing attention" icon={<FileText size={18} />} trend="-5" color="amber" />
        </AnimatedCard>
        <AnimatedCard delay={0.15}>
          <StatCard label="Upcoming Registrations" value={stats.upcomingRegistrations} sub="This week" icon={<Calendar size={18} />} color="blue" />
        </AnimatedCard>
        <AnimatedCard delay={0.2}>
          <StatCard label="Completed" value={stats.completedDealsThisMonth} sub="This month" icon={<CheckCircle size={18} />} trend="+3" color="emerald" />
        </AnimatedCard>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Alerts */}
          {urgentDeals.length > 0 && (
            <AnimatedCard delay={0.1}>
              <div className="card-premium overflow-hidden">
                <div className="p-5 border-b border-surface-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-rose-500" />
                    <h2 className="font-semibold text-surface-900">Urgent Attention Needed</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-rose text-xs">{urgentDeals.length} deals</span>
                    <span className="badge-blue text-[10px]">AI Priority</span>
                  </div>
                </div>
                <div className="divide-y divide-surface-50">
                  {urgentDeals.map((deal) => (
                    <Link key={deal.id} href={`/app/deals/${deal.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                        <AlertTriangle size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-surface-900 text-sm">{deal.title}</div>
                        <div className="text-xs text-surface-400 mt-0.5">Registration: {deal.registrationDate} · {deal.completion}% complete</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge-rose text-xs">{deal.completion}%</span>
                        <ArrowRight size={14} className="text-surface-300 group-hover:text-surface-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          )}

          {/* Active Deals */}
          <AnimatedCard delay={0.15}>
            <div className="card-premium overflow-hidden">
              <div className="p-5 border-b border-surface-100 flex items-center justify-between">
                <h2 className="font-semibold text-surface-900">Active Deals</h2>
                <Link href="/app/deals" className="text-xs text-emerald-600 font-medium hover:text-emerald-700">View All</Link>
              </div>
              <div className="divide-y divide-surface-50">
                {activeDeals.slice(0, 5).map((deal, i) => (
                  <Link key={deal.id} href={`/app/deals/${deal.id}`}
                    className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      deal.status === 'urgent' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      <FolderKanban size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-surface-900 text-sm">{deal.title}</div>
                      <div className="text-xs text-surface-400 mt-0.5">{deal.buyer.name} → {deal.seller.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-surface-700">{deal.dealValue}</div>
                      <div className="flex items-center gap-2 mt-1 justify-end">
                        <div className="w-20 h-1.5 rounded-full bg-surface-200 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${deal.completion}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full rounded-full ${deal.completion === 100 ? 'bg-emerald-500' : deal.completion > 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          />
                        </div>
                        <span className="text-xs text-surface-400">{deal.completion}%</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <AnimatedCard delay={0.1}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/app/deals">
                  <QuickAction icon={<Plus size={16} />} label="Create New Deal" variant="primary" />
                </Link>
                <Link href="/app/client">
                  <QuickAction icon={<Upload size={16} />} label="Send Upload Link" />
                </Link>
                <Link href="/app/whatsapp">
                  <QuickAction icon={<MessageSquare size={16} />} label="Send Reminder" />
                </Link>
                <Link href="/app/deals">
                  <QuickAction icon={<Download size={16} />} label="Export Package" />
                </Link>
              </div>
            </div>
          </AnimatedCard>

          {/* AI Insights */}
          <AnimatedCard delay={0.15}>
            <div className="card-premium p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-xs font-bold">AI</span>
                </div>
                <h2 className="font-semibold text-surface-900 text-sm">AI Assistant</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-amber-800">Registration in 3 days</div>
                      <div className="text-xs text-amber-600 mt-0.5">Mumbai Rental only 45% ready</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-start gap-2">
                    <Eye size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-blue-800">Loan case detected</div>
                      <div className="text-xs text-blue-600 mt-0.5">ITR suggested for D-1024</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-emerald-800">Documents verified</div>
                      <div className="text-xs text-emerald-600 mt-0.5">Aadhaar & PAN auto-verified</div>
                    </div>
                  </div>
                </div>
                <Link href="/app/deals" className="block text-xs text-emerald-600 font-medium hover:text-emerald-700 mt-2">
                  View all insights →
                </Link>
              </div>
            </div>
          </AnimatedCard>

          {/* Recent Activity */}
          <AnimatedCard delay={0.2}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 text-sm mb-3">Recent Activity</h2>
              <div className="space-y-3">
                {deals.flatMap(d => d.activity).slice(0, 4).map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 mt-0.5">
                      {a.type === 'upload' ? <Upload size={12} className="text-blue-500" /> :
                       a.type === 'reminder' ? <MessageSquare size={12} className="text-amber-500" /> :
                       a.type === 'ai' ? <Eye size={12} className="text-emerald-500" /> :
                       <Clock size={12} className="text-surface-400" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-surface-700">{a.action}</div>
                      <div className="text-xs text-surface-400">{a.detail}</div>
                      <div className="text-xs text-surface-300 mt-0.5">{a.timestamp}</div>
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
