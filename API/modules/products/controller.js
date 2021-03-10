import ProductService from './service'

const BASE_ROUTE = '/admin/products'

const getAllProducts = async (req, res) => {
  res.json(await ProductService.getAllProducts())
}

const getProductById = async (req, res) => {
  const id = req.params.id
  const product = await ProductService.getProductById(id)

  if (!product) return res.status(404).send('Produto nao encontrado')

  res.json(product)
}

const uploadProduct = async (req, res) => {
  const product = req.body

  await ProductService.uploadProduct(product)
  res.send('Produto adicionado com sucesso!')
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const alteration = req.body
  const product = await ProductService.getProductById(id)

  if (!product) return res.status(404).send('Produto nao encontrado')

  product.updatedAt = new Date().toString()
  await product.save()

  await ProductService.updateProduct(id, alteration)
  res.send('Produto atualizado com sucesso!')
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  const product = await ProductService.getProductById(id)

  if (!product) return res.status(404).send('Produto nao encontrado')

  await ProductService.deleteProduct(id)
  res.send('Produto deletado com sucesso!')
}

export const ProductRouteRegister = (server) => {
  server.get(`${BASE_ROUTE}`, getAllProducts)

  server.get(`${BASE_ROUTE}/:id`, getProductById)

  server.post(`${BASE_ROUTE}`, uploadProduct)

  server.put(`${BASE_ROUTE}/:id`, updateProduct)

  server.delete(`${BASE_ROUTE}/:id`, deleteProduct)
}

export default ProductRouteRegister
