import { useEffect, useState } from 'react'

import { getAllOrders, updateOrderStatus } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function ManageOrders() {
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadOrders() {
    try {
      setLoading(true)
      const data = await getAllOrders()
      setOrders(data)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  function getStatusStyle(status) {
    if (status === 'delivered') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'cancelled') {
      return 'bg-red-100 text-red-700'
    }

    if (status === 'processing' || status === 'shipped') {
      return 'bg-purple-100 text-purple-700'
    }

    if (status === 'confirmed') {
      return 'bg-blue-100 text-blue-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      setMessage('')

      await updateOrderStatus(orderId, {
        orderStatus: newStatus,
      })

      setMessage('Order status updated successfully')
      await loadOrders()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update order')
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Loading orders...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Admin Orders
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Manage Orders
          </h1>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-slate-500">Total Orders</p>
          <p className="text-xl font-extrabold text-slate-900">
            {orders.length}
          </p>
        </div>
      </div>

      {message && (
        <p className="mb-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
          {message}
        </p>
      )}

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            No orders found
          </h2>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 bg-slate-50 px-5 py-4 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      Order #{order.id}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-3 grid gap-2 text-xs text-slate-700 sm:grid-cols-3">
                    <div className="rounded-xl bg-white px-3 py-2">
                      <p className="text-slate-500">Customer</p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {order.user?.fullName || 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white px-3 py-2">
                      <p className="text-slate-500">Email</p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {order.user?.email || 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white px-3 py-2">
                      <p className="text-slate-500">Phone</p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {order.user?.phone || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-w-48 rounded-xl bg-white p-3 shadow-sm">
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Update Status
                  </label>

                  <select
                    value={order.orderStatus}
                    onChange={(event) =>
                      handleStatusChange(order.id, event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#646cff]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="px-5 py-4">
                <h3 className="text-base font-bold text-slate-900">
                  Order Items
                </h3>

                <div className="mt-3 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 md:flex-row md:items-center"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.product?.name || 'Product not found'}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Quantity: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>

                      <p className="text-base font-extrabold text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-3">
                  <div className="rounded-xl bg-blue-50 px-4 py-3">
                    <p className="text-xs text-slate-500">Payment Method</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div className="rounded-xl bg-purple-50 px-4 py-3">
                    <p className="text-xs text-slate-500">Delivery Address</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">
                      {order.address}
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 px-4 py-3">
                    <p className="text-xs text-slate-500">Total Amount</p>
                    <p className="mt-0.5 text-xl font-extrabold text-slate-900">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ManageOrders