"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Showing {
  id: number;
  date: string;
  time: string;
  agent: string;
  brokerage: string;
  status: "confirmed" | "completed" | "cancelled";
  feedback?: string;
}

const mockShowings: Showing[] = [
  { id: 1, date: "May 3", time: "10:00 AM", agent: "Sarah Chen", brokerage: "Village Real Estate", status: "confirmed" },
  { id: 2, date: "May 3", time: "2:30 PM", agent: "Marcus Williams", brokerage: "Keller Williams", status: "confirmed" },
  { id: 3, date: "May 4", time: "11:00 AM", agent: "Taylor Reed", brokerage: "Compass", status: "confirmed" },
  { id: 4, date: "May 4", time: "4:00 PM", agent: "Ashley Brooks", brokerage: "RE/MAX", status: "confirmed" },
  { id: 5, date: "May 1", time: "1:00 PM", agent: "David Park", brokerage: "Zeitlin Sotheby's", status: "completed", feedback: "Buyers loved the natural light. Want to see it again." },
  { id: 6, date: "Apr 30", time: "3:30 PM", agent: "Jennifer Liu", brokerage: "Village Real Estate", status: "completed", feedback: "Great layout. Concerned about kitchen size." },
  { id: 7, date: "Apr 29", time: "11:00 AM", agent: "Chris Martinez", brokerage: "Parks Real Estate", status: "completed", feedback: "Strong interest. Discussing with buyers tonight." },
];

const socialMetrics = {
  instagram: {
    views: 12847,
    likes: 892,
    saves: 234,
    shares: 67,
    reelViews: 48200,
  },
  tiktok: {
    views: 31400,
    likes: 2100,
    shares: 445,
    comments: 89,
  },
  zillow: {
    views: 3240,
    saves: 187,
    agentContacts: 14,
  },
  realtor: {
    views: 1890,
    saves: 98,
  },
};

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function MarketingDashboard() {
  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Total Views"
          value={socialMetrics.instagram.views + socialMetrics.tiktok.views + socialMetrics.zillow.views + socialMetrics.realtor.views}
          trend="+12% from last week"
          color="text-white"
        />
        <MetricCard
          label="Showings Booked"
          value={7}
          trend="4 upcoming"
          color="text-emerald-400"
        />
        <MetricCard
          label="Days on Market"
          value={4}
          trend="Listed Apr 28"
          color="text-amber-400"
        />
        <MetricCard
          label="Saves + Shares"
          value={socialMetrics.instagram.saves + socialMetrics.instagram.shares + socialMetrics.tiktok.shares + socialMetrics.zillow.saves}
          trend="High intent signals"
          color="text-cyan-400"
        />
      </div>

      {/* Social Media Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Instagram */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📸</span>
            <h4 className="text-sm font-semibold text-white">Instagram</h4>
            <span className="text-xs text-white/20 ml-auto">@_jordynhollingsworth</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniMetric label="Post Reach" value={socialMetrics.instagram.views} />
            <MiniMetric label="Reel Views" value={socialMetrics.instagram.reelViews} />
            <MiniMetric label="Saves" value={socialMetrics.instagram.saves} />
            <MiniMetric label="Shares" value={socialMetrics.instagram.shares} />
          </div>
        </div>

        {/* TikTok */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🎵</span>
            <h4 className="text-sm font-semibold text-white">TikTok</h4>
            <span className="text-xs text-white/20 ml-auto">@thenashvilleperspective</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniMetric label="Views" value={socialMetrics.tiktok.views} />
            <MiniMetric label="Likes" value={socialMetrics.tiktok.likes} />
            <MiniMetric label="Shares" value={socialMetrics.tiktok.shares} />
            <MiniMetric label="Comments" value={socialMetrics.tiktok.comments} />
          </div>
        </div>

        {/* Zillow */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🏠</span>
            <h4 className="text-sm font-semibold text-white">Zillow</h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <MiniMetric label="Views" value={socialMetrics.zillow.views} />
            <MiniMetric label="Saves" value={socialMetrics.zillow.saves} />
            <MiniMetric label="Contacts" value={socialMetrics.zillow.agentContacts} />
          </div>
        </div>

        {/* Realtor.com */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔑</span>
            <h4 className="text-sm font-semibold text-white">Realtor.com</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniMetric label="Views" value={socialMetrics.realtor.views} />
            <MiniMetric label="Saves" value={socialMetrics.realtor.saves} />
          </div>
        </div>
      </div>

      {/* Showing Schedule */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">Showing Activity</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              4 upcoming
            </span>
          </div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {mockShowings.map((showing) => (
            <motion.div
              key={showing.id}
              className="px-5 py-3 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="shrink-0">
                <StatusDot status={showing.status} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-white/70">{showing.agent}</span>
                  <span className="text-xs text-white/20">{showing.brokerage}</span>
                </div>
                {showing.feedback && (
                  <p className="text-xs text-white/30 mt-0.5 italic">
                    &ldquo;{showing.feedback}&rdquo;
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-white/50">{showing.date}</div>
                <div className="text-xs text-white/30">{showing.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  trend,
  color,
}: {
  label: string;
  value: number;
  trend: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-xs text-white/30">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color}`}>
        <AnimatedCounter target={value} />
      </div>
      <div className="text-[10px] text-white/20 mt-1">{trend}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-[10px] text-white/30">{label}</div>
      <div className="text-sm font-semibold text-white">
        <AnimatedCounter target={value} duration={1.5} />
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: Showing["status"] }) {
  const colors = {
    confirmed: "bg-emerald-400 shadow-emerald-400/50",
    completed: "bg-blue-400 shadow-blue-400/50",
    cancelled: "bg-red-400 shadow-red-400/50",
  };

  return (
    <div className={`w-2 h-2 rounded-full shadow-sm ${colors[status]}`} />
  );
}
