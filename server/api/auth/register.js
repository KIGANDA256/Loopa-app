import { defineEventHandler, readBody, createError } from 'h3'
import connectDB from '../../utils/db'
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  try {
    // Connect to database
    await connectDB()
    
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ email: body.email })
    if (userExists) {
      throw createError({
        statusCode: 409,
        message: 'User with this email already exists'
      })
    }
    
    // Create new user
    const newUser = new User({
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email,
      password: body.password, // Will be hashed by pre-save hook
      citizenship: body.citizenship || '',
      role: body.role || 'Civilian',
      nationalId: body.nationalId || '',
      staffId: body.staffId || '',
      city: body.city || '',
      district: body.district || '',
      contact: body.contact || ''
    })
    
    await newUser.save()
    
    // Return user without password
    const userObj = newUser.toObject()
    delete userObj.password
    
    return userObj
  } catch (error) {
    console.error('Registration error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating user'
    })
  }
})