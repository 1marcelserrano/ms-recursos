import type { Config } from "tailwindcss";

// MSCREATIVE.SYSTEMS™ — Design System V3.0 (Chumbo Puro + Lima Ácida)
// Fonte: design-system/css/tokens.css (DEC-001/004/020/023/024)
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0E", // base
        "bg-end": "#111114", // fim do gradiente
        surface: "#16181F", // cards
        "surface-2": "#1C1F28", // hover
        cream: "#B2A898", // corpo + headlines (warm low-saturation)
        ink: "#0A0A0E", // texto sobre lima
        lima: "#B4C636", // acento principal (DEC-020)
        "lima-deep": "#6A7820",
        gold: "#E8C547", // cerimonial — só em selo
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "4px",
        ctl: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
