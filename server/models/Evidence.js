import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  type: String
}, { _id: false })

const evidenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  station: { type: String, required: true },
  location: { type: String, required: true },
  fileType: { type: String, required: true },
  files: [fileSchema], // <-- Accepts array of objects, not strings!
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true })

// Prevent OverwriteModelError in dev/hot reload
export default mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema)