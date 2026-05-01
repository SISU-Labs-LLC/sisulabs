import type { Metadata } from "next";
import SrvePitch from "./pitch";

export const metadata: Metadata = {
  title: "SRVE — One Link. Win the Listing. Prove the Work.",
  description: "The unified listing presentation and seller dashboard that replaces 4 tools with one beautiful link.",
  robots: { index: false, follow: false },
};

export default function SrvePage() {
  return <SrvePitch />;
}
