/* eslint-disable tailwindcss/no-custom-classname */
module.exports = {
  content: [
    "./src/**/*.{astro,css,js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f7f0",
          100: "#e5efdf",
          200: "#d9e8ce",
          300: "#c8e0bc",
          400: "#b7d9ab",
          500: "#a6d19a",
          600: "#91c189",
          700: "#7cc178",
          800: "#67b167",
          900: "#5ca156",
          950: "#537f48",
        },
        sand: {
          50: "#fcf5f1",
          100: "#fae9db",
          200: "#f8daba",
          300: "#f5c899",
          400: "#f3b577",
          500: "#f1a456",
          600: "#ef9234",
          700: "#ed8113",
          800: "#eb6f02",
          900: "#c97a53",
          950: "#a46445",
        },
        cream: {
          50: "#fefdfc",
          100: "#fdf9f5",
          200: "#f7f0e9",
          300: "#f2eadd",
          400: "#edebf2",
          500: "#e9e3e0",
          600: "#e5ddd8",
          700: "#dfcdc5",
          800: "#d9ccc0",
          900: "#d3bbb9",
          950: "#cdb5b3",
        },
        warmwhite: "#faf6f0",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};