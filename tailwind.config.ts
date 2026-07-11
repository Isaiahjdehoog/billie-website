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
        // Body: Helvetica / Arial system stack
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        // Headers: Jost (loaded via next/font), Futura substitute
        display: ["var(--font-jost)", '"Futura"', '"Century Gothic"', "sans-serif"],
        // Wordmark only: Kalam (loaded via next/font)
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
