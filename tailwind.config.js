module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-gray': '#cbd5e1',
        'custom-dark-gray' : '#1e293b',
        'custom-border' : '#475569'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
