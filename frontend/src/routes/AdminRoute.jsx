import { Navigate } from 'react-router-dom'

import { getToken, getUser } from '../utils/tokenHelper'

function AdminRoute({ children }) {
  const token = getToken()
  const user = getUser()

  if (!token) {
    return <Navigate to="/login" />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/customer/dashboard" />
  }

  return children
}

export default AdminRoute