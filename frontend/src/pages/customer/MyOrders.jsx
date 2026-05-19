import { useEffect, useState } from 'react'

import { getMyOrders } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getMyOrders()
        setOrders(data)
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

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

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Loading orders...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Order History
        </span>

        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
          My Orders
        </h1>

        <p className="mt-3 text-slate-600">
          Track your order history, payment method, delivery address, and
          current order status.
        </p>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-red-700">
          {message}
        </p>
      )}

      {orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
            📦
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No orders found
          </h2>

          <p className="mt-3 text-slate-500">
            You have not placed any order yet.
          </p>
        </div>
      ) : (
        <div className="space-y-7">
          {orders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 p-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Order #{order.id}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>

                  <span className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {item.product?.name}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Quantity: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>

                      <p className="text-lg font-bold text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 md:grid-cols-3">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="text-sm text-slate-500">Payment Method</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-purple-50 p-4">
                    <p className="text-sm text-slate-500">Delivery Address</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {order.address}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-slate-500">Total Amount</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
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

export default MyOrders