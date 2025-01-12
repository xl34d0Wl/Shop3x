// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // modules: [
  //   '@nuxt.js/tailwindcss',
  // ],
  css: ['~/assets/css/tailwind.css', 'bootstrap/dist/css/bootstrap.css'],
  
  plugins: [
    '~/plugins/firebase.js',
  ],
})
