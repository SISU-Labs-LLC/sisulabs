"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MORTGAGE_BALANCE = 980000;
const COMMISSION_RATE = 0.05;
const CLOSING_COSTS_PCT = 0.015;
const ESTIMATED_VALUE = 1599990;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PricingStrategy() {
  const [listPrice, setListPrice] = useState(ESTIMATED_VALUE);
  const [saleOverUnder, setSaleOverUnder] = useState(1);

  const salePrice = Math.round(listPrice * (1 + saleOverUnder / 100));
  const commission = Math.round(salePrice * COMMISSION_RATE);
  const closingCosts = Math.round(salePrice * CLOSING_COSTS_PCT);
  const netProceeds = salePrice - commission - closingCosts - MORTGAGE_BALANCE;

  const daysOnMarket =
    listPrice <= ESTIMATED_VALUE * 0.97
      ? "5-10 days"
      : listPrice <= ESTIMATED_VALUE
      ? "10-18 days"
      : listPrice <= ESTIMATED_VALUE * 1.03
      ? "18-30 days"
      : "30-60+ days";

  const multipleOffers =
    listPrice <= ESTIMATED_VALUE * 0.98
      ? "Very likely (3-5 offers)"
      : listPrice <= ESTIMATED_VALUE
      ? "Likely (2-3 offers)"
      : "Possible (1-2 offers)";

  return (
    <div className="space-y-6">
      {/* List Price Slider */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">List Price</span>
            <span className="text-2xl font-semibold text-gray-900">
              {formatMoney(listPrice)}
            </span>
          </div>
          <div className="relative">
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-gray-400 to-red-400 transition-all"
                style={{
                  width: `${((listPrice - 1400000) / (1800000 - 1400000)) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={1400000}
              max={1800000}
              step={10000}
              value={listPrice}
              onChange={(e) => setListPrice(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>$1.4M (aggressive)</span>
            <span>$1.8M (aspirational)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-[10px] text-gray-400 uppercase">Expected DOM</div>
            <div className="text-base font-semibold text-gray-900 mt-0.5">{daysOnMarket}</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-[10px] text-gray-400 uppercase">Multiple Offers</div>
            <div className="text-base font-semibold text-gray-900 mt-0.5">{multipleOffers}</div>
          </div>
        </div>

        {/* Sale adjustment */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">Expected sale vs. list</span>
            <span className="text-sm font-medium text-gray-700">
              {saleOverUnder >= 0 ? "+" : ""}{saleOverUnder}%
            </span>
          </div>
          <div className="relative">
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gray-700 transition-all"
                style={{ width: `${((saleOverUnder + 5) / 15) * 100}%` }}
              />
            </div>
            <input
              type="range"
              min={-5}
              max={10}
              step={0.5}
              value={saleOverUnder}
              onChange={(e) => setSaleOverUnder(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>-5% (reduction)</span>
            <span>+10% (bidding war)</span>
          </div>
        </div>
      </div>

      {/* Net Proceeds */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">
          Net Proceeds — What You Walk Away With
        </h4>

        <div className="space-y-2">
          <ProceedsLine label="Projected Sale Price" value={salePrice} positive />
          <ProceedsLine label={`Commission (${(COMMISSION_RATE * 100).toFixed(0)}%)`} value={-commission} />
          <ProceedsLine label="Closing Costs (title, transfer)" value={-closingCosts} />
          <ProceedsLine label="Mortgage Payoff" value={-MORTGAGE_BALANCE} />

          <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
            <span className="text-base font-medium text-gray-900">Your Net Proceeds</span>
            <motion.span
              className={`text-2xl font-bold ${netProceeds >= 0 ? "text-emerald-600" : "text-red-600"}`}
              key={netProceeds}
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
            >
              {formatMoney(netProceeds)}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Comparable Sales */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Comparable Sales</h4>
        <div className="space-y-0 divide-y divide-gray-100">
          <CompRow address="1508 Championship Blvd" price={1625000} sqft={4450} dom={11} date="Apr 20" />
          <CompRow address="305 Haddon Ct" price={1550000} sqft={4180} dom={14} date="Apr 15" />
          <CompRow address="1610 Riceland Dr" price={1675000} sqft={4680} dom={8} date="Apr 12" />
          <CompRow address="424 Wild Elm St" price={1510000} sqft={3920} dom={22} date="Apr 8" />
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <span>Avg $/sqft in area: $368</span>
          <span>Your $/sqft: ${(listPrice / 4305).toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}

function ProceedsLine({ label, value, positive }: { label: string; value: number; positive?: boolean }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-medium tabular-nums ${positive ? "text-gray-900" : "text-red-600/70"}`}>
        {value >= 0 ? "" : "-"}{formatMoney(Math.abs(value))}
      </span>
    </div>
  );
}

function CompRow({ address, price, sqft, dom, date }: { address: string; price: number; sqft: number; dom: number; date: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <span className="text-sm text-gray-700">{address}</span>
        <span className="text-xs text-gray-400 ml-2">{sqft.toLocaleString()} sqft</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-400">{dom}d</span>
        <span className="text-sm font-medium text-gray-900">{formatMoney(price)}</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </div>
  );
}
