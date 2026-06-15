'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Send, CheckCircle, Clock, AlertTriangle, Smartphone,
  ChevronDown, ChevronUp, Plus,
  CheckCheck
} from 'lucide-react';
import { deals, type Reminder } from '@/data/demo-data';
import { AnimatedCard, StatusBadge, PageHeader } from '@/components/ui';

function WhatsAppChatPreview({ message, time }: { message: string; time: string }) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
        <span className="text-white text-[10px] font-bold">PF</span>
      </div>
      <div className="flex-1">
        <div className="bg-white rounded-r-xl rounded-bl-xl p-3 shadow-sm border border-surface-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-surface-700">PropFlow Bot</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-surface-400">{time}</span>
              <CheckCheck size={10} className="text-blue-500" />
            </div>
          </div>
          <p className="text-[11px] text-surface-600 leading-relaxed">{message}</p>
        </div>
        {/* Quick reply buttons */}
        <div className="flex gap-1.5 mt-1.5">
          <button className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] text-emerald-700 font-medium hover:bg-emerald-100">
            Upload Now
          </button>
          <button className="px-2.5 py-1 rounded-full bg-surface-50 border border-surface-200 text-[9px] text-surface-500 font-medium hover:bg-surface-100">
            Will Do Later
          </button>
        </div>
      </div>
    </div>
  );
}

function ReminderCard({ reminder, dealTitle }: { reminder: Reminder; dealTitle: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-premium overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          reminder.status === 'sent' ? 'bg-emerald-50 text-emerald-600' :
          reminder.status === 'scheduled' ? 'bg-blue-50 text-blue-600' :
          'bg-rose-50 text-rose-500'
        }`}>
          {reminder.status === 'sent' ? <CheckCircle size={18} /> :
           reminder.status === 'scheduled' ? <Clock size={18} /> :
           <AlertTriangle size={18} />}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="text-sm font-medium text-surface-900">{reminder.to}</div>
          <div className="text-xs text-surface-400 truncate mt-0.5">{dealTitle}</div>
        </div>
        <div className="text-right">
          <StatusBadge status={reminder.status} />
          <div className="text-[10px] text-surface-400 mt-1">{reminder.sentAt}</div>
        </div>
        {expanded ? <ChevronUp size={14} className="text-surface-400" /> : <ChevronDown size={14} className="text-surface-400" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-surface-100">
            <div className="p-4 bg-surface-50">
              <div className="text-xs text-surface-500 mb-2">Message sent:</div>
              <div className="bg-white rounded-xl p-3 text-sm text-surface-700 border border-surface-100 leading-relaxed mb-3">
                &ldquo;{reminder.message}&rdquo;
              </div>
              <div className="flex items-center gap-2 text-[10px] text-surface-400">
                <Smartphone size={12} />
                Via WhatsApp · {reminder.channel}
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn-ghost text-xs"><Send size={12} /> Resend</button>
                <button className="btn-ghost text-xs"><Plus size={12} /> Follow-up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'preview'>('history');
  const allReminders = deals.flatMap(d => d.reminders.map(r => ({ ...r, dealTitle: d.title })));
  const sentReminders = allReminders.filter(r => r.status === 'sent');
  const scheduledReminders = allReminders.filter(r => r.status === 'scheduled');

  return (
    <div>
      <PageHeader title="WhatsApp Automation"
        subtitle="Automated document reminders via WhatsApp. Clients upload directly from their phone."
        action={
          <button className="btn-primary"><Plus size={16} /> New Reminder</button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <AnimatedCard delay={0.05}>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-surface-900">{allReminders.length}</div>
            <div className="text-xs text-surface-400">Total Reminders</div>
          </div>
        </AnimatedCard>
        <AnimatedCard delay={0.1}>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-emerald-600">{sentReminders.length}</div>
            <div className="text-xs text-surface-400">Sent</div>
          </div>
        </AnimatedCard>
        <AnimatedCard delay={0.15}>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-blue-600">{scheduledReminders.length}</div>
            <div className="text-xs text-surface-400">Scheduled</div>
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 mb-6">
        {(['history', 'preview'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            {tab === 'history' ? 'Reminder History' : 'WhatsApp Preview'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'history' ? (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            {allReminders.length === 0 ? (
              <div className="card-premium p-12 text-center">
                <MessageSquare size={28} className="text-surface-300 mx-auto mb-3" />
                <p className="text-surface-500 text-sm">No reminders sent yet.</p>
              </div>
            ) : (
              allReminders.map((r, i) => (
                <AnimatedCard key={r.id} delay={i * 0.05}>
                  <ReminderCard reminder={r} dealTitle={r.dealTitle} />
                </AnimatedCard>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* WhatsApp Chat Preview */}
              <div>
                <AnimatedCard>
                  <div className="card-premium overflow-hidden">
                    <div className="bg-emerald-600 p-3 flex items-center gap-2">
                      <MessageSquare size={16} className="text-white" />
                      <span className="text-white font-medium text-sm">Client WhatsApp</span>
                    </div>
                    <div className="bg-[#e5ddd5] p-4 min-h-[400px]">
                      <div className="text-center mb-4">
                        <div className="inline-block bg-white/80 rounded-lg px-3 py-1 text-[10px] text-surface-500">
                          Today
                        </div>
                      </div>
                      <WhatsAppChatPreview
                        time="9:30 AM"
                        message="Hello Rajesh ji, these documents are still pending for your Jaipur Apartment deal: 📄 Bank Statement (6 months) 📄 Passport Photo. Please upload here at your earliest convenience."
                      />
                      <WhatsAppChatPreview
                        time="6:15 PM"
                        message="Hello Priya ji, Tax Receipt & NOC from Society are still pending. Registration is in 5 days. Please upload the remaining documents."
                      />
                      {/* Outgoing typing */}
                      <div className="flex items-center gap-2 text-[10px] text-surface-400 ml-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-surface-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="inline-block w-2 h-2 rounded-full bg-surface-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="inline-block w-2 h-2 rounded-full bg-surface-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="ml-1">PropFlow is typing...</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>

              {/* Automation Settings */}
              <div className="space-y-4">
                <AnimatedCard delay={0.1}>
                  <div className="card-premium p-5">
                    <h2 className="font-semibold text-surface-900 text-sm mb-3">Automation Rules</h2>
                    <div className="space-y-3">
                      {[
                        { label: 'Auto-reminder for missing docs', desc: '48 hours after deal creation', active: true },
                        { label: 'Urgent reminder before registration', desc: '7 days, 3 days, and 1 day before', active: true },
                        { label: 'Weekly summary to broker', desc: 'Every Monday at 8:00 AM', active: true },
                        { label: 'Follow-up if no upload in 24hrs', desc: 'After initial reminder sent', active: false },
                      ].map((rule) => (
                        <div key={rule.label} className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                          <div>
                            <div className="text-xs font-medium text-surface-700">{rule.label}</div>
                            <div className="text-[10px] text-surface-400">{rule.desc}</div>
                          </div>
                          <div className={`w-8 h-4 rounded-full transition-colors ${rule.active ? 'bg-emerald-500' : 'bg-surface-300'}`}>
                            <div className={`w-3 h-3 rounded-full bg-white shadow mt-0.5 transition-transform ${rule.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.15}>
                  <div className="card-premium p-5">
                    <h2 className="font-semibold text-surface-900 text-sm mb-3">Schedule New Reminder</h2>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Select Deal</label>
                        <select className="input-premium text-sm">
                          {deals.filter(d => d.status !== 'completed').map(d => (
                            <option key={d.id}>{d.title} — {d.buyer.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Message Template</label>
                        <select className="input-premium text-sm">
                          <option>Missing documents reminder</option>
                          <option>Urgent — registration approaching</option>
                          <option>Upload confirmation request</option>
                          <option>Custom message</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Send at</label>
                        <input type="datetime-local" className="input-premium text-sm" defaultValue="2026-07-10T10:00" />
                      </div>
                      <button className="btn-primary w-full"><Send size={14} /> Schedule Reminder</button>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Automation Stats */}
                <AnimatedCard delay={0.2}>
                  <div className="card-premium p-5">
                    <h2 className="font-semibold text-surface-900 text-sm mb-3">Automation Impact</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '94%', label: 'Delivery Rate' },
                        { value: '68%', label: 'Upload within 24hrs' },
                        { value: '3.2hrs', label: 'Avg Response Time' },
                        { value: '82%', label: 'Client Satisfaction' },
                      ].map((m) => (
                        <div key={m.label} className="p-3 rounded-xl bg-surface-50 text-center">
                          <div className="text-lg font-bold text-surface-900">{m.value}</div>
                          <div className="text-[10px] text-surface-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
