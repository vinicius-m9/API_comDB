import express from 'express'
import DatabaseConnection from './database/index'
import { UserRouteRegister } from './modules/users/controller'
import { ProductRouteRegister } from './modules/products/controller'

require('dotenv').config()

// Conecta no MongoDB
DatabaseConnection()

// Configuracao do express
const server = express()
server.use(express.json())

// Definicao das rotas dos usuarios
UserRouteRegister(server)

// Definicao das rotas dos produtos
ProductRouteRegister(server)

const PORT = process.env.PORT || 3000

// Iniciando o server na porta especificada no dotenv ou na porta 3000
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})
