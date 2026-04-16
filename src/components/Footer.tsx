export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 text-black font-semibold text-xs">
            S
          </span>
          <span className="text-sm text-white/70">Sisu Labs, LLC</span>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 text-xs text-white/45">
          <span>Nashville, TN</span>
          <a href="mailto:daniel@sisupg.com" className="hover:text-white transition">
            daniel@sisupg.com
          </a>
          <span>© {year} Sisu Labs, LLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
