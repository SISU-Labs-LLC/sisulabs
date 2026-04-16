"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10 py-4">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 text-black font-semibold text-sm shadow-[0_0_20px_-5px_rgba(34,211,238,0.6)]">
            S
          </span>
          <span className="text-sm font-medium tracking-tight text-white/90 group-hover:text-white">
            Sisu Labs
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-white/60">
          <a href="#ventures" className="hover:text-white transition">Ventures</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#founder" className="hover:text-white transition">Founder</a>
        </nav>
        <a
          href="mailto:daniel@sisupg.com"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/80 hover:border-white/30 hover:bg-white/[0.06] transition"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
