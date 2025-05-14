// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  safelist: ["outline-text"], // ✅ Add this line
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 10s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      zIndex: {
        100: "100",
      },
      fontFamily: {
        bakbak: ['"Bakbak One"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
