module.exports = {
  darkMode: "class",
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      outline: {
        none: ['2px solid transparent', '2px'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
