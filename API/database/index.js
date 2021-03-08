import mongoose from 'mongoose'

require('dotenv').config()

// Conecta no banco de dados especificado no dotenv ou no banco de dados test
export const connection = () => {
  const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/test'

  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  console.log(`connected at ${DB_URL}`)
}

export default connection
