module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Prispôsobte podľa potreby
    ],
    theme: {
      extend: {
        outline: {
          none: ['2px solid transparent', '2px'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }