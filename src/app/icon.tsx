import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #22d3ee, #1d4ed8)",
          color: "#000",
          fontSize: 40,
          fontWeight: 700,
          borderRadius: 12,
          letterSpacing: -1,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
