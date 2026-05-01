"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CURRENT_VALUE = 970000;

const improvements = [
  {
    id: "pool",
    label: "Pool + Hot Tub",
    cost: 59350,
    minReturn: 0.5,
    maxReturn: 2.0,
    defaultReturn: 1.1,
    color: "bg-amber-500",
    colorLight: "text-amber-400",
    note: "Low = physical value only. High = with income capitalization (Swimply revenue makes the pool an asset, not just an amenity).",
  },
  {
    id: "patio",
    label: "Patio + Driveway",
    cost: 22900,
    minReturn: 0.5,
    maxReturn: 1.5,
    defaultReturn: 0.9,
    color: "bg-cyan-500",
    colorLight: "text-cyan-400",
    note: "Concrete work in East Nashville returns well. Driveway upgrade from gravel is a major comp differentiator.",
  },
  {
    id: "fence",
    label: "8ft Privacy Fence",
    cost: 7510,
    minReturn: 0.4,
    maxReturn: 1.2,
    defaultReturn: 0.7,
    color: "bg-purple-500",
    colorLight: "text-purple-400",
    note: "Fences typically return less, but 8ft privacy is required for Swimply income. Factor that revenue-enabling role into the return.",
  },
  {
    id: "siding",
    label: "Hardiboard Siding",
    cost: 42795,
    minReturn: 0.6,
    maxReturn: 1.5,
    defaultReturn: 1.0,
    color: "bg-emerald-500",
    colorLight: "text-emerald-400",
    note: "Hardiboard replacing vinyl is one of the highest-return exterior upgrades. 30-year material, insurance discount, East Nashville buyers expect it.",
  },
];

function formatMoney(n: number): string {
  if (n >= 1000000) {
    return `$${(n / 1000000).toFixed(n % 100000 === 0 ? 1 : 2)}M`;
  }
  return `$${(n / 1000).toFixed(0)}K`;
}

function formatFull(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ValueWaterfall() {
  const [returns, setReturns] = useState<Record<string, number>>(
    Object.fromEntries(improvements.map((i) => [i.id, i.defaultReturn]))
  );

  const valueAdds = improvements.map((imp) => ({
    ...imp,
    valueAdd: Math.round(imp.cost * returns[imp.id]),
  }));

  const totalValueAdd = valueAdds.reduce((sum, v) => sum + v.valueAdd, 0);
  const targetValue = CURRENT_VALUE + totalValueAdd;
  const totalCost = improvements.reduce((sum, i) => sum + i.cost, 0);

  const maxPossibleValue =
    CURRENT_VALUE +
    improvements.reduce((sum, i) => sum + i.cost * i.maxReturn, 0);

  return (
    <div className="space-y-10">
      {/* Vertical Waterfall Chart + Sliders side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        {/* Vertical Bar */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-white/30 mb-2 uppercase tracking-wider">
            Value Stack
          </div>
          <div className="relative w-24 sm:w-28 rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]"
            style={{ height: "360px" }}
          >
            {/* Target value label */}
            <div className="absolute -top-0 left-0 right-0 text-center z-10 p-2">
              <div className="text-xs text-white/40">Target</div>
              <div className="text-sm font-bold text-amber-400">
                {formatMoney(targetValue)}
              </div>
            </div>

            {/* Stacked segments — rendered bottom to top */}
            <div className="absolute inset-0 flex flex-col-reverse">
              {/* Base */}
              <motion.div
                className="bg-white/10 relative flex items-center justify-center"
                animate={{
                  height: `${(CURRENT_VALUE / maxPossibleValue) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[10px] text-white/50 font-medium">
                  $970K
                </span>
              </motion.div>

              {/* Improvement layers */}
              {valueAdds.map((imp) => (
                <motion.div
                  key={imp.id}
                  className={`${imp.color} relative flex items-center justify-center opacity-80`}
                  animate={{
                    height: `${(imp.valueAdd / maxPossibleValue) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {imp.valueAdd > 15000 && (
                    <span className="text-[9px] text-white font-medium">
                      +{formatMoney(imp.valueAdd)}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/10" />
              <span className="text-white/40">Current ($970K)</span>
            </div>
            {improvements.map((imp) => (
              <div key={imp.id} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${imp.color}`} />
                <span className="text-white/40">{imp.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          {improvements.map((imp) => {
            const returnVal = returns[imp.id];
            const valueAdd = Math.round(imp.cost * returnVal);
            const pct =
              ((returnVal - imp.minReturn) / (imp.maxReturn - imp.minReturn)) *
              100;

            return (
              <div
                key={imp.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-sm ${imp.color}`} />
                      <span className="text-sm font-medium text-white">
                        {imp.label}
                      </span>
                    </div>
                    <div className="text-xs text-white/30 mt-0.5 ml-5">
                      Cost: {formatFull(imp.cost)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${imp.colorLight}`}>
                      +{formatFull(valueAdd)}
                    </div>
                    <div className="text-xs text-white/30">
                      value added
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">
                      ${imp.minReturn.toFixed(2)} per $1
                    </span>
                    <span className={`font-semibold ${imp.colorLight}`}>
                      ${returnVal.toFixed(2)} per $1 spent
                    </span>
                    <span className="text-white/30">
                      ${imp.maxReturn.toFixed(2)} per $1
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${imp.color} transition-all duration-150 opacity-60`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={imp.minReturn}
                      max={imp.maxReturn}
                      step={0.05}
                      value={returnVal}
                      onChange={(e) =>
                        setReturns((r) => ({
                          ...r,
                          [imp.id]: parseFloat(e.target.value),
                        }))
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="text-xs text-white/20 italic">
                    {imp.note}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
          <div className="text-xs text-white/40">Total Invested</div>
          <div className="text-xl font-bold text-white mt-1">
            {formatFull(totalCost)}
          </div>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-4 text-center">
          <div className="text-xs text-white/40">Value Created</div>
          <div className="text-xl font-bold text-amber-400 mt-1">
            +{formatFull(totalValueAdd)}
          </div>
          <div className="text-xs text-white/30 mt-0.5">
            {((totalValueAdd / totalCost) * 100).toFixed(0)}% return on improvements
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-center">
          <div className="text-xs text-white/40">Target Home Value</div>
          <motion.div
            className="text-xl font-bold text-emerald-400 mt-1"
            key={targetValue}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatFull(targetValue)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
