import mongoose from 'mongoose'

const bugsSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  expirationDate: { type: Date, default: () => Date.now() },
  assignee: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
})

const Bug = mongoose.model('Bug', bugsSchema)

export default Bug
