"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

export default function Founder() {
  return (
    <section id="founder" className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-400/80">
              <span className="h-px w-6 bg-cyan-400/60" />
              Founder
            </div>
            <h2 className="mt-5 text-balance font-semibold tracking-[-0.025em] leading-[1.02] text-white text-[clamp(2rem,4.5vw,3.5rem)]">
              Daniel Martin
            </h2>
            <p className="mt-4 text-white/55 text-lg">
              Founder — Nashville, TN
            </p>
            <p className="mt-6 max-w-xl text-white/55 leading-relaxed">
              Operator behind every Sisu Labs venture. Builds the products, writes the prompts, ships the code, and runs the agents that run the company.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/septembermartin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/80 hover:border-white/30 hover:bg-white/[0.06] transition"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="mailto:daniel@sisupg.com"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-cyan-300 transition"
            >
              <Mail className="h-4 w-4" />
              daniel@sisupg.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
