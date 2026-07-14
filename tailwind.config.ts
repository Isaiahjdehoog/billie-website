import type { Config } from "tailwindcss";

// Brand tokens are hardcoded here on purpose. This site has zero coupling to the
// BiLLiE monorepo - do NOT import from @billie/ui or anything in the app repo.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ledger: "#1A5D3A", // primary green
        clay: "#C2553D", // accent
        ink: "#1C1917", // body text
        bone: "#FAF5EC", // page background
        paper: "#FFFFFF",
        mist: "#A8A29E", // muted text, hairlines
      },
      fontFamily: {
        // Body AND every numeral: Helvetica / Arial system stack. No webfont.
        sans: [
          "-apple-system",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        // Label voice + step numbers: JetBrains Mono (loaded via next/font).
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
        // Wordmark only: Kalam (loaded via next/font).
        wordmark: ["var(--font-kalam)", "cursive"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
