import api from './api'

export async function getAllCategories() {
  const response = await api.get('/categories')
  return response.data
}

export async function createCategory(categoryData) {
  const response = await api.post('/categories', categoryData)
  return response.data
}

export async function updateCategory(categoryId, categoryData) {
  const response = await api.patch(`/categories/${categoryId}`, categoryData)
  return response.data
}

export async function deleteCategory(categoryId) {
  const response = await api.delete(`/categories/${categoryId}`)
  return response.data
}