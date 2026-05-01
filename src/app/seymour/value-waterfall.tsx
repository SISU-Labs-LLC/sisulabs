"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CURRENT_VALUE = 970000;

interface AddOn {
  id: string;
  label: string;
  cost: number;
  minReturn: number;
  maxReturn: number;
  defaultReturn: number;
  note: string;
}

interface Improvement {
  id: string;
  label: string;
  cost: number;
  minReturn: number;
  maxReturn: number;
  defaultReturn: number;
  color: string;
  colorLight: string;
  note: string;
  addOns: AddOn[];
}

const improvements: Improvement[] = [
  {
    id: "pool",
    label: "Heated Plunge Pool",
    cost: 59350,
    minReturn: 0.5,
    maxReturn: 2.0,
    defaultReturn: 1.1,
    color: "bg-amber-500",
    colorLight: "text-amber-400",
    note: "Low = physical value only. High = with Swimply income capitalization.",
    addOns: [
      {
        id: "waterfall",
        label: "Waterfall feature",
        cost: 2800,
        minReturn: 0.3,
        maxReturn: 1.5,
        defaultReturn: 0.8,
        note: "Constant water sound, visual appeal in photos and listings. Luxury signal.",
      },
      {
        id: "pool-lighting",
        label: "LED color lighting package",
        cost: 1200,
        minReturn: 0.5,
        maxReturn: 2.0,
        defaultReturn: 1.2,
        note: "Huge for evening Swimply bookings and listing photos. Low cost, high perceived value.",
      },
      {
        id: "pool-cover",
        label: "Automatic safety cover",
        cost: 4500,
        minReturn: 0.4,
        maxReturn: 1.0,
        defaultReturn: 0.6,
        note: "Safety feature, heat retention, extends season. Required for some insurance discounts.",
      },
    ],
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
    addOns: [
      {
        id: "stain",
        label: "Concrete staining (earth tone)",
        cost: 1800,
        minReturn: 0.8,
        maxReturn: 2.0,
        defaultReturn: 1.3,
        note: "Eliminates bright white, gives a warm flagstone look. Photographs beautifully. Cheap upgrade, big visual impact.",
      },
      {
        id: "fire-pit",
        label: "Built-in fire pit",
        cost: 3500,
        minReturn: 0.5,
        maxReturn: 1.5,
        defaultReturn: 0.9,
        note: "Extends patio usage into cooler months. Great for Swimply winter bookings too.",
      },
      {
        id: "string-lights",
        label: "Permanent string light posts",
        cost: 800,
        minReturn: 1.0,
        maxReturn: 3.0,
        defaultReturn: 2.0,
        note: "Incredibly cheap, massive photo impact. Every luxury listing has them. Best ROI add-on on the list.",
      },
    ],
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
    note: "Fences return less in isolation, but this one enables Swimply income. Factor that revenue-enabling role.",
    addOns: [
      {
        id: "fence-stain",
        label: "Dark stain finish",
        cost: 1200,
        minReturn: 0.8,
        maxReturn: 2.0,
        defaultReturn: 1.4,
        note: "Raw wood looks cheap in 2 years. Dark stain = modern, hides aging, photographs as luxury.",
      },
      {
        id: "gate-auto",
        label: "Keypad gate lock",
        cost: 450,
        minReturn: 1.0,
        maxReturn: 3.0,
        defaultReturn: 2.0,
        note: "Required for self-service Swimply check-in. Pays for itself in 2 bookings.",
      },
    ],
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
    note: "Hardiboard replacing vinyl is one of the highest-return exterior upgrades. 30-year material, East Nashville buyers expect it.",
    addOns: [
      {
        id: "accent-color",
        label: "Accent trim color (two-tone)",
        cost: 1500,
        minReturn: 0.8,
        maxReturn: 2.0,
        defaultReturn: 1.5,
        note: "Two-tone exterior reads as custom/designed. Cheap add during siding install, expensive to do later.",
      },
      {
        id: "shutters",
        label: "New shutters",
        cost: 2200,
        minReturn: 0.6,
        maxReturn: 1.5,
        defaultReturn: 1.0,
        note: "Tudor style demands them. New shutters with new siding = complete transformation.",
      },
      {
        id: "exterior-lights",
        label: "Exterior lighting package",
        cost: 1800,
        minReturn: 0.8,
        maxReturn: 2.0,
        defaultReturn: 1.3,
        note: "Uplighting on the facade, path lights, security. Massive curb appeal at night.",
      },
    ],
  },
];

function formatMoney(n: number): string {
  if (n >= 1000000) {
    return `$${(n / 1000000).toFixed(2)}M`;
  }
  if (n >= 10000) {
    return `$${(n / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
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
    Object.fromEntries([
      ...improvements.map((i) => [i.id, i.defaultReturn]),
      ...improvements.flatMap((i) =>
        i.addOns.map((a) => [a.id, a.defaultReturn])
      ),
    ])
  );

  const [enabledAddOns, setEnabledAddOns] = useState<Record<string, boolean>>({});

  const toggleAddOn = (id: string) => {
    setEnabledAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate totals
  let totalCost = 0;
  let totalValueAdd = 0;
  const segments: { id: string; label: string; color: string; valueAdd: number }[] = [];

  improvements.forEach((imp) => {
    const baseValueAdd = Math.round(imp.cost * returns[imp.id]);
    totalCost += imp.cost;
    totalValueAdd += baseValueAdd;

    let impTotal = baseValueAdd;

    imp.addOns.forEach((addon) => {
      if (enabledAddOns[addon.id]) {
        const addonValue = Math.round(addon.cost * returns[addon.id]);
        totalCost += addon.cost;
        totalValueAdd += addonValue;
        impTotal += addonValue;
      }
    });

    segments.push({
      id: imp.id,
      label: imp.label,
      color: imp.color,
      valueAdd: impTotal,
    });
  });

  const targetValue = CURRENT_VALUE + totalValueAdd;
  const maxPossibleValue =
    CURRENT_VALUE +
    improvements.reduce(
      (sum, i) =>
        sum +
        i.cost * i.maxReturn +
        i.addOns.reduce((s, a) => s + a.cost * a.maxReturn, 0),
      0
    );

  return (
    <div className="space-y-10">
      {/* Dynamic Total — sticky context */}
      <motion.div
        className="sticky top-16 z-30 rounded-2xl border border-amber-500/30 bg-black/90 backdrop-blur-xl p-4 flex flex-wrap items-center justify-between gap-4"
        layout
      >
        <div className="flex items-baseline gap-4">
          <div>
            <div className="text-xs text-white/30">Total Investment</div>
            <motion.div
              className="text-2xl font-bold text-amber-400"
              key={totalCost}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {formatFull(totalCost)}
            </motion.div>
          </div>
          <div className="text-white/20">→</div>
          <div>
            <div className="text-xs text-white/30">Value Created</div>
            <div className="text-2xl font-bold text-emerald-400">
              +{formatFull(totalValueAdd)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/30">Target Home Value</div>
          <motion.div
            className="text-2xl font-bold text-white"
            key={targetValue}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
          >
            {formatFull(targetValue)}
          </motion.div>
          <div className="text-xs text-white/20">
            {((totalValueAdd / totalCost) * 100).toFixed(0)}% return on investment
          </div>
        </div>
      </motion.div>

      {/* Vertical Bar + Improvement Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-8">
        {/* Vertical Stacked Bar */}
        <div className="hidden lg:flex flex-col items-center sticky top-44 self-start">
          <div className="text-xs text-white/30 mb-2 uppercase tracking-wider text-center">
            Value Stack
          </div>
          <div
            className="relative w-20 rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]"
            style={{ height: "320px" }}
          >
            <div className="absolute inset-0 flex flex-col-reverse">
              <motion.div
                className="bg-white/10 relative flex items-center justify-center"
                animate={{
                  height: `${(CURRENT_VALUE / maxPossibleValue) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[9px] text-white/40 font-medium">
                  $970K
                </span>
              </motion.div>

              {segments.map((seg) => (
                <motion.div
                  key={seg.id}
                  className={`${seg.color} relative flex items-center justify-center opacity-70`}
                  animate={{
                    height: `${(seg.valueAdd / maxPossibleValue) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {seg.valueAdd > 20000 && (
                    <span className="text-[8px] text-white font-medium">
                      +{formatMoney(seg.valueAdd)}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-1 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-white/10" />
              <span className="text-white/30">Base</span>
            </div>
            {improvements.map((imp) => (
              <div key={imp.id} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-sm ${imp.color}`} />
                <span className="text-white/30">{imp.label.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Cards with Add-Ons */}
        <div className="space-y-6">
          {improvements.map((imp) => {
            const returnVal = returns[imp.id];
            const baseValueAdd = Math.round(imp.cost * returnVal);
            const pct =
              ((returnVal - imp.minReturn) / (imp.maxReturn - imp.minReturn)) *
              100;

            const activeAddOns = imp.addOns.filter((a) => enabledAddOns[a.id]);
            const addOnCost = activeAddOns.reduce((s, a) => s + a.cost, 0);
            const addOnValue = activeAddOns.reduce(
              (s, a) => s + Math.round(a.cost * returns[a.id]),
              0
            );

            return (
              <div
                key={imp.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                {/* Base improvement */}
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-sm ${imp.color}`} />
                        <span className="font-semibold text-white">
                          {imp.label}
                        </span>
                      </div>
                      <div className="text-xs text-white/30 mt-0.5 ml-5">
                        Base cost: {formatFull(imp.cost)}
                        {addOnCost > 0 && (
                          <span className="text-amber-400/60">
                            {" "}+ {formatFull(addOnCost)} add-ons
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${imp.colorLight}`}>
                        +{formatFull(baseValueAdd + addOnValue)}
                      </div>
                      <div className="text-xs text-white/30">value added</div>
                    </div>
                  </div>

                  {/* Base slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/20">
                        ${imp.minReturn.toFixed(2)}/$1
                      </span>
                      <span className={`font-semibold ${imp.colorLight}`}>
                        ${returnVal.toFixed(2)} per $1 spent
                      </span>
                      <span className="text-white/20">
                        ${imp.maxReturn.toFixed(2)}/$1
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

                {/* Add-ons */}
                {imp.addOns.length > 0 && (
                  <div className="border-t border-white/[0.06] bg-white/[0.01] p-4">
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-3">
                      Optional Add-Ons
                    </div>
                    <div className="space-y-3">
                      {imp.addOns.map((addon) => {
                        const enabled = enabledAddOns[addon.id] ?? false;
                        const addonReturn = returns[addon.id];
                        const addonValue = Math.round(addon.cost * addonReturn);
                        const addonPct =
                          ((addonReturn - addon.minReturn) /
                            (addon.maxReturn - addon.minReturn)) *
                          100;

                        return (
                          <div
                            key={addon.id}
                            className={`rounded-lg border p-3 transition-all ${
                              enabled
                                ? "border-white/20 bg-white/[0.03]"
                                : "border-white/[0.06] bg-transparent opacity-60"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <button
                                onClick={() => toggleAddOn(addon.id)}
                                className="flex items-center gap-2 text-left"
                              >
                                <div
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                                    enabled
                                      ? "border-amber-400 bg-amber-400"
                                      : "border-white/20"
                                  }`}
                                >
                                  {enabled && (
                                    <svg
                                      className="w-2.5 h-2.5 text-black"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={4}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <span className="text-sm text-white/80">
                                    {addon.label}
                                  </span>
                                  <span className="text-xs text-white/30 ml-2">
                                    {formatFull(addon.cost)}
                                  </span>
                                </div>
                              </button>
                              {enabled && (
                                <span className="text-sm font-semibold text-emerald-400 shrink-0">
                                  +{formatFull(addonValue)}
                                </span>
                              )}
                            </div>

                            {enabled && (
                              <div className="mt-2 ml-6 space-y-1">
                                <div className="flex justify-between text-[10px] text-white/20">
                                  <span>${addon.minReturn.toFixed(2)}/$1</span>
                                  <span className="text-white/40">
                                    ${addonReturn.toFixed(2)}/$1
                                  </span>
                                  <span>${addon.maxReturn.toFixed(2)}/$1</span>
                                </div>
                                <div className="relative">
                                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-emerald-500/50 transition-all duration-150"
                                      style={{ width: `${addonPct}%` }}
                                    />
                                  </div>
                                  <input
                                    type="range"
                                    min={addon.minReturn}
                                    max={addon.maxReturn}
                                    step={0.05}
                                    value={addonReturn}
                                    onChange={(e) =>
                                      setReturns((r) => ({
                                        ...r,
                                        [addon.id]: parseFloat(e.target.value),
                                      }))
                                    }
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                </div>
                                <div className="text-[10px] text-white/20 italic">
                                  {addon.note}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
