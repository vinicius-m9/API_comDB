import ProductModel from './model'

export const getAllProducts = () => ProductModel.find({})

export const getProductById = id => ProductModel.findById(id)

export const uploadProduct = (product) => ProductModel.create(product)

export const updateProduct = (id, alteration) => ProductModel.updateOne({ _id: id }, alteration)

export const deleteProduct = id => ProductModel.deleteOne({ _id: id })

export default {
  getAllProducts,
  getProductById,
  uploadProduct,
  updateProduct,
  deleteProduct
}
