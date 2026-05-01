import type { Metadata } from "next";
import SwimplyCalculator from "./calculator";
import { ScrollAnimations, StickyNav, HeroCounter } from "./animations";

export const metadata: Metadata = {
  title: "1034 Seymour Ave — Investment Case",
  description: "The financial case for the Seymour renovation",
  robots: { index: false, follow: false },
};

const improvements = [
  {
    category: "Heated Plunge Pool + Hot Tub",
    vendor: "Upper Cumberland Pools",
    cost: 59350,
    detail: "Milan 10.20, electric heat pump, IQ906-P automation, all-season use",
    icon: "🏊",
  },
  {
    category: "Patio + Driveway",
    vendor: "Concrete contractor",
    cost: 22900,
    detail: "20×40 backyard entertainment patio, new driveway, retaining wall",
    icon: "🪨",
  },
  {
    category: "8ft Privacy Fence",
    vendor: "Gines Fence",
    cost: 7510,
    detail: "Full backyard enclosure with gates — required for Swimply and safety",
    icon: "🔒",
  },
  {
    category: "Hardiboard Siding",
    vendor: "Everlasting Exteriors",
    cost: 42795,
    detail: "All non-brick areas replacing vinyl — 30-year material, insurance reduction",
    icon: "🏠",
  },
];

const totalInvestment = improvements.reduce((sum, i) => sum + i.cost, 0);

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SeymourPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <StickyNav />
      <ScrollAnimations />

      {/* Hero */}
      <section id="overview" className="relative overflow-hidden px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
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
          <p className="text-lg sm:text-xl text-white/40 mt-4">
            East Nashville &middot; Tudor Revival &middot; 1930 &middot; Fully Renovated 2024
          </p>

          <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl mx-auto">
            <HeroCounter label="Current Value" target={970000} />
            <HeroCounter label="Investment" target={totalInvestment} accent />
            <HeroCounter label="Target Value" target={1210000} suffix="+" />
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section id="thesis" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <SectionBadge>The Thesis</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
            Turn a home into a{" "}
            <span className="text-amber-400">revenue-producing asset</span>
          </h2>
          <p className="text-white/50 leading-relaxed text-lg mt-6">
            Invest {formatMoney(totalInvestment)} to create a luxury backyard
            experience that generates income through Swimply bookings, direct
            rentals, and winter memberships — while simultaneously increasing
            the home&apos;s appraised value by $200K+ and the apartment rent by
            $300/month.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ThesisCard
              number="01"
              title="Revenue"
              text="$60K to $100K+ annually from pool bookings, direct rentals, and seasonal memberships"
            />
            <ThesisCard
              number="02"
              title="Appreciation"
              text="$970K to $1.2M+ through physical improvements and documented income history"
            />
            <ThesisCard
              number="03"
              title="Payback"
              text="Investment recovered in under 2 years at moderate utilization, then pure profit"
            />
          </div>
        </div>
      </section>

      {/* Improvements */}
      <section id="improvements" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <SectionBadge>The Improvements</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
            {formatMoney(totalInvestment)} invested
          </h2>
          <p className="text-white/40 mt-2">
            Won bids and contracts — signed or in final negotiation.
          </p>

          <div className="mt-8 space-y-4">
            {improvements.map((item, i) => (
              <div
                key={item.category}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all p-5 sm:p-6 flex gap-4 sm:gap-6 items-start fade-section"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl shrink-0 mt-1">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-semibold text-white text-lg">
                      {item.category}
                    </h3>
                    <span className="text-2xl font-bold text-amber-400">
                      {formatMoney(item.cost)}
                    </span>
                  </div>
                  <p className="text-sm text-white/40 mt-1">{item.detail}</p>
                  <p className="text-xs text-white/20 mt-1">{item.vendor}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/[0.06] to-transparent p-6 flex justify-between items-center">
            <span className="text-lg text-white/70 font-medium">
              Total Investment
            </span>
            <span className="text-3xl font-bold text-amber-400">
              {formatMoney(totalInvestment)}
            </span>
          </div>
        </div>
      </section>

      {/* Revenue */}
      <section id="revenue" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <SectionBadge>Revenue Engine</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
            Three income streams,{" "}
            <span className="text-amber-400">one backyard</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <StreamCard
              icon="☀️"
              title="Swimply + Direct"
              description="Hourly pool, hot tub, and patio bookings at $100/hr. Luxury listing with professional photography. Mix of platform and direct bookings."
              accent
            />
            <StreamCard
              icon="❄️"
              title="Winter Club"
              description="Private memberships at $300/month for hot tub and sauna access (Phase 2). 5 hours included, book online anytime."
            />
            <StreamCard
              icon="🏠"
              title="Rental Increase"
              description="2BR accessory apartment increases from $1,200 to $1,500/month with completed exterior renovation. Immediate."
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Interactive Income Calculator
            </h3>
            <p className="text-sm text-white/40 mb-8">
              Drag the sliders to model different scenarios. All numbers update in real time.
            </p>
            <SwimplyCalculator />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <SectionBadge>Execution Timeline</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
            From construction to cash flow
          </h2>

          <div className="mt-10 space-y-0">
            <TimelineItem
              phase="Phase 1"
              timeline="May through June 2026"
              status="In Progress"
              items={[
                "Pool, patio, fence, siding installation",
                "Rental unit increase: $1,200 to $1,500/mo",
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
                "50+ reviews, Superhost status, repeat customers",
                "Corporate event and bachelorette bookings",
                "Potential to add second income property",
              ]}
              last
            />
          </div>
        </div>
      </section>

      {/* Home Value */}
      <section id="value" className="px-6 py-20 border-t border-white/[0.06] fade-section">
        <div className="mx-auto max-w-3xl">
          <SectionBadge>Home Value Impact</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
            From $970K to{" "}
            <span className="text-amber-400">$1.2M+</span>
          </h2>
          <p className="text-white/40 mt-2">
            Physical improvements plus documented income change how the property is valued.
          </p>

          <div className="mt-10 space-y-6">
            {/* Value Waterfall */}
            <div className="space-y-3">
              <ValueBar
                label="Current Appraised Value"
                value={970000}
                width={77}
                color="bg-white/20"
              />
              <ValueBar
                label="+ Physical Improvements"
                value={110000}
                width={9}
                color="bg-cyan-500/60"
                note="Pool, patio, fence, siding add $80K to $140K"
              />
              <ValueBar
                label="+ Income Documentation"
                value={130000}
                width={10}
                color="bg-purple-500/60"
                note="12 months of $60K+ documented income changes buyer math"
              />
              <div className="border-t border-amber-500/30 pt-4">
                <ValueBar
                  label="Projected Value (Summer 2027)"
                  value={1210000}
                  width={96}
                  color="bg-amber-500/60"
                  highlight
                />
              </div>
            </div>

            {/* Equity Created */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <div className="text-sm text-emerald-400/80 font-medium">
                    Net Equity Created
                  </div>
                  <div className="text-3xl font-bold text-emerald-400 mt-1">
                    +$107K to $178K
                  </div>
                  <div className="text-xs text-white/30 mt-1">
                    Invest {formatMoney(totalInvestment)}, create $240K to $310K in total value
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/40">ROI on Investment</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    81% to 134%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="px-6 py-24 border-t border-white/[0.06] bg-gradient-to-b from-transparent via-amber-950/5 to-amber-950/10 fade-section">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>The Bottom Line</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
            An investment that pays for itself
          </h2>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <BottomStat label="Invest" value={formatMoney(totalInvestment)} />
            <BottomStat label="Annual Net" value="$67K" sub="moderate scenario" />
            <BottomStat label="Payback" value="2.0 yrs" sub="then pure profit" />
            <BottomStat label="New Value" value="$1.21M" sub="+$240K equity" />
          </div>

          <div className="mt-14 max-w-xl mx-auto text-white/40 text-sm leading-relaxed">
            <p>
              The property goes from a $970K home with a gravel driveway and
              vinyl siding to a $1.2M+ income-producing asset generating $60K+
              annually. The improvements pay for themselves, then every dollar
              after is profit while the home continues appreciating.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-white/[0.06] text-center text-xs text-white/15">
        Prepared May 2026. Projections based on Nashville Swimply market data
        and comparable property analysis. Not financial advice.
      </footer>
    </main>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/50 uppercase tracking-wider">
      {children}
    </div>
  );
}

function ThesisCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-xs text-amber-400/50 font-mono">{number}</div>
      <h3 className="text-lg font-semibold text-white mt-1">{title}</h3>
      <p className="text-sm text-white/40 mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

function StreamCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-amber-500/30 bg-amber-500/[0.04]"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h4
        className={`text-sm font-semibold ${
          accent ? "text-amber-400" : "text-white/80"
        }`}
      >
        {title}
      </h4>
      <p className="text-xs text-white/40 mt-2 leading-relaxed">
        {description}
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
      <div className={`pb-10 ${last ? "" : ""}`}>
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
              <span className="text-amber-400/50 mt-1 shrink-0">&#9656;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ValueBar({
  label,
  value,
  width,
  color,
  note,
  highlight,
}: {
  label: string;
  value: number;
  width: number;
  color: string;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span
          className={`text-sm ${highlight ? "text-amber-400 font-medium" : "text-white/60"}`}
        >
          {label}
        </span>
        <span
          className={`font-semibold ${highlight ? "text-amber-400 text-lg" : "text-white"}`}
        >
          {formatMoney(value)}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000`}
          style={{ width: `${width}%` }}
        />
      </div>
      {note && <div className="text-xs text-white/25">{note}</div>}
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
