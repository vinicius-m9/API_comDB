import UserModel from './model'

export const getAllUsers = () => UserModel.find({})

export const getUserById = id => UserModel.findById(id)

export const getUserByEmail = email => UserModel.findOne({ email: email })

export const createUser = user => UserModel.create(user)

export const updateUser = (id, alteration) => UserModel.updateOne({ _id: id }, alteration)

export const deleteUser = id => UserModel.deleteOne({ _id: id })

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}
