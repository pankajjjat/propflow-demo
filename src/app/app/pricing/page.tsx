'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 999,
    annualPrice: 833,  // 16% discount
    description: 'For independent brokers managing their own deals.',
    highlight: false,
    features: [
      { text: 'Up to 5 active deals', included: true },
      { text: 'AI document checklist', included: true },
      { text: 'WhatsApp reminders', included: true },
      { text: 'Client upload portal', included: true },
      { text: 'Registration folder export', included: true },
      { text: 'Email support', included: true },
      { text: 'Team members', included: false },
      { text: 'Custom templates', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Team',
    monthlyPrice: 2499,
    annualPrice: 2083,
    description: 'For broker teams and small agencies.',
    highlight: true,
    features: [
      { text: 'Unlimited active deals', included: true },
      { text: 'AI document checklist', included: true },
      { text: 'WhatsApp reminders', included: true },
      { text: 'Client upload portal', included: true },
      { text: 'Registration folder export', included: true },
      { text: 'Up to 5 team members', included: true },
      { text: 'Custom templates', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For large brokerages and franchises.',
    highlight: false,
    features: [
      { text: 'Everything in Team, plus:', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'White-label branding', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'On-site training', included: true },
      { text: 'Custom contract', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const revenueData = [
  { year: 1, brokers: 150, mrr: 149850, arr: 1798200 },
  { year: 2, brokers: 850, mrr: 849150, arr: 10189800 },
  { year: 3, brokers: 3200, mrr: 3196800, arr: 38361600 },
  { year: 4, brokers: 8500, mrr: 8491500, arr: 101898000 },
  { year: 5, brokers: 18000, mrr: 17982000, arr: 215784000 },
];

function formatPrice(p: number) {
  return '₹' + p.toLocaleString('en-IN');
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const maxArr = Math.max(...revenueData.map(d => d.arr));

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-3">
          Simple, Transparent Pricing
        </h1>
        <p className="text-surface-500 mb-6">
          Start free, upgrade when you grow. No hidden fees.
        </p>
        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-surface-100 rounded-xl p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !annual ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              annual ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'
            }`}
          >
            Annual <span className="text-emerald-600 text-xs ml-1">Save 16%</span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-2xl border p-6 flex flex-col ${
              plan.popular
                ? 'border-emerald-200 bg-emerald-50/50 shadow-lg shadow-emerald-500/5 relative'
                : 'border-surface-200 bg-white'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-medium shadow-lg">
                  <Sparkles size={12} /> Most Popular
                </span>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-surface-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-surface-400">{plan.description}</p>
            </div>
            <div className="mb-6">
              {plan.monthlyPrice ? (
                <div>
                  <span className="text-3xl font-bold text-surface-900">
                    {formatPrice(annual ? plan.annualPrice : plan.monthlyPrice)}
                  </span>
                  <span className="text-surface-400 text-sm ml-1">/mo</span>
                  {annual && (
                    <div className="text-xs text-emerald-600 mt-1">
                      {formatPrice(plan.monthlyPrice)}/mo billed annually
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-bold text-surface-900">Custom</span>
              )}
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f.text} className="flex items-start gap-2 text-sm">
                  {f.included ? (
                    <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <X size={16} className="text-surface-300 mt-0.5 shrink-0" />
                  )}
                  <span className={f.included ? 'text-surface-700' : 'text-surface-400'}>{f.text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/app"
              className={`w-full text-center py-3 rounded-xl font-medium text-sm transition-all ${
                plan.popular
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {plan.cta} <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Revenue Projection Chart */}
      <div className="card-premium p-6 md:p-8 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-surface-900 mb-1">Revenue Projection (5 Year)</h2>
            <p className="text-sm text-surface-400">Conservative estimate based on 0.02% market capture</p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-surface-500">ARR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-surface-300" />
              <span className="text-surface-500">Brokers</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-3 h-48">
          {revenueData.map((d, i) => (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.arr / maxArr) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[60px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                  {formatPrice(d.arr)}
                </div>
              </motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.brokers / 18000) * 60}%` }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[60px] rounded-t-lg bg-surface-200"
              />
              <span className="text-xs text-surface-400">Y{d.year}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-4 mt-6">
          {revenueData.map((d) => (
            <div key={d.year} className="text-center">
              <div className="text-xs text-surface-400 mb-1">Year {d.year}</div>
              <div className="text-sm font-semibold text-surface-900">{formatPrice(d.arr)}</div>
              <div className="text-[10px] text-surface-400">{d.brokers.toLocaleString()} brokers</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Sizing */}
      <div className="card-premium p-6 md:p-8 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium mb-4">
          <Building2 size={14} />
          Market Opportunity
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          ₹12,500 Crore/Year Total Addressable Market
        </h2>
        <p className="text-surface-500 mb-6 max-w-xl mx-auto">
          12.5M property brokers in India × ₹12,000/year average subscription
        </p>
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div>
            <div className="text-2xl font-bold text-surface-900">12.5M</div>
            <div className="text-xs text-surface-400">Property Brokers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">₹12K</div>
            <div className="text-xs text-surface-400">Avg. Revenue/Yr</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">₹12,500Cr</div>
            <div className="text-xs text-surface-400">TAM/Year</div>
          </div>
        </div>
      </div>
    </div>
  );
}
