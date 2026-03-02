/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        elago: {
          dark:   '#0E1117',
          panel:  '#141820',
          card:   '#1C2230',
          border: '#252D3D',
          accent: '#2ECC9A',
          gold:   '#F0B429',
          muted:  '#6B7A99',
          light:  '#E8EDF7',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
