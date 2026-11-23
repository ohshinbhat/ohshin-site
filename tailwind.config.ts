import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          red: "#D3170A",
          blue: "#002855",
          black: "#000000",
          white: "#FFFFFF",
        },
        ink: "#000000",
        fog: "#FFFFFF",
        panel: "#0b0c0d",
        steel: "#161617",
        accent: "#D3170A",
        cobalt: "#002855",
        muted: "#d4d4d4",
        glass: "rgba(20,24,31,0.18)",
      },
      fontFamily: {
        doto: ['"Doto"', "monospace"],
        metric: ['"Tektur"', "monospace"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      maxWidth: {
        site: "1400px",
      },
      minHeight: {
        "screen-nav": "calc(100dvh - var(--site-nav-height, 61px))",
      },
      boxShadow: {
        "nav-glass":
          "0 18px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.06)",
      },
      tracking: {
        section: "0em",
      },
      keyframes: {
        "work-reveal": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0,28px,0)",
          },
          "68%": {
            opacity: "1",
            transform: "translate3d(0,-2px,0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0,0,0)",
          },
        },
        "reach-pulse": {
          "0%, 100%": { opacity: "0.24", transform: "scale(0.985)" },
          "50%": { opacity: "0.58", transform: "scale(1.025)" },
        },
        "reach-sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "glass-breathe": {
          "0%, 100%": {
            boxShadow:
              "0 24px 90px rgba(0,0,0,0.22), 0 0 34px rgba(211,23,10,0.09), inset 0 1px 0 rgba(255,255,255,0.11)",
          },
          "38%": {
            boxShadow:
              "0 30px 108px rgba(0,0,0,0.28), 0 0 42px rgba(211,23,10,0.13), inset 0 1px 0 rgba(255,255,255,0.15)",
          },
          "68%": {
            boxShadow:
              "0 34px 124px rgba(0,0,0,0.31), 0 0 58px rgba(211,23,10,0.16), inset 0 1px 0 rgba(255,255,255,0.17)",
          },
        },
        "glass-sheen": {
          "0%": { opacity: "0", transform: "translateX(-150%) skewX(-18deg)" },
          "18%": { opacity: "0" },
          "45%": { opacity: "1" },
          "74%": { opacity: "0.22" },
          "100%": { opacity: "0", transform: "translateX(170%) skewX(-18deg)" },
        },
      },
      animation: {
        "work-reveal": "work-reveal 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "reach-pulse": "reach-pulse 7.2s ease-in-out infinite",
        "reach-sweep": "reach-sweep 3.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "glass-breathe": "glass-breathe 11s cubic-bezier(0.45, 0, 0.2, 1) infinite",
        "glass-sheen": "glass-sheen 7.8s cubic-bezier(0.45, 0, 0.2, 1) infinite",
      },
    },
  },
};

export default config;
