import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  nitro: {
    preset: 'vercel'
  },
  runtimeConfig: {
    // Private keys are only available on the server
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '/api'
    }
  },
  alias: {
    '/register': '/Sign-up'
  }
})