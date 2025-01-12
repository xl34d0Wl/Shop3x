module.exports = {
  content: ['./components/**/*.{vue,js}', 
            './pages/**/*.{vue,js}',
            './assets/**/*.{vue,js,ts,css}',
            './plugins/**/*.{js,ts}',
            './nuxt.config.{js,ts}'],

            
  theme: {
    extend: {
      colors: {
        lime: {
          600: '#65a30d',
          700: '#4d7c0f',
        },
      },
    },
  },
};
