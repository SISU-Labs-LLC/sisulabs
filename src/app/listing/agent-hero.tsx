"use client";

import { motion } from "framer-motion";

export default function AgentHero() {
  return (
    <section id="agent" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="relative px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-4xl">
          {/* Agent intro */}
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Photo */}
            <div className="shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.compass.com/m/13/de2d1158-70c0-4a88-bab7-5d13cda0e219/300x300.webp"
                  alt="Jordyn Hollingsworth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <div className="text-xs text-white/30 uppercase tracking-wider mb-1">
                Your Listing Agent
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Jordyn Hollingsworth
              </h1>
              <p className="text-white/40 mt-1">
                Affiliate Broker &middot; Compass &middot; Nashville
              </p>

              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                <ContactPill icon="📱" text="678-448-7669" />
                <ContactPill icon="📧" text="jordyn@compass.com" />
                <ContactPill icon="📸" text="@_jordynhollingsworth" />
              </div>
            </div>
          </motion.div>

          {/* Section header */}
          <div className="mt-14 mb-6">
            <div className="inline-flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 text-white/40 text-xs font-mono">
                01
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What You Get
              </h2>
            </div>
            <p className="text-sm text-white/40 mt-2 ml-11">
              The full marketing and sales strategy for your home.
            </p>
          </div>

          {/* Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ValueCard
              title="Professional Photography + Video"
              description="HDR photos, drone aerials, cinematic walkthrough video, and twilight shots. Your home looks like a magazine spread."
              metric="40+ photos"
            />
            <ValueCard
              title="Social Media Marketing"
              description="Custom Reels and TikToks targeting Nashville buyers. Stories, carousel posts, and paid promotion to your ideal buyer demographic."
              metric="50K+ reach"
            />
            <ValueCard
              title="Strategic Pricing"
              description="Data-driven pricing strategy using real-time comps, days-on-market analysis, and buyer demand indicators. Priced to create urgency."
              metric="102% list-to-sale"
            />
            <ValueCard
              title="Pre-Market Exposure"
              description="Coming Soon campaign to build demand before Day 1. Private showings to pre-qualified buyers. Multiple offers before public listing."
              metric="7-day pre-market"
            />
            <ValueCard
              title="Negotiation + Closing"
              description="Every dollar matters. Inspection negotiations, appraisal strategy, and closing coordination. I fight for your bottom line."
              metric="Top 5% negotiator"
            />
            <ValueCard
              title="This Dashboard"
              description="Real-time visibility into your listing performance. Views, showings, offers, and feedback all in one place. No guessing."
              metric="Live updates"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPill({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/50">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  );
}

function ValueCard({
  title,
  description,
  metric,
}: {
  title: string;
  description: string;
  metric: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 hover:bg-white/[0.04] transition-all group">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-white group-hover:text-white">
          {title}
        </h3>
        <span className="text-[10px] text-white/30 bg-white/[0.04] px-2 py-0.5 rounded-full shrink-0 ml-2">
          {metric}
        </span>
      </div>
      <p className="text-xs text-white/40 mt-2 leading-relaxed">{description}</p>
    </div>
  );
}
