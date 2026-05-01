"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function SrvePitch() {
  return (
    <main>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400 tracking-wide">Now in private beta</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              SRVE
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            One link. Win the listing. Prove the work.
          </p>
          <p className="mt-6 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            The pre-listing presentation that wins you the appointment, then transforms into a live seller dashboard
            that proves you&apos;re working every single day. Replaces your CMA tool, presentation deck, feedback tracker,
            and marketing reports with one beautiful URL.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#demo"
              className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              See the Demo
            </a>
            <a
              href="#pricing"
              className="px-8 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════ THE PROBLEM ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">The Problem</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Your sellers feel <span className="text-red-400">ghosted</span>.
            <br />
            Your tools don&apos;t <span className="text-red-400">talk to each other</span>.
          </h2>
          <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
            You send a PDF CMA to win the listing. Then you disappear into a void of text messages and weekly calls
            the seller never picks up. Meanwhile you&apos;re working your ass off and they have no idea.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PainCard tool="Cloud CMA" problem="Static PDF that rots after day one" cost="$29/mo" />
            <PainCard tool="Highnote" problem="Pretty deck that dies after signing" cost="$39/mo" />
            <PainCard tool="ShowingTime" problem="33% response rate, raw unstructured noise" cost="$25-50/mo" />
            <PainCard tool="Marketing reports" problem="You manually screenshot Instagram insights" cost="Free (your time)" />
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-2xl font-semibold text-white">$100-160/mo across 3-4 tools</p>
            <p className="text-sm text-gray-500 mt-1">That still don&apos;t give your sellers what they actually want: proof you&apos;re working.</p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ THE PRODUCT ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">The Product</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            One link. Two phases.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Share a single URL at the listing appointment. That same link becomes your seller&apos;s
            live dashboard the moment you go active on MLS.
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phase 1 */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">1</span>
                <h3 className="text-lg font-semibold">Win the Appointment</h3>
              </div>
              <ul className="space-y-3">
                <FeatureItem text="Interactive listing presentation with your brand" />
                <FeatureItem text="Living CMA with real-time comps (not a stale PDF)" />
                <FeatureItem text="Pre-listing improvement guide with price impact" />
                <FeatureItem text="Your stats, testimonials, marketing plan" />
                <FeatureItem text="Pricing strategy with net proceeds calculator" />
              </ul>
              <p className="mt-6 text-xs text-gray-500">
                Seller sees this and thinks: &ldquo;This agent has tech that no one else showed me.&rdquo;
              </p>
            </div>

            {/* Phase 2 */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">2</span>
                <h3 className="text-lg font-semibold">Prove the Work</h3>
              </div>
              <ul className="space-y-3">
                <FeatureItem text="Real-time marketing dashboard (views, saves, shares)" />
                <FeatureItem text="Showing schedule with AI-summarized buyer feedback" />
                <FeatureItem text="Timestamped activity log of everything you do" />
                <FeatureItem text="Comps that update as the market moves" />
                <FeatureItem text="Transaction milestones and next steps" />
              </ul>
              <p className="mt-6 text-xs text-gray-500">
                Seller checks this at midnight instead of texting you &ldquo;any updates?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ DEMO / WIREFRAMES ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5" >
        <div className="mx-auto max-w-5xl" id="demo">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Live Prototype</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            See it in action.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Built for a real $1.6M listing in Franklin, TN. This is what your sellers see.
          </p>

          {/* Browser mockup */}
          <div className="mt-12 rounded-2xl border border-white/10 overflow-hidden bg-[#111118] shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 text-center">
                  srve.app/jordyn/1422-primrose-ln
                </div>
              </div>
            </div>

            {/* Screen content - wireframe style */}
            <div className="p-6 sm:p-10 space-y-6">
              {/* Hero wireframe */}
              <WireframeSection label="Photo Gallery + Property Hero">
                <div className="grid grid-cols-4 gap-2 h-32 sm:h-48">
                  <div className="col-span-3 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Main Photo (full-res)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1/3 rounded-lg bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600 text-[8px]">Kitchen</span>
                    </div>
                    <div className="h-1/3 rounded-lg bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600 text-[8px]">Pool</span>
                    </div>
                    <div className="h-1/3 rounded-lg bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600 text-[8px]">+12</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <div className="h-6 w-48 rounded bg-white/10" />
                    <div className="h-3 w-32 rounded bg-white/5 mt-2" />
                  </div>
                  <div className="h-6 w-24 rounded bg-white/10" />
                </div>
                <div className="mt-3 flex gap-2">
                  {["Pool", "Renovated", "Gated", "6bd/5ba"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] text-gray-500">{t}</span>
                  ))}
                </div>
              </WireframeSection>

              {/* Marketing Dashboard wireframe */}
              <WireframeSection label="Live Marketing Dashboard">
                <div className="grid grid-cols-4 gap-3">
                  <MetricWire label="Views" value="49,377" />
                  <MetricWire label="Showings" value="11" />
                  <MetricWire label="Days" value="4" />
                  <MetricWire label="Saves" value="1,031" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-[9px] text-gray-500 uppercase">Instagram</div>
                    <div className="text-xs text-white mt-1">48,200 reel views</div>
                    <div className="mt-2 h-1 rounded-full bg-purple-500/30 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-purple-400" />
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-[9px] text-gray-500 uppercase">Zillow</div>
                    <div className="text-xs text-white mt-1">3,240 listing views</div>
                    <div className="mt-2 h-1 rounded-full bg-blue-500/30 overflow-hidden">
                      <div className="h-full w-1/2 rounded-full bg-blue-400" />
                    </div>
                  </div>
                </div>
              </WireframeSection>

              {/* Feedback wireframe */}
              <WireframeSection label="AI-Summarized Showing Feedback">
                <div className="space-y-2">
                  <FeedbackWire theme="Pool + waterfall" count={5} pct={90} color="emerald" />
                  <FeedbackWire theme="Location / Main St" count={4} pct={75} color="emerald" />
                  <FeedbackWire theme="Kitchen renovation" count={4} pct={70} color="emerald" />
                  <FeedbackWire theme="Price vs sqft" count={2} pct={35} color="amber" />
                </div>
                <p className="mt-3 text-[9px] text-gray-600 italic">
                  &ldquo;3 of 5 buyers loved the kitchen. 2 mentioned backyard size.&rdquo;
                </p>
              </WireframeSection>

              {/* Comps wireframe */}
              <WireframeSection label="Living CMA (Updates Daily)">
                <div className="space-y-2">
                  <CompWire address="1508 Championship Blvd" price="$1,625,000" dom="11d" />
                  <CompWire address="305 Haddon Ct" price="$1,550,000" dom="14d" />
                  <CompWire address="1610 Riceland Dr" price="$1,675,000" dom="8d" />
                </div>
                <div className="mt-3 flex justify-between text-[9px] text-gray-500">
                  <span>Avg $/sqft: $368</span>
                  <span>Your $/sqft: $372</span>
                  <span>Updated: Today</span>
                </div>
              </WireframeSection>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/listing"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              View full live prototype
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ WHAT MAKES IT DIFFERENT ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Differentiation</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Compass-level tech.<br />For every agent.
          </h2>

          <div className="mt-12 space-y-6">
            <DiffCard
              number="01"
              title="Living CMA"
              description="Comps update daily from MLS data. Not a snapshot from the day you printed the PDF. Your seller sees the market move in real time."
              comparison="Cloud CMA: static email. SRVE: live, interactive, always current."
            />
            <DiffCard
              number="02"
              title="AI Feedback Synthesis"
              description="Raw showing feedback is noise. SRVE clusters it into themes: '4 buyers loved the kitchen, 2 mentioned pricing.' Sellers see clarity, not chaos."
              comparison="ShowingTime: 33% response rate, unstructured. SRVE: themes, sentiment, recommendations."
            />
            <DiffCard
              number="03"
              title="Proof of Work"
              description="Every action you take is timestamped and visible. Post a reel? It shows up. Schedule a showing? Logged. Your seller never wonders if you're working."
              comparison="Current: weekly phone call they ignore. SRVE: 24/7 live dashboard."
            />
            <DiffCard
              number="04"
              title="Pre-Listing + Ongoing in One URL"
              description="The link you share at the listing appointment IS the dashboard. No handoff, no second tool, no 'check this other portal.' One link, forever."
              comparison="Highnote: dies after signing. Trackxi: starts at contract. SRVE: covers both."
            />
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ MARKET ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Market</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            The timing is now.
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MarketStat value="300K" label="Targetable agents in the US" subtext="Top 20% producers, tech-forward" />
            <MarketStat value="82%" label="Already using AI in their business" subtext="2026 RPR survey" />
            <MarketStat value="$535M" label="Annual TAM at $149/mo" subtext="$284M at $79/mo tier" />
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-lg font-semibold mb-4">Post-NAR Settlement (2024)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Listing agents now face direct scrutiny from sellers on commission value. The era of &ldquo;trust me, I&apos;m working&rdquo;
              is over. Sellers can see what Compass agents get. They want the same thing. SRVE gives it to every agent,
              regardless of brokerage.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <StatPill label="Avg commission" value="5.44% (up post-settlement)" />
              <StatPill label="Seller scrutiny" value="Higher than ever" />
              <StatPill label="Agent switching" value="Accelerating" />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ REPLACES ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Consolidation</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            One tool. Not four.
          </h2>

          <div className="mt-12 relative">
            {/* The tools being replaced */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ReplacedTool name="Cloud CMA" price="$29/mo" role="Static CMA reports" />
              <ReplacedTool name="Highnote" price="$39/mo" role="Listing presentations" />
              <ReplacedTool name="ShowingTime+" price="$25-50/mo" role="Feedback collection" />
              <ReplacedTool name="Canva/Manual" price="Your time" role="Marketing reports" />
            </div>

            {/* Arrow down */}
            <div className="my-8 flex justify-center">
              <div className="w-px h-12 bg-gradient-to-b from-red-500/50 to-emerald-500/50" />
            </div>

            {/* SRVE */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-8">
              <div className="text-3xl font-bold">SRVE</div>
              <p className="text-sm text-gray-400 mt-2">All of the above. One link. One subscription.</p>
              <p className="text-emerald-400 font-semibold mt-4">$79/mo</p>
              <p className="text-xs text-gray-500">Save $40-80/mo and get a better product</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ PRICING ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5" >
        <div className="mx-auto max-w-4xl" id="pricing">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Win one extra listing per year.<br />
            <span className="text-gray-500">That&apos;s 20x ROI.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Solo */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-medium uppercase tracking-wider rounded-bl-lg">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold">Solo Agent</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                <PriceFeature text="Up to 5 active listings" />
                <PriceFeature text="Living CMA with daily comp updates" />
                <PriceFeature text="AI feedback synthesis" />
                <PriceFeature text="Marketing analytics dashboard" />
                <PriceFeature text="Custom branding + agent domain" />
                <PriceFeature text="Unlimited archived listings" />
              </ul>
              <button className="mt-8 w-full py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors">
                Join the Beta
              </button>
            </div>

            {/* Team */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-lg font-semibold">Team</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                <PriceFeature text="Up to 5 agents" />
                <PriceFeature text="Unlimited active listings" />
                <PriceFeature text="Everything in Solo" />
                <PriceFeature text="Team analytics and leaderboard" />
                <PriceFeature text="Brokerage white-label option" />
                <PriceFeature text="Priority support" />
              </ul>
              <button className="mt-8 w-full py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors">
                Contact Us
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            No contracts. Cancel anytime. Free trial for your first listing.
          </p>
        </div>
      </Section>

      {/* ═══════════════════════════ SELLER PAIN POINTS ═══════════════════════════ */}
      <Section className="px-6 py-24 border-t border-white/5">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Why Sellers Love It</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            The top 5 seller complaints. Solved.
          </h2>

          <div className="mt-10 space-y-4">
            <SellerPain
              complaint="My agent never updates me"
              solve="The entire dashboard IS the update. 24/7, real-time, no phone call needed."
            />
            <SellerPain
              complaint="I don't know if anyone is seeing my home"
              solve="Every view, save, share, and showing is tracked. They see what you see."
            />
            <SellerPain
              complaint="What are buyers actually saying?"
              solve="AI summarizes feedback into clear themes instead of forwarding raw quotes."
            />
            <SellerPain
              complaint="Is my agent even doing anything?"
              solve="Timestamped activity log. Every marketing post, call, and negotiation. Proof."
            />
            <SellerPain
              complaint="Am I priced right?"
              solve="Living comps update daily. Pricing corridor adjusts as the market moves."
            />
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="px-6 py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Stop proving your value<br />over text message.
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Give your sellers a link they actually check. Win more listings. Keep more clients.
            Look like you have a $1.8B tech platform behind you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors">
              Request Beta Access
            </button>
            <a
              href="/listing"
              className="px-10 py-4 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2"
            >
              See Live Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            Built by agents, for agents. Not by a brokerage that locks you in.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center">
        <div className="text-sm font-semibold text-gray-400">SRVE</div>
        <p className="text-xs text-gray-600 mt-2">A Sisu Labs product. Nashville, TN.</p>
      </footer>
    </main>
  );
}

/* ═══════════════════════════ SUB-COMPONENTS ═══════════════════════════ */

function PainCard({ tool, problem, cost }: { tool: string; problem: string; cost: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-medium text-white">{tool}</div>
      <p className="text-xs text-gray-500 mt-1">{problem}</p>
      <div className="mt-3 text-[10px] text-red-400/70">{cost}</div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm text-gray-300">{text}</span>
    </li>
  );
}

function DiffCard({ number, title, description, comparison }: { number: string; title: string; description: string; comparison: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex gap-6">
      <span className="text-3xl font-bold text-white/10 shrink-0">{number}</span>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">{description}</p>
        <p className="text-xs text-gray-600 mt-3 italic">{comparison}</p>
      </div>
    </div>
  );
}

function MarketStat({ value, label, subtext }: { value: string; label: string; subtext: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-300 mt-2">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{subtext}</div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
      <span className="text-[10px] text-gray-500">{label}: </span>
      <span className="text-[10px] text-gray-300 font-medium">{value}</span>
    </div>
  );
}

function ReplacedTool({ name, price, role }: { name: string; price: string; role: string }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center relative">
      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
        <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="text-sm font-medium text-gray-300">{name}</div>
      <div className="text-[10px] text-gray-500 mt-1">{role}</div>
      <div className="text-xs text-red-400/70 mt-2">{price}</div>
    </div>
  );
}

function PriceFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-300">
      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  );
}

function SellerPain({ complaint, solve }: { complaint: string; solve: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex gap-4">
      <span className="text-red-400 shrink-0 mt-0.5 text-lg">&#10005;</span>
      <div>
        <p className="text-sm font-medium text-gray-200">&ldquo;{complaint}&rdquo;</p>
        <p className="text-xs text-gray-500 mt-1">{solve}</p>
      </div>
    </div>
  );
}

function WireframeSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">{label}</div>
      {children}
    </div>
  );
}

function MetricWire({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-center">
      <div className="text-xs text-white font-semibold">{value}</div>
      <div className="text-[8px] text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function FeedbackWire({ theme, count, pct, color }: { theme: string; count: number; pct: number; color: string }) {
  const barColor = color === "emerald" ? "bg-emerald-400" : "bg-amber-400";
  const barBg = color === "emerald" ? "bg-emerald-400/20" : "bg-amber-400/20";
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-32 shrink-0 truncate">{theme}</span>
      <div className={`flex-1 h-1.5 rounded-full ${barBg} overflow-hidden`}>
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[9px] text-gray-500 shrink-0">{count}x</span>
    </div>
  );
}

function CompWire({ address, price, dom }: { address: string; price: string; dom: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-gray-400">{address}</span>
      <div className="flex items-center gap-3">
        <span className="text-[9px] text-gray-600">{dom}</span>
        <span className="text-xs text-white font-medium">{price}</span>
      </div>
    </div>
  );
}
