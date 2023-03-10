module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        'bl-dark': '#121C23',
        'bl-darker': '#090F13',
        'bl-hilight': '#253D4C',
        'bl-hilight-dark': '#1B2D37',
        'bl-gray': '#A8A8A8',
        'bl-primary': '#58AFE6',
        'bl-primary-dark': '#478FCC',
        'bl-primary-darker': '#30759A',
        'bl-primary-alt': '#068990',
        'bl-primary-alt2': '#244961',
        'bl-primary-alt3': '#003638',
        'bl-primary-alt4': '#51789C',
        'bl-primary-alt4-dark': '#16222C',
        'bl-secondary': '#95BE4C',
        'bl-secondary-light': '#D6FC86',
        'bl-secondary-dark': '#50882C',
        'bl-shade': '#000000DD',
        'bl-active': '#60B5EB',
        'bl-inactive': '#253D4C',
        'bl-gold': '#FFD900',
        'bl-silver': '#D2D2D2',
        'bl-bronze': '#E67400',
        'bl-primary-bg': '#11212B',
        'bl-dark-bg': '#0E0E0E',
        'bl-dark-gray': '#14171A',
        'bl-darker-gray': '#121517',
        
      },
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '65%': '65%',
      '100%': '100%',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '6': '6px',
      '8': '8px',
      '1/2': '50%',
    }
  },
  plugins: [],
}
