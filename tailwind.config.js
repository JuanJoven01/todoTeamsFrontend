/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '240px',
      'md': '792px',
      'lg': '1024px'
    }
  },
  plugins: [],
}