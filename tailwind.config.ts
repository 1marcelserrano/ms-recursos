import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada na referência: cream + verde-escuro + laranja
        cream: "#F2EDE4",
        "cream-card": "#FBF9F4",
        forest: "#3A4A3A",
        "forest-deep": "#2C382C",
        clay: "#E07A3F",
        "clay-soft": "#E89B6C",
        ink: "#2B2B26",
        muted: "#6B6B60",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
