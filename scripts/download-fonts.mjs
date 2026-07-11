// Fetches static Jost 700 and Kalam 700 TTFs into scripts/.fonts (gitignored),
// for local asset generation only. Uses an old User-Agent so Google Fonts
// serves TTF (not woff2), which resvg can rasterise.

import { mkdirSync, writeFileSync } from "node:fs";

// Old Android Safari UA: Google Fonts serves raw TTF (not woff2/eot) to it,
// which is what resvg can rasterise.
const OLD_UA =
  "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";

async function ttfUrlFor(family) {
  const css = await fetch(
    `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}`,
    { headers: { "User-Agent": OLD_UA } },
  ).then((r) => r.text());
  // The old-UA endpoint returns a truetype font, but the URL has no `.ttf`
  // extension (it's the legacy /l/font?kit= endpoint). Grab the url(...) value.
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error(`No font url found for ${family}\n${css}`);
  return match[1];
}

async function download(family, outfile) {
  const url = await ttfUrlFor(family);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  // Sanity check: TrueType starts with 0x00010000, or 'true'/'ttcf'/'OTTO'.
  const sig = buf.subarray(0, 4).toString("hex");
  const ok = ["00010000", "74727565", "74746366", "4f54544f"].includes(sig);
  if (!ok || buf.length < 5000) {
    throw new Error(`${family}: unexpected font bytes (sig=${sig}, len=${buf.length})`);
  }
  writeFileSync(outfile, buf);
  console.log(`${family} -> ${outfile} (${buf.length} bytes)`);
}

mkdirSync("scripts/.fonts", { recursive: true });
await download("Jost:700", "scripts/.fonts/Jost-700.ttf");
await download("Kalam:700", "scripts/.fonts/Kalam-700.ttf");
