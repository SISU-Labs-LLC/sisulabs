"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Tab = "marketing" | "activity" | "bio";

const tabs: { id: Tab; label: string }[] = [
  { id: "marketing", label: "Marketing Performance" },
  { id: "activity", label: "Activity Log" },
  { id: "bio", label: "Your Agent" },
];

export default function DashboardTabs() {
  const [active, setActive] = useState<Tab>("marketing");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-4 sm:px-6 py-3 text-sm font-medium transition-colors ${
              active === tab.id
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                layoutId="tab-indicator"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-8">
        {active === "marketing" && <MarketingTab />}
        {active === "activity" && <ActivityTab />}
        {active === "bio" && <BioTab />}
      </div>
    </div>
  );
}

function MarketingTab() {
  return (
    <div className="space-y-8">
      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Total Views" value="49,377" change="+18%" up />
        <MetricCard label="Showings" value="11" change="4 this week" up />
        <MetricCard label="Days on Market" value="4" change="Avg area: 18" up />
        <MetricCard label="Saves + Shares" value="1,031" change="+34%" up />
      </div>

      {/* Platform breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PlatformCard
          name="Instagram"
          handle="@_jordynhollingsworth"
          metrics={[
            { label: "Reel Views", value: "48,200" },
            { label: "Post Reach", value: "12,847" },
            { label: "Saves", value: "234" },
            { label: "Shares", value: "67" },
          ]}
        />
        <PlatformCard
          name="TikTok"
          handle="@thenashvilleperspective"
          metrics={[
            { label: "Video Views", value: "31,400" },
            { label: "Likes", value: "2,100" },
            { label: "Shares", value: "445" },
            { label: "Comments", value: "89" },
          ]}
        />
        <PlatformCard
          name="Zillow"
          handle=""
          metrics={[
            { label: "Listing Views", value: "3,240" },
            { label: "Saves", value: "187" },
            { label: "Agent Contacts", value: "14" },
          ]}
        />
        <PlatformCard
          name="Realtor.com"
          handle=""
          metrics={[
            { label: "Listing Views", value: "1,890" },
            { label: "Saves", value: "98" },
          ]}
        />
      </div>

      {/* Showing Schedule */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Showing Schedule</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          <ShowingRow date="May 3" time="10:00 AM" agent="Sarah Chen" brokerage="Village Real Estate" status="upcoming" />
          <ShowingRow date="May 3" time="2:30 PM" agent="Marcus Williams" brokerage="Keller Williams" status="upcoming" />
          <ShowingRow date="May 4" time="11:00 AM" agent="Taylor Reed" brokerage="Compass" status="upcoming" />
          <ShowingRow date="May 4" time="4:00 PM" agent="Ashley Brooks" brokerage="RE/MAX" status="upcoming" />
          <ShowingRow date="May 1" time="1:00 PM" agent="David Park" brokerage="Zeitlin Sotheby's" status="completed" feedback="Buyers loved the pool and waterfall. Want to come back for a second showing." />
          <ShowingRow date="Apr 30" time="3:30 PM" agent="Jennifer Liu" brokerage="Village RE" status="completed" feedback="Great layout and flow. Buyers comparing to a home on Generals Retreat." />
          <ShowingRow date="Apr 29" time="11:00 AM" agent="Chris Martinez" brokerage="Parks" status="completed" feedback="Strong interest. Writing an offer tonight." />
        </div>
      </div>

      {/* Buyer Feedback Summary */}
      <div className="rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Buyer Feedback Themes
        </h3>
        <p className="text-xs text-gray-400 mb-4">Aggregated from showing agent feedback</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeedbackTheme emoji="👍" theme="Pool + waterfall" count={5} sentiment="positive" />
          <FeedbackTheme emoji="👍" theme="Location / proximity to Main St" count={4} sentiment="positive" />
          <FeedbackTheme emoji="👍" theme="Renovated kitchen" count={4} sentiment="positive" />
          <FeedbackTheme emoji="👍" theme="Layout and flow" count={3} sentiment="positive" />
          <FeedbackTheme emoji="🤔" theme="Price vs. square footage" count={2} sentiment="neutral" />
          <FeedbackTheme emoji="👍" theme="Gated community / security" count={3} sentiment="positive" />
        </div>
      </div>
    </div>
  );
}

function ActivityTab() {
  const activities = [
    { date: "May 1", time: "4:30 PM", action: "Received showing feedback from David Park (Zeitlin). Buyers want second showing.", type: "showing" },
    { date: "May 1", time: "2:00 PM", action: "Posted property reel to Instagram. 12K views in first 4 hours.", type: "marketing" },
    { date: "May 1", time: "10:00 AM", action: "Confirmed 4 showings for May 3-4 weekend.", type: "showing" },
    { date: "Apr 30", time: "6:00 PM", action: "Received showing feedback from Jennifer Liu. Buyers comparing with Generals Retreat listing.", type: "showing" },
    { date: "Apr 30", time: "3:00 PM", action: "TikTok walkthrough posted. 31K views, 445 shares.", type: "marketing" },
    { date: "Apr 30", time: "9:00 AM", action: "Shared listing in Compass Private Exclusives network.", type: "marketing" },
    { date: "Apr 29", time: "8:00 PM", action: "Chris Martinez (Parks) called. His buyers writing an offer.", type: "offer" },
    { date: "Apr 29", time: "11:00 AM", action: "First showing completed. Strong positive feedback.", type: "showing" },
    { date: "Apr 28", time: "4:00 PM", action: "Listing live on MLS. Syndicated to Zillow, Realtor.com, Redfin.", type: "listing" },
    { date: "Apr 28", time: "2:00 PM", action: "Professional photography + drone delivered. 42 photos.", type: "marketing" },
    { date: "Apr 28", time: "10:00 AM", action: "Coming Soon post on Instagram + Facebook. 3,200 reach in first hour.", type: "marketing" },
    { date: "Apr 26", time: "3:00 PM", action: "Staged home photographed for twilight shots.", type: "marketing" },
    { date: "Apr 25", time: "11:00 AM", action: "Pre-listing inspection completed. No major issues.", type: "listing" },
  ];

  const typeColors: Record<string, string> = {
    showing: "bg-blue-50 text-blue-700 border-blue-200",
    marketing: "bg-purple-50 text-purple-700 border-purple-200",
    offer: "bg-emerald-50 text-emerald-700 border-emerald-200",
    listing: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        Everything I have done for your listing, in chronological order. No guessing whether your agent is working.
      </p>
      <div className="space-y-0">
        {activities.map((item, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="shrink-0 w-20 text-right">
              <div className="text-xs font-medium text-gray-500">{item.date}</div>
              <div className="text-[10px] text-gray-300">{item.time}</div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{item.action}</p>
            </div>
            <span className={`shrink-0 self-start text-[10px] px-2 py-0.5 rounded-full border ${typeColors[item.type]}`}>
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BioTab() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.compass.com/m/13/de2d1158-70c0-4a88-bab7-5d13cda0e219/300x300.webp"
          alt="Jordyn Hollingsworth"
          className="w-24 h-24 rounded-xl object-cover shrink-0"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Jordyn Hollingsworth</h3>
          <p className="text-sm text-gray-500">Affiliate Broker &middot; Compass</p>
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
            <span>📱 678-448-7669</span>
            <span>📧 jordyn.hollingsworth@compass.com</span>
          </div>
        </div>
      </div>

      <div className="mt-8 prose prose-sm text-gray-600 leading-relaxed">
        <p>
          University of Alabama grad (2017) who traded tech sales for real estate because
          she realized selling homes let her combine market analysis with helping people
          make the biggest financial decision of their lives.
        </p>
        <p>
          Based in Nashville, serving East Nashville, Franklin, Brentwood, Spring Hill,
          Hendersonville, Nolensville, and Madison. Known for clear communication,
          proactive problem-solving, and never letting a deal fall apart over something
          fixable.
        </p>
        <p>
          Specializes in social media marketing for listings (48K+ average reel views),
          strategic pricing that creates urgency, and negotiation that title agents
          comment on: &ldquo;I have no idea how you got them such a great deal.&rdquo;
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">102%</div>
          <div className="text-xs text-gray-500 mt-1">Avg List-to-Sale</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">12 days</div>
          <div className="text-xs text-gray-500 mt-1">Avg Days on Market</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">$2.5M+</div>
          <div className="text-xs text-gray-500 mt-1">2025 Volume</div>
        </div>
      </div>

      {/* What homeowners complain about — and how this solves it */}
      <div className="mt-10">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          Common Frustrations This Dashboard Solves
        </h4>
        <div className="space-y-3">
          <ComplaintSolver
            complaint="My agent never updates me"
            solution="This entire dashboard IS your update. Real-time, 24/7, no waiting for a phone call."
          />
          <ComplaintSolver
            complaint="I don't know if anyone is seeing my home"
            solution="Every view, save, share, and showing is tracked and visible here. You see what I see."
          />
          <ComplaintSolver
            complaint="What are buyers actually saying?"
            solution="Showing feedback is collected after every visit and aggregated into themes above."
          />
          <ComplaintSolver
            complaint="Is my agent even doing anything?"
            solution="The Activity Log shows every action taken — marketing posts, calls, negotiations — timestamped."
          />
          <ComplaintSolver
            complaint="Am I priced right?"
            solution="The Pricing section shows real-time comps, DOM predictions, and your net proceeds at any price point."
          />
          <ComplaintSolver
            complaint="The marketing feels lazy"
            solution="Professional photos, drone, video tours, Reels, TikToks, paid social. Metrics prove the reach."
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
  up,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-2xl font-semibold text-gray-900 mt-1">{value}</div>
      <div className={`text-xs mt-1 ${up ? "text-emerald-600" : "text-red-500"}`}>
        {change}
      </div>
    </div>
  );
}

function PlatformCard({
  name,
  handle,
  metrics,
}: {
  name: string;
  handle: string;
  metrics: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
        {handle && <span className="text-xs text-gray-400">{handle}</span>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              {m.label}
            </div>
            <div className="text-sm font-semibold text-gray-800">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowingRow({
  date,
  time,
  agent,
  brokerage,
  status,
  feedback,
}: {
  date: string;
  time: string;
  agent: string;
  brokerage: string;
  status: "upcoming" | "completed";
  feedback?: string;
}) {
  return (
    <div className="px-4 py-3 flex items-start gap-3">
      <div className="shrink-0 mt-1">
        <div
          className={`w-2 h-2 rounded-full ${
            status === "upcoming" ? "bg-emerald-400" : "bg-blue-400"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-700">{agent}</span>
          <span className="text-xs text-gray-400">{brokerage}</span>
        </div>
        {feedback && (
          <p className="text-xs text-gray-500 mt-0.5 italic">&ldquo;{feedback}&rdquo;</p>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs font-medium text-gray-600">{date}</div>
        <div className="text-xs text-gray-400">{time}</div>
      </div>
    </div>
  );
}

function FeedbackTheme({
  emoji,
  theme,
  count,
  sentiment,
}: {
  emoji: string;
  theme: string;
  count: number;
  sentiment: "positive" | "neutral" | "negative";
}) {
  const colors = {
    positive: "bg-emerald-50 border-emerald-200",
    neutral: "bg-amber-50 border-amber-200",
    negative: "bg-red-50 border-red-200",
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[sentiment]}`}>
      <span>{emoji}</span>
      <span className="text-sm text-gray-700 flex-1">{theme}</span>
      <span className="text-xs text-gray-400">{count}x</span>
    </div>
  );
}

function ComplaintSolver({
  complaint,
  solution,
}: {
  complaint: string;
  solution: string;
}) {
  return (
    <div className="flex gap-3 py-2">
      <span className="text-red-400 shrink-0 mt-0.5">✕</span>
      <div>
        <div className="text-sm font-medium text-gray-700">
          &ldquo;{complaint}&rdquo;
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{solution}</div>
      </div>
    </div>
  );
}
