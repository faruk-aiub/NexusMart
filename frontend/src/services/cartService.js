import api from './api'

export async function getMyCart() {
  const response = await api.get('/carts')
  return response.data
}

export async function addItemToCart(cartData) {
  const response = await api.post('/carts/items', cartData)
  return response.data
}

export async function updateCartItem(cartItemId, cartData) {
  const response = await api.patch(`/carts/items/${cartItemId}`, cartData)
  return response.data
}

export async function removeCartItem(cartItemId) {
  const response = await api.delete(`/carts/items/${cartItemId}`)
  return response.data
}