/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f3ff',
          purple: '#b400ff',
          pink: '#ff00e5',
        },
        cyber: {
          dark: '#0a0a1f',
          darker: '#050514',
          light: '#1a1a3f',
        }
      },
      boxShadow: {
        neon: '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
        'neon-strong': '0 0 10px theme(colors.neon.blue), 0 0 40px theme(colors.neon.blue)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};