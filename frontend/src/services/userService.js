import api from './api'

export async function getAllCustomers() {
  const response = await api.get('/users/customers')
  return response.data
}

export async function updateCustomerStatus(customerId, statusData) {
  const response = await api.patch(
    `/users/customers/${customerId}/status`,
    statusData,
  )

  return response.data
}

export async function deleteCustomer(customerId) {
  const response = await api.delete(`/users/customers/${customerId}`)
  return response.data
}