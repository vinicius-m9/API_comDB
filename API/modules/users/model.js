import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date().toString()
  },
  updatedAt: {
    type: Date,
    default: new Date().toString()
  }
})

export const User = mongoose.model('User', userSchema)

export default User
