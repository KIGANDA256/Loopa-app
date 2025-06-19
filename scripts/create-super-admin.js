import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

// Load environment variables
dotenv.config()

// Setup __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// MongoDB connection string (from .env or default)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://loopa_admin:secure_password@localhost:27017/loopa_db?authSource=admin'

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// Define User schema directly in this file to avoid circular dependencies
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  citizenship: String,
  role: {
    type: String,
    enum: ['Super Admin', 'Security Personnel', 'Civilian'],
    default: 'Civilian'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  adminLevel: {
    type: Number,
    default: 0,
  },
  permissions: {
    createUsers: { type: Boolean, default: false },
    deleteUsers: { type: Boolean, default: false },
    viewAllRecords: { type: Boolean, default: false },
    editAllRecords: { type: Boolean, default: false },
    manageSystem: { type: Boolean, default: false }
  },
  nationalId: {
    type: String,
    required: true,
    unique: true
  },
  staffId: String,
  city: String,
  district: String,
  contact: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
})

// Hash password middleware
userSchema.pre('save', async function(next) {
  // Set admin flags based on role
  if (this.role === 'Super Admin') {
    this.isAdmin = true;
    this.adminLevel = 2;
    this.permissions = {
      createUsers: true,
      deleteUsers: true,
      viewAllRecords: true,
      editAllRecords: true,
      manageSystem: true
    };
  }

  // Only hash password if it's modified
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Define User model
const User = mongoose.models.User || mongoose.model('User', userSchema)

// Create super admin user
const createSuperAdmin = async () => {
  try {
    await connectDB()
    
    // Check if super admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@loopa.app' })
    
    if (existingAdmin) {
      console.log('Super admin already exists')
      process.exit(0)
    }
    
    const superAdmin = new User({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@loopa.app',
      password: 'ChangeThisSecurePassword123!', // Change this in production
      role: 'Super Admin',
      nationalId: 'ADMIN-ID-12345',
      staffId: 'STAFF-ADMIN-001',
      contact: '+123456789',
      citizenship: 'Ugandan Citizen',
      city: 'Kampala',
      district: 'Central'
    })
    
    await superAdmin.save()
    console.log('Super admin created successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error creating super admin:', error)
    process.exit(1)
  }
}

createSuperAdmin()