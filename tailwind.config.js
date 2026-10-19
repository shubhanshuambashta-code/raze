/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          lavender: '#EEF2FF',
          sky: '#F0F9FF',
          mint: '#ECFDF5',
          peach: '#FFF7ED',
          rose: '#FFF1F2',
          butter: '#FEFCE8',
          indigo: '#6366F1',
          slate: '#0F172A',
        },
        brand: {
          dark: '#F8FAFC',
          card: '#FFFFFF',
          panel: '#FFFFFF',
          accent: '#6366F1',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
