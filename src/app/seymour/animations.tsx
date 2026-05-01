"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "improvements", label: "1. Build" },
  { id: "revenue", label: "2. Revenue" },
  { id: "business", label: "3. Numbers" },
  { id: "timeline", label: "4. Timeline" },
  { id: "value", label: "5. Bottom Line" },
];

export function StickyNav() {
  const [activeSection, setActiveSection] = useState("overview");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-3xl px-6 flex items-center justify-between">
        <span className="text-sm font-medium text-white/70">
          1034 Seymour
        </span>
        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                activeSection === item.id
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <style>{`
      .fade-section {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .fade-section.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  );
}

export function HeroCounter({
  label,
  target,
  accent,
  suffix = "",
}: {
  label: string;
  target: number;
  accent?: boolean;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1.8;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  const formatted =
    count >= 1000000
      ? `$${(count / 1000000).toFixed(count % 1000000 === 0 ? 0 : 2)}M`
      : `$${(count / 1000).toFixed(0)}K`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 ${
          accent ? "text-amber-400" : "text-white"
        }`}
      >
        {formatted}
        {suffix}
      </div>
    </motion.div>
  );
}
