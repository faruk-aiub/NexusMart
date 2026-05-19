import { Navigate } from 'react-router-dom'

import { getToken, getUser } from '../utils/tokenHelper'

function CustomerRoute({ children }) {
  const token = getToken()
  const user = getUser()

  if (!token) {
    return <Navigate to="/login" />
  }

  if (user?.role !== 'customer') {
    return <Navigate to="/admin/dashboard" />
  }

  return children
}

export default CustomerRoute