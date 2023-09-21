/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-dark": {
          100: "#485265",
          200: "#364156",
          300: "#343F54",
          400: "#313C51",
          500: "#2C374B",
          600: "#273246",
          700: "#212D40",
          800: "#19212E",
          900: "#151B25",
          950: "#11151C",
        },
      },
    },
  },
  plugins: [],
};
