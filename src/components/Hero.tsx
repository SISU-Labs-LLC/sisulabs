"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[100svh] flex items-center">
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="noise absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10 pt-36 pb-24 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs tracking-wide text-white/70 backdrop-blur"
        >
          <span className="soon-dot" />
          <span>AI Venture Studio — Nashville, TN</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
          className="mt-8 max-w-5xl text-balance font-semibold tracking-[-0.035em] leading-[0.95] text-white text-[clamp(2.5rem,7.5vw,6.25rem)]"
        >
          We build AI that fights for people who can&apos;t afford to fight for themselves.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mt-8 max-w-2xl text-pretty text-lg md:text-xl text-white/60 leading-relaxed"
        >
          Sisu Labs finds industries where ordinary people are forced to pay professionals thousands for paperwork — and replaces that process with AI that is faster, cheaper, and more accurate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#ventures"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-cyan-300 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.6)]"
          >
            See the ventures
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/[0.05]"
          >
            About Sisu Labs
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <span className="scroll-line" />
        </motion.div>
      </div>
    </section>
  );
}
