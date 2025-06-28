import { defineEventHandler, readBody, createError, setCookie } from 'h3'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../utils/db' 
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase()
    const body = await readBody(event)
    const config = useRuntimeConfig()

    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }

    // Find user by email
    const user = await User.findOne({ email: body.email })
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Use the model's comparePassword method
    const isMatch = await user.comparePassword(body.password)
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.firstName + ' ' + user.lastName
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    )

    setCookie(event, 'token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    // Remove password from user object before sending
    const { password, ...userWithoutPassword } = user.toObject()

    return {
      token: jwtToken,
      user: userWithoutPassword
    }
  } catch (error) {
    console.error('Login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Authentication failed'
    })
  }
})
