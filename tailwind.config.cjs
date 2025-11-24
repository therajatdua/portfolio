/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        retroBg: 'rgb(var(--retro-bg) / <alpha-value>)',
        retroText: 'rgb(var(--retro-text) / <alpha-value>)',
        retroAccent: 'rgb(var(--retro-accent) / <alpha-value>)',
        retroSecondary: 'rgb(var(--retro-secondary) / <alpha-value>)',
        retroCta: 'rgb(var(--retro-cta) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
