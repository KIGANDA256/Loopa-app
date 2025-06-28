import { verifyToken } from '../../middleware/auth'
import Evidence from '../../models/Evidence'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Verify the user is authenticated
    const user = await verifyToken(event)
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    
    // TEMPORARY WORKAROUND FOR DEVELOPMENT/TESTING ONLY
    // ⚠️ REMOVE THIS BYPASS BEFORE DEPLOYING TO PRODUCTION ⚠️
    console.log('⚠️ DEVELOPMENT MODE: Admin role check bypassed')
    console.log('User accessing admin evidence:', {
      id: user._id,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      adminLevel: user.adminLevel
    })
    
    
    
    // Fetch all evidence submissions
    const evidence = await Evidence.find({})
      .populate('userId', 'firstName lastName email') // <-- add this line
      .sort({ createdAt: -1 }) // Newest first
      .lean()
    
    console.log(`Found ${evidence.length} evidence submissions in total`)
    return evidence
  } catch (error) {
    console.error('Error fetching admin evidence:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch evidence data'
    })
  }
})