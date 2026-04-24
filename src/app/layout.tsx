import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sisulabs.llc"),
  title: "Sisu Labs — AI Venture Studio",
  description:
    "Zero employees. Every operation powered by AI. We build tools that fight for people who can't afford to fight for themselves.",
  openGraph: {
    title: "Sisu Labs — AI Venture Studio",
    description:
      "Zero employees. Every operation powered by AI. We build tools that fight for people who can't afford to fight for themselves.",
    url: "https://sisulabs.llc",
    siteName: "Sisu Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sisu Labs — AI Venture Studio",
    description:
      "Zero employees. Every operation powered by AI. We build tools that fight for people who can't afford to fight for themselves.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-cyan-400/30 selection:text-white">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
