import { ImageResponse } from "next/og";

export const alt = "AutoSkeleton — Beautiful Loading Skeletons for React";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1033 0%, #0f0a1f 55%, #1a0f2e 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 108,
              height: 108,
              borderRadius: 22,
              background: "#18181B",
              display: "flex",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 22, left: 22, width: 26, height: 26, borderRadius: 13, background: "#7C3AED", display: "flex" }} />
            <div style={{ position: "absolute", top: 18, left: 58, width: 36, height: 11, borderRadius: 5, background: "#E5E7EB", display: "flex" }} />
            <div style={{ position: "absolute", top: 36, left: 58, width: 24, height: 11, borderRadius: 5, background: "#52525B", display: "flex" }} />
            <div style={{ position: "absolute", top: 60, left: 18, width: 72, height: 11, borderRadius: 5, background: "#E5E7EB", display: "flex" }} />
            <div style={{ position: "absolute", top: 78, left: 18, width: 54, height: 11, borderRadius: 5, background: "#52525B", display: "flex" }} />
          </div>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 700, letterSpacing: -2 }}>
            <span style={{ color: "#ffffff" }}>Auto</span>
            <span style={{ color: "#a78bfa" }}>Skeleton</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 32,
            color: "#c4b5fd",
            maxWidth: 880,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Beautiful, TypeScript-first loading skeletons for React
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 22,
            color: "#7c6a9c",
          }}
        >
          26 components · zero config · fully themeable
        </div>
      </div>
    ),
    { ...size },
  );
}
