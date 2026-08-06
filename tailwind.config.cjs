/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Cambria', 'serif'],
        press: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        // Semantic Theme Tokens
        themeBg: 'var(--theme-bg)',
        themeText: 'var(--theme-text)',
        themeTextMuted: 'var(--theme-text-muted)',
        themeBorder: 'var(--theme-border)',
        themeCardBg: 'var(--theme-card-bg)',
        brandAccent: '#E8A248',
        
        // Preserve legacy tokens for compatibility
        bgLight: 'var(--theme-bg)',
        bgDark: 'var(--theme-bg)',
        textLight: 'var(--theme-text)',
        textDark: 'var(--theme-text)',
        borderLight: 'var(--theme-border)',
        borderDark: 'var(--theme-border)',
        cardLight: 'var(--theme-card-bg)',
        cardDark: 'var(--theme-card-bg)',
        textMutedLight: 'var(--theme-text-muted)',
        textMutedDark: 'var(--theme-text-muted)',
        
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
