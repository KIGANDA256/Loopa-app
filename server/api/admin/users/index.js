import { defineEventHandler, readBody, createError } from 'h3'
import { connectToDatabase } from '../../../utils/db'
import User from '../../../models/user'
import { requireSuperAdmin } from '../../../middleware/auth'

export default defineEventHandler(async (event) => {
  try {
    // Only super admins can create new admins
    // await requireSuperAdmin(event)
    await connectToDatabase()
    if (event.method === 'POST') {
      const body = await readBody(event)
      // Validate required fields
      if (!body.email || !body.password || !body.firstName || !body.lastName || !body.role) {
        throw createError({ statusCode: 400, message: 'Missing required fields' })
      }
      // Check if user already exists
      const exists = await User.findOne({ email: body.email })
      if (exists) {
        throw createError({ statusCode: 409, message: 'User already exists' })
      }
      // Create user
      const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password, // Make sure your User model hashes passwords!
        role: body.role,
        nationalId: body.nationalId,
        // Add other fields as needed
      })
      await user.save()
      return { message: 'Admin user created successfully', user: { ...user.toObject(), password: undefined } }
    }
    throw createError({ statusCode: 405, message: 'Method not allowed' })
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating admin user'
    })
  }
})