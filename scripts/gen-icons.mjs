/**
 * Regenerates the favicon (app/icon.png) and apple touch icon
 * (app/apple-icon.png) as a pink Swiss monogram.
 *
 * Run: node scripts/gen-icons.mjs
 * (Font downloaded separately; edit FONT_PATH / design here as needed.)
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";

const FONT_PATH = process.env.FONT_PATH || "/tmp/Poppins-Bold.ttf";
const PINK = "#E8306E"; // hsl(340 80% 55%), matches globals.css --accent (light)

const fontB64 = readFileSync(FONT_PATH).toString("base64");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <style>
    @font-face {
      font-family: "Monogram";
      src: url(data:font/truetype;base64,${fontB64}) format("truetype");
      font-weight: 700;
    }
  </style>
  <rect width="512" height="512" fill="${PINK}"/>
  <text x="256" y="300" font-family="Monogram, sans-serif" font-size="244" font-weight="700" fill="#ffffff" text-anchor="middle">IG</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("app/icon.png");
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile("app/apple-icon.png");

console.log("wrote app/icon.png + app/apple-icon.png");
