/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '89': '89%',
        '128': '32rem',
        '144': '36rem',
        '166': '48rem',
        '188': '54rem'
      }
    },
  },
  plugins: [],
}
// ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],