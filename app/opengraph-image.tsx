import { ImageResponse } from "next/og";
import { profile } from "@/app/lib/data";
import { LOGO_PATH } from "@/app/components/Logo";

export const alt = `${profile.name} — ${profile.role}`;
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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(135deg, #0a0a0a 0%, #1a0808 45%, #0a0a0a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            marginBottom: 48,
            borderRadius: 25,
            backgroundImage: "linear-gradient(135deg, #ef4444, #991b1b)",
          }}
        >
          <svg width="88" height="88" viewBox="0 0 32 32" fill="none">
            <path
              d={LOGO_PATH}
              stroke="#fff"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="22.5" cy="23" r="1.9" fill="#fff" fillOpacity="0.55" />
          </svg>
        </div>

        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#ffffff" }}>
          {profile.name}
        </div>

        <div style={{ display: "flex", marginTop: 20, fontSize: 42, fontWeight: 700 }}>
          <span style={{ color: "#ef4444" }}>IT Specialist</span>
          <span style={{ color: "#e4e4e7", marginLeft: 12, marginRight: 12 }}>
            &amp;
          </span>
          <span style={{ color: "#f59e0b" }}>Full-Stack Developer</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 880,
          }}
        >
          {profile.tagline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: 24,
            color: "#71717a",
          }}
        >
          jhundaverey.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
