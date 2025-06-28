import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  nitro: {
    compatibilityDate: '2025-06-13'
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '/api'
    }
  },
  alias: {
    '/register': '/Sign-up'
  }
})