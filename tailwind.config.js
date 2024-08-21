/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'custom-shadow': '0 1px 4px rgba(0, 0, 0, 0.1)',
      }
      
    },
  },
  plugins: [],
}

