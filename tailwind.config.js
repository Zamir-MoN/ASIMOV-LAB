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
        palette: {
          cream: '#F2EAE0',
          ice: '#B4D3D9',
          lavender: '#BDA6CE',
          periwinkle: '#9B8EC7',
        },
        asimov: {
          cream: '#F2EAE0',
          'cream-light': '#FAF6F0',
          'cream-card': '#FFFFFF',
          'cream-surface': '#EBE1D5',
          'cream-border': 'rgba(155, 142, 199, 0.22)',
          ice: '#B4D3D9',
          'ice-dark': '#6b9ca4',
          lavender: '#BDA6CE',
          'lavender-dark': '#8b6f9e',
          periwinkle: '#9B8EC7',
          'periwinkle-dark': '#7565ab',
          'periwinkle-deep': '#4a3d74',
          text: '#2A2438',
          'text-muted': '#5D5470',
          'text-light': '#7E7494',
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      maxWidth: {
        'gog': '1060px',
        'gog-wide': '1440px',
      },
      boxShadow: {
        'cream-card': '0 4px 20px -2px rgba(42, 36, 56, 0.08)',
        'cream-hover': '0 12px 28px -4px rgba(42, 36, 56, 0.14), 0 0 15px 0 rgba(155, 142, 199, 0.2)',
        'soft-periwinkle': '0 0 20px -3px rgba(155, 142, 199, 0.35)',
        'soft-ice': '0 0 20px -3px rgba(180, 211, 217, 0.35)',
      },
      borderRadius: {
        'gog-sm': '2px',
        'gog': '3px',
        'gog-md': '4px',
        'gog-lg': '6px',
        'gog-pill': '50px',
      }
    },
  },
  plugins: [],
}
