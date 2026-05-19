import api from './api'

export async function uploadProductImage(imageFile) {
  const formData = new FormData()

  formData.append('image', imageFile)

  const response = await api.post('/uploads/product-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}