/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '128': '32rem',
        '144': '36rem',
        '166': '48rem',
        '188': '54rem'
      }
    },
    screens: {
      'sm': '375px',
      // => @media (min-width: 667px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
