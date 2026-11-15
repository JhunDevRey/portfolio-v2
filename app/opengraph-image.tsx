import { ImageResponse } from "next/og";
import { profile } from "@/app/lib/data";

export const alt = profile.name;
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
          justifyContent: "flex-end",
          padding: 96,
          backgroundColor: "#ffffff",
          color: "#171717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600 }}>{profile.name}</div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 36, color: "#6b6b6b" }}>
          {profile.role}, {profile.location}
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 28, color: "#6b6b6b" }}>
          jhundaverey.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
