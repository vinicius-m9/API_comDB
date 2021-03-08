import mongoose from 'mongoose'

require('dotenv').config()

exports.connection = () => {
  const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/test'

  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}
