import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { connectToDatabase } from '../../../utils/db'
import User from '../../../models/user'
import { requireSuperAdmin, checkPermission } from '../../../middleware/auth'

export default defineEventHandler(async (event) => {
  try {
    // Connect to database
    await connectToDatabase()
    
    const id = getRouterParam(event, 'id')
    
    // GET request - get a user
    if (event.method === 'GET') {
      // We'll require admin access for viewing user details
      const currentUser = await checkPermission('viewAllRecords')(event)
      
      const user = await User.findById(id).select('-password')
      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'User not found'
        })
      }
      
      return user
    }
    
    // PUT request - update a user
    if (event.method === 'PUT') {
      const body = await readBody(event)
      
      // Check if we're updating role/permissions - requires super admin
      if (body.role || body.adminLevel || body.permissions) {
        await requireSuperAdmin(event)
      } else {
        // Other updates require editAllRecords permission
        await checkPermission('editAllRecords')(event)
      }
      
      // Don't allow password updates through this endpoint
      if (body.password) {
        delete body.password
      }
      
      const user = await User.findByIdAndUpdate(
        id, 
        body, 
        { new: true, runValidators: true }
      ).select('-password')
      
      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'User not found'
        })
      }
      
      return user
    }
    
    // DELETE request - delete a user
    if (event.method === 'DELETE') {
      // Only users with deleteUsers permission can delete users
      await checkPermission('deleteUsers')(event)
      
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        throw createError({
          statusCode: 404,
          message: 'User not found'
        })
      }
      
      return { message: 'User deleted successfully' }
    }
    
    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error) {
    console.error('Admin user API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error processing request'
    })
  }
})