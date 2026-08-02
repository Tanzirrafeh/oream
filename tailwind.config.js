/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00D97E",
          hover: "#00b569",
          cyan: "#00D9FF",
          purple: "#9D00FF",
          darkBg: "#1A1A1A",
          panelBg: "#1F1F1F",
          darker: "#151515",
          footerBg: "#111111",
          border: "rgba(255, 255, 255, 0.08)"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
