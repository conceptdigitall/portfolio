import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#060606",
          900: "#0C0C0D",
          850: "#121214",
          800: "#18181B",
          700: "#27272A",
          600: "#3F3F46",
        },
        gold: {
          300: "#FDE047",
          400: "#FACC15",
          500: "#FFB800",
          600: "#EAB308",
          700: "#CA8A04",
        },
        automotive: {
          carbon: "#151518",
          border: "#232328",
          accent: "#FFB800",
          hover: "#FFC72C",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Outfit", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-once": "ping 1s cubic-bezier(0, 0, 0.2, 1) 1",
        "bounce-subtle": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
