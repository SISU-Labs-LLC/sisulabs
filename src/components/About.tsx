"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "0", label: "Human employees" },
  { value: "0", label: "Outside investors" },
  { value: "5", label: "Active ventures" },
  { value: "100%", label: "AI-operated" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-40 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-400/80">
              <span className="h-px w-6 bg-cyan-400/60" />
              About
            </div>
            <h2 className="mt-5 text-balance font-semibold tracking-[-0.025em] leading-[1.02] text-white text-[clamp(2rem,4.5vw,3.5rem)]">
              Zero employees. Zero investors. Every operation powered by AI agents.
            </h2>
            <div className="mt-8 space-y-5 text-white/60 text-lg leading-relaxed max-w-xl">
              <p>
                Sisu Labs is a holding company for AI-native consumer ventures. One founder. No headcount. No board. No runway clock.
              </p>
              <p>
                Every operation — research, engineering, content, outreach, support, ops — runs on a private mesh of AI agents. The studio ships products the way a 50-person startup ships, with the overhead of a single laptop.
              </p>
              <p className="text-white/80">
                The thesis is simple: the next generation of consumer software will be built by operators who refuse to hire.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-2 gap-px rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-black/40 p-8 md:p-10"
              >
                <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  {s.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
