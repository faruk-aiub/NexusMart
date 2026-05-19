import api from './api'

export async function getAllProducts() {
  const response = await api.get('/products')
  return response.data
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export async function createProduct(productData) {
  const response = await api.post('/products', productData)
  return response.data
}

export async function updateProduct(productId, productData) {
  const response = await api.patch(`/products/${productId}`, productData)
  return response.data
}

export async function deleteProduct(productId) {
  const response = await api.delete(`/products/${productId}`)
  return response.data
}