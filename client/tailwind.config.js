/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parlour: {
          lightBg: '#FFF0F5',       // Soft Lavender Blush Pink
          lightCard: '#FFFFFF',
          darkBg: '#121224',        // Deep luxury purple-black
          darkCard: '#1A1A2E',      // Card purple-black
          darkCardHover: '#23233D',
          gold: '#D4AF37',          // Rich metallic gold
          goldLight: '#F3E5AB',     // Champagne gold
          goldDark: '#AA820A',
          pink: '#EC4899',          // Vibrant rose/magenta
          pinkDark: '#BE185D',
          pinkSoft: '#FCE7F3',
          neonPink: '#FF2E93',      // Dark mode neon pink accent
          accent: '#E0A96D',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        '3d-light': '0 10px 30px -10px rgba(212, 175, 55, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '3d-pink': '0 14px 28px rgba(236, 72, 153, 0.25), 0 10px 10px rgba(236, 72, 153, 0.22)',
        '3d-gold': '0 14px 28px rgba(212, 175, 55, 0.3), 0 10px 10px rgba(212, 175, 55, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        '3d-btn': '0 6px 0 #b38612, 0 12px 20px rgba(0,0,0,0.25)',
        '3d-btn-pink': '0 6px 0 #9d174d, 0 12px 20px rgba(236, 72, 153, 0.35)',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite linear',
      }
    },
  },
  plugins: [],
}
