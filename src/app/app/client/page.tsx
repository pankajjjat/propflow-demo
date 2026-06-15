'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Smartphone, CheckCircle, FileText,
  ArrowLeft, Copy, ExternalLink, Send
} from 'lucide-react';
import { deals, type Deal } from '@/data/demo-data';
import { AnimatedCard, StatusBadge, PageHeader } from '@/components/ui';

function MobileUploadPreview() {
  const [showUpload, setShowUpload] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  const docs = [
    { name: 'Bank Statement (6 months)', status: uploaded.includes('bank') ? 'complete' : 'pending' as const },
    { name: 'Passport Photo', status: uploaded.includes('photo') ? 'complete' : 'pending' as const },
    { name: 'PAN Card', status: 'complete' as const },
    { name: 'Aadhaar Card', status: 'complete' as const },
  ];

  const handleUpload = (doc: string) => {
    if (!uploaded.includes(doc)) setUploaded([...uploaded, doc]);
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-[280px]">
        {/* Phone frame */}
        <div className="bg-surface-900 rounded-[2rem] p-3 shadow-2xl">
          <div className="bg-white rounded-[1.5rem] overflow-hidden">
            {/* Status bar */}
            <div className="bg-emerald-600 px-4 py-2 flex items-center justify-between text-white text-[10px]">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Smartphone size={10} />
                <span>PropFlow</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showUpload ? (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-700 text-[8px] font-bold">PF</span>
                    </div>
                    <div className="text-[10px] text-surface-400">PropFlow · Now</div>
                  </div>
                  <div className="bg-surface-50 rounded-xl p-3 mb-2">
                    <p className="text-[11px] text-surface-700 leading-relaxed">
                      Hello Rajesh ji, please upload the pending documents for your property deal.
                    </p>
                  </div>
                  <div className="bg-surface-50 rounded-xl p-3 mb-3">
                    <p className="text-[11px] text-surface-700 leading-relaxed">
                      📄 Bank Statement (6 months)<br />
                      📄 Passport Photo
                    </p>
                  </div>
                  <button onClick={() => setShowUpload(true)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Upload Documents
                  </button>
                  <p className="text-[9px] text-surface-400 text-center mt-2">Secure · End-to-end encrypted</p>
                </motion.div>
              ) : !uploaded.length ? (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <button onClick={() => setShowUpload(false)} className="text-surface-400">
                      <ArrowLeft size={14} />
                    </button>
                    <span className="text-[11px] font-medium text-surface-700">Upload Documents</span>
                  </div>

                  {/* Drop zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all mb-3 ${
                      dragging ? 'border-emerald-500 bg-emerald-50' : 'border-surface-200 bg-surface-50'
                    }`}
                  >
                    <Upload size={24} className="text-surface-300 mx-auto mb-2" />
                    <p className="text-[10px] text-surface-500">Tap to upload or drag files here</p>
                    <p className="text-[8px] text-surface-400 mt-1">PDF, JPG, PNG · Max 10MB</p>
                  </div>

                  <div className="space-y-1.5">
                    {docs.map(doc => (
                      <div key={doc.name} className="flex items-center gap-2 p-2 rounded-lg bg-surface-50">
                        <FileText size={12} className="text-surface-400" />
                        <span className="text-[10px] text-surface-600 flex-1 truncate">{doc.name}</span>
                        {doc.status === 'complete' ? (
                          <CheckCircle size={12} className="text-emerald-500" />
                        ) : (
                          <button onClick={() => handleUpload(doc.name.toLowerCase().includes('bank') ? 'bank' : 'photo')}
                            className="text-[9px] text-emerald-600 font-medium"
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={22} className="text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-surface-900 mb-1">Documents Uploaded!</h3>
                  <p className="text-[10px] text-surface-400 mb-4">Your broker will verify them shortly.</p>
                  <div className="space-y-1.5">
                    {docs.map(doc => (
                      <div key={doc.name} className="flex items-center gap-2 p-2 rounded-lg bg-surface-50">
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                        <span className="text-[10px] text-surface-600 truncate">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Home indicator */}
            <div className="h-5 flex items-center justify-center">
              <div className="w-16 h-1 rounded-full bg-surface-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalCard({ deal }: { deal: Deal }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = `https://propflow.app/upload/${deal.id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback for HTTP environments
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-premium p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <ExternalLink size={20} />
          </div>
          <div>
            <h3 className="font-medium text-surface-900 text-sm">{deal.title}</h3>
            <p className="text-xs text-surface-400">{deal.buyer.name} & {deal.seller.name}</p>
          </div>
        </div>
        <StatusBadge status={deal.status} />
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-50 border border-surface-100">
        <code className="text-xs text-surface-500 flex-1 truncate">propflow.app/upload/{deal.id}</code>
        <button onClick={handleCopy} className="btn-ghost text-xs shrink-0">
          {copied ? 'Copied!' : <Copy size={14} />}
        </button>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <button className="flex-1 btn-primary text-xs py-2"><Send size={14} /> Send via WhatsApp</button>
        <button className="btn-secondary text-xs py-2"><Copy size={14} /> Copy Link</button>
      </div>
    </div>
  );
}

export default function ClientPortalPage() {
  const activeDeals = deals.filter(d => d.status !== 'completed');

  return (
    <div>
      <PageHeader title="Client Upload Portal"
        subtitle="Share upload links with clients. They can upload documents from their phone — no app required."
      />

      {/* Mobile preview */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <AnimatedCard>
          <div className="card-premium p-5">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone size={16} className="text-emerald-600" />
              <h2 className="font-semibold text-surface-900 text-sm">Client Experience Preview</h2>
            </div>
            <p className="text-xs text-surface-400 mb-4">This is what your clients see when they open the upload link.</p>
            <MobileUploadPreview />
          </div>
        </AnimatedCard>

        <div className="space-y-4">
          <AnimatedCard delay={0.1}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 text-sm mb-3">Active Upload Links</h2>
              <div className="space-y-3">
                {activeDeals.slice(0, 4).map(deal => (
                  <PortalCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="card-premium p-5">
              <h2 className="font-semibold text-surface-900 text-sm mb-3">How It Works</h2>
              <div className="space-y-4">
                {[
                  { step: '1', icon: Send, title: 'Send Link', desc: 'Share the upload link via WhatsApp or SMS' },
                  { step: '2', icon: Upload, title: 'Client Uploads', desc: 'Clients tap, select files, and upload — takes 30 seconds' },
                  { step: '3', icon: CheckCircle, title: 'Auto-Update', desc: 'Checklist updates instantly. You get notified.' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-surface-700">{s.title}</div>
                      <div className="text-xs text-surface-400">{s.desc}</div>
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
