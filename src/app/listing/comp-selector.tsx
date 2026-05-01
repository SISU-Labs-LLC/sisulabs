"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Comp {
  id: string;
  address: string;
  city: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  dom: number;
  closedDate: string;
  distance: string;
  selected: boolean;
  photo?: string;
}

const availableComps: Comp[] = [
  {
    id: "1",
    address: "1508 Championship Blvd",
    city: "Franklin, TN",
    price: 1625000,
    sqft: 4450,
    beds: 5,
    baths: 5,
    dom: 11,
    closedDate: "Apr 20, 2026",
    distance: "0.4 mi",
    selected: true,
  },
  {
    id: "2",
    address: "305 Haddon Ct",
    city: "Franklin, TN",
    price: 1550000,
    sqft: 4180,
    beds: 5,
    baths: 4,
    dom: 14,
    closedDate: "Apr 15, 2026",
    distance: "0.6 mi",
    selected: true,
  },
  {
    id: "3",
    address: "1610 Riceland Dr",
    city: "Franklin, TN",
    price: 1675000,
    sqft: 4680,
    beds: 6,
    baths: 5,
    dom: 8,
    closedDate: "Apr 12, 2026",
    distance: "0.8 mi",
    selected: true,
  },
  {
    id: "4",
    address: "424 Wild Elm St",
    city: "Franklin, TN",
    price: 1510000,
    sqft: 3920,
    beds: 5,
    baths: 4,
    dom: 22,
    closedDate: "Apr 8, 2026",
    distance: "1.1 mi",
    selected: false,
  },
  {
    id: "5",
    address: "2201 Brienz Valley Dr",
    city: "Franklin, TN",
    price: 1720000,
    sqft: 4890,
    beds: 6,
    baths: 6,
    dom: 6,
    closedDate: "Apr 5, 2026",
    distance: "1.3 mi",
    selected: false,
  },
  {
    id: "6",
    address: "119 Fountain Brooke Dr",
    city: "Franklin, TN",
    price: 1485000,
    sqft: 3750,
    beds: 4,
    baths: 4,
    dom: 28,
    closedDate: "Mar 30, 2026",
    distance: "1.5 mi",
    selected: false,
  },
];

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CompSelector() {
  const [comps, setComps] = useState(availableComps);
  const [showAll, setShowAll] = useState(false);

  const toggleComp = (id: string) =>
    setComps((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );

  const selectedComps = comps.filter((c) => c.selected);
  const displayComps = showAll ? comps : selectedComps;

  const avgPrice = selectedComps.length
    ? Math.round(selectedComps.reduce((s, c) => s + c.price, 0) / selectedComps.length)
    : 0;
  const avgPsf = selectedComps.length
    ? Math.round(selectedComps.reduce((s, c) => s + c.price / c.sqft, 0) / selectedComps.length)
    : 0;
  const avgDom = selectedComps.length
    ? Math.round(selectedComps.reduce((s, c) => s + c.dom, 0) / selectedComps.length)
    : 0;

  return (
    <div className="space-y-5">
      {/* Summary stats from selected comps */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Sale Price</div>
          <div className="text-lg font-semibold text-gray-900 mt-0.5">{formatMoney(avgPrice)}</div>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Avg $/sqft</div>
          <div className="text-lg font-semibold text-gray-900 mt-0.5">${avgPsf}</div>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Days on Market</div>
          <div className="text-lg font-semibold text-gray-900 mt-0.5">{avgDom} days</div>
        </div>
      </div>

      {/* Your property comparison */}
      <div className="rounded-lg border-2 border-gray-900 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Your Property</div>
            <div className="text-sm font-medium text-gray-900 mt-0.5">1422 Primrose Ln</div>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-gray-500">4,305 sqft</span>
            <span className="text-xs text-gray-500">${Math.round(1599990 / 4305)}/sqft</span>
            <span className="text-base font-semibold text-gray-900">{formatMoney(1599990)}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gray-900"
              style={{
                width: `${((1599990 - 1400000) / (1800000 - 1400000)) * 100}%`,
              }}
            />
          </div>
          <span className="text-[10px] text-gray-400 shrink-0">
            {avgPrice > 0 && (
              1599990 > avgPrice
                ? `${((1599990 / avgPrice - 1) * 100).toFixed(1)}% above avg`
                : `${((1 - 1599990 / avgPrice) * 100).toFixed(1)}% below avg`
            )}
          </span>
        </div>
      </div>

      {/* Toggle view */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {selectedComps.length} comp{selectedComps.length !== 1 ? "s" : ""} selected
        </span>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-2"
        >
          {showAll ? "Show selected only" : "Show all available"}
        </button>
      </div>

      {/* Comp cards */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {displayComps.map((comp) => (
            <motion.div
              key={comp.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`rounded-lg border transition-all cursor-pointer ${
                comp.selected
                  ? "border-gray-200 bg-white shadow-sm"
                  : "border-gray-100 bg-gray-50/50 opacity-60"
              }`}
              onClick={() => toggleComp(comp.id)}
            >
              <div className="px-4 py-3 flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                    comp.selected
                      ? "border-gray-900 bg-gray-900"
                      : "border-gray-300"
                  }`}
                >
                  {comp.selected && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{comp.address}</span>
                      <span className="text-xs text-gray-400 ml-2">{comp.city}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatMoney(comp.price)}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>{comp.beds}bd / {comp.baths}ba</span>
                    <span>{comp.sqft.toLocaleString()} sqft</span>
                    <span>${Math.round(comp.price / comp.sqft)}/sqft</span>
                    <span>{comp.dom} days on market</span>
                    <span>Closed {comp.closedDate}</span>
                    <span>{comp.distance} away</span>
                  </div>
                </div>
              </div>

              {/* Price position bar */}
              {comp.selected && (
                <div className="px-4 pb-3">
                  <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        comp.price >= 1599990 ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                      style={{
                        width: `${((comp.price - 1400000) / (1800000 - 1400000)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Data source note */}
      <div className="text-center text-[10px] text-gray-400 pt-2">
        Comparable data sourced from MLS. Last updated Apr 28, 2026.
      </div>
    </div>
  );
}
