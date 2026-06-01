import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const alt = "Janet's Cleaning — Denver house & office cleaning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0d9488 0%, #0f766e 55%, #134e4a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
              color: "white",
            }}
          >
            J
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "white", fontSize: 38, fontWeight: 700 }}>
              {business.name}
            </div>
            <div style={{ color: "#99f6e4", fontSize: 22, fontWeight: 600 }}>
              {`${business.areaServed} · Hablamos Español`}
            </div>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            The cleaner who actually shows up.
          </div>
          <div style={{ color: "#ccfbf1", fontSize: 28, marginTop: 24 }}>
            Family-owned house and office cleaning · 8+ years in the Denver metro
          </div>
        </div>

        {/* Bottom: CTA pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f59e0b",
              color: "#0f172a",
              fontSize: 28,
              fontWeight: 700,
              padding: "16px 32px",
              borderRadius: 999,
            }}
          >
            {`Free Quote · ${business.phoneDisplay}`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
