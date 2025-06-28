import { verifyToken } from '../../middleware/auth'
import User from '../../models/user'

export default defineEventHandler(async (event) => {
  const user = await verifyToken(event)
  const body = await readBody(event)

  await User.findByIdAndUpdate(user._id, {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    country: body.country,
    street: body.street,
    city: body.city,
    region: body.region,
    postal: body.postal,
    notifications: body.notifications
  })

  return { success: true }
})