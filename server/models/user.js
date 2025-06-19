import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
  // Admin-specific fields
  isAdmin: {
    type: Boolean,
    default: false
  },
  adminLevel: {
    type: Number,
    default: 0, // 0: regular user, 1: admin, 2: super admin
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

// Hash password before saving
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
  } else if (this.role === 'Security Personnel') {
    this.isAdmin = true;
    this.adminLevel = 1;
    this.permissions = {
      createUsers: false,
      deleteUsers: false,
      viewAllRecords: true,
      editAllRecords: true,
      manageSystem: false
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

// Method to check password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

// Helper methods for role checking
userSchema.methods.isSuperAdmin = function() {
  return this.role === 'Super Admin' && this.adminLevel === 2;
}

userSchema.methods.isSecurityPersonnel = function() {
  return this.role === 'Security Personnel' && this.adminLevel === 1;
}

userSchema.methods.hasPermission = function(permission) {
  return this.permissions[permission] === true;
}

export default mongoose.models.User || mongoose.model('User', userSchema)