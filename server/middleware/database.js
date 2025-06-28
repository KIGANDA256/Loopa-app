import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase()
  } catch (error) {
    console.error('Database connection error:', error)
  }
})