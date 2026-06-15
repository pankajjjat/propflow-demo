'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, CheckCircle, XCircle, AlertTriangle, Clock, Upload, MessageSquare,
  Download, Archive, Bot, User, Building2, Home, FileText, Eye, Sparkles,
  Send, Calendar, MapPin, Smartphone,
  RefreshCw, Share2, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import { deals, documentCategories, type Deal, type Document, type Reminder } from '@/data/demo-data';
import { AnimatedCard, StatusBadge, ProgressRing } from '@/components/ui';
import RegistrationCountdown from '@/components/ui/CountdownBar';
import DocumentPreview from '@/components/ui/DocumentPreview';
import StampDutyCalculator from '@/components/ui/StampDutyCalculator';

function DocCategorySection({ category, documents, onViewDoc }: { category: string; documents: Document[]; onViewDoc?: (doc: Document) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const cat = documentCategories.find(c => c.category === category);
  const docs = documents.filter(d => d.category === category);
  const complete = docs.filter(d => d.status === 'complete').length;
  const total = docs.length;
  const percentage = Math.round((complete / total) * 100);

  return (
    <div className="card-premium overflow-hidden">
      <button onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            category === 'buyer' ? 'bg-blue-50 text-blue-600' :
            category === 'seller' ? 'bg-amber-50 text-amber-600' :
            'bg-emerald-50 text-emerald-600'
          }`}>
            {category === 'buyer' ? <User size={16} /> :
             category === 'seller' ? <Building2 size={16} /> :
             <Home size={16} />}
          </div>
          <div className="text-left">
            <div className="font-medium text-surface-900 text-sm">{cat?.label || category}</div>
            <div className="text-xs text-surface-400">{complete} of {total} collected</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing percentage={percentage} size={36} strokeWidth={3} />
          {collapsed ? <ChevronDown size={16} className="text-surface-400" /> : <ChevronUp size={16} className="text-surface-400" />}
        </div>
      </button>
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="divide-y divide-surface-50 border-t border-surface-100">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-4 pl-14 hover:bg-surface-50 transition-colors group">
                  {/* Status icon */}
                  <div className="shrink-0">
                    {doc.status === 'complete' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle size={14} className="text-emerald-600" />
                      </div>
                    ) : doc.status === 'ai-detected' ? (
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Sparkles size={14} className="text-blue-600" />
                      </div>
                    ) : doc.status === 'pending' ? (
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <Clock size={14} className="text-amber-600" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                        <XCircle size={14} className="text-rose-500" />
                      </div>
                    )}
                  </div>
                  {/* Doc info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-surface-900">{doc.name}</span>
                      {doc.status === 'ai-detected' && (
                        <span className="badge-blue text-[10px]">AI Flagged</span>
                      )}
                    </div>
                    {doc.uploadedBy && (
                      <div className="text-xs text-surface-400 mt-0.5">
                        Uploaded by {doc.uploadedBy} · {doc.uploadedAt}
                      </div>
                    )}
                    {doc.notes && (
                      <div className="text-xs text-surface-400 mt-0.5 flex items-center gap-1">
                        <AlertTriangle size={10} className="text-amber-400" />
                        {doc.notes}
                      </div>
                    )}
                  </div>
                  {/* Action */}
                  <div className="shrink-0">
                    {doc.status === 'complete' ? (
                      <button className="btn-ghost text-xs" onClick={() => onViewDoc?.(doc)}>
                        <Eye size={14} /> View
                      </button>
                    ) : doc.status === 'pending' || doc.status === 'missing' ? (
                      <button className="btn-ghost text-xs text-amber-600 hover:text-amber-700">
                        <Send size={14} /> Remind
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppPreview({ deal }: { deal: Deal }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card-premium overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
            <MessageSquare size={16} />
          </div>
          <div className="text-left">
            <div className="font-medium text-surface-900 text-sm">WhatsApp Reminders</div>
            <div className="text-xs text-surface-400">{deal.reminders.length} messages sent</div>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-surface-400" /> : <ChevronDown size={16} className="text-surface-400" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-surface-100">
            <div className="p-4 space-y-3">
              {deal.reminders.map((r: Reminder) => (
                <div key={r.id} className="bg-surface-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">WA</span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-surface-700">{r.to}</div>
                        <div className="text-[10px] text-surface-400">{r.sentAt}</div>
                      </div>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="bg-white rounded-lg p-3 text-xs text-surface-600 leading-relaxed border border-surface-100">
                    &ldquo;{r.message}&rdquo;
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                    <span className="text-[10px] text-surface-400">Delivered via WhatsApp</span>
                  </div>
                </div>
              ))}
              {deal.reminders.length === 0 && (
                <p className="text-xs text-surface-400 text-center py-4">No reminders sent yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AiAssistantPanel({ deal }: { deal: Deal }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-50'}`}>
      <div className="card-premium overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={18} />
            <span className="font-semibold text-sm">AI Assistant</span>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="p-4 space-y-3">
                {/* Current deal insights */}
                {deal.documents.filter(d => d.status === 'ai-detected').length > 0 && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={14} className="text-blue-600" />
                      <span className="text-xs font-semibold text-blue-800">AI Detected</span>
                    </div>
                    {deal.documents.filter(d => d.status === 'ai-detected').map(d => (
                      <p key={d.id} className="text-xs text-blue-700 mt-1">{d.name} — {d.notes}</p>
                    ))}
                  </div>
                )}

                {/* Completion meter */}
                <div className="p-3 rounded-xl bg-surface-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-surface-700">Document Readiness</span>
                    <span className="text-lg font-bold text-surface-900">{deal.completion}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${deal.completion}%` }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${
                        deal.completion === 100 ? 'bg-emerald-500' :
                        deal.completion > 60 ? 'bg-emerald-500' :
                        deal.completion > 30 ? 'bg-amber-500' :
                        'bg-rose-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-surface-400">
                      {deal.documents.filter(d => d.status === 'complete').length} of {deal.documents.length} docs
                    </span>
                    {deal.status === 'urgent' && (
                      <span className="text-[10px] text-rose-500 font-medium">Registration soon</span>
                    )}
                  </div>
                </div>

                {/* Next action */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-amber-800">Next Recommended Action</div>
                      <div className="text-xs text-amber-700 mt-0.5">
                        {deal.documents.filter(d => d.status === 'missing').length > 0
                          ? `Send reminder for ${deal.documents.filter(d => d.status === 'missing').length} missing documents`
                          : deal.documents.filter(d => d.status === 'pending').length > 0
                          ? `Follow up on ${deal.documents.filter(d => d.status === 'pending').length} pending documents`
                          : 'All documents collected! Ready for registration package.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="text-xs text-surface-400 space-y-1">
                  <p className="font-medium text-surface-600 mb-2">AI Suggestions:</p>
                  {deal.completion < 80 && (
                    <div className="flex items-start gap-2">
                      <Send size={12} className="mt-0.5 shrink-0" />
                      <span>Send WhatsApp reminder to clients</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <RefreshCw size={12} className="mt-0.5 shrink-0" />
                    <span>Auto-verify uploaded documents</span>
                  </div>
                  {deal.completion >= 80 && (
                    <div className="flex items-start gap-2">
                      <Download size={12} className="mt-0.5 shrink-0" />
                      <span>Generate registration package</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RegistrationExport({ deal }: { deal: Deal }) {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    if (exported) return;
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 2000);
  };

  return (
    <div className="card-premium overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Archive size={16} />
            </div>
            <div>
              <div className="font-medium text-surface-900 text-sm">Registration Package</div>
              <div className="text-xs text-surface-400">Export all documents for sub-registrar</div>
            </div>
          </div>
        </div>

        {/* Folder Preview */}
        <div className="bg-surface-50 rounded-xl p-4 mb-4 font-mono text-xs">
          <div className="text-surface-500 mb-1">{deal.id}_Registration/</div>
          <div className="pl-4 text-surface-600">├── Buyer/</div>
          <div className="pl-8 text-surface-400">
            {deal.documents.filter(d => d.category === 'buyer' && d.status === 'complete').map(d => (
              <div key={d.id}>│   ├── {d.name.replace(/\s+/g, '_')}.pdf</div>
            ))}
            {deal.documents.filter(d => d.category === 'buyer' && d.status !== 'complete').map(d => (
              <div key={d.id} className="text-rose-300">│   ├── _{d.name.replace(/\s+/g, '_')}_MISSING.pdf</div>
            ))}
          </div>
          <div className="pl-4 text-surface-600">├── Seller/</div>
          <div className="pl-8 text-surface-400">
            {deal.documents.filter(d => d.category === 'seller' && d.status === 'complete').map(d => (
              <div key={d.id}>│   ├── {d.name.replace(/\s+/g, '_')}.pdf</div>
            ))}
            {deal.documents.filter(d => d.category === 'seller' && d.status !== 'complete').map(d => (
              <div key={d.id} className="text-rose-300">│   ├── _{d.name.replace(/\s+/g, '_')}_MISSING.pdf</div>
            ))}
          </div>
          <div className="pl-4 text-surface-600">├── Property/</div>
          <div className="pl-8 text-surface-400">
            {deal.documents.filter(d => d.category === 'property' && d.status === 'complete').map(d => (
              <div key={d.id}>│   ├── {d.name.replace(/\s+/g, '_')}.pdf</div>
            ))}
            {deal.documents.filter(d => d.category === 'property' && d.status !== 'complete').map(d => (
              <div key={d.id} className="text-rose-300">│   ├── _{d.name.replace(/\s+/g, '_')}_MISSING.pdf</div>
            ))}
          </div>
          <div className="pl-4 text-surface-600">└── Agreements/</div>
          <div className="pl-8 text-surface-400">    ├── Sale_Deed.pdf</div>
          <div className="pl-8 text-surface-400">    └── Registration_Form.pdf</div>
        </div>

        {exported ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
              <CheckCircle size={24} className="text-emerald-600" />
            </div>
            <div className="font-semibold text-emerald-800 text-sm">Registration Ready ✅</div>
            <div className="text-xs text-emerald-600 mt-1">Package exported at {new Date().toLocaleTimeString()}</div>
            <button className="mt-3 text-xs text-emerald-700 font-medium underline underline-offset-2">Download again</button>
          </div>
        ) : (
          <button onClick={handleExport} disabled={exporting}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              exporting
                ? 'bg-surface-100 text-surface-400 cursor-wait'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
            }`}
          >
            {exporting ? (
              <><Loader2 size={16} className="animate-spin" /> Preparing Package...</>
            ) : (
              <><Download size={16} /> Generate Registration Package</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function DealDetailPage() {
  const params = useParams();
  const deal = deals.find(d => d.id === params.id);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  if (!deal) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={28} className="text-surface-400" />
        </div>
        <h2 className="text-xl font-semibold text-surface-700">Deal not found</h2>
        <Link href="/app/deals" className="btn-primary mt-4 inline-flex">Back to Deals</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back + Title */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/app/deals" className="p-2 rounded-xl hover:bg-surface-100 transition-colors">
          <ArrowLeft size={18} className="text-surface-500" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-surface-900">{deal.title}</h1>
            <StatusBadge status={deal.status} />
          </div>
          <p className="text-sm text-surface-400">{deal.id} · Created {deal.createdAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs"><Share2 size={14} /> Share</button>
          <button className="btn-primary text-xs"><Upload size={14} /> Upload</button>
        </div>
      </div>

      {/* Deal Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: User, label: 'Buyer', value: deal.buyer.name, sub: deal.buyer.phone },
          { icon: Building2, label: 'Seller', value: deal.seller.name, sub: deal.seller.phone },
          { icon: MapPin, label: 'Property', value: deal.propertyType, sub: deal.location },
          { icon: Calendar, label: 'Registration', value: deal.registrationDate, sub: `₹${deal.dealValue}` },
        ].map((item, i) => (
          <AnimatedCard key={item.label} delay={i * 0.05}>
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 mb-2">
                <item.icon size={14} className="text-surface-400" />
                <span className="text-xs text-surface-400">{item.label}</span>
              </div>
              <div className="text-sm font-medium text-surface-900">{item.value}</div>
              <div className="text-xs text-surface-400 mt-0.5">{item.sub}</div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Registration Countdown */}
      <RegistrationCountdown targetDate={deal.registrationDate} dealName={deal.title} />

      {/* Main 2-column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Document Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Categories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-surface-900">Document Checklist</h2>
              <span className="text-xs text-surface-400">
                <span className="text-emerald-600 font-medium">{deal.documents.filter(d => d.status === 'complete').length}</span>
                /{deal.documents.length} collected
              </span>
            </div>
            {documentCategories.map(cat => (
              <DocCategorySection key={cat.category} category={cat.category} documents={deal.documents} onViewDoc={setSelectedDoc} />
            ))}
          </div>

          {/* Registration Export */}
          <RegistrationExport deal={deal} />

          {/* Activity Timeline */}
          <div className="card-premium overflow-hidden">
            <div className="p-4 border-b border-surface-100">
              <h2 className="font-semibold text-surface-900 text-sm">Activity Timeline</h2>
            </div>
            <div className="p-4">
              {deal.activity.length === 0 ? (
                <p className="text-xs text-surface-400 text-center py-4">No activity yet.</p>
              ) : (
                <div className="space-y-4">
                  {deal.activity.map((a, i) => (
                    <div key={a.id} className="flex items-start gap-3 relative">
                      {i < deal.activity.length - 1 && (
                        <div className="absolute left-3.5 top-8 bottom-0 w-px bg-surface-200" />
                      )}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 z-10 ${
                        a.type === 'upload' ? 'bg-blue-50 text-blue-500' :
                        a.type === 'reminder' ? 'bg-amber-50 text-amber-500' :
                        a.type === 'ai' ? 'bg-emerald-50 text-emerald-500' :
                        a.type === 'export' ? 'bg-emerald-50 text-emerald-500' :
                        'bg-surface-100 text-surface-400'
                      }`}>
                        {a.type === 'upload' ? <Upload size={12} /> :
                         a.type === 'reminder' ? <MessageSquare size={12} /> :
                         a.type === 'ai' ? <Sparkles size={12} /> :
                         a.type === 'export' ? <Download size={12} /> :
                         a.type === 'check' ? <CheckCircle size={12} /> :
                         <Clock size={12} />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-surface-700">{a.action}</div>
                        <div className="text-xs text-surface-400">{a.detail}</div>
                        <div className="text-[10px] text-surface-300 mt-0.5">{a.timestamp} · {a.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: AI Panel + WhatsApp */}
        <div className="space-y-6">
          <AiAssistantPanel deal={deal} />
          <WhatsAppPreview deal={deal} />
          <StampDutyCalculator dealValue={deal.dealValue ? parseInt(deal.dealValue.replace(/[^0-9]/g, '')) : 5000000} />
          <AnimatedCard delay={0.2}>
            <div className="card-premium p-4">
              <h2 className="font-semibold text-surface-900 text-sm mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors">
                  <Send size={16} /> Send Document Reminder
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-50 text-surface-700 text-sm font-medium hover:bg-surface-100 transition-colors">
                  <Share2 size={16} /> Copy Upload Link
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-50 text-surface-700 text-sm font-medium hover:bg-surface-100 transition-colors">
                  <Smartphone size={16} /> Send WhatsApp Link
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-50 text-surface-700 text-sm font-medium hover:bg-surface-100 transition-colors">
                  <FileText size={16} /> View All Documents
                </button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Document Preview Modal */}
      <DocumentPreview
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc ? {
          name: selectedDoc.name,
          type: selectedDoc.name.endsWith('.pdf') ? 'PDF' : selectedDoc.name.endsWith('.jpg') || selectedDoc.name.endsWith('.png') ? 'Image' : 'Document',
          status: selectedDoc.status === 'complete' ? 'Verified' : selectedDoc.status === 'ai-detected' ? 'AI Flagged' : selectedDoc.status,
          uploadedBy: selectedDoc.uploadedBy || '—',
          uploadedAt: selectedDoc.uploadedAt || '—',
          size: '2.4 MB',
        } : null}
      />
    </div>
  );
}
