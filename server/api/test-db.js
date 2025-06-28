import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const conn = await connectToDatabase()
    const dbName = conn.connection.db.databaseName
    const collections = await conn.connection.db.listCollections().toArray()
    
    return {
      connected: true,
      database: dbName,
      collections: collections.map(c => c.name)
    }
  } catch (error) {
    return {
      connected: false,
      error: error.message
    }
  }
})