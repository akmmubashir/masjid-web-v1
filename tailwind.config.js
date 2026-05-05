

export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        masjid: {
          50:  '#f1faf4',
          100: '#dff3e7',
          200: '#bbe5ca',
          300: '#8ed1a8',
          400: '#5fb884',
          500: '#3a9d65',
          600: '#268551',
          700: '#1f6b43',
          800: '#1a5638',
          900: '#16462f',
          950: '#0a2818',
        },
        gold: {
          50:  '#fdf9ef',
          100: '#f9efd4',
          200: '#f0dca6',
          300: '#e2cb96',
          400: '#d4b872',
          500: '#c9a961',
          600: '#b39147',
          700: '#8c6f33',
          800: '#6b5526',
          900: '#4a3a1a',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          dark: '#0f172a',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F7F4EE',
          dark: '#1e293b',
          'dark-subtle': '#172033',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
        'card': '0 2px 8px -2px rgb(0 0 0 / 0.06), 0 4px 16px -4px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
}
