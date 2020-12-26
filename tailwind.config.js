module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      margin: ['last', 'hover'],
      padding: ['hover'],
    },
  },
  plugins: [],
};
