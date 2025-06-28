export default defineNuxtConfig({
  // Your other config...
  
  runtimeConfig: {
    // These are server-only env variables
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    
    // Public variables exposed to the client
    public: {
      // Any public env vars go here
    }
  }
})