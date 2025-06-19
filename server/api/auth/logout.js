import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // For JWT-based auth, we just return a success message
  // The actual logout happens client-side by removing the token
  return {
    success: true,
    message: 'Logged out successfully'
  }
})