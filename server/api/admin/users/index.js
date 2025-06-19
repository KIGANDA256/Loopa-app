import { defineEventHandler, readBody, createError } from 'h3'
import connectDB from '../../../utils/db'
import User from '../../../models/user'
import { verifyToken } from '../../../middleware/auth'

export default defineEventHandler(async (event) => {
  try {
    // Connect to database
    await connectDB()
    
    // Verify admin access
    const currentUser = await verifyToken(event)
    if (!currentUser.isAdmin) {
      throw createError({
        statusCode: 403,
        message: 'Admin access required'
      })
    }
    
    // GET request - list users
    if (event.method === 'GET') {
      // Fetch users (excluding password)
      const users = await User.find().select('-password')
      return users
    }
    
    // POST request - create user
    if (event.method === 'POST') {
      const body = await readBody(event)
      
      // Only super admin can create users with elevated privileges
      if (currentUser.role !== 'Super Admin' && body.role !== 'Civilian') {
        throw createError({
          statusCode: 403,
          message: 'You are not authorized to create users with this role'
        })
      }
      
      // Validate required fields
      if (!body.email || !body.password || !body.nationalId) {
        throw createError({
          statusCode: 400,
          message: 'Email, password, and national ID are required'
        })
      }
      
      // Check if user already exists
      const userExists = await User.findOne({ 
        $or: [
          { email: body.email },
          { nationalId: body.nationalId }
        ]
      })
      
      if (userExists) {
        throw createError({
          statusCode: 409,
          message: 'User with this email or national ID already exists'
        })
      }
      
      // Create new user
      const newUser = new User(body)
      await newUser.save()
      
      // Return user without password
      const userObj = newUser.toObject()
      delete userObj.password
      
      return userObj
    }
  } catch (error) {
    console.error('Admin API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error processing request'
    })
  }
})