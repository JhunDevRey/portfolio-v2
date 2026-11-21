import { ImageResponse } from "next/og";
import { profile } from "@/app/lib/data";

export const alt = `${profile.name} | ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b0f0e",
          color: "#eef1ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 20, height: 20, backgroundColor: "#c6f05a", marginRight: 16 }} />
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex" }}>Web tools and</div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#c6f05a" }}>automations</span>
            <span>&nbsp;for</span>
          </div>
          <div style={{ display: "flex" }}>real client work.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(238,241,234,0.18)",
            paddingTop: 28,
            fontSize: 26,
            color: "#98a09a",
          }}
        >
          <span>{profile.role}</span>
          <span>jhundaverey.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
