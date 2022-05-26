import { Schema, model } from 'mongoose'

const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Tag = model('Tag', TagSchema)
