/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#027FFF",
        secondary: "#A6C9FF",
      },
      fontFamily: {
        koulen: ["Koulen", "cursive"],
      },
    },
  },
  plugins: [],
};
