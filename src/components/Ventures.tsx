"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Status = "LIVE" | "LAUNCHING SOON" | "COMING SOON" | "IN PIPELINE";

type Venture = {
  name: string;
  tagline: string;
  description: string;
  status: Status;
  href?: string;
};

const ventures: Venture[] = [
  {
    name: "WorthMore.ai",
    tagline: "AI home appraisal dispute letters.",
    description:
      "Homeowners get Fannie Mae and FHA compliant Reconsideration of Value letters in under 10 minutes for $149 — replacing $2,000+ attorney work.",
    status: "LIVE",
    href: "https://worthmore.ai",
  },
  {
    name: "DegreeOS.ai",
    tagline: "AI degree acceleration.",
    description:
      "Adults earn accredited degrees faster and cheaper through CLEP, DSST, and TECEP exam prep — 50,000+ flashcards, an AI advisor named Merit, and career-to-readiness mapping.",
    status: "LAUNCHING SOON",
    href: "https://degreeos.ai",
  },
  {
    name: "CourageRises.com",
    tagline: "AI insurance denial appeals.",
    description:
      "Upload your denial letter, get a compliant appeal letter back. $147 — instead of weeks of phone calls and attorney retainers.",
    status: "COMING SOON",
    href: "https://couragerises.com",
  },
  {
    name: "CleanMyRecord.ai",
    tagline: "AI criminal record expungement.",
    description:
      "Upload your record, get jurisdiction-specific expungement petitions. Automating the paperwork that keeps millions of Americans locked out of jobs and housing.",
    status: "IN PIPELINE",
    href: "https://cleanmyrecord.ai",
  },
  {
    name: "PermitBot.AI",
    tagline: "AI permit filing for the trades.",
    description:
      "Nationwide permit automation for contractors, electricians, and plumbers. File once, anywhere — without the permit expeditor markup.",
    status: "IN PIPELINE",
  },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "LIVE") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] badge-live">
        <span className="live-dot" /> Live
      </span>
    );
  }
  if (status === "LAUNCHING SOON") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] badge-soon">
        <span className="soon-dot" /> Launching Soon
      </span>
    );
  }
  if (status === "COMING SOON") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] badge-soon">
        <span className="soon-dot" /> Coming Soon
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] badge-pipeline">
      In Pipeline
    </span>
  );
}

export default function Ventures() {
  return (
    <section id="ventures" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-400/80">
            <span className="h-px w-6 bg-cyan-400/60" />
            Ventures
          </div>
          <h2 className="mt-5 text-balance font-semibold tracking-[-0.025em] leading-[1.02] text-white text-[clamp(2rem,4.5vw,3.75rem)]">
            Five ventures. One operator. Zero employees.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/55 leading-relaxed">
            Each Sisu Labs venture targets an industry where regular people are forced to pay thousands for paperwork a trained AI can handle in minutes.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {ventures.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: "easeOut" }}
              className={`venture-card group relative flex flex-col justify-between gap-10 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-7 md:p-8 hover:bg-white/[0.025] ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <StatusBadge status={v.status} />
                  {v.href && (
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-cyan-300 transition"
                      aria-label={`Visit ${v.name}`}
                    >
                      Visit
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <h3 className="mt-6 text-2xl md:text-[1.65rem] font-semibold tracking-tight text-white">
                  {v.name}
                </h3>
                <p className="mt-2 text-cyan-300/90 text-sm md:text-base font-medium">
                  {v.tagline}
                </p>
                <p className="mt-5 text-white/55 leading-relaxed text-[15px] md:text-base max-w-xl">
                  {v.description}
                </p>
              </div>

              {v.href ? (
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/80 hover:text-cyan-300 transition"
                >
                  {v.href.replace(/^https?:\/\//, "")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <span className="text-sm text-white/35">
                  Details to be announced.
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
