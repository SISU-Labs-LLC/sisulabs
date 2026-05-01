"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const HELOC_BALANCE = 145000;
const HELOC_RATE = 0.09125;
const TOTAL_INVESTMENT = 132555;
const MONTHLY_HELOC_INTEREST = Math.round((HELOC_BALANCE * HELOC_RATE) / 12);
const ANNUAL_HELOC_INTEREST = MONTHLY_HELOC_INTEREST * 12;
const MONTHLY_OPS = 1075;
const RENTAL_INCREASE = 300;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function BusinessContext() {
  const [monthlySwimplyIncome, setMonthlySwimplyIncome] = useState(5500);

  const monthlyCashFlow =
    monthlySwimplyIncome + RENTAL_INCREASE - MONTHLY_OPS - MONTHLY_HELOC_INTEREST;

  const annualCashFlow = monthlyCashFlow * 12;
  const breakEvenBookings = Math.ceil(
    (MONTHLY_OPS + MONTHLY_HELOC_INTEREST - RENTAL_INCREASE) / (100 * 2.4 * 0.92)
  );

  const sp500Return5yr = Math.round(TOTAL_INVESTMENT * Math.pow(1.10, 5));
  const propertyReturn5yr = Math.round(annualCashFlow * 5 + 240000);

  return (
    <div className="space-y-8">
      {/* HELOC Reality Check */}
      <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.03] p-6">
        <h4 className="text-sm font-medium text-orange-400/80 uppercase tracking-wider mb-4">
          HELOC Carrying Cost
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-white/30">Balance</div>
            <div className="text-lg font-bold text-white">{formatMoney(HELOC_BALANCE)}</div>
          </div>
          <div>
            <div className="text-xs text-white/30">Rate</div>
            <div className="text-lg font-bold text-white">9.125%</div>
          </div>
          <div>
            <div className="text-xs text-white/30">Monthly Interest</div>
            <div className="text-lg font-bold text-orange-400">
              {formatMoney(MONTHLY_HELOC_INTEREST)}
            </div>
          </div>
          <div>
            <div className="text-xs text-white/30">Annual Cost</div>
            <div className="text-lg font-bold text-orange-400">
              {formatMoney(ANNUAL_HELOC_INTEREST)}
            </div>
          </div>
        </div>
        <p className="text-xs text-white/30 mt-4">
          This is real money leaving every month regardless of Swimply income. The investment
          must cover this carrying cost to be net positive.
        </p>
      </div>

      {/* Monthly Cash Flow */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">
          Monthly Cash Flow (All-In)
        </h4>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/40">
            <span>Avg monthly Swimply income</span>
            <span className="text-amber-400 font-medium">
              {formatMoney(monthlySwimplyIncome)}
            </span>
          </div>
          <div className="relative">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500/60 transition-all"
                style={{ width: `${((monthlySwimplyIncome - 2000) / 10000) * 100}%` }}
              />
            </div>
            <input
              type="range"
              min={2000}
              max={12000}
              step={250}
              value={monthlySwimplyIncome}
              onChange={(e) => setMonthlySwimplyIncome(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <FlowLine label="Swimply + Direct income" value={monthlySwimplyIncome} positive />
          <FlowLine label="Rental increase" value={RENTAL_INCREASE} positive />
          <FlowLine label="Operating expenses" value={-MONTHLY_OPS} />
          <FlowLine label="HELOC interest" value={-MONTHLY_HELOC_INTEREST} />
          <div className="border-t border-white/10 pt-2">
            <FlowLine
              label="Net monthly cash flow"
              value={monthlyCashFlow}
              highlight
              positive={monthlyCashFlow > 0}
            />
          </div>
        </div>

        {monthlyCashFlow > 0 ? (
          <div className="text-xs text-emerald-400/70 mt-2">
            Positive cash flow from month one at this income level.
            Annual net: {formatMoney(annualCashFlow)}
          </div>
        ) : (
          <div className="text-xs text-red-400/70 mt-2">
            Negative cash flow at this income level. Need {formatMoney(Math.abs(monthlyCashFlow))}/mo
            more to break even.
          </div>
        )}
      </div>

      {/* Break Even */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
          Break-Even Analysis
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-white/30">Bookings needed to cover ALL costs</div>
            <div className="text-xs text-white/20">(ops + HELOC interest, minus rental income)</div>
            <div className="text-3xl font-bold text-white mt-2">
              {breakEvenBookings} bookings/mo
            </div>
            <div className="text-xs text-white/30 mt-1">
              At $100/hr avg, ~2.4hr avg, 92% blended take
            </div>
          </div>
          <div>
            <div className="text-xs text-white/30">That means</div>
            <div className="text-xl font-semibold text-white mt-2">
              ~{Math.ceil(breakEvenBookings / 4)} bookings/week
            </div>
            <div className="text-xs text-white/30 mt-1">
              or roughly every other day — very achievable for East Nashville
            </div>
          </div>
        </div>
      </div>

      {/* Worst Case + Alternative Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Worst case */}
        <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.02] p-5">
          <h4 className="text-xs font-medium text-red-400/70 uppercase tracking-wider mb-3">
            Worst Case: Zero Swimply Income
          </h4>
          <p className="text-sm text-white/40 leading-relaxed">
            If Swimply income is zero, you still get: +{formatMoney(RENTAL_INCREASE)}/mo rental
            increase, and $80K to $140K in physical appreciation from the improvements alone.
          </p>
          <div className="mt-3 text-xs text-white/30">
            Monthly loss (HELOC + ops - rental): {formatMoney(-(MONTHLY_OPS + MONTHLY_HELOC_INTEREST - RENTAL_INCREASE))}/mo
          </div>
          <div className="mt-1 text-xs text-white/30">
            But home value still increases by the improvement value — you can refinance
            to eliminate the HELOC entirely.
          </div>
        </div>

        {/* S&P comparison */}
        <div className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.02] p-5">
          <h4 className="text-xs font-medium text-blue-400/70 uppercase tracking-wider mb-3">
            Alternative: $132K in S&P 500
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/40">5yr at 10% avg</span>
              <span className="text-blue-400 font-medium">{formatMoney(sp500Return5yr)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Gain</span>
              <span className="text-blue-400 font-medium">
                +{formatMoney(sp500Return5yr - TOTAL_INVESTMENT)}
              </span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="text-white/40">Seymour 5yr (cash flow + equity)</span>
              <span className="text-amber-400 font-medium">
                +{formatMoney(propertyReturn5yr)}
              </span>
            </div>
          </div>
          <div className="mt-3 text-xs text-white/30">
            Property play wins by {formatMoney(propertyReturn5yr - (sp500Return5yr - TOTAL_INVESTMENT))} —
            and you get to use the pool.
          </div>
        </div>
      </div>

      {/* Tax Benefits */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
          Tax Benefits (Consult CPA)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/40">
          <div className="flex gap-2">
            <span className="text-emerald-400/60 shrink-0">&#9656;</span>
            <span>Business-use % of improvements is depreciable (pool area, patio, fence used for Swimply)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-emerald-400/60 shrink-0">&#9656;</span>
            <span>HELOC interest may be deductible as business expense for income-producing portion</span>
          </div>
          <div className="flex gap-2">
            <span className="text-emerald-400/60 shrink-0">&#9656;</span>
            <span>Operating costs (maintenance, supplies, ads, insurance) are business write-offs</span>
          </div>
          <div className="flex gap-2">
            <span className="text-emerald-400/60 shrink-0">&#9656;</span>
            <span>Home office deduction if managing bookings from the property</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowLine({
  label,
  value,
  positive,
  highlight,
}: {
  label: string;
  value: number;
  positive?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline">
      <span className={`text-sm ${highlight ? "text-white font-medium" : "text-white/40"}`}>
        {label}
      </span>
      <motion.span
        className={`font-semibold tabular-nums ${
          highlight
            ? value >= 0
              ? "text-emerald-400 text-lg"
              : "text-red-400 text-lg"
            : positive
            ? "text-emerald-400/70"
            : "text-red-400/70"
        }`}
        key={value}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        {value >= 0 ? "+" : ""}
        {formatMoney(value)}
      </motion.span>
    </div>
  );
}
