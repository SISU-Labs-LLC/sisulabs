"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Improvement {
  id: string;
  category: string;
  label: string;
  cost: number;
  valueLift: [number, number];
  description: string;
  timeframe: string;
  priority: "essential" | "recommended" | "optional";
}

const BASE_VALUE = 1599990;

const improvements: Improvement[] = [
  {
    id: "deep-clean",
    category: "Prep",
    label: "Professional deep clean + declutter",
    cost: 800,
    valueLift: [5000, 12000],
    description: "Non-negotiable. Sparkling clean is the baseline. Grout, windows, baseboards, oven. Remove 50% of personal items.",
    timeframe: "1-2 days",
    priority: "essential",
  },
  {
    id: "paint-interior",
    category: "Paint",
    label: "Interior paint (neutral tones)",
    cost: 3500,
    valueLift: [8000, 15000],
    description: "Fresh neutral paint removes personalization, makes rooms feel larger and brighter. Highest-ROI pre-listing investment.",
    timeframe: "3-5 days",
    priority: "essential",
  },
  {
    id: "fixtures",
    category: "Fixtures",
    label: "Update light fixtures + hardware",
    cost: 1200,
    valueLift: [4000, 8000],
    description: "Swap brass/dated fixtures for matte black or brushed gold. Cabinet pulls, faucets, light fixtures. Cheapest way to modernize.",
    timeframe: "1 day",
    priority: "essential",
  },
  {
    id: "paint-exterior",
    category: "Curb Appeal",
    label: "Exterior touch-up + front door",
    cost: 1800,
    valueLift: [3000, 7000],
    description: "First impression. Fresh exterior paint on trim + a bold front door color photographs beautifully.",
    timeframe: "1-2 days",
    priority: "recommended",
  },
  {
    id: "landscaping",
    category: "Curb Appeal",
    label: "Front landscaping refresh",
    cost: 2000,
    valueLift: [5000, 10000],
    description: "Mulch, trim, seasonal flowers, clean edges. The first photo in every listing is the front. Make it pop.",
    timeframe: "1 day",
    priority: "recommended",
  },
  {
    id: "carpet",
    category: "Flooring",
    label: "Replace worn carpet (bedrooms)",
    cost: 4200,
    valueLift: [5000, 12000],
    description: "Dirty or worn carpet is the #1 reason buyers mentally discount a home. New carpet smells clean and removes the 'ick factor.'",
    timeframe: "1-2 days",
    priority: "recommended",
  },
  {
    id: "hardwood",
    category: "Flooring",
    label: "Refinish hardwood floors",
    cost: 3200,
    valueLift: [7000, 14000],
    description: "If you have hardwood under carpet, revealing and refinishing it is a massive upgrade. Buyers pay a premium for original hardwood.",
    timeframe: "3-4 days",
    priority: "optional",
  },
  {
    id: "staging",
    category: "Staging",
    label: "Professional staging",
    cost: 3500,
    valueLift: [10000, 25000],
    description: "Staged homes sell 73% faster and for 5-10% more on average. The cost pays for itself multiple times over.",
    timeframe: "1 day setup",
    priority: "recommended",
  },
];

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

const priorityConfig = {
  essential: { label: "Do First", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  recommended: { label: "High Impact", color: "bg-blue-50 text-blue-700 border-blue-200" },
  optional: { label: "If Budget Allows", color: "bg-gray-50 text-gray-600 border-gray-200" },
};

export default function ImprovementAdvisor() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(improvements.map((i) => [i.id, true]))
  );

  const toggle = (id: string) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeItems = improvements.filter((i) => enabled[i.id]);
  const totalCost = activeItems.reduce((s, i) => s + i.cost, 0);
  const liftLow = activeItems.reduce((s, i) => s + i.valueLift[0], 0);
  const liftHigh = activeItems.reduce((s, i) => s + i.valueLift[1], 0);
  const projectedLow = BASE_VALUE + liftLow;
  const projectedHigh = BASE_VALUE + liftHigh;

  return (
    <div className="space-y-6">
      {/* Projected Sale Price */}
      <motion.div
        className="sticky top-0 z-30 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm p-5"
        layout
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
              With selected improvements, projected sale price
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span
                className="text-2xl sm:text-3xl font-semibold text-gray-900"
                key={projectedLow}
                initial={{ scale: 1.02 }}
                animate={{ scale: 1 }}
              >
                {formatMoney(projectedLow)}
              </motion.span>
              <span className="text-gray-400">to</span>
              <motion.span
                className="text-2xl sm:text-3xl font-semibold text-emerald-600"
                key={projectedHigh}
                initial={{ scale: 1.02 }}
                animate={{ scale: 1 }}
              >
                {formatMoney(projectedHigh)}
              </motion.span>
            </div>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Your Investment</div>
              <div className="text-lg font-medium text-gray-700">{formatMoney(totalCost)}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Net Lift</div>
              <div className="text-lg font-medium text-emerald-600">
                +{formatMoney(liftLow)} to +{formatMoney(liftHigh)}
              </div>
            </div>
          </div>
        </div>

        {/* Visual range bar */}
        <div className="mt-4 relative">
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500"
              animate={{
                width: `${Math.min(((liftHigh) / 100000) * 100, 100)}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>{formatMoney(BASE_VALUE)} (as-is)</span>
            <span>{formatMoney(BASE_VALUE + 100000)} (fully improved)</span>
          </div>
        </div>
      </motion.div>

      {/* Improvement Checklist */}
      <div className="space-y-4">
        {(["essential", "recommended", "optional"] as const).map((priority) => {
          const items = improvements.filter((i) => i.priority === priority);
          if (items.length === 0) return null;
          const config = priorityConfig[priority];

          return (
            <div key={priority}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.color}`}>
                  {config.label}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="space-y-1.5">
                {items.map((item) => {
                  const isEnabled = enabled[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`rounded-lg border transition-all cursor-pointer select-none ${
                        isEnabled
                          ? "border-gray-200 bg-white shadow-sm"
                          : "border-gray-100 bg-gray-50/50 opacity-50"
                      }`}
                      onClick={() => toggle(item.id)}
                    >
                      <div className="px-4 py-3 flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                            isEnabled
                              ? "border-gray-900 bg-gray-900"
                              : "border-gray-300"
                          }`}
                        >
                          <AnimatePresence>
                            {isEnabled && (
                              <motion.svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={4}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h3 className={`text-sm font-medium ${isEnabled ? "text-gray-900" : "text-gray-500 line-through"}`}>
                              {item.label}
                            </h3>
                            <div className="flex items-baseline gap-3 shrink-0">
                              <span className="text-xs text-gray-400">{formatMoney(item.cost)}</span>
                              <span className="text-xs font-medium text-emerald-600">
                                +{formatMoney(item.valueLift[0])}-{formatMoney(item.valueLift[1])}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
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
        })}
      </div>

      {/* Bottom line */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">
          {activeItems.length === improvements.length
            ? "All improvements selected. This is the full pre-listing package we recommend."
            : activeItems.length === 0
            ? "No improvements selected. Listing as-is at current market value."
            : `${activeItems.length} of ${improvements.length} improvements selected.`}
        </p>
        {activeItems.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">
            Spend {formatMoney(totalCost)} to lift sale price by {formatMoney(liftLow)} to {formatMoney(liftHigh)}
          </p>
        )}
      </div>
    </div>
  );
}
