/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo-400': '#6c63ff',
        'indigo-500': '#5c53ff',
        'pink-400': '#ff6584',
        'emerald-400': '#43e8b0',
        'amber-400': '#ffa94d',
        'gray-800': '#0e0e14',
        'gray-700': '#161620',
        'gray-600': '#252535',
      },
      borderRadius: {
        'xl': '14px',
      },
    },
  },
  plugins: [],
}
