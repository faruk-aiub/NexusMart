import api from './api'

export async function placeOrder(orderData) {
  const response = await api.post('/orders', orderData)
  return response.data
}

export async function getMyOrders() {
  const response = await api.get('/orders/my-orders')
  return response.data
}

export async function getAllOrders() {
  const response = await api.get('/orders')
  return response.data
}

export async function updateOrderStatus(orderId, statusData) {
  const response = await api.patch(`/orders/${orderId}/status`, statusData)
  return response.data
}