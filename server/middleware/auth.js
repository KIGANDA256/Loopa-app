import { getHeaders, createError } from 'h3'
import jwt from 'jsonwebtoken'
import connectDB from '../utils/db'
import User from '../models/user'

export const verifyToken = async (event) => {
  try {
    await connectDB()
    
    const headers = getHeaders(event)
    const authHeader = headers.authorization
    const config = useRuntimeConfig()
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }
    
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, config.jwtSecret || 'fallback_secret')
    
    const user = await User.findById(decoded.userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }
    
    return user
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw createError({
        statusCode: 401,
        message: 'Invalid token'
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Authentication error'
    })
  }
}

export const requireAdmin = async (event) => {
  const user = await verifyToken(event)
  
  if (!user.isAdmin) {
    throw createError({
      statusCode: 403,
      message: 'Admin access required'
    })
  }
  
  return user
}

export const requireSuperAdmin = async (event) => {
  const user = await verifyToken(event)
  
  if (user.role !== 'Super Admin') {
    throw createError({
      statusCode: 403,
      message: 'Super admin access required'
    })
  }
  
  return user
}

// Add the missing checkPermission function
export const checkPermission = (permission) => async (event) => {
  const user = await verifyToken(event)
  
  if (!user.permissions || !user.permissions[permission]) {
    throw createError({
      statusCode: 403,
      message: `Permission denied: ${permission} required`
    })
  }
  
  return user
}

// Add a default export for the middleware
export default defineEventHandler(async (event) => {
  // This is a pass-through middleware
  // It doesn't do anything by default, but the named exports can be used directly
})