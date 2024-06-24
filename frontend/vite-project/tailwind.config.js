/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'gradient-animation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'gradient-animation': 'gradient-animation 18s ease infinite',
      },
      backgroundSize: {
        '180': '180% 180%',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(300deg, #00bfff, #ff4c68, #ef8172)',
      },
    },
  },
  plugins: [],
}