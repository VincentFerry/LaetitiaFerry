import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        hover: "var(--color-hover)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      screens: {
        sm: "640px",
        lg: "1024px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
