import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      colors: {
        ink: "#0B0B0F",
        panel: "#111115",
        copper: "#F59E57",
        ember: "#FF6A3D",
        teal: "#14B8A6",
        emerald: "#34D399"
      },
      boxShadow: {
        copper: "0 0 42px rgba(245, 158, 87, 0.28)",
        teal: "0 0 50px rgba(20, 184, 166, 0.2)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 60px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
