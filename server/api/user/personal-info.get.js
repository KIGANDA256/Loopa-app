import { verifyToken } from '../../middleware/auth'
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  const user = await verifyToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Fetch user info from DB
  const dbUser = await User.findById(user._id).lean()
  if (!dbUser) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  // Only return safe fields
  return {
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
    country: dbUser.country,
    street: dbUser.street,
    city: dbUser.city,
    region: dbUser.region,
    postal: dbUser.postal,
    notifications: dbUser.notifications
  }
})