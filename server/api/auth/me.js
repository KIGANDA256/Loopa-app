import { defineEventHandler, getHeaders, createError } from 'h3'
import jwt from 'jsonwebtoken'
import connectDB from '../../utils/db'
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  try {
    // Connect to database
    await connectDB()
    
    // Get Authorization header
    const headers = getHeaders(event)
    const authHeader = headers.authorization
    const config = useRuntimeConfig()
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }
    
    // Extract token
    const token = authHeader.split(' ')[1]
    
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret || 'fallback_secret')
    
    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }
    
    // Return user without password
    const userObj = user.toObject()
    delete userObj.password
    
    return userObj
  } catch (error) {
    console.error('Auth verification error:', error)
    
    if (error.name === 'JsonWebTokenError') {
      throw createError({
        statusCode: 401,
        message: 'Invalid token'
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error getting user'
    })
  }
})