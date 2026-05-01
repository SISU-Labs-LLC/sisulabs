"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Improvement {
  id: string;
  category: string;
  label: string;
  cost: number;
  lowReturn: number;
  highReturn: number;
  defaultReturn: number;
  description: string;
  timeframe: string;
}

const improvements: Improvement[] = [
  {
    id: "paint-interior",
    category: "Paint",
    label: "Interior paint (neutral tones)",
    cost: 3500,
    lowReturn: 1.5,
    highReturn: 4.0,
    defaultReturn: 2.5,
    description: "Fresh neutral paint is the single highest-ROI pre-listing investment. Removes personalization, makes rooms feel larger and brighter.",
    timeframe: "3-5 days",
  },
  {
    id: "paint-exterior",
    category: "Paint",
    label: "Exterior touch-up + front door",
    cost: 1800,
    lowReturn: 1.0,
    highReturn: 3.0,
    defaultReturn: 2.0,
    description: "First impression is everything. Fresh exterior paint on trim + a bold front door color photographs beautifully.",
    timeframe: "1-2 days",
  },
  {
    id: "carpet",
    category: "Flooring",
    label: "Replace worn carpet (bedrooms)",
    cost: 4200,
    lowReturn: 1.0,
    highReturn: 2.5,
    defaultReturn: 1.8,
    description: "Dirty or worn carpet is the #1 reason buyers mentally discount a home. New carpet smells clean and removes the 'ick factor.'",
    timeframe: "1-2 days",
  },
  {
    id: "hardwood",
    category: "Flooring",
    label: "Refinish hardwood floors",
    cost: 3200,
    lowReturn: 1.5,
    highReturn: 3.5,
    defaultReturn: 2.2,
    description: "If you have hardwood under carpet, revealing and refinishing it is a massive upgrade. Buyers pay a premium for original hardwood.",
    timeframe: "3-4 days",
  },
  {
    id: "fixtures",
    category: "Fixtures",
    label: "Update light fixtures + hardware",
    cost: 1200,
    lowReturn: 2.0,
    highReturn: 5.0,
    defaultReturn: 3.0,
    description: "Swap brass/dated fixtures for matte black or brushed gold. Cabinet pulls, faucets, light fixtures. Cheapest way to modernize every room.",
    timeframe: "1 day",
  },
  {
    id: "landscaping",
    category: "Curb Appeal",
    label: "Front landscaping refresh",
    cost: 2000,
    lowReturn: 1.5,
    highReturn: 4.0,
    defaultReturn: 2.5,
    description: "Mulch, trim, seasonal flowers, clean edges. The first photo in every listing is the front. Make it pop.",
    timeframe: "1 day",
  },
  {
    id: "staging",
    category: "Staging",
    label: "Professional staging",
    cost: 3500,
    lowReturn: 1.5,
    highReturn: 5.0,
    defaultReturn: 3.0,
    description: "Staged homes sell 73% faster and for 5-10% more on average. The cost pays for itself multiple times over.",
    timeframe: "1 day setup",
  },
  {
    id: "deep-clean",
    category: "Prep",
    label: "Professional deep clean + declutter",
    cost: 800,
    lowReturn: 3.0,
    highReturn: 8.0,
    defaultReturn: 5.0,
    description: "Non-negotiable. Sparkling clean is the baseline. Grout, windows, baseboards, oven. Remove 50% of personal items.",
    timeframe: "1-2 days",
  },
];

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ImprovementAdvisor() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(improvements.map((i) => [i.id, true]))
  );
  const [returns, setReturns] = useState<Record<string, number>>(
    Object.fromEntries(improvements.map((i) => [i.id, i.defaultReturn]))
  );

  const toggle = (id: string) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeItems = improvements.filter((i) => enabled[i.id]);
  const totalCost = activeItems.reduce((s, i) => s + i.cost, 0);
  const totalValueAdd = activeItems.reduce(
    (s, i) => s + Math.round(i.cost * returns[i.id]),
    0
  );
  const netGain = totalValueAdd - totalCost;

  return (
    <div className="space-y-6">
      {/* Summary — sticky */}
      <motion.div
        className="sticky top-0 z-30 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm p-4 flex flex-wrap items-center justify-between gap-4"
        layout
      >
        <div className="flex items-baseline gap-6">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">You Invest</div>
            <div className="text-xl font-semibold text-gray-900">{formatMoney(totalCost)}</div>
          </div>
          <div className="text-gray-300">→</div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Sale Price Lift</div>
            <div className="text-xl font-semibold text-emerald-600">+{formatMoney(totalValueAdd)}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Net Gain</div>
          <motion.div
            className="text-xl font-semibold text-gray-900"
            key={netGain}
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
          >
            +{formatMoney(netGain)}
          </motion.div>
          <div className="text-[10px] text-gray-400">
            {((totalValueAdd / totalCost) * 100).toFixed(0)}% ROI
          </div>
        </div>
      </motion.div>

      {/* Items */}
      <div className="space-y-2">
        {improvements.map((item) => {
          const isEnabled = enabled[item.id];
          const returnVal = returns[item.id];
          const valueAdd = Math.round(item.cost * returnVal);
          const pct =
            ((returnVal - item.lowReturn) / (item.highReturn - item.lowReturn)) * 100;

          return (
            <div
              key={item.id}
              className={`rounded-lg border overflow-hidden transition-all ${
                isEnabled
                  ? "border-gray-200 bg-white"
                  : "border-gray-100 bg-gray-50/50 opacity-60"
              }`}
            >
              <div className="px-4 py-3 flex items-start gap-3">
                <button
                  onClick={() => toggle(item.id)}
                  className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                    isEnabled
                      ? "border-gray-900 bg-gray-900"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {isEnabled && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                    </div>
                    <div className="flex items-baseline gap-2 shrink-0">
                      <span className="text-xs text-gray-400">{formatMoney(item.cost)}</span>
                      <span className="text-gray-300">→</span>
                      <span className="text-sm font-semibold text-emerald-600">
                        +{formatMoney(valueAdd)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>

                  {isEnabled && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>{item.lowReturn}x</span>
                        <span className="font-medium text-gray-600">
                          {returnVal.toFixed(1)}x return per $1
                        </span>
                        <span>{item.highReturn}x</span>
                      </div>
                      <div className="relative">
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gray-900 transition-all duration-150"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min={item.lowReturn}
                          max={item.highReturn}
                          step={0.1}
                          value={returnVal}
                          onChange={(e) =>
                            setReturns((r) => ({
                              ...r,
                              [item.id]: parseFloat(e.target.value),
                            }))
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 hidden sm:block">
                  {item.timeframe}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
