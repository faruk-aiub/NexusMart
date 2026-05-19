import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { registerUser } from '../../services/authService'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
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

      await registerUser(formData)

      setMessage('Registration successful. Please login now.')

      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-[#646cff]/25 blur-3xl"></div>
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-[#a855f7]/25 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-none">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#646cff] to-[#a855f7] text-2xl font-bold text-white shadow-lg shadow-violet-300/40">
              N
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-slate-900 dark:text-white">
              Create Account
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Register as admin or customer.
            </p>
          </div>

          {message && (
            <p className="mb-5 rounded-2xl bg-slate-100 px-5 py-4 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01800000000"
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Register As
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-4 font-bold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#646cff]">
              Login
            </Link>
          </p>
        </div>

        <div className="hidden lg:block">
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-[#646cff] dark:bg-violet-950 dark:text-violet-300">
            Join NexusMart
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Start your{' '}
            <span className="bg-gradient-to-r from-[#646cff] to-[#a855f7] bg-clip-text text-transparent">
              shopping journey
            </span>{' '}
            today
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            NexusMart makes online shopping simple, fast, and organized. Browse
            products, add your favorite items to cart, place orders, and track
            everything from your account.
          </p>

          <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-[#646cff] to-[#a855f7] p-8 text-white shadow-2xl shadow-violet-300/40">
            <h2 className="text-3xl font-extrabold">Why choose NexusMart?</h2>

            <div className="mt-6 space-y-4">
              <p className="rounded-2xl bg-white/15 p-4">
                ✓ Browse products with a clean and modern interface
              </p>

              <p className="rounded-2xl bg-white/15 p-4">
                ✓ Add items to cart and checkout smoothly
              </p>

              <p className="rounded-2xl bg-white/15 p-4">
                ✓ Track your orders and shopping activity easily
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register