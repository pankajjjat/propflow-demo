'use client';

import { useState, useCallback } from 'react';
import {
  X, CheckCircle2, Sparkles, Building2, Phone, BarChart3,
  ArrowRight, ArrowLeft, IndianRupee,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

interface BrokerageInfo { name: string; city: string; brokerCount: string; }

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
  'Pune', 'Jaipur', 'Lucknow', 'Surat', 'Indore', 'Bhopal', 'Nagpur', 'Vadodara',
  'Visakhapatnam', 'Thiruvananthapuram', 'Coimbatore', 'Mysuru', 'Chandigarh',
] as const;

const TOTAL_STEPS = 3;
const STEP_LABELS = ['Details', 'WhatsApp', 'Deal'] as const;

// ---------------------------------------------------------------------------
// Step Indicator
// ---------------------------------------------------------------------------

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1, active = n <= current;
        return (
          <div key={i} className="flex items-center">
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors duration-300 ${active ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-surface-100 text-surface-400'}`}>
              {active ? <CheckCircle2 className="w-4 h-4" /> : n}
            </div>
            {i < total - 1 && <div className={`w-10 sm:w-16 h-1 rounded-full mx-1.5 transition-colors duration-300 ${n < current ? 'bg-emerald-400' : 'bg-surface-200'}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 - Welcome
// ---------------------------------------------------------------------------

function StepWelcome({ info, onChange, errors }: {
  info: BrokerageInfo;
  onChange: (patch: Partial<BrokerageInfo>) => void;
  errors: Partial<Record<keyof BrokerageInfo, string>>;
}) {
  const inputClass = (field: keyof BrokerageInfo) =>
    `w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40 ${errors[field] ? 'border-rose-300 bg-rose-50/30' : 'border-surface-200'}`;

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-2"><Building2 className="w-7 h-7" /></div>
        <h2 className="text-xl sm:text-2xl font-bold text-surface-900">Welcome to PropFlow</h2>
        <p className="text-surface-500 text-sm max-w-sm mx-auto">Let&apos;s get your brokerage set up in just a few steps.</p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Brokerage Name</label>
          <input type="text" value={info.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. HomeKey Realty" className={inputClass('name')} />
          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">City</label>
          <select value={info.city} onChange={(e) => onChange({ city: e.target.value })} className={inputClass('city')}>
            <option value="" disabled>Select your city</option>
            {INDIAN_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Number of Brokers</label>
          <input type="number" min={1} value={info.brokerCount} onChange={(e) => onChange({ brokerCount: e.target.value })} placeholder="e.g. 12" className={inputClass('brokerCount')} />
          {errors.brokerCount && <p className="text-xs text-rose-500 mt-1">{errors.brokerCount}</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 - WhatsApp
// ---------------------------------------------------------------------------

function StepWhatsApp({ onConnected }: { onConnected: () => void }) {
  const [phone, setPhone] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = useCallback(() => {
    if (!phone.trim() || connected) return;
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setTimeout(() => onConnected(), 600);
    }, 800);
  }, [phone, connected, onConnected]);

  const btnClass = connected
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default'
    : phone.trim()
      ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 cursor-pointer'
      : 'bg-surface-100 text-surface-400 cursor-not-allowed';

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-2 transition-colors duration-500 ${connected ? 'bg-emerald-100 text-emerald-600' : 'bg-surface-100 text-surface-500'}`}>
          {connected ? <CheckCircle2 className="w-7 h-7" /> : <Phone className="w-7 h-7" />}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-surface-900">Connect WhatsApp</h2>
        <p className="text-surface-500 text-sm max-w-sm mx-auto">Link your WhatsApp Business number to receive deal alerts and communicate with clients.</p>
      </div>
      <div className="max-w-sm mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">WhatsApp Number</label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-surface-500 text-sm font-medium shrink-0">+91</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="9876543210" disabled={connected} maxLength={10}
              className={`flex-1 px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40 disabled:opacity-60 disabled:cursor-not-allowed ${connected ? 'border-emerald-300 bg-emerald-50/30' : 'border-surface-200'}`} />
          </div>
        </div>
        <button onClick={handleConnect} disabled={!phone.trim() || connected || connecting}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-colors ${btnClass}`}>
          {connecting ? <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Connecting&hellip;
          </> : connected ? <>
            <CheckCircle2 className="w-4 h-4" />
            Connected
          </> : <>
            <Phone className="w-4 h-4" />
            Connect WhatsApp
          </>}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 - Create Deal
// ---------------------------------------------------------------------------

function StepCreateDeal({ info, onComplete }: { info: BrokerageInfo; onComplete: () => void }) {
  const rows = [
    { label: 'Brokerage', value: info.name || '—' },
    { label: 'City', value: info.city || '—' },
    { label: 'Brokers', value: info.brokerCount || '—' },
    { label: 'WhatsApp', value: <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Connected</span> },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mb-2"><BarChart3 className="w-7 h-7" /></div>
        <h2 className="text-xl sm:text-2xl font-bold text-surface-900">Create Your First Deal</h2>
        <p className="text-surface-500 text-sm max-w-sm mx-auto">You&apos;re all set! Review your brokerage details and create your first deal to get started.</p>
      </div>
      <div className="max-w-sm mx-auto card-premium p-5 space-y-3">
        {rows.map((r, i) => (
          <div key={r.label} className={`flex items-center justify-between ${i === 0 ? 'pb-3 border-b border-surface-100' : ''}`}>
            <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">{r.label}</span>
            <span className="text-sm font-semibold text-surface-900">{r.value}</span>
          </div>
        ))}
        <div className="pt-3 border-t border-surface-100 flex items-center justify-center gap-1.5">
          <IndianRupee className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-surface-500">Ready to close deals</span>
        </div>
      </div>
      <div className="max-w-sm mx-auto">
        <button onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors">
          <Sparkles className="w-4 h-4" />
          Create Deal &amp; Finish
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success State
// ---------------------------------------------------------------------------

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-4"><CheckCircle2 className="w-10 h-10" /></div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-surface-900">Onboarding Complete!</h2>
        <p className="text-surface-500 text-sm max-w-xs mx-auto">Your brokerage is ready. Start creating deals and growing your business with PropFlow.</p>
      </div>
      <button onClick={onClose} className="mt-6 px-8 py-2.5 rounded-xl font-semibold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors">Go to Dashboard</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface OnboardingWizardProps { open: boolean; onClose: () => void; }

export default function OnboardingWizard({ open, onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<BrokerageInfo>({ name: '', city: '', brokerCount: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof BrokerageInfo, string>>>({});
  const [success, setSuccess] = useState(false);

  const validateStep1 = useCallback((): boolean => {
    const e: Partial<Record<keyof BrokerageInfo, string>> = {};
    if (!info.name.trim()) e.name = 'Brokerage name is required';
    if (!info.city) e.city = 'Please select a city';
    if (!info.brokerCount || Number(info.brokerCount) < 1) e.brokerCount = 'Enter at least 1 broker';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [info]);

  const handleNext = useCallback(() => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2) setStep(3);
  }, [step, validateStep1]);

  const handleBack = useCallback(() => { if (step > 1) setStep(step - 1); }, [step]);
  const handleCreateDeal = useCallback(() => { setSuccess(true); }, []);

  const handleClose = useCallback(() => {
    setStep(1);
    setSuccess(false);
    setErrors({});
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button onClick={handleClose}
          aria-label="Close onboarding wizard"
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-surface-100 text-surface-400 hover:bg-surface-200 hover:text-surface-600 transition-colors">
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="p-6 sm:p-8"><SuccessState onClose={handleClose} /></div>
        ) : (
          <>
            <div className="pt-8 pb-4 px-6 sm:px-8">
              <StepIndicator current={step} total={TOTAL_STEPS} />
              <div className="flex items-center justify-between mt-2 px-1">
                {STEP_LABELS.map((label, i) => (
                  <span key={label} className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${step >= i + 1 ? 'text-emerald-600' : 'text-surface-300'}`}>{label}</span>
                ))}
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 min-h-[300px] overflow-hidden">
              {step === 1 && <StepWelcome info={info} onChange={(p) => setInfo((prev) => ({ ...prev, ...p }))} errors={errors} />}
              {step === 2 && <StepWhatsApp onConnected={() => setStep(3)} />}
              {step === 3 && <StepCreateDeal info={info} onComplete={handleCreateDeal} />}
            </div>

            <div className="flex items-center justify-between px-6 sm:px-8 pb-6 pt-2 border-t border-surface-100">
              <button onClick={handleBack} disabled={step === 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${step === 1 ? 'text-surface-300 cursor-not-allowed' : 'text-surface-600 hover:bg-surface-100'}`}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              {step < TOTAL_STEPS ? (
                <button onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleCreateDeal}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Create Deal
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
