export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen font-sans">
      {children}
    </div>
  );
}
