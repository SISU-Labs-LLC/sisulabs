import { ImageResponse } from "next/og";

export const alt = "Sisu Labs — AI Venture Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#000",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 400px at 15% 20%, rgba(34, 211, 238, 0.22), transparent 60%), radial-gradient(500px 400px at 85% 80%, rgba(59, 130, 246, 0.18), transparent 60%), radial-gradient(400px 300px at 70% 20%, rgba(245, 158, 11, 0.08), transparent 60%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #22d3ee, #1d4ed8)",
              color: "#000",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
            Sisu Labs
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 1 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.02,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            We build AI that fights for people who can&apos;t afford to fight for themselves.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              display: "flex",
              gap: 18,
              alignItems: "center",
            }}
          >
            <span>Zero employees</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span>Every operation powered by AI</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span>Nashville, TN</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
