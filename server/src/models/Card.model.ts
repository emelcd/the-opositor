import { Schema, model } from 'mongoose'

const CardSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  image: {
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
  set: [{
    type: Schema.Types.ObjectId,
    ref: 'Set'
  }],
  hints: [{
    type: String
  }]
})

export const Card = model('Card', CardSchema)
