import { getHeader } from 'h3'
import jwt from 'jsonwebtoken' // or your auth library
import CrimeReport from '../models/CrimeReport'
import formidable from 'formidable'
import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, message: 'Unauthorized - No valid auth header' })
    }
    
    const token = authHeader.substring(7)
    
    // Add proper error handling for token verification
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log('Decoded token:', decoded) // Debug output
    } catch (err) {
      console.error('JWT verification error:', err)
      throw createError({ statusCode: 401, message: 'Invalid token' })
    }
    
    // Check if user ID exists in token
    const userId = decoded._id || decoded.id || decoded.userId
    if (!userId) {
      console.error('No user ID in token:', decoded)
      throw createError({ statusCode: 400, message: 'User ID not found in token' })
    }
    
    console.log('Using user ID:', userId) // Debug output

    // Parse form data with files
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    })
    
    // Create upload directory if it doesn't exist
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true })
    }
    
    // Parse the form
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })
    
    // Process uploaded files
    const evidenceFiles = []
    const filesArray = Array.isArray(files.files) ? files.files : [files.files]
    
    for (const file of filesArray) {
      if (!file) continue
      
      evidenceFiles.push({
        filename: file.originalFilename,
        path: file.filepath.replace(process.cwd(), ''),
        mimetype: file.mimetype,
        size: file.size
      })
    }
    
    // Example: convert array to string if needed
    const getString = (field) => Array.isArray(field) ? field[0] : field

    // Create new crime report
    const crimeReport = new CrimeReport({
      user: userId,
      region: getString(fields.region),
      location: getString(fields.location),
      crimeType: getString(fields.crimeType),
      description: getString(fields.description),
      date: new Date(fields.date),
      evidence: evidenceFiles
    })
    
    try {
      await crimeReport.save()
    } catch (err) {
      console.error('Save error:', err)
      throw createError({ statusCode: 400, message: err.message })
    }
    
    return {
      success: true,
      message: 'Crime report submitted successfully',
      reportId: crimeReport.reportId
    }
  } catch (err) {
    console.error('API error:', err)
    throw err
  }
})