import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  inventory: {
    type: Number,
    default: 0
  },
  uploadedAt: {
    type: Date,
    default: new Date().toString()
  },
  updatedAt: {
    type: Date,
    default: new Date().toString()
  }
})

export const Product = new mongoose.model('Product', productSchema)

export default Product
