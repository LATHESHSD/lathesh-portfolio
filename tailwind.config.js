/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0F0F11",
        card: "#141416",
        primary: "#3B82F6",
        accent: "#10B981",
        purple: "#8B5CF6",
        pink: "#EC4899",
        muted: "#A1A1AA",
        border: "#1F1F23",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        float: "float 20s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};