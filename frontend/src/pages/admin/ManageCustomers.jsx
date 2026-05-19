import { useEffect, useState } from 'react'

import {
  deleteCustomer,
  getAllCustomers,
  updateCustomerStatus,
} from '../../services/userService'

function ManageCustomers() {
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadCustomers() {
    try {
      setLoading(true)

      const data = await getAllCustomers()
      setCustomers(data)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  async function handleStatusChange(customerId, newStatus) {
    try {
      setMessage('')

      await updateCustomerStatus(customerId, {
        status: newStatus,
      })

      setMessage('Customer status updated successfully')
      await loadCustomers()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update customer')
    }
  }

  async function handleDelete(customerId) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this customer?',
    )

    if (!confirmDelete) {
      return
    }

    try {
      setMessage('')

      await deleteCustomer(customerId)

      setMessage('Customer deleted successfully')
      await loadCustomers()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete customer')
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Loading customers...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-[#646cff]">
            Admin Customers
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            Manage Customers
          </h1>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-slate-500">Total Customers</p>
          <p className="text-xl font-extrabold text-slate-900">
            {customers.length}
          </p>
        </div>
      </div>

      {message && (
        <p className="mb-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
          {message}
        </p>
      )}

      {customers.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-3xl">
            👥
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            No customers found
          </h2>
        </div>
      ) : (
        <div className="grid gap-3">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#646cff] to-[#a855f7] text-lg font-bold text-white">
                    {customer.fullName
                      ? customer.fullName.charAt(0).toUpperCase()
                      : 'C'}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">
                        {customer.fullName}
                      </h2>

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

                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                        {customer.email}
                      </span>

                      <span className="rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-700">
                        {customer.phone || 'No phone'}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                        Role: {customer.role}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Joined:{' '}
                      {customer.createdAt
                        ? new Date(customer.createdAt).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={customer.status}
                    onChange={(event) =>
                      handleStatusChange(customer.id, event.target.value)
                    }
                    className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#646cff]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(customer.id)}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ManageCustomers