/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        transgray: "rgba(199, 207, 214, 0.08)",
      },
      colors: {
        almostBlack: "#2C2D30",
        cabaret: {
          50: "#FAE7EB",
          100: "#F6D6DC",
          200: "#EFB5C0",
          300: "#E893A4",
          400: "#E07287",
          500: "#D9506B",
          600: "#C62B4A",
          700: "#982138",
          800: "#6A1727",
          900: "#3C0D16",
        },
        seledyn: {
          50: "#D6FAF0",
          100: "#C3F8EA",
          200: "#9FF3DD",
          300: "#7BEFD1",
          400: "#56EAC4",
          500: "#32E6B7",
          600: "#18C89A",
          700: "#129673",
          800: "#0C644D",
          900: "#063226",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: false,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
