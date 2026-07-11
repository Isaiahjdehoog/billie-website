// Asset generator: favicon.ico + apple-touch-icon.png from the supplied mark
// (public/logo-source.png - Kalam "B" in Bone on a solid Ledger circle, 1000x1000,
// transparent corners).
//
// Run locally with the temporary tooling installed:
//   pnpm add -D @resvg/resvg-js png-to-ico
//   node scripts/gen-assets.mjs
//   pnpm remove @resvg/resvg-js png-to-ico
//
// The OG image (public/og-image.png) is the Kalam wordmark on Bone and is NOT
// regenerated here - it is correct and must be left untouched. Its generator is
// kept below behind `--og` for provenance only (needs scripts/.fonts/Kalam-700.ttf
// via scripts/download-fonts.mjs).
//
// The generated files in public/ are committed. This tooling is NOT required to
// build or deploy the site.

import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const LEDGER = "#1A5D3A";
const BONE = "#FAF5EC";
const SRC = "public/logo-source.png";

// --- favicon.ico: the supplied mark, downscaled AS-IS (keep circle + transparent
// corners). sips preserves alpha; png-to-ico packs 16/32/48. ---
function resize(size) {
  const out = `public/.favtmp-${size}.png`;
  execFileSync("sips", ["-z", String(size), String(size), SRC, "--out", out]);
  return out;
}
const paths = [16, 32, 48].map(resize);
writeFileSync("public/favicon.ico", await pngToIco(paths));
for (const p of paths) rmSync(p);

// --- apple-touch-icon.png (180): DIFFERENT treatment. iOS applies its own
// rounded-square mask, so a transparent-cornered circle would double-round.
// Composite the SAME source B onto a SOLID Ledger square (corners filled, no
// circle outline), scaled so the B is ~70% of the square with even padding.
// Using the source image (not a re-rendered glyph) keeps it identical to the
// favicon. The source B is ~54% of its 1000px frame and is centred, so scaling
// the whole source to ~1.30x fills the B to ~70% while the Ledger circle bleeds
// off the edges into the matching Ledger background. ---
const APPLE = 180;
const scale = 1.3;
const disp = Math.round(APPLE * scale);
const xOff = Math.round((APPLE - disp) / 2);
// The source B sits slightly high in its frame; nudge down a few px so the
// vertical padding reads as even on a home screen.
const yOff = xOff + 6;
const srcB64 = readFileSync(SRC).toString("base64");
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${APPLE}" height="${APPLE}" viewBox="0 0 ${APPLE} ${APPLE}">
  <rect width="${APPLE}" height="${APPLE}" fill="${LEDGER}"/>
  <image xlink:href="data:image/png;base64,${srcB64}" x="${xOff}" y="${yOff}" width="${disp}" height="${disp}"/>
</svg>`;
writeFileSync(
  "public/apple-touch-icon.png",
  Buffer.from(new Resvg(appleSvg).render().asPng()),
);

console.log("Generated: favicon.ico, apple-touch-icon.png");

// --- OG image (provenance only; run with `--og`, do not use in icon passes) ---
if (process.argv.includes("--og")) {
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BONE}"/>
  <text x="600" y="375" text-anchor="middle" font-family="Kalam" font-weight="700" font-size="210" fill="${LEDGER}">BiLLiE</text>
</svg>`;
  writeFileSync(
    "public/og-image.png",
    Buffer.from(
      new Resvg(ogSvg, {
        font: {
          fontFiles: ["scripts/.fonts/Kalam-700.ttf"],
          loadSystemFonts: false,
          defaultFontFamily: "Kalam",
        },
      })
        .render()
        .asPng(),
    ),
  );
  console.log("Generated: og-image.png");
}
