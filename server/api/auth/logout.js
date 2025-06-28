import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  // For JWT, explicitly clear the auth cookie by setting it to expire
  setCookie(event, 'auth_token', '', {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
  
  return {
    success: true,
    message: 'Logged out successfully'
  }
})