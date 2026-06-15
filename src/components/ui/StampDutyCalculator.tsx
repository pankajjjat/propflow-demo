'use client';

import { useState } from 'react';

function formatCurrency(amount: number): string {
  return '₹ ' + amount.toLocaleString('en-IN');
}

export default function StampDutyCalculator({ dealValue: initialValue = 0 }: { dealValue?: number }) {
  const [dealValue, setDealValue] = useState<number>(initialValue);

  const stampDuty = dealValue * 0.06;
  const registrationFee = dealValue * 0.01;
  const total = stampDuty + registrationFee;

  return (
    <div className="card-premium p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-surface-900">Stamp Duty & Registration</h3>
          <p className="text-xs text-surface-400 mt-0.5">Property cost calculator</p>
        </div>
      </div>

      {/* Input */}
      <div>
        <label htmlFor="deal-value" className="block text-sm font-medium text-surface-700 mb-1.5">
          Deal Value
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 font-medium text-sm">₹</span>
          <input
            id="deal-value"
            type="number"
            min={0}
            value={dealValue || ''}
            onChange={(e) => setDealValue(Math.max(0, Number(e.target.value)))}
            placeholder="Enter deal value"
            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-200/60 bg-surface-50 text-surface-900 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400
                       placeholder:text-surface-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {/* Stamp Duty */}
        <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-surface-50">
          <span className="text-sm text-surface-600">Stamp Duty (6%)</span>
          <span className="text-sm font-semibold text-surface-900">{formatCurrency(stampDuty)}</span>
        </div>

        {/* Registration Fee */}
        <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-surface-50">
          <span className="text-sm text-surface-600">Registration Fee (1%)</span>
          <span className="text-sm font-semibold text-surface-900">{formatCurrency(registrationFee)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-200/60 my-1" />

        {/* Total */}
        <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200/60">
          <span className="text-sm font-semibold text-surface-700">Total Charges</span>
          <span className="text-base font-bold text-emerald-700">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-surface-400 leading-relaxed">
        * Rates vary by state. Showing approx. Maharashtra rates.
      </p>
    </div>
  );
}
