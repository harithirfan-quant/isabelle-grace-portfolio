import { ImageResponse } from "next/og";
import { personal, hero, site } from "@/content/portfolio";

// Dynamic Open Graph image (1200x630) in the site's Swiss pink style.
// Text-only monogram lockup: no photo needed until Isabelle sends one.
export const runtime = "edge";
export const alt = `${personal.preferredName} Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PINK = "#E8306E"; // hsl(340 80% 55%), matches globals.css --accent (light)
const INK = "#141414"; // hsl(0 0% 8%), matches --foreground (light)
const DARK = "#121212"; // matches dark --background
const MUTED = "#8f8f8f";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: DARK,
          color: "#ffffff",
          fontFamily: "sans-serif",
          border: `8px solid ${PINK}`,
        }}
      >
        {/* Top row: monogram + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: PINK,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <div style={{ width: 16, height: 16, background: PINK }} />
            IG · {personal.location}
          </div>
          <div
            style={{
              fontSize: 22,
              color: MUTED,
              fontFamily: "monospace",
              letterSpacing: "0.15em",
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* Monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              width: 148,
              height: 148,
              background: PINK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            IG
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {personal.preferredName}
              <span style={{ color: PINK }}>.</span>
            </div>
            <div style={{ fontSize: 34, marginTop: 14, color: "#d9d9d9" }}>
              {site.ogTagline || personal.title}
            </div>
          </div>
        </div>

        {/* Bottom strip: social proof */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: MUTED,
          }}
        >
          {hero.socialProof.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              {i > 0 && <span style={{ color: PINK }}>{"//"}</span>}
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
