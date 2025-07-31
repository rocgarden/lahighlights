// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  safelist: ["outline-text"], // ✅ Add this line
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 10s ease infinite',
        'pulse-slow': 'pulseSlow 8s infinite ease-in-out',

      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
          pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
          wiggle :{
         '0%, 100%': { transform: 'rotate(-3deg)' ,},
         '50%': { transform: 'rotate(3deg)'}
      }
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
