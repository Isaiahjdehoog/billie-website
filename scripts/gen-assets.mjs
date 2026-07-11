// One-off asset generator: favicon (.ico + .svg), apple-touch-icon, og-image.
//
// Run locally with the temporary tooling installed:
//   node scripts/download-fonts.mjs      # fetches Jost + Kalam TTFs into .fonts
//   pnpm add -D @resvg/resvg-js png-to-ico
//   node scripts/gen-assets.mjs
//   pnpm remove @resvg/resvg-js png-to-ico
//
// The generated PNG/ICO/SVG files in public/ are committed. This script and its
// tooling are NOT required to build or deploy the site.

import { mkdirSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const LEDGER = "#1A5D3A";
const BONE = "#FAF5EC";

const JOST = "scripts/.fonts/Jost-700.ttf";
const KALAM = "scripts/.fonts/Kalam-700.ttf";

// NOTE: resvg-js 2.6.x ignores `fontBuffers` - use `fontFiles` (paths).
// resvg renders at the SVG's width/height attributes; viewBox keeps the artwork
// coordinates fixed so a single design scales cleanly to any output size.
function renderPng(svg, fontFile, defaultFontFamily) {
  const resvg = new Resvg(svg, {
    font: { fontFiles: [fontFile], loadSystemFonts: false, defaultFontFamily },
    background: "rgba(0,0,0,0)",
  });
  return Buffer.from(resvg.render().asPng());
}

// Favicon / apple-touch: Bone "B" (Jost 700) on a full-bleed Ledger square.
// Full-bleed + opaque so iOS can apply its own corner mask without artefacts.
function faviconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${LEDGER}"/>
  <text x="256" y="366" text-anchor="middle" font-family="Jost" font-weight="700" font-size="300" fill="${BONE}">B</text>
</svg>`;
}

// OG image: "BiLLiE" wordmark (Kalam 700, Ledger) on Bone, 1200x630.
function ogSvg(width) {
  const height = Math.round((width * 630) / 1200);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BONE}"/>
  <text x="600" y="375" text-anchor="middle" font-family="Kalam" font-weight="700" font-size="210" fill="${LEDGER}">BiLLiE</text>
</svg>`;
}

// favicon.svg for modern browsers (rounded, generic font stack).
const faviconSvgFile = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${LEDGER}"/>
  <text x="256" y="366" text-anchor="middle" font-family="Jost, Futura, 'Century Gothic', sans-serif" font-weight="700" font-size="300" fill="${BONE}">B</text>
</svg>`;

mkdirSync("public", { recursive: true });

// favicon.ico packed from 16/32/48 px renders
const icoBuffer = await pngToIco([
  renderPng(faviconSvg(16), JOST, "Jost"),
  renderPng(faviconSvg(32), JOST, "Jost"),
  renderPng(faviconSvg(48), JOST, "Jost"),
]);
writeFileSync("public/favicon.ico", icoBuffer);

// apple-touch-icon (180x180)
writeFileSync("public/apple-touch-icon.png", renderPng(faviconSvg(180), JOST, "Jost"));

// SVG favicon
writeFileSync("public/favicon.svg", faviconSvgFile);

// OG image (1200x630)
writeFileSync("public/og-image.png", renderPng(ogSvg(1200), KALAM, "Kalam"));

console.log("Generated: favicon.ico, favicon.svg, apple-touch-icon.png, og-image.png");
