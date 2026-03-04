import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#0ea5e9",
          foreground: "#ffffff"
        }
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px"
      }
    }
  },
  plugins: []
} satisfies Config;
