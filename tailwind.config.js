/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // As seen in your App.jsx
        sans: ['Montserrat', 'system-ui'],
        orbitron: ['Orbitron', 'system-ui'],
      },
    },
  },
  plugins: [],
}
