import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import Evidence from '~/server/models/Evidence'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.auth
    if (!user || !user.userId) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({ statusCode: 400, message: 'No form data provided' })
    }

    const station = formData.find(f => f.name === 'station')?.data?.toString()
    const location = formData.find(f => f.name === 'location')?.data?.toString()
    const fileType = formData.find(f => f.name === 'fileType')?.data?.toString()
    
    const files = formData.filter(f => f.name === 'files').map(f => ({
      filename: f.filename,
      path: `/uploads/${f.filename}`,
      size: f.data.length,
      type: f.type
    }))

    if (!station || !location || !fileType || files.length === 0) {
      throw createError({ statusCode: 400, message: 'Missing required fields' })
    }

    // Save as array of objects
    const evidence = await Evidence.create({
      userId: user.userId,
      station,
      location,
      fileType,
      files, 
      status: 'pending'
    })

    return { success: true, evidence }
  } catch (error) {
    console.error('Error submitting evidence:', error)
    throw createError({ statusCode: 500, message: error.message || 'Failed to submit evidence' })
  }
})