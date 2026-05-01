"use client";

import { motion } from "framer-motion";

export default function PropertyHero() {
  return (
    <section className="relative">
      {/* Top bar */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.compass.com/m/13/de2d1158-70c0-4a88-bab7-5d13cda0e219/300x300.webp"
            alt="Jordyn Hollingsworth"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">Jordyn Hollingsworth</div>
            <div className="text-xs text-gray-400">Compass &middot; Affiliate Broker</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>678-448-7669</span>
          <span className="hidden sm:inline">jordyn.hollingsworth@compass.com</span>
        </div>
      </div>

      {/* Property Header */}
      <div className="px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Under Contract
              </span>
              <span className="text-xs text-gray-400">Listed Apr 28, 2026</span>
            </div>

            {/* Address + Price */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
                  1422 Primrose Lane
                </h1>
                <p className="text-gray-500 mt-1">Franklin, TN 37064 &middot; West Harpeth</p>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-semibold text-gray-900">
                  $1,599,990
                </div>
                <div className="text-xs text-gray-400 mt-0.5">List Price</div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-8 flex flex-wrap gap-6 sm:gap-10">
              <QuickStat label="Beds" value="6" />
              <QuickStat label="Baths" value="5" />
              <QuickStat label="Sq Ft" value="4,305" />
              <QuickStat label="Built" value="2005" />
              <QuickStat label="Garage" value="3-Car" />
              <QuickStat label="Lot" value="Gated" />
            </div>

            {/* Key features */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Pool + Waterfall",
                "Renovated Kitchen",
                "Renovated Baths",
                "Bonus Room",
                "3-Car Garage",
                "Gated Community",
                "Franklin High (10/10)",
                "2mi to Main St",
              ].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 border border-gray-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
