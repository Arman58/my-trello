/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        customGray:"#F4F5F7",
        customDarkGray:"#5E6C84"
      },
    },
  },
  plugins: [],
}