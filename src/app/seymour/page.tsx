import type { Metadata } from "next";
import RevenueSection from "./revenue-section";
import ValueWaterfall from "./value-waterfall";
import BusinessContext from "./business-context";
import { ScrollAnimations, StickyNav, HeroCounter } from "./animations";

export const metadata: Metadata = {
  title: "1034 Seymour Ave — Investment Case",
  description: "The financial case for the Seymour renovation",
  robots: { index: false, follow: false },
};

const totalInvestment = 132555;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SeymourPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <StickyNav />
      <ScrollAnimations />

      {/* Hero — The 10-second story */}
      <section id="overview" className="relative overflow-hidden px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-amber-900/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/[0.07] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Investment Case — May 2026
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            1034 Seymour Ave
          </h1>
          <p className="text-lg sm:text-xl text-white/40 mt-3">
            East Nashville &middot; Tudor Revival &middot; 1930
          </p>

          {/* TL;DR — the whole story in one line */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 max-w-2xl mx-auto">
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Invest <span className="text-amber-400 font-semibold">{formatMoney(totalInvestment)}</span> into
              the backyard to create a <span className="text-amber-400 font-semibold">$67K+/year</span> income
              stream while pushing the home value from $970K to <span className="text-emerald-400 font-semibold">$1.2M+</span>.
              Pays for itself in <span className="text-emerald-400 font-semibold">under 2 years</span>.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl mx-auto">
            <HeroCounter label="Current Value" target={970000} />
            <HeroCounter label="Investment" target={totalInvestment} accent />
            <HeroCounter label="Target Value" target={1210000} suffix="+" />
          </div>
        </div>

        {/* Reading guide */}
        <div className="mt-16 mx-auto max-w-md text-center">
          <div className="text-xs text-white/20 uppercase tracking-wider mb-3">
            Scroll to explore
          </div>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="w-8 h-1 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </section>

      {/* Section 1 — What we are building */}
      <section id="improvements" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-4xl">
          <StepHeader step={1} title="What We Are Building" subtitle="The improvements and their impact on home value" />

          <p className="text-white/50 leading-relaxed mt-6 max-w-2xl">
            Four improvements that transform the backyard into an income-producing amenity
            while upgrading the home&apos;s exterior. Drag each slider to see how different
            return-per-dollar assumptions change the projected home value.
          </p>

          <div className="mt-10">
            <ValueWaterfall />
          </div>
        </div>
      </section>

      {/* Section 2 — How it makes money */}
      <section id="revenue" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <StepHeader step={2} title="How It Makes Money" subtitle="Three income streams from one backyard" />

          <p className="text-white/50 leading-relaxed mt-6">
            Click any revenue stream to isolate its income. Drag the sliders to model
            conservative through aggressive scenarios.
          </p>

          <div className="mt-8">
            <RevenueSection />
          </div>
        </div>
      </section>

      {/* Section 3 — The real numbers */}
      <section id="business" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <StepHeader step={3} title="The Real Numbers" subtitle="HELOC cost, cash flow, break-even, and alternatives" />

          <p className="text-white/50 leading-relaxed mt-6">
            Honest accounting — including the HELOC carrying cost, what happens if
            Swimply income is zero, and how this compares to putting the money in
            the stock market instead.
          </p>

          <div className="mt-10">
            <BusinessContext />
          </div>
        </div>
      </section>

      {/* Section 4 — Timeline */}
      <section id="timeline" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <StepHeader step={4} title="Execution Timeline" subtitle="From construction to cash flow" />

          <div className="mt-10 space-y-0">
            <TimelineItem
              phase="Phase 1"
              timeline="May through June 2026"
              status="In Progress"
              items={[
                "Pool, patio, fence, siding installation",
                "Rental unit increase: $1,200 to $1,500/mo (immediate)",
                "Professional photography shoot",
                "Swimply listing goes live July 1",
                "Direct booking page + Google Ads launch",
              ]}
            />
            <TimelineItem
              phase="Phase 2"
              timeline="End of Summer 2026"
              status="Planned"
              items={[
                "Purchase barrel sauna with Swimply earnings",
                "Launch winter private club: 10 members at $300/mo",
                "Each member gets 5 hours monthly, book anytime online",
                "Run Nashville staycation winter ad campaigns",
              ]}
            />
            <TimelineItem
              phase="Phase 3"
              timeline="2027+"
              status="Growth"
              items={[
                "12 months documented income on tax returns",
                "Property reappraisal with income documentation",
                "50+ reviews, repeat customers, corporate events",
                "Potential refinance to eliminate HELOC entirely",
              ]}
              last
            />
          </div>
        </div>
      </section>

      {/* Section 5 — Bottom Line */}
      <section id="value" className="px-6 py-24 border-t border-white/[0.06] bg-gradient-to-b from-transparent via-amber-950/5 to-amber-950/10 fade-section">
        <div className="mx-auto max-w-3xl text-center">
          <StepHeader step={5} title="The Bottom Line" subtitle="Summary of the full investment case" center />

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <BottomStat label="Invest" value={formatMoney(totalInvestment)} />
            <BottomStat label="Annual Net" value="$67K" sub="moderate" />
            <BottomStat label="Payback" value="2.0 yrs" sub="then pure profit" />
            <BottomStat label="New Value" value="$1.21M" sub="+$240K equity" />
          </div>

          <div className="mt-14 max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left space-y-3">
            <p className="text-white/50 text-sm leading-relaxed">
              <span className="text-white font-medium">Even in the worst case</span> (zero Swimply income),
              the physical improvements add $80K+ in value to the home and the rental increase covers
              a portion of the HELOC interest.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              <span className="text-white font-medium">In the moderate case</span>, the property generates
              $67K/year net income, pays off the entire investment in 2 years, and appreciates to $1.2M+.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              <span className="text-white font-medium">In the aggressive case</span>, income exceeds $100K/year
              and the payback period drops to 14 months.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-white/[0.06] text-center text-xs text-white/15">
        Prepared May 2026. Based on Nashville Swimply market data and comparable property analysis.
      </footer>
    </main>
  );
}

function StepHeader({
  step,
  title,
  subtitle,
  center,
}: {
  step: number;
  title: string;
  subtitle: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className={`inline-flex items-center gap-3 ${center ? "" : ""}`}>
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold">
          {step}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <p className="text-sm text-white/40 mt-2 ml-11">
        {subtitle}
      </p>
    </div>
  );
}

function TimelineItem({
  phase,
  timeline,
  status,
  items,
  last,
}: {
  phase: string;
  timeline: string;
  status: string;
  items: string[];
  last?: boolean;
}) {
  const statusColor =
    status === "In Progress"
      ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
      : status === "Planned"
      ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
      : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";

  return (
    <div className="flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-amber-400 border-4 border-black shrink-0 mt-1" />
        {!last && <div className="w-px flex-1 bg-white/10 my-1" />}
      </div>
      <div className="pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-white">{phase}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <div className="text-xs text-white/30 mt-0.5">{timeline}</div>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="text-sm text-white/50 flex items-start gap-2"
            >
              <span className="text-amber-400/50 mt-0.5 shrink-0">&#9656;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BottomStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-xs text-white/40 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-2xl font-bold text-amber-400 mt-2">{value}</div>
      {sub && <div className="text-xs text-white/30 mt-1">{sub}</div>}
    </div>
  );
}
