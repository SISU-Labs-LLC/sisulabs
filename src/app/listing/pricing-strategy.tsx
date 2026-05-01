"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MORTGAGE_BALANCE = 320000;
const COMMISSION_RATE = 0.05;
const CLOSING_COSTS_PCT = 0.015;
const ESTIMATED_VALUE = 525000;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PricingStrategy() {
  const [listPrice, setListPrice] = useState(ESTIMATED_VALUE);
  const [saleOverUnder, setSaleOverUnder] = useState(2);

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
    <div className="space-y-8">
      {/* Pricing Slider */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-6">
        <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">
          List Price Strategy
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-white/50">List Price</span>
            <span className="text-2xl font-bold text-white">
              {formatMoney(listPrice)}
            </span>
          </div>
          <div className="relative">
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-200"
                style={{
                  width: `${((listPrice - 450000) / (600000 - 450000)) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={450000}
              max={600000}
              step={5000}
              value={listPrice}
              onChange={(e) => setListPrice(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-white/20">
            <span>$450K (aggressive)</span>
            <span className="text-white/40">Market: {formatMoney(ESTIMATED_VALUE)}</span>
            <span>$600K (aspirational)</span>
          </div>
        </div>

        {/* Outcome predictions */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="rounded-lg bg-white/[0.03] p-3">
            <div className="text-xs text-white/30">Expected Days on Market</div>
            <div className="text-lg font-semibold text-white mt-1">{daysOnMarket}</div>
          </div>
          <div className="rounded-lg bg-white/[0.03] p-3">
            <div className="text-xs text-white/30">Multiple Offers</div>
            <div className="text-lg font-semibold text-white mt-1">{multipleOffers}</div>
          </div>
        </div>

        {/* Sale price adjustment */}
        <div className="space-y-2 pt-2 border-t border-white/[0.06]">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-white/50">Expected sale vs. list</span>
            <span className="text-sm font-semibold text-white">
              {saleOverUnder >= 0 ? "+" : ""}
              {saleOverUnder}% ({formatMoney(salePrice)})
            </span>
          </div>
          <div className="relative">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-500/50 transition-all"
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
          <div className="flex justify-between text-xs text-white/20">
            <span>-5% (price reduction)</span>
            <span>+10% (bidding war)</span>
          </div>
        </div>
      </div>

      {/* Net Proceeds Calculator */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">
          Net Proceeds — What You Walk Away With
        </h4>

        <div className="space-y-3">
          <ProceedsLine label="Sale Price" value={salePrice} positive />
          <ProceedsLine
            label={`Commission (${(COMMISSION_RATE * 100).toFixed(0)}%)`}
            value={-commission}
          />
          <ProceedsLine
            label="Closing Costs (title, transfer, etc.)"
            value={-closingCosts}
          />
          <ProceedsLine label="Mortgage Payoff" value={-MORTGAGE_BALANCE} />

          <div className="border-t border-white/10 pt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-medium text-white">
                Your Net Proceeds
              </span>
              <motion.span
                className={`text-2xl font-bold ${
                  netProceeds >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
                key={netProceeds}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
              >
                {formatMoney(netProceeds)}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparable Sales */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
          Recent Comparable Sales (0.5mi radius)
        </h4>
        <div className="space-y-2">
          <CompRow address="412 Eastboro Dr" price={510000} sqft={1850} dom={8} date="Apr 22" />
          <CompRow address="1108 Straightway Ave" price={535000} sqft={1920} dom={12} date="Apr 18" />
          <CompRow address="907 Boscobel St" price={548000} sqft={2100} dom={6} date="Apr 15" />
          <CompRow address="1405 Holly St" price={499000} sqft={1780} dom={21} date="Apr 10" />
        </div>
      </div>
    </div>
  );
}

function ProceedsLine({
  label,
  value,
  positive,
}: {
  label: string;
  value: number;
  positive?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-sm text-white/40">{label}</span>
      <span
        className={`font-medium tabular-nums ${
          positive ? "text-white" : "text-red-400/70"
        }`}
      >
        {value >= 0 ? "" : "-"}
        {formatMoney(Math.abs(value))}
      </span>
    </div>
  );
}

function CompRow({
  address,
  price,
  sqft,
  dom,
  date,
}: {
  address: string;
  price: number;
  sqft: number;
  dom: number;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
      <div>
        <span className="text-sm text-white/70">{address}</span>
        <span className="text-xs text-white/20 ml-2">{sqft} sqft</span>
      </div>
      <div className="flex items-center gap-4 text-right">
        <span className="text-xs text-white/30">{dom}d DOM</span>
        <span className="text-sm font-medium text-white">
          {formatMoney(price)}
        </span>
        <span className="text-xs text-white/20">{date}</span>
      </div>
    </div>
  );
}
