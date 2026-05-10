/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          gold: '#D4AF37',
          burgundy: '#722F37',
          cream: '#F5F0E6',
          navy: '#0A1628',
          'navy-light': '#1A2744',
          white: '#FAF8F5',
          charcoal: '#1A1A2E',
          slate: '#4A5568',
          'soft-gold': '#F0E6C3',
          emerald: '#10B981',
          champagne: '#C9B896',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}