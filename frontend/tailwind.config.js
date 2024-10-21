/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "iso-gray": "#3E525B",
        "iso-dark-gray": "#20303B",
        "iso-yellow": "#FAB82E",
        "iso-blue": "#1999D8",
        "iso-light-blue": "#C0E0FD",
        "iso-green": "#529844",
      },
      fontFamily: {
        sans: "Open Sans",
      },
    },
  },
  plugins: [],
};