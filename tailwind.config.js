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
        'inter': ['inter','sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'prism': ["'Tilt Prism'"],
        'bugee': ['"Bungee Outline"']
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("@tailwindcss/forms")
  ],
}
