import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllCustomers } from '../../services/userService'

function AdminDashboard() {
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadCustomers() {
    try {
      setLoading(true)

      const data = await getAllCustomers()
      setCustomers(data)
    } catch (error) {
      setMessage('Failed to load customer information')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const activeCustomers = customers.filter(
    (customer) => customer.status === 'active',
  )

  const inactiveCustomers = customers.filter(
    (customer) => customer.status !== 'active',
  )

  return (
    <section className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#646cff] via-[#7c3aed] to-[#a855f7] p-8 text-white shadow-2xl shadow-violet-300/30">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/15 blur-3xl"></div>
          <div className="absolute -bottom-20 left-20 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl"></div>

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                Admin Panel
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-violet-100">
                Manage NexusMart categories, products, orders, inventory, and
                customer information from one place.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
              <p className="text-sm font-medium text-violet-100">
                Store Status
              </p>

              <h2 className="mt-1 text-2xl font-extrabold">Active</h2>
            </div>
          </div>
        </div>

        {message && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {message}
          </p>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/categories"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl transition group-hover:scale-110">
              📂
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Categories
            </h2>
          </Link>

          <Link
            to="/admin/products"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl transition group-hover:scale-110">
              🛍️
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">Products</h2>
          </Link>

          <Link
            to="/admin/orders"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl transition group-hover:scale-110">
              📦
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">Orders</h2>
          </Link>

          <Link
            to="/admin/inventory"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl transition group-hover:scale-110">
              📊
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">Inventory</h2>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500">Total Customers</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              {loading ? '...' : customers.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500">Active Customers</p>
            <h2 className="mt-2 text-3xl font-extrabold text-green-600">
              {loading ? '...' : activeCustomers.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500">Inactive Customers</p>
            <h2 className="mt-2 text-3xl font-extrabold text-red-500">
              {loading ? '...' : inactiveCustomers.length}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200 lg:col-span-2 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-[#646cff] dark:bg-violet-950 dark:text-violet-300">
                  Customer Overview
                </span>

                <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                  Recent Customers
                </h2>
              </div>

              <Link
                to="/admin/customers"
                className="rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
              >
                Manage Customers
              </Link>
            </div>

            {loading ? (
              <p className="text-sm text-slate-500">Loading customers...</p>
            ) : customers.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-900">
                <p className="text-slate-500">No customers found</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {customers.slice(0, 5).map((customer) => (
                  <div
                    key={customer.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 md:flex-row md:items-center dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#646cff] to-[#a855f7] text-sm font-bold text-white">
                        {customer.fullName
                          ? customer.fullName.charAt(0).toUpperCase()
                          : 'C'}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {customer.fullName}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {customer.phone || 'No phone'}
                      </span>

                      {customer.status === 'active' ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl dark:bg-slate-800">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              Quick Actions
            </span>

            <h2 className="mt-4 text-2xl font-extrabold">
              Store Control
            </h2>

            <div className="mt-5 space-y-3">
              <Link
                to="/admin/products/add"
                className="block rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-3 text-center text-sm font-semibold transition hover:opacity-90"
              >
                Add New Product
              </Link>

              <Link
                to="/admin/orders"
                className="block rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-semibold transition hover:bg-white/20"
              >
                View Orders
              </Link>

              <Link
                to="/admin/customers"
                className="block rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-semibold transition hover:bg-white/20"
              >
                View Customers
              </Link>

              <Link
                to="/admin/inventory"
                className="block rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-semibold transition hover:bg-white/20"
              >
                Check Inventory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard