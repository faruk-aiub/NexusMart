import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loginUser } from '../../services/authService'
import { saveToken } from '../../utils/tokenHelper'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setMessage('')

      const data = await loginUser(formData)

      saveToken(data.accessToken)

      setMessage('Login successful')

      if (data.user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/customer/dashboard')
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md px-6 py-10">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-gray-900">Login</h1>

        <p className="mt-2 text-gray-600">
          Login to continue shopping at NexusMart.
        </p>

        {message && (
          <p className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Do not have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login