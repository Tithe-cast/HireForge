import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Base / neutrals
        graphite: {
          950: "#0E1013",
          900: "#14161A",
          800: "#1B1E23",
          700: "#23262D",
          600: "#2E323B",
          500: "#43484F",
          400: "#6B7078",
          300: "#9297A0",
          200: "#C2C5CB",
          100: "#E4E5E8",
          50: "#F5F5F6",
        },
        paper: "#F4F3EF",
        // Primary accent - molten ember
        ember: {
          400: "#FF9A6C",
          500: "#FF7A45",
          600: "#E85F2A",
          700: "#C24B1E",
        },
        // Secondary accent - circuit blue
        circuit: {
          400: "#7CA6FF",
          500: "#4C8DFF",
          600: "#2E6FE0",
          700: "#2456B3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,16,19,0.04), 0 8px 24px -12px rgba(14,16,19,0.18)",
        "card-hover": "0 4px 8px rgba(14,16,19,0.06), 0 16px 32px -12px rgba(14,16,19,0.28)",
      },
      backgroundImage: {
        "ember-glow": "radial-gradient(120% 120% at 20% 0%, rgba(255,122,69,0.16) 0%, rgba(255,122,69,0) 55%)",
        "circuit-grid": "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
