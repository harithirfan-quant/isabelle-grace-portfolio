import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { personal, hero, site } from "@/content/portfolio";

// Open Graph share card (1200x630) in the site's Swiss pink style, shown when
// the link is pasted into WhatsApp, LinkedIn, X, Telegram, iMessage etc.
// Rendered once at build time, so it is a plain static PNG on the live site.
// EDIT THIS: the portrait is personal.photo (/public/isabelle-photo.jpg).
// Text comes from content/portfolio.ts.
export const alt = `${personal.preferredName}, ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PINK = "#E8306E"; // hsl(340 80% 55%), matches globals.css --accent (light)
const DARK = "#121212"; // matches dark --background
const MUTED = "#8f8f8f";

// Portrait crop inside the 290x400 frame (source photo is 900x1273).
const PHOTO_W = 466;
const PHOTO_H = 659;
const PHOTO_TOP = -185;
const PHOTO_LEFT = -108;

export default async function OGImage() {
  const photo = await readFile(join(process.cwd(), "public", personal.photo));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const tagline = site.ogTagline || personal.title;
  const domain = site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: DARK,
          color: "#ffffff",
          fontFamily: "sans-serif",
          border: `8px solid ${PINK}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: 720,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: PINK,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <div style={{ width: 14, height: 14, background: PINK }} />
            PORTFOLIO · {personal.location}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {personal.preferredName}
              <span style={{ color: PINK }}>.</span>
            </div>
            {/* Each "|" part of the tagline gets its own line, so it never
                wraps mid-phrase next to the portrait. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 28,
                marginTop: 22,
                color: "#d9d9d9",
                lineHeight: 1.3,
              }}
            >
              {tagline.split(" | ").map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                fontSize: 20,
                color: "#d9d9d9",
              }}
            >
              {hero.socialProof.map((item, i) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {i > 0 && <span style={{ color: PINK }}>{"//"}</span>}
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: MUTED,
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              {domain}
            </div>
          </div>
        </div>

        {/* Portrait with an offset pink block behind it (Swiss poster look).
            The source photo has a lot of empty space above her head, so it is
            drawn larger than the frame and shifted up to crop to head and
            shoulders. EDIT THIS: retune PHOTO_* if the photo changes. */}
        <div style={{ display: "flex", position: "relative", width: 304, height: 414 }}>
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              width: 290,
              height: 400,
              background: PINK,
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 0,
              left: 0,
              width: 290,
              height: 400,
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              width={PHOTO_W}
              height={PHOTO_H}
              alt=""
              style={{ position: "absolute", top: PHOTO_TOP, left: PHOTO_LEFT }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
