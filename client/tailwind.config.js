// ./tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'aushondared': '#cc0000',
        'aushondablack': '#222',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
