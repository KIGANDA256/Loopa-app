import mongoose from 'mongoose'
import Record from '~/server/models/record' 
import User from '~/server/models/user'    

export default defineEventHandler(async (event) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(useRuntimeConfig().mongodbUri)
  }

  // Fetch all records and populate user info
  const records = await Record.find({})
    .populate({ path: 'user', select: 'firstName lastName' })
    .lean()

  return records
})