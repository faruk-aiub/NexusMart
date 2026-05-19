import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NexusMart
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/login">Login</Link>
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar