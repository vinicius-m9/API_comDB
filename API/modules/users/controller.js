import UserService from './service'

const BASE_ROUTE = '/users'

// Busca todos os usuários
const getAllUsers = async (req, res) => {
  res.json(await UserService.getAllUsers())
}

// Busca um usuário pelo seu ID
const getUserById = async (req, res) => {
  const id = req.params.id
  const user = await UserService.getUserById(id)

  if (!user) return res.status(404).send('Usuario nao encontrado')

  res.json(user)
}

// Cria um usuário
const createUser = async (req, res) => {
  const user = req.body

  // Valida se o email já existe
  const email = await UserService.getUserByEmail(user.email)
  // Valida se o email é válido
  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  const validEmail = emailRegex.test(user.email)

  if (email || !validEmail) return res.status(400).send('Email invalido')

  await UserService.createUser(user)
  res.send('Usuario criado com sucesso!')
}

// Altera um usuário pelo seu ID
const updateUser = async (req, res) => {
  const id = req.params.id
  const user = await UserService.getUserById(id)
  const userAlteration = req.body

  if (!user) return res.status(404).send('Usuario nao encontrado')

  user.updatedAt = new Date().toString()
  await user.save()

  await UserService.updateUser(id, userAlteration)
  res.send('Usuario alterado com sucesso!')
}

// Deleta um usuário pelo seu ID
const deleteUser = async (req, res) => {
  const id = req.params.id
  const user = await UserService.getUserById(id)

  if (!user) return res.status(404).send('Usuario nao encontrado')

  await UserService.deleteUser(id)
  res.send('Usuario deletado com sucesso!')
}

export const UserRouteRegister = (server) => {
  server.get(`${BASE_ROUTE}`, getAllUsers)

  server.get(`${BASE_ROUTE}/:id`, getUserById)

  server.post(`${BASE_ROUTE}`, createUser)

  server.put(`${BASE_ROUTE}/:id`, updateUser)

  server.delete(`${BASE_ROUTE}/:id`, deleteUser)
}

export default UserRouteRegister
