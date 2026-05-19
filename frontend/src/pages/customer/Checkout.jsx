import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getMyCart } from '../../services/cartService'
import { placeOrder } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function Checkout() {
  const navigate = useNavigate()

  const [cart, setCart] = useState(null)

  const [formData, setFormData] = useState({
    address: '',
    paymentMethod: 'Cash on Delivery',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [orderLoading, setOrderLoading] = useState(false)

  useEffect(() => {
    async function loadCart() {
      try {
        const data = await getMyCart()
        setCart(data)
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to load cart')
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handlePlaceOrder(event) {
    event.preventDefault()

    if (!cart || cart.items.length === 0) {
      setMessage('Your cart is empty')
      return
    }

    try {
      setOrderLoading(true)
      setMessage('')

      await placeOrder(formData)

      setMessage('Order placed successfully')

      setTimeout(() => {
        navigate('/my-orders')
      }, 1000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to place order')
    } finally {
      setOrderLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Loading checkout...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Checkout
        </span>

        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
          Place Your Order
        </h1>

        <p className="mt-3 text-slate-600">
          Confirm your delivery information and complete your purchase.
        </p>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl bg-slate-100 px-5 py-4 font-medium text-slate-700">
          {message}
        </p>
      )}

      {!cart || cart.items.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Your cart is empty
          </h2>

          <p className="mt-3 text-slate-500">
            Please add products to your cart before checkout.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200 lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Delivery Information
            </h2>

            <form onSubmit={handlePlaceOrder} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full delivery address"
                  rows="5"
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={orderLoading}
                className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:bg-blue-300"
              >
                {orderLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="h-fit rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.product?.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>

                  <p className="font-bold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
              <span className="text-lg font-semibold text-slate-700">
                Total
              </span>

              <span className="text-3xl font-extrabold text-slate-900">
                {formatPrice(cart.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Checkout