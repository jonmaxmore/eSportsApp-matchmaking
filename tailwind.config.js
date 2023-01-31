module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#121b1e",
        "primary-light": "#1e3945",
        "primary-sky": "#58afe6",
        "primary-green": "#95be4c",
        "primary-gray": "#535555",
        "primary-red": "#ff4b00",
        "blackdrop": "rgba(0,0,0, 0.4)",
      },screens: {
        'tall': { 'raw': '(min-height: 800px)' },
        'wide': { 'raw': '(min-width: 1470px)' },
      }
    },
  },
  plugins: [],
}
