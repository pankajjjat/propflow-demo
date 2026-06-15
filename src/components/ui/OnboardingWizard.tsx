'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Sparkles,
  Building2,
  Phone,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  IndianRupee,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StepIndicatorProps {
  current: number;
  total: number;
}

interface BrokerageInfo {
  name: string;
  city: string;
  brokerCount: string;
}

interface ConfettiParticle {
  id: number;
  x: number;
  delay: number;
  size: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INDIAN_CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Surat',
  'Indore',
  'Bhopal',
  'Nagpur',
  'Vadodara',
  'Visakhapatnam',
  'Thiruvananthapuram',
  'Coimbatore',
  'Mysuru',
  'Chandigarh',
] as const;

const TOTAL_STEPS = 3;

// ---------------------------------------------------------------------------
// Child Components
// ---------------------------------------------------------------------------

/** Top step-indicator row: circles + connecting bars */
function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= current;
        const isLast = i === total - 1;
        return (
          <div key={i} className="flex items-center">
            {/* Circle */}
            <div
              className={`relative flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors duration-300 ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                  : 'bg-surface-100 text-surface-400'
              }`}
            >
              {isActive ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
            </div>
            {/* Connecting bar */}
            {!isLast && (
              <div
                className={`w-10 sm:w-16 h-1 rounded-full mx-1.5 transition-colors duration-300 ${
                  stepNum < current ? 'bg-emerald-400' : 'bg-surface-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** A single confetti particle */
function Particle({ p }: { p: ConfettiParticle }) {
  return (
    <motion.div
      key={p.id}
      className="absolute top-1/2 left-1/2 pointer-events-none"
      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
      animate={{
        x: p.x,
        y: -Math.abs(p.x) * 0.6 - 80,
        scale: [0, 1.2, 0.8],
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
    >
      <div
        className="rounded-full"
        style={{
          width: p.size,
          height: p.size,
          background: p.x > 0 ? '#10b981' : '#34d399',
        }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Step Components
// ---------------------------------------------------------------------------

function StepWelcome({
  info,
  onChange,
  errors,
}: {
  info: BrokerageInfo;
  onChange: (patch: Partial<BrokerageInfo>) => void;
  errors: Partial<Record<keyof BrokerageInfo, string>>;
}) {
  return (
    <div className="space-y-5">
      {/* Heading */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-2">
          <Building2 className="w-7 h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-surface-900">
          Welcome to PropFlow
        </h2>
        <p className="text-surface-500 text-sm max-w-sm mx-auto">
          Let&apos;s get your brokerage set up in just a few steps.
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Brokerage Name */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Brokerage Name
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. HomeKey Realty"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40 ${
              errors.name ? 'border-rose-300 bg-rose-50/30' : 'border-surface-200'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            City
          </label>
          <select
            value={info.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40 ${
              errors.city ? 'border-rose-300 bg-rose-50/30' : 'border-surface-200'
            }`}
          >
            <option value="" disabled>
              Select your city
            </option>
            {INDIAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-xs text-rose-500 mt-1">{errors.city}</p>
          )}
        </div>

        {/* Number of Brokers */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Number of Brokers
          </label>
          <input
            type="number"
            min={1}
            value={info.brokerCount}
            onChange={(e) => onChange({ brokerCount: e.target.value })}
            placeholder="e.g. 12"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40 ${
              errors.brokerCount
                ? 'border-rose-300 bg-rose-50/30'
                : 'border-surface-200'
            }`}
          />
          {errors.brokerCount && (
            <p className="text-xs text-rose-500 mt-1">{errors.brokerCount}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StepWhatsApp({
  onConnected,
}: {
  onConnected: () => void;
}) {
  const [phone, setPhone] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = useCallback(() => {
    if (!phone.trim() || connected) return;
    setConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      // Let parent advance AFTER a brief moment so user sees the tick
      setTimeout(() => onConnected(), 600);
    }, 800);
  }, [phone, connected, onConnected]);

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-2 transition-colors duration-500 ${
            connected
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-surface-100 text-surface-500'
          }`}
        >
          {connected ? (
            <CheckCircle2 className="w-7 h-7" />
          ) : (
            <Phone className="w-7 h-7" />
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-surface-900">
          Connect WhatsApp
        </h2>
        <p className="text-surface-500 text-sm max-w-sm mx-auto">
          Link your WhatsApp Business number to receive deal alerts and
          communicate with clients.
        </p>
      </div>

      <div className="max-w-sm mx-auto space-y-4">
        {/* Phone input */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            WhatsApp Number
          </label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-2.5 rounded-xl border border-surface-200 bg-surface-50 text-surface-500 text-sm font-medium shrink-0">
              +91
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                setPhone(digits);
              }}
              placeholder="9876543210"
              disabled={connected}
              maxLength={10}
              className={`flex-1 px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40 disabled:opacity-60 disabled:cursor-not-allowed ${
                connected ? 'border-emerald-300 bg-emerald-50/30' : 'border-surface-200'
              }`}
            />
          </div>
        </div>

        {/* Connect button */}
        <motion.button
          onClick={handleConnect}
          disabled={!phone.trim() || connected || connecting}
          whileTap={!connected && phone.trim() ? { scale: 0.97 } : {}}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
            connected
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default'
              : phone.trim()
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 cursor-pointer'
              : 'bg-surface-100 text-surface-400 cursor-not-allowed'
          }`}
        >
          {connecting ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              />
              Connecting…
            </>
          ) : connected ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Connected
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" />
              Connect WhatsApp
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

function StepCreateDeal({
  info,
  onComplete,
}: {
  info: BrokerageInfo;
  onComplete: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mb-2">
          <BarChart3 className="w-7 h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-surface-900">
          Create Your First Deal
        </h2>
        <p className="text-surface-500 text-sm max-w-sm mx-auto">
          You&apos;re all set! Review your brokerage details and create your
          first deal to get started.
        </p>
      </div>

      {/* Summary card */}
      <div className="max-w-sm mx-auto card-premium p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-surface-100">
          <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
            Brokerage
          </span>
          <span className="text-sm font-semibold text-surface-900">
            {info.name || '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
            City
          </span>
          <span className="text-sm font-semibold text-surface-900">
            {info.city || '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
            Brokers
          </span>
          <span className="text-sm font-semibold text-surface-900">
            {info.brokerCount || '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
            WhatsApp
          </span>
          <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected
          </span>
        </div>

        <div className="pt-3 border-t border-surface-100 flex items-center justify-center gap-1.5">
          <IndianRupee className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-surface-500">
            Ready to close deals
          </span>
        </div>
      </div>

      {/* Create Deal button */}
      <div className="max-w-sm mx-auto">
        <motion.button
          onClick={onComplete}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Create Deal &amp; Finish
        </motion.button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success State
// ---------------------------------------------------------------------------

function SuccessState({
  onClose,
}: {
  onClose: () => void;
}) {
  // Generate confetti particles once
  const [particles] = useState<ConfettiParticle[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 260,
      delay: i * 0.04,
      size: 6 + Math.random() * 8,
    }))
  );

  return (
    <div className="relative flex flex-col items-center justify-center py-10 px-6 overflow-hidden">
      {/* Confetti layer */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} p={p} />
        ))}
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-4"
      >
        <CheckCircle2 className="w-10 h-10" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-surface-900">
          Onboarding Complete!
        </h2>
        <p className="text-surface-500 text-sm max-w-xs mx-auto">
          Your brokerage is ready. Start creating deals and growing your
          business with PropFlow.
        </p>
      </motion.div>

      {/* Done button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={onClose}
        whileTap={{ scale: 0.97 }}
        className="relative z-10 mt-6 px-8 py-2.5 rounded-xl font-semibold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors"
      >
        Go to Dashboard
      </motion.button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slide animation variants
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface OnboardingWizardProps {
  open: boolean;
  onClose: () => void;
}

export default function OnboardingWizard({
  open,
  onClose,
}: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [info, setInfo] = useState<BrokerageInfo>({
    name: '',
    city: '',
    brokerCount: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BrokerageInfo, string>>>({});
  const [success, setSuccess] = useState(false);

  /** Navigate to a step, tracking slide direction */
  const goToStep = useCallback((next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }, [step]);

  /** Validate Step 1 fields */
  const validateStep1 = useCallback((): boolean => {
    const e: Partial<Record<keyof BrokerageInfo, string>> = {};
    if (!info.name.trim()) e.name = 'Brokerage name is required';
    if (!info.city) e.city = 'Please select a city';
    if (!info.brokerCount || Number(info.brokerCount) < 1)
      e.brokerCount = 'Enter at least 1 broker';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [info]);

  const handleNext = useCallback(() => {
    if (step === 1 && validateStep1()) goToStep(2);
    else if (step === 2) {
      // Step 2 advances via WhatsApp connect callback, but Next can skip
      goToStep(3);
    }
  }, [step, validateStep1, goToStep]);

  const handleBack = useCallback(() => {
    if (step > 1) goToStep(step - 1);
  }, [step, goToStep]);

  const handleCreateDeal = useCallback(() => {
    setSuccess(true);
  }, []);

  const handleClose = useCallback(() => {
    // Reset everything
    setStep(1);
    setDirection(1);
    setSuccess(false);
    setErrors({});
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          {/* Modal panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-surface-100 text-surface-400 hover:bg-surface-200 hover:text-surface-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success state */}
            {success ? (
              <div className="p-6 sm:p-8">
                <SuccessState onClose={handleClose} />
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div className="pt-8 pb-4 px-6 sm:px-8">
                  <StepIndicator current={step} total={TOTAL_STEPS} />
                  {/* Step labels */}
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${
                        step >= 1 ? 'text-emerald-600' : 'text-surface-300'
                      }`}
                    >
                      Details
                    </span>
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${
                        step >= 2 ? 'text-emerald-600' : 'text-surface-300'
                      }`}
                    >
                      WhatsApp
                    </span>
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${
                        step >= 3 ? 'text-emerald-600' : 'text-surface-300'
                      }`}
                    >
                      Deal
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="px-6 sm:px-8 pb-6 min-h-[300px] overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`step-${step}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step === 1 && (
                        <StepWelcome
                          info={info}
                          onChange={(patch) =>
                            setInfo((prev) => ({ ...prev, ...patch }))
                          }
                          errors={errors}
                        />
                      )}
                      {step === 2 && (
                        <StepWhatsApp
                          onConnected={() => goToStep(3)}
                        />
                      )}
                      {step === 3 && (
                        <StepCreateDeal
                          info={info}
                          onComplete={handleCreateDeal}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom navigation */}
                <div className="flex items-center justify-between px-6 sm:px-8 pb-6 pt-2 border-t border-surface-100">
                  {/* Back */}
                  <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      step === 1
                        ? 'text-surface-300 cursor-not-allowed'
                        : 'text-surface-600 hover:bg-surface-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  {/* Next / Create */}
                  {step < TOTAL_STEPS && (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {step === TOTAL_STEPS && (
                    <button
                      onClick={handleCreateDeal}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Create Deal
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
