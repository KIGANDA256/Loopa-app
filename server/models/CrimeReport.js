import mongoose from 'mongoose'

const crimeReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crimeType: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  region: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  evidence: [{
    filename: String,
    path: String,
    mimetype: String,
    size: Number
  }],
  assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  reportId: { type: String, unique: true },
}, { timestamps: true })

// Create a unique report ID
crimeReportSchema.pre('save', function(next) {
  if (this.isNew) {
    this.reportId = `CR-${Date.now().toString().slice(-6)}`
  }
  next()
})

export default mongoose.models.CrimeReport || mongoose.model('CrimeReport', crimeReportSchema)