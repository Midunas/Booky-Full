/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
    ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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
