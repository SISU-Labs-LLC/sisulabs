import type { Metadata } from "next";
import PropertyHero from "./property-hero";
import DashboardTabs from "./dashboard-tabs";
import ImprovementAdvisor from "./improvement-advisor";
import PricingStrategy from "./pricing-strategy";
import CompSelector from "./comp-selector";

export const metadata: Metadata = {
  title: "1422 Primrose Ln — Listing Dashboard | Jordyn Hollingsworth",
  description: "Your live listing dashboard. Metrics, showings, and updates in real time.",
  robots: { index: false, follow: false },
};

export default function ListingPage() {
  return (
    <main className="min-h-screen">
      {/* Property Hero */}
      <PropertyHero />

      {/* Dashboard Tabs: Marketing / Agent Bio / Activity */}
      <section className="px-6 py-10 border-t border-gray-100">
        <div className="mx-auto max-w-5xl">
          <DashboardTabs />
        </div>
      </section>

      {/* Pre-Listing Recommendations */}
      <section id="recommendations" className="px-6 py-14 bg-gray-50/50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Pre-Listing Investment Guide"
            subtitle="Toggle improvements on or off to see how they shift your projected sale price."
          />
          <div className="mt-8">
            <ImprovementAdvisor />
          </div>
        </div>
      </section>

      {/* Comparable Sales */}
      <section id="comps" className="px-6 py-14 border-t border-gray-100">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Comparable Sales"
            subtitle="Recent similar homes that sold near you. These inform your pricing strategy."
          />
          <div className="mt-8">
            <CompSelector />
          </div>
        </div>
      </section>

      {/* Pricing Strategy */}
      <section id="pricing" className="px-6 py-14 bg-gray-50/50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Pricing Strategy"
            subtitle="What you list at, what buyers are paying, and what you walk away with."
          />
          <div className="mt-8">
            <PricingStrategy />
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-gray-100 text-center text-xs text-gray-400">
        Compass Real Estate &middot; Jordyn Hollingsworth, Affiliate Broker &middot; 678-448-7669
      </footer>
    </main>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
