import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isGoogleLogin: 'Boolean',
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const User = model('User', UserSchema)
