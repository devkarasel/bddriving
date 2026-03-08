import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      colors: {
        gold: '#F59E0B',
        'gold-light': '#FCD34D',
        'gold-dark': '#D97706',
        night: '#070B14',
        'night-2': '#0D1321',
        'night-3': '#111827',
        glass: 'rgba(255,255,255,0.06)',
        'glass-border': 'rgba(255,255,255,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 60% 50%, rgba(245,158,11,0.15) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
export default config
