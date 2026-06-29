import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-card": "var(--bg-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "border-color": "var(--border-color)",
        "border-brand": "var(--border-brand)",
        "section-alt": "var(--section-alt)",
        pm: "#6055D9",
        pm2: "#7B6EE8",
        pm3: "#4038B0",
        bg: "#0B0B14",
        bg2: "#0F0E20",
        bg3: "#13122A",
        surface: "#1A1936",
        border: "rgba(255,255,255,0.08)",
        border2: "rgba(96,85,217,0.25)",
        text1: "#FFFFFF",
        text2: "rgba(255,255,255,0.65)",
        text3: "rgba(255,255,255,0.35)",
      },
      fontFamily: {
        sans: ["Inter Tight", "sans-serif"],
        syne: ["var(--ff-syne)", "sans-serif"],
        playfair: ["var(--ff-playfair)", "serif"],
        dm: ["var(--ff-dm)", "sans-serif"],
      },
    },
  },
} satisfies Config;
