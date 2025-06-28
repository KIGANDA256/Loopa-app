import { defineEventHandler, getHeaders, createError, getRequestHeader } from 'h3'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../utils/db'
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  // Get token from Authorization header
  const authHeader = getRequestHeader(event, 'Authorization')
  const token = authHeader?.split(' ')[1]
  
  if (!token) {
    return createError({
      statusCode: 401,
      message: 'No authentication token provided'
    })
  }
  
  try {
    const config = useRuntimeConfig()
    const secret = config.jwtSecret
    
    if (!secret) {
      console.error('JWT_SECRET is not configured')
      return createError({
        statusCode: 500,
        message: 'Server configuration error'
      })
    }
    
    // Verify token (using correct method based on your JWT library)
    const decoded = jwt.verify(token, secret)
    
    return {
      id: decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name || 'User'
    }
  } catch (err) {
    console.error('Token verification error:', err.message)
    
    return createError({
      statusCode: 401,
      message: 'Invalid or expired authentication token'
    })
  }
})