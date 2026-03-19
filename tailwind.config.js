/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cave: {
          deep: "#0A0514",
          mid: "#110820",
          surface: "#1A1030",
        },
        amethyst: {
          deep: "#4C1D95",
          DEFAULT: "#7C3AED",
          bright: "#A855F7",
          light: "#C084FC",
          pale: "#DDD6FE",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FDE68A",
          dim: "#D97706",
        },
        teal: {
          magic: "#14B8A6",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
