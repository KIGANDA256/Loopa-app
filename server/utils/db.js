import mongoose from 'mongoose'
import { useRuntimeConfig } from '#imports'

let connection = null

export async function connectToDatabase() {
  if (connection) return connection
  
  const config = useRuntimeConfig()
  
  try {
    connection = await mongoose.connect(config.mongodbUri)
    
    console.log('Connected to MongoDB')
    return connection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Auto-connect when the server starts
connectToDatabase().catch(console.error)