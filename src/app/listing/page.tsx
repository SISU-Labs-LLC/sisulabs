import type { Metadata } from "next";
import AgentHero from "./agent-hero";
import ImprovementAdvisor from "./improvement-advisor";
import MarketingDashboard from "./marketing-dashboard";
import PricingStrategy from "./pricing-strategy";

export const metadata: Metadata = {
  title: "Your Listing Presentation — Jordyn Hollingsworth | Compass",
  description: "Dynamic listing presentation for your home sale",
  robots: { index: false, follow: false },
};

export default function ListingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Section 1: Your Agent */}
      <AgentHero />

      {/* Section 2: Pre-Listing Recommendations */}
      <section id="recommendations" className="px-6 py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            step="02"
            title="Pre-Listing Recommendations"
            subtitle="Small investments that increase your sale price. Toggle each to see the projected impact."
          />
          <div className="mt-10">
            <ImprovementAdvisor />
          </div>
        </div>
      </section>

      {/* Section 3: Marketing Dashboard */}
      <section id="marketing" className="px-6 py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            step="03"
            title="Marketing Performance"
            subtitle="Live metrics across all channels. Updated in real time as your listing gains exposure."
          />
          <div className="mt-10">
            <MarketingDashboard />
          </div>
        </div>
      </section>

      {/* Section 4: Pricing Strategy */}
      <section id="pricing" className="px-6 py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            step="04"
            title="Pricing Strategy + Net Proceeds"
            subtitle="What you list at, what you sell for, and what you walk away with."
          />
          <div className="mt-10">
            <PricingStrategy />
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-white/[0.06] text-center text-xs text-white/15">
        Compass Real Estate. Jordyn Hollingsworth, Affiliate Broker. 678-448-7669.
      </footer>
    </main>
  );
}

function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 text-white/40 text-xs font-mono">
          {step}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <p className="text-sm text-white/40 mt-2 ml-11">{subtitle}</p>
    </div>
  );
}
