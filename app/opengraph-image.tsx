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
          backgroundColor: "#100f0d",
          color: "#f1efe8",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>{profile.name}</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex" }}>I build web apps and systems</div>
          <div style={{ display: "flex" }}>
            <span>with&nbsp;</span>
            <span style={{ color: "#ff7f5c" }}>automations</span>
            <span style={{ marginLeft: 2 }}>for</span>
          </div>
          <div style={{ display: "flex" }}>automated workflows.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(241,239,232,0.18)",
            paddingTop: 28,
            fontSize: 26,
            color: "#a3a097",
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
