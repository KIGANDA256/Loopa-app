import mongoose from 'mongoose'

const recordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, 
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  
})

export default mongoose.models.Record || mongoose.model('Record', recordSchema)