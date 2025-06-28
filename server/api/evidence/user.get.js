import { defineEventHandler, createError } from 'h3'
import Evidence from '~/server/models/Evidence'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.auth
    if (!user || !user.userId) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    const evidenceList = await Evidence.find({ userId: user.userId }).sort({ createdAt: -1 })
    return evidenceList
  } catch (error) {
    console.error('Error fetching evidence:', error)
    throw createError({ statusCode: 500, message: error.message || 'Failed to fetch evidence' })
  }
})