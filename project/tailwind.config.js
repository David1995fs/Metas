/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: {
          300: '#5CE6D7',
          400: '#40E0D0',
          500: '#34B5AA',
          600: '#2C9E94',
        },
      },
    },
  },
  plugins: [],
};