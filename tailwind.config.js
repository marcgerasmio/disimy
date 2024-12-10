/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#F4811F",
        customGreen: "#008163",
        customRed: "#EE2526",
      },
    },
  },
  plugins: [require("daisyui")],
};
