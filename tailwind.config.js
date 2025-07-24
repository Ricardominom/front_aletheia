/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#151f24",
        card: "#0E1E24",
        primary: "#4B7BE5",
        secondary: "#6B8EE7",
        tertiary: "#8BA4EA",
        "accent-teal": "#3E9B9B",
        "accent-pink": "#F88379",
        navy: {
          100: "#E6E8ED",
          200: "#BFC4D3",
          300: "#98A0B9",
          400: "#717C9F",
          500: "#4A5885",
          600: "#3B466A",
          700: "#2C3450",
          800: "#1D2235",
          900: "#0E111B",
          950: "#070810",
        },
      },
      boxShadow: {
        neon: "0 0 10px rgba(75, 123, 229, 0.15)",
        "neon-strong": "0 0 15px rgba(75, 123, 229, 0.2)",
        card: "0 10px 30px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 15px 40px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "float-slow": "float 30s ease-in-out infinite",
        "float-medium": "float 25s ease-in-out infinite 1s",
        "float-fast": "float 20s ease-in-out infinite 0.5s",
        "float-faster": "float 15s ease-in-out infinite 0.25s",
        "float-fastest": "float 10s ease-in-out infinite 0.1s",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s forwards",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "float-medium": "float-medium 15s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "move-x": "move-x 45s linear infinite",
        "move-x-slow": "move-x 60s linear infinite",
        "move-x-fast": "move-x 30s linear infinite",
        "move-y": "move-y 45s linear infinite",
        "move-y-slow": "move-y 60s linear infinite",
        "move-y-fast": "move-y 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(15px, -15px)" },
          "50%": { transform: "translate(0, -30px)" },
          "75%": { transform: "translate(-15px, -15px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "move-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(100px)" },
        },
        "move-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(30px, -30px) rotate(120deg)" },
          "66%": { transform: "translate(-20px, 20px) rotate(240deg)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-40px, -20px) scale(1.1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-card":
          "linear-gradient(180deg, var(--card) 0%, rgba(14, 30, 36, 0.8) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};