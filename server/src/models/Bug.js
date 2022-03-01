import mongoose from 'mongoose'
import moment from 'moment'

const bugsSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, immutable: true, default: () => moment() },
  expirationDate: { type: Date, default: () => moment().add(3, 'days') },
  assignee: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
})

const Bug = mongoose.model('Bug', bugsSchema)

export default Bug
