/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray:"#F4F5F7",
        customDarkGray:"#5E6C84"
      },
    },
  },
  plugins: [],
}