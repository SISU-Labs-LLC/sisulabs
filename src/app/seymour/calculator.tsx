"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SWIMPLY_FEE = 0.15;
const CLUB_PRICE = 300;
const RENTAL_INCREASE = 300;
const TOTAL_INVESTMENT = 132555;

const operatingCosts = {
  poolService: { label: "Pool/hot tub weekly service", amount: 175 },
  yardCare: { label: "Yard care increase", amount: 120 },
  chemicals: { label: "Chemicals + supplies", amount: 80 },
  utilities: { label: "Utilities (heat pump, electric)", amount: 150 },
  insurance: { label: "Liability insurance rider", amount: 75 },
  marketing: { label: "Marketing + Google Ads", amount: 400 },
  supplies: { label: "Towels, cleaning, misc", amount: 75 },
};

const totalMonthlyOps = Object.values(operatingCosts).reduce(
  (s, c) => s + c.amount,
  0
);

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function AnimatedNumber({
  value,
  prefix = "$",
  duration = 1.2,
}: {
  value: number;
  prefix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
    </span>
  );
}

export default function SwimplyCalculator() {
  const [rate, setRate] = useState(100);
  const [peakBookings, setPeakBookings] = useState(2.2);
  const [directPct, setDirectPct] = useState(45);
  const [winterMembers, setWinterMembers] = useState(6);
  const [showCosts, setShowCosts] = useState(false);

  const avgHours = 2.4;
  const peakMonths = 5;
  const shoulderMonths = 2;
  const offPeakMonths = 5;

  const shoulderBookings = peakBookings * 0.65;
  const offPeakBookings = peakBookings * 0.4;

  const calcMonthlyNet = (bookingsPerDay: number, daysPerMonth: number) => {
    const totalBookings = bookingsPerDay * daysPerMonth;
    const gross = rate * avgHours;
    const swimplyNet = gross * (1 - SWIMPLY_FEE);
    const directNet = gross;
    const dp = directPct / 100;
    const blended = dp * directNet + (1 - dp) * swimplyNet;
    return totalBookings * blended;
  };

  const peakMonthly = calcMonthlyNet(peakBookings, 25);
  const shoulderMonthly = calcMonthlyNet(shoulderBookings, 21);
  const offPeakMonthly = calcMonthlyNet(offPeakBookings, 17);

  const winterClub = winterMembers * CLUB_PRICE * offPeakMonths;
  const rentalAnnual = RENTAL_INCREASE * 12;

  const swimplyAnnual =
    peakMonthly * peakMonths +
    shoulderMonthly * shoulderMonths +
    offPeakMonthly * offPeakMonths;

  const grossAnnual = swimplyAnnual + winterClub + rentalAnnual;
  const operatingAnnual = totalMonthlyOps * 12;
  const netAnnual = grossAnnual - operatingAnnual;
  const paybackYears = TOTAL_INVESTMENT / netAnnual;
  const fiveYearNet = netAnnual * 5 - TOTAL_INVESTMENT;

  return (
    <div className="space-y-8">
      {/* Sliders */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-6">
        <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">
          Adjust Assumptions
        </h4>

        <SliderControl
          label="Hourly Rate"
          value={rate}
          onChange={setRate}
          min={75}
          max={150}
          step={5}
          format={(v) => `$${v}/hr`}
        />
        <SliderControl
          label="Peak Bookings per Day"
          value={peakBookings}
          onChange={setPeakBookings}
          min={1}
          max={4}
          step={0.1}
          format={(v) => v.toFixed(1)}
        />
        <SliderControl
          label="Direct Booking %"
          value={directPct}
          onChange={setDirectPct}
          min={0}
          max={80}
          step={5}
          format={(v) => `${v}%`}
          sublabel="Direct = no Swimply 15% fee"
        />
        <SliderControl
          label="Winter Club Members"
          value={winterMembers}
          onChange={setWinterMembers}
          min={0}
          max={15}
          step={1}
          format={(v) => `${v} @ $300/mo`}
        />
      </div>

      {/* Revenue Visual */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <RevenueCard
          label="Peak"
          sublabel="May through Sep"
          value={peakMonthly}
          barPct={100}
        />
        <RevenueCard
          label="Shoulder"
          sublabel="Apr + Oct"
          value={shoulderMonthly}
          barPct={(shoulderMonthly / peakMonthly) * 100}
        />
        <RevenueCard
          label="Off-Peak"
          sublabel="Nov through Mar"
          value={offPeakMonthly}
          barPct={(offPeakMonthly / peakMonthly) * 100}
        />
      </div>

      {/* Revenue Breakdown Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Annual Revenue Breakdown</span>
          <span className="text-amber-400 font-semibold">
            {formatMoney(grossAnnual)}
          </span>
        </div>
        <div className="h-4 rounded-full overflow-hidden flex bg-white/5">
          <motion.div
            className="bg-amber-500 h-full"
            style={{
              width: `${(swimplyAnnual / grossAnnual) * 100}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(swimplyAnnual / grossAnnual) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="bg-purple-500 h-full"
            style={{
              width: `${(winterClub / grossAnnual) * 100}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(winterClub / grossAnnual) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
          <motion.div
            className="bg-cyan-500 h-full"
            style={{
              width: `${(rentalAnnual / grossAnnual) * 100}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(rentalAnnual / grossAnnual) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          />
        </div>
        <div className="flex gap-4 text-xs">
          <Legend color="bg-amber-500" label="Swimply + Direct" value={swimplyAnnual} />
          <Legend color="bg-purple-500" label="Winter Club" value={winterClub} />
          <Legend color="bg-cyan-500" label="Rental" value={rentalAnnual} />
        </div>
      </div>

      {/* Net Income + Payback */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-white/40">Net Annual Income</div>
          <div className="text-3xl font-bold text-amber-400 mt-2">
            <AnimatedNumber value={netAnnual} />
          </div>
          <div className="text-xs text-white/30 mt-1">
            After {formatMoney(operatingAnnual)}/yr operating costs
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm text-white/40">Investment Payback</div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">
            {paybackYears.toFixed(1)} years
          </div>
          <div className="text-xs text-white/30 mt-1">
            5-year net profit: {formatMoney(fiveYearNet)}
          </div>
        </motion.div>
      </div>

      {/* Payback Progress Visual */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/40">
          <span>Year 0 (invest)</span>
          <span>Payback</span>
          <span>Year 5 profit</span>
        </div>
        <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div
            className="absolute inset-y-0 w-0.5 bg-white/80"
            style={{ left: `${(paybackYears / 5) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-red-400">{formatMoney(-TOTAL_INVESTMENT)}</span>
          <span className="text-amber-400">$0</span>
          <span className="text-emerald-400">+{formatMoney(fiveYearNet)}</span>
        </div>
      </div>

      {/* Operating Costs (collapsible) */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <button
          onClick={() => setShowCosts(!showCosts)}
          className="w-full flex justify-between items-center px-5 py-4 text-sm text-white/50 hover:text-white/70 transition-colors"
        >
          <span>Monthly Operating Costs</span>
          <span className="flex items-center gap-2">
            <span className="text-white/70 font-medium">
              {formatMoney(totalMonthlyOps)}/mo
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${showCosts ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {showCosts && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="border-t border-white/10 px-5 py-4 space-y-2"
          >
            {Object.values(operatingCosts).map((cost) => (
              <div
                key={cost.label}
                className="flex justify-between text-sm"
              >
                <span className="text-white/40">{cost.label}</span>
                <span className="text-white/60">
                  {formatMoney(cost.amount)}/mo
                </span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-medium">
              <span className="text-white/60">Annual total</span>
              <span className="text-white">{formatMoney(operatingAnnual)}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  sublabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  sublabel?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-sm text-white/70">{label}</span>
          {sublabel && (
            <span className="text-xs text-white/30 ml-2">{sublabel}</span>
          )}
        </div>
        <span className="text-sm font-semibold text-amber-400">
          {format(value)}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

function RevenueCard({
  label,
  sublabel,
  value,
  barPct,
}: {
  label: string;
  sublabel: string;
  value: number;
  barPct: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-xs text-white/40 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-xs text-white/30">{sublabel}</div>
      <div className="text-xl font-bold text-white mt-2">
        {formatMoney(value)}
        <span className="text-sm font-normal text-white/40">/mo</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-amber-500/60"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(barPct, 100)}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
      <span className="text-white/40">
        {label}: {formatMoney(value)}
      </span>
    </div>
  );
}
