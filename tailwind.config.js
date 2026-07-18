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
          50: "#f3f6f5",
          100: "#e3ebe9",
          200: "#c7d7d2",
          300: "#9fbbb2",
          400: "#73998e",
          500: "#577d72",
          600: "#446258",
          700: "#374f47",
          800: "#2d4039",
          900: "#273731",
          950: "#14342B",
        },
        sand: {
          50: "#faf8f5",
          100: "#f4ede3",
          200: "#e9dac6",
          300: "#dcc2a3",
          400: "#E5D3B3",
          500: "#be9770",
          600: "#aa805a",
          700: "#8e6549",
          800: "#75523f",
          900: "#C29F7C",
          950: "#402c21",
        },
        cream: {
          50: "#FAF8F5",
          100: "#f6f2eb",
          200: "#ebe1d2",
          300: "#dccbba",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
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
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};