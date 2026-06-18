'use client';
import { motion } from 'framer-motion';
import { Users, Phone, MapPin, IndianRupee, ArrowRight, UserPlus } from 'lucide-react';
import { PageHeader, AnimatedCard } from '@/components/ui';

type LeadStage = 'inquiry' | 'visit' | 'offer' | 'closing';

interface Lead {
  id: string; name: string; phone: string; property: string;
  value: string; stage: LeadStage; daysInStage: number; priority: 'high' | 'medium' | 'low';
}

const STAGES: { key: LeadStage; label: string; color: string }[] = [
  { key: 'inquiry', label: 'Inquiry', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'visit', label: 'Site Visit', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'offer', label: 'Offer', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { key: 'closing', label: 'Closing', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

const LEADS: Lead[] = [
  { id: 'L-001', name: 'Amit Gupta', phone: '+91 98765 43220', property: '3BHK, Vaishali Nagar, Jaipur', value: '₹ 75,00,000', stage: 'inquiry', daysInStage: 2, priority: 'high' },
  { id: 'L-002', name: 'Sunita Reddy', phone: '+91 98765 43221', property: 'Commercial, Hitech City, Hyd', value: '₹ 1,80,00,000', stage: 'inquiry', daysInStage: 5, priority: 'medium' },
  { id: 'L-003', name: 'Ravi Kumar', phone: '+91 98765 43222', property: 'Villa, Whitefield, Bangalore', value: '₹ 2,50,00,000', stage: 'visit', daysInStage: 1, priority: 'high' },
  { id: 'L-004', name: 'Pooja Desai', phone: '+91 98765 43223', property: 'Plot, OMR Road, Chennai', value: '₹ 95,00,000', stage: 'visit', daysInStage: 3, priority: 'medium' },
  { id: 'L-005', name: 'Vijay Malhotra', phone: '+91 98765 43224', property: 'Apartment, Sector 62, Noida', value: '₹ 68,00,000', stage: 'offer', daysInStage: 7, priority: 'high' },
  { id: 'L-006', name: 'Ananya Sharma', phone: '+91 98765 43225', property: 'Office, BKC, Mumbai', value: '₹ 3,00,00,000', stage: 'offer', daysInStage: 4, priority: 'low' },
  { id: 'L-007', name: 'Deepak Patel', phone: '+91 98765 43226', property: 'Land, SG Highway, Ahmedabad', value: '₹ 1,20,00,000', stage: 'closing', daysInStage: 2, priority: 'high' },
  { id: 'L-008', name: 'Kavita Nair', phone: '+91 98765 43227', property: 'Duplex, Koregaon Park, Pune', value: '₹ 2,10,00,000', stage: 'closing', daysInStage: 5, priority: 'medium' },
];

const PRIORITY_BADGE: Record<string, string> = { high: 'badge-rose', medium: 'badge-amber', low: 'badge-blue' };

function LeadCard({ lead, i }: { lead: Lead; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="card-premium p-4 cursor-pointer hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
            {lead.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-sm font-medium text-surface-900">{lead.name}</div>
            <div className="text-[10px] text-surface-400 flex items-center gap-1">
              <Phone size={10} /> {lead.phone}
            </div>
          </div>
        </div>
        <span className={PRIORITY_BADGE[lead.priority]}>{lead.priority}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-surface-500 mb-1.5">
        <MapPin size={11} className="shrink-0" /> {lead.property}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-surface-500 mb-3">
        <IndianRupee size={11} className="shrink-0" /> {lead.value}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-surface-100">
        <span className="text-[10px] text-surface-400">{lead.daysInStage}d in stage</span>
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Move <ArrowRight size={10} />
        </div>
      </div>
    </motion.div>
  );
}

export default function LeadsPage() {
  return (
    <div>
      <PageHeader
        title="Lead Pipeline"
        subtitle="Track prospects from inquiry to closing across the pre-deal funnel."
        action={<button className="btn-primary"><UserPlus size={16} /> Add Lead</button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map(({ key, label, color }) => {
          const stageLeads = LEADS.filter(l => l.stage === key);
          return (
            <div key={key}>
              <AnimatedCard>
                <div className={`rounded-2xl border px-4 py-3 mb-3 ${color}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{label}</h3>
                    <span className="text-xs font-medium opacity-70">{stageLeads.length}</span>
                  </div>
                </div>
              </AnimatedCard>
              <div className="space-y-3">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-8 text-surface-400 text-xs">No leads</div>
                ) : (
                  stageLeads.map((lead, i) => <LeadCard key={lead.id} lead={lead} i={i} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
