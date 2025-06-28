import { verifyToken } from '../../middleware/auth'
import CrimeReport from '../../models/CrimeReport'

export default defineEventHandler(async (event) => {
  const user = await verifyToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Fetch only crime reports for this user
  const reports = await CrimeReport.find({ user: user._id })
    .populate({ path: 'user', select: 'firstName lastName email' })
    .lean()

  return reports
})