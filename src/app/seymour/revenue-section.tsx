"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SwimplyCalculator from "./calculator";

export type RevenueFilter = "all" | "swimply" | "winter" | "rental";

const streams: {
  id: RevenueFilter;
  icon: string;
  title: string;
  description: string;
  color: string;
  borderColor: string;
}[] = [
  {
    id: "swimply",
    icon: "☀️",
    title: "Swimply + Direct",
    description:
      "Hourly pool, hot tub, and patio bookings at $100/hr. Luxury listing with professional photography. Mix of platform and direct bookings.",
    color: "amber",
    borderColor: "border-amber-500/30 bg-amber-500/[0.06]",
  },
  {
    id: "winter",
    icon: "❄️",
    title: "Winter Club",
    description:
      "Private memberships at $300/month for hot tub and sauna access (Phase 2). 5 hours included, book online anytime.",
    color: "purple",
    borderColor: "border-purple-500/30 bg-purple-500/[0.06]",
  },
  {
    id: "rental",
    icon: "🏠",
    title: "Rental Increase",
    description:
      "2BR accessory apartment increases from $1,200 to $1,500/month with completed exterior renovation. Immediate.",
    color: "cyan",
    borderColor: "border-cyan-500/30 bg-cyan-500/[0.06]",
  },
];

export default function RevenueSection() {
  const [filter, setFilter] = useState<RevenueFilter>("all");

  return (
    <div>
      {/* Stream Cards — clickable filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
        {streams.map((stream) => {
          const isActive = filter === stream.id;
          const isDimmed = filter !== "all" && filter !== stream.id;

          return (
            <button
              key={stream.id}
              onClick={() =>
                setFilter(filter === stream.id ? "all" : stream.id)
              }
              className={`rounded-xl border p-5 text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? stream.borderColor
                  : isDimmed
                  ? "border-white/5 bg-white/[0.01] opacity-40"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="text-2xl mb-2">{stream.icon}</div>
              <h4
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? stream.color === "amber"
                      ? "text-amber-400"
                      : stream.color === "purple"
                      ? "text-purple-400"
                      : "text-cyan-400"
                    : "text-white/80"
                }`}
              >
                {stream.title}
              </h4>
              <p className="text-xs text-white/40 mt-2 leading-relaxed">
                {stream.description}
              </p>
              {isActive && (
                <div className="mt-3 text-xs text-white/30 flex items-center gap-1">
                  <span>Click again to show all</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter indicator */}
      <AnimatePresence>
        {filter !== "all" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-sm text-white/50">
                Showing:{" "}
                <span className="text-white/80 font-medium">
                  {streams.find((s) => s.id === filter)?.title}
                </span>{" "}
                only
              </span>
              <button
                onClick={() => setFilter("all")}
                className="text-xs text-white/40 hover:text-white/70 px-2 py-1 rounded border border-white/10 hover:border-white/20 transition-colors"
              >
                Show all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculator */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-2">
          Interactive Income Calculator
        </h3>
        <p className="text-sm text-white/40 mb-8">
          Drag the sliders to model different scenarios. Click a revenue stream above to isolate it.
        </p>
        <SwimplyCalculator filter={filter} />
      </div>
    </div>
  );
}
