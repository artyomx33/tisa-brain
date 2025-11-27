/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TISA Brain Dark Theme with Gold Accents
        'tisa': {
          'black': '#0A0A0B',
          'darker': '#111113',
          'dark': '#1A1A1F',
          'medium': '#252529',
          'light': '#3A3A42',
          'gold': '#C9A227',
          'gold-light': '#E5C454',
          'gold-dark': '#9A7B1C',
          'cream': '#F5F1E8',
          'white': '#FAFAFA',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'heading': ['Outfit', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 162, 39, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
