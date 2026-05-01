"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { src: "https://pi.movoto.com/p/571/3175978_0_juQVNU_p.webp", alt: "Front exterior" },
  { src: "https://pi.movoto.com/p/571/3175978_0_fIe7IZ_p.webp", alt: "Exterior view" },
  { src: "https://pi.movoto.com/p/571/3175978_0_yFiYje_p.webp", alt: "Kitchen" },
  { src: "https://pi.movoto.com/p/571/3175978_0_rMzrzb_p.webp", alt: "Kitchen island" },
  { src: "https://pi.movoto.com/p/571/3175978_0_FzNAJQ_p.webp", alt: "Living room" },
  { src: "https://pi.movoto.com/p/571/3175978_0_fM3qjR_p.webp", alt: "Family room" },
  { src: "https://pi.movoto.com/p/571/3175978_0_REJf26_p.webp", alt: "Primary bedroom" },
  { src: "https://pi.movoto.com/p/571/3175978_0_vBYnjz_p.webp", alt: "Pool and backyard" },
];

export default function PropertyHero() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const next = () => setCurrentPhoto((i) => (i + 1) % photos.length);
  const prev = () => setCurrentPhoto((i) => (i - 1 + photos.length) % photos.length);

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

      {/* Photo Gallery */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] bg-gray-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto}
            src={photos[currentPhoto].src}
            alt={photos[currentPhoto].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Photo counter */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
          {currentPhoto + 1} / {photos.length}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentPhoto ? "bg-white w-4" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1 p-1 bg-gray-50 overflow-x-auto scrollbar-hide">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setCurrentPhoto(i)}
            className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden transition-all ${
              i === currentPhoto ? "ring-2 ring-gray-900 opacity-100" : "opacity-60 hover:opacity-90"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Property Header */}
      <div className="px-6 py-8 sm:py-10">
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
