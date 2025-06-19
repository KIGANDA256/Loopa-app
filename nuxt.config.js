import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/tailwind.css'],

  nitro: {
    compatibilityDate: '2025-06-13'
  },
  
  runtimeConfig: {
    // Private keys (server-side only)
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    
    // Public keys (exposed to client)
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '/api'
    }
  }
})