import { Link, useNavigate } from 'react-router-dom'

import {
  getToken,
  getUser,
  removeToken,
  removeUser,
} from '../../utils/tokenHelper'
import { useTheme } from '../../context/ThemeContext'

function Navbar() {
  const navigate = useNavigate()
  const token = getToken()
  const user = getUser()
  const { theme, toggleTheme } = useTheme()

  function handleLogout() {
    removeToken()
    removeUser()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition dark:border-slate-800 dark:bg-[#1f2937]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#646cff] to-[#a855f7] text-lg font-bold text-white shadow-lg shadow-violet-300/40">
            N
          </span>

          <h1 className="text-xl font-extrabold leading-none text-slate-900 dark:text-white">
            NexusMart
          </h1>
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link to="/" className="transition hover:text-[#646cff]">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-[#646cff]">
            Products
          </Link>

          {token && user?.role === 'customer' && (
            <>
              <Link to="/cart" className="transition hover:text-[#646cff]">
                Cart
              </Link>

              <Link to="/my-orders" className="transition hover:text-[#646cff]">
                My Orders
              </Link>

              <Link
                to="/customer/dashboard"
                className="transition hover:text-[#646cff]"
              >
                Dashboard
              </Link>
            </>
          )}

          {token && user?.role === 'admin' && (
            <>
              <Link
                to="/admin/dashboard"
                className="transition hover:text-[#646cff]"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/categories"
                className="transition hover:text-[#646cff]"
              >
                Categories
              </Link>

              <Link
                to="/admin/products"
                className="transition hover:text-[#646cff]"
              >
                Products
              </Link>

              <Link
                to="/admin/orders"
                className="transition hover:text-[#646cff]"
              >
                Orders
              </Link>

              <Link
                to="/admin/inventory"
                className="transition hover:text-[#646cff]"
              >
                Inventory
              </Link>

              <Link
                to="/admin/customers"
                className="transition hover:text-[#646cff]"
              >
                Customers
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#646cff] hover:text-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="transition hover:text-[#646cff]">
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-4 py-2 text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
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