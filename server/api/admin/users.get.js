import mongoose from 'mongoose'
import User from '~/server/models/user'

export default defineEventHandler(async (event) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(useRuntimeConfig().mongodbUri)
  }
  const users = await User.find({}, '-password').lean()
  return users
})