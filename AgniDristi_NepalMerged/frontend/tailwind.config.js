/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Professional forest greens
        'forest': {
          50: '#f0f9f4',
          100: '#d9efe5',
          200: '#b3dfd0',
          300: '#7ac4a8',
          400: '#4dae8a',
          500: '#2d9970',
          600: '#1f7a56',
          700: '#1a6347',
          800: '#16503a',
          900: '#0f3a29',
          950: '#0a2419',
        },
        // Fire alert oranges/reds
        'fire': {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda29b',
          400: '#f97066',
          500: '#f04438',
          600: '#d92d20',
          700: '#b42318',
          800: '#912018',
          900: '#55160c',
          950: '#2b0a06',
        },
        // Alert warning oranges
        'warning': {
          50: '#fffbf0',
          100: '#fef3e2',
          200: '#fed7a2',
          300: '#fdbf1d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          950: '#2c0a04',
        },
      },
      boxShadow: {
        // Professional shadows
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 8px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 8px 12px 0 rgba(0, 0, 0, 0.08)',
        'xl': '0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 16px 24px 0 rgba(0, 0, 0, 0.08)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px -2px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        'safe': '1.25rem',
      },
      borderRadius: {
        'card': '0.75rem',
        'button': '0.625rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-light': 'pulseLight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
    },
  },
  plugins: [],
}