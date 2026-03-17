import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1C1C1E",
          50: "#F7F6F3",
          100: "#EDECE8",
          200: "#E0DED8",
          300: "#C7C4BC",
          400: "#A8A49B",
          500: "#8A857B",
          600: "#6E6A62",
          700: "#53504A",
          800: "#3A3835",
          900: "#1C1C1E",
        },
        stone: {
          warm: "#F7F6F3",
          light: "#EDECE8",
          mid: "#E0DED8",
          border: "#D4D1CB",
        },
        mineral: {
          DEFAULT: "#8B7355",
          light: "#A8916F",
          dark: "#6F5B42",
          muted: "#B5A48C",
          wash: "#F5F0E8",
        },
        confidence: {
          dokumentert: "#4A7C59",
          opplyst: "#5B7FA5",
          utledet: "#B8915A",
          uavklart: "#9B9590",
        },
        avvik: "#C45D4A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "3.25rem",
          {
            lineHeight: "1.05",
            letterSpacing: "-0.03em",
            fontWeight: "700",
          },
        ],
        display: [
          "2.5rem",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.025em",
            fontWeight: "700",
          },
        ],
        "display-sm": [
          "2rem",
          {
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        heading: [
          "1.375rem",
          {
            lineHeight: "1.3",
            letterSpacing: "-0.015em",
            fontWeight: "600",
          },
        ],
        "heading-sm": [
          "1.125rem",
          {
            lineHeight: "1.35",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "body-lg": ["1.0625rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        micro: [
          "0.6875rem",
          {
            lineHeight: "1.3",
            fontWeight: "500",
            letterSpacing: "0.02em",
          },
        ],
      },
      borderRadius: {
        card: "10px",
        button: "8px",
        badge: "5px",
        input: "8px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,28,30,0.04), 0 2px 8px rgba(28,28,30,0.03)",
        "card-hover":
          "0 2px 4px rgba(28,28,30,0.06), 0 4px 16px rgba(28,28,30,0.04)",
        elevated:
          "0 4px 12px rgba(28,28,30,0.08), 0 1px 3px rgba(28,28,30,0.04)",
        "input-focus": "0 0 0 3px rgba(139,115,85,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
