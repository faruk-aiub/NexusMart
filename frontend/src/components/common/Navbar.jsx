import { Link, useNavigate } from 'react-router-dom'

import { getToken, removeToken } from '../../utils/tokenHelper'

function Navbar() {
  const navigate = useNavigate()
  const token = getToken()

  function handleLogout() {
    removeToken()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NexusMart
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>

          <Link to="/cart" className="hover:text-blue-600">
            Cart
          </Link>

          <Link to="/my-orders" className="hover:text-blue-600">
            My Orders
          </Link>

          <Link to="/admin/dashboard" className="hover:text-blue-600">
            Admin
          </Link>

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar