/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'apex': {
          // Primary: Deep Crimson/Burgundy from logo AAA monogram
          blue: '#8B1A4A',
          'blue-hover': '#6D1239',
          // Gold: From logo decorative borders
          gold: '#C9A84C',
          'gold-light': '#E8D08A',
          'gold-hover': '#B8922E',
          // Neutrals
          bg: '#FAF7F4',
          surface: '#FFFFFF',
          dark: '#1A1A1A',
          gray: '#5A5056',
          'gray-light': '#9E8E96',
          'border': '#E8D8D0',
          'border-light': '#F5EEE8',
          // Accent cream from logo background
          cream: '#F5F0E8',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-hover': '0 10px 15px -3px rgb(139 26 74 / 0.12), 0 4px 6px -4px rgb(139 26 74 / 0.06)',
        'search': '0 4px 12px -2px rgb(139 26 74 / 0.12)',
      },
      borderRadius: {
        'btn': '8px',
        'card': '12px',
      },
      maxWidth: {
        'platform': '1200px',
      },
    },
  },
  plugins: [],
};
