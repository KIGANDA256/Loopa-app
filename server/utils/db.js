import mongoose from 'mongoose'

// MongoDB connection string for Docker setup
const MONGODB_URI = 'mongodb://loopa_admin:secure_password@localhost:27017/loopa_db?authSource=admin'

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }
    
    await mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB