import { ImageResponse } from "next/og";
import { personal, hero, site } from "@/content/portfolio";

// Dynamic Open Graph image (1200x630). TIP: Use 1200x630 images for OG previews.
export const runtime = "edge";
export const alt = `${personal.preferredName} Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          // Matches the site's dark theme (--background: 220 28% 14%).
          // Keep in sync with app/globals.css and the layout theme-color.
          background: "linear-gradient(135deg, #1a2032 0%, #243052 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#f59e0b",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#f59e0b",
            }}
          />
          Open to Internships · {personal.location}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            marginTop: 24,
            color: "#f59e0b",
          }}
        >
          {personal.preferredName}
        </div>
        <div style={{ fontSize: 38, marginTop: 12, color: "#e2e8f0" }}>
          {site.ogTagline || personal.title}
        </div>
        <div
          style={{
            fontSize: 26,
            marginTop: 32,
            color: "#94a3b8",
            display: "flex",
            gap: 24,
          }}
        >
          {hero.socialProof.join("  ·  ")}
        </div>
      </div>
    ),
    { ...size }
  );
}
