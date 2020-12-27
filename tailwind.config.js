module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'hover:bg-red-100',
        'hover:bg-yellow-100',
        'hover:bg-green-100',
        'hover:bg-blue-100',
        'border-red-500',
        'border-yellow-500',
        'border-green-500',
        'border-blue-500',
      ],
    },
  },
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
