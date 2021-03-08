import express from 'express'
import Database from './database/index'

// Conexão com MongoDB
Database.connection()

// Configuração do express
const server = express()
server.use(express.json())

require('dotenv').config()

const PORT = process.env.PORT || 3000

const users = []

const getIndexUser = id => users.findIndex(usr => usr.id === id)

const getUser = id => users.find(usr => usr.id === id)

const createUser = user => {
  user.id = users.length
  const id = users.find(usr => usr.id === user.id)

  // Validação do ID
  if (id) {
    user.id = users[users.length - 1].id + 1
  }

  user.createdAt = new Date().toString()

  users.push(user)
}

const changeUser = (alteration, id) => {
  const indexId = getIndexUser(id)

  Object.assign(users[indexId], alteration)

  users[indexId].updatedAt = new Date().toString()
}

const deleteUser = id => {
  const indexId = getIndexUser(id)

  users.splice(indexId, 1)
}

// Iniciando o server na porta especificada no dotenv ou na porta 3000
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})

// Middleware para transformar o ID em número
server.use('/users/:id', (req, res, next) => {
  req.userId = Number(req.params.id)
  next()
})

// Busca todos os usuários
server.get('/users', (req, res) => {
  res.json(users)
})

// Busca um usuário pelo seu ID
server.get('/users/:id', (req, res) => {
  const user = getUser(req.userId)

  if (!user) return res.status(404).send()

  res.json(user)
})

// Cria um usuário
server.post('/users', (req, res) => {
  const user = req.body

  // Valida se o email já existe
  const email = users.find(usr => usr.email === user.email)
  // Valida se o email é válido
  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  const validEmail = emailRegex.test(user.email)

  if (email || !validEmail) return res.status(400).send('Invalid email')

  createUser(user)
  res.send('Usuario criado com sucesso!')
})

// Altera um usuário pelo seu ID
server.put('/users/:id', (req, res) => {
  const user = getUser(req.userId)
  const userAlteration = req.body

  if (!user) return res.status(404).send()

  changeUser(userAlteration, req.userId)
  res.send('Usuario alterado com sucesso!')
})

// Deleta um usuário pelo seu ID
server.delete('/users/:id', (req, res) => {
  const user = getUser(req.userId)

  if (!user) return res.status(404).send()

  deleteUser(req.userId)
  res.send('Usuario deletado com sucesso!')
})
