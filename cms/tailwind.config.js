/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['inter serif','sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'prism': ["'Tilt Prism'"],
        'bugee': ['"Bungee Outline"']
      }
    },
    animation: {
      blob: "blob 7s infinite",
    },
    keyframes: {
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)"
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)"
        },
        "66%": {
          transform: "translate(-20px, 20px)  scale(0.9)"
        },
        "100%": {
          transform: "translate(0px, 0px) scale(1)"
        }
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("@tailwindcss/forms")
  ],
}
