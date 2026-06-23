import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#0A0A0C",
        darkCard: "#121215",
        darkBorder: "#1F1F23",
        lightBg: "#FAF9F6",
        lightCard: "#FFFFFF",
        lightBorder: "#E5E5E0",
        accent: "#6366F1",
        accentHover: "#4F46E5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
} satisfies Config;
