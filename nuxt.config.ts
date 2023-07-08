// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    globalAppMiddleware: false,
  },
  runtimeConfig: {
    databaseUri: process.env.DATABASE,
    authSecret: process.env.AUTH_SECRET,
    googleCredentials: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
    }
  },
  nitro: {
    plugins: ['~/server/index.js']
  },
  devtools: { enabled: true },
  css: [
    '~/assets/style/main.scss',
    "primevue/resources/themes/md-dark-indigo/theme.css",
    "primevue/resources/primevue.css"
  ],
  build: {
    transpile: [
      'primevue',
      'vue-toastification'
    ]
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@sidebase/nuxt-auth'
  ]
})