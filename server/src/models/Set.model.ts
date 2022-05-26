import { Schema, model } from 'mongoose'

const SetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]
})

export const Set = model('Set', SetSchema)
