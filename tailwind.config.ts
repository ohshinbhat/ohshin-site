import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070a",
        fog: "#f3f5f7",
        panel: "#0b0c0d",
        steel: "#161617",
        accent: "#df1303",
        cobalt: "#0a3566",
        muted: "#d4d4d4",
        glass: "rgba(20,24,31,0.18)",
      },
      fontFamily: {
        doto: ['"Doto"', "monospace"],
        mono: ['"IBM Plex Mono"', "monospace"],
        serif: ['"Lora"', "Georgia", "serif"],
      },
      maxWidth: {
        site: "1400px",
      },
      minHeight: {
        "screen-nav": "calc(100dvh - var(--site-nav-height, 61px))",
        "nav-row": "10.5rem",
      },
      height: {
        "nav-row": "10.5rem",
      },
      boxShadow: {
        "nav-glass":
          "0 18px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.06)",
      },
      tracking: {
        section: "0em",
      },
      keyframes: {
        "signal-cell": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "signal-cell": "signal-cell 420ms ease-out both",
      },
    },
  },
};

export default config;
