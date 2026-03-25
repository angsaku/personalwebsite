import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Satriya Kurniawan — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#020618",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 80px",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Red glow blob */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 200,
            width: 500,
            height: 500,
            background: "#E5212E",
            borderRadius: "50%",
            filter: "blur(180px)",
            opacity: 0.12,
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E5212E",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "#6b7280",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Available for projects
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
          <span style={{ fontSize: 96, fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>
            Crafting
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, lineHeight: 1 }}>
            <span style={{ fontSize: 96, fontWeight: 700, color: "#ffffff" }}>Digital</span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 300,
                fontStyle: "italic",
                color: "transparent",
                WebkitTextStroke: "2px #E5212E",
              }}
            >
              Experience
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
            <span style={{ fontSize: 96, fontWeight: 700, color: "#ffffff" }}>
              That Matter
            </span>
            <span style={{ fontSize: 96, fontWeight: 700, color: "#E5212E" }}>.</span>
          </div>
        </div>

        {/* Divider + stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[
            { value: "5+", label: "Years of Experience" },
            { value: "40+", label: "Projects Delivered" },
            { value: "20+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 12, color: "#6b7280", letterSpacing: "0.05em" }}>
                {stat.label}
              </span>
            </div>
          ))}

          {/* Domain */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "#374151", letterSpacing: "0.05em" }}>
              angsaku.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
