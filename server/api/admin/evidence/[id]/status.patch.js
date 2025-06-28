import { verifyToken } from '../../../../middleware/auth'
import Evidence from '../../../../models/Evidence'

export default defineEventHandler(async (event) => {
  try {
    // Verify the user is authenticated and is an admin
    const user = await verifyToken(event)
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      throw createError({ statusCode: 403, message: 'Access denied. Admin privileges required.' })
    }
    
    // Get evidence ID from URL params
    const id = event.context.params.id
    
    // Get status from request body
    const body = await readBody(event)
    const { status } = body
    
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      throw createError({ statusCode: 400, message: 'Invalid status value' })
    }
    
    // Update the evidence status
    const updatedEvidence = await Evidence.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    
    if (!updatedEvidence) {
      throw createError({ statusCode: 404, message: 'Evidence not found' })
    }
    
    return { success: true, evidence: updatedEvidence }
  } catch (error) {
    console.error('Error updating evidence status:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update evidence status'
    })
  }
})