import mongoose from 'mongoose'
import CrimeReport from '~/server/models/CrimeReport' // Adjust path/model name as needed

export default defineEventHandler(async (event) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(useRuntimeConfig().mongodbUri)
  }
  const reports = await CrimeReport.find({})
    .populate({ path: 'user', select: 'firstName lastName email' })
  return reports
})