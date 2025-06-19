import { defineEventHandler, readBody, createError } from 'h3'
import jwt from 'jsonwebtoken'
import connectDB from '../../utils/db'
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  try {
    // Connect to database
    await connectDB()
    
    const body = await readBody(event)
    const config = useRuntimeConfig()
    
    // Validate required fields
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }
    
    // Find user
    const user = await User.findOne({ email: body.email })
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }
    
    // Verify password
    const isMatch = await user.comparePassword(body.password)
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }
    
    // Update last login time
    user.lastLogin = new Date()
    await user.save()
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      config.jwtSecret || 'fallback_secret',
      { expiresIn: '24h' }
    )
    
    // Return user without password and token
    const userObj = user.toObject()
    delete userObj.password
    
    return {
      user: userObj,
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error logging in'
    })
  }
})
