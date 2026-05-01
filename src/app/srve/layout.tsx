export default function SrveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen font-sans antialiased">
      {children}
    </div>
  );
}
