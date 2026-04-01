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
      },
      maxWidth: {
        site: "1400px",
      },
      minHeight: {
        "screen-nav": "calc(100dvh - var(--site-nav-height, 61px))",
      },
      height: {
        "nav-row": "10.5rem",
      },
      boxShadow: {
        "nav-glass": "0 10px 30px rgba(0,0,0,0.18)",
      },
      tracking: {
        section: "-0.08em",
      },
    },
  },
};

export default config;
