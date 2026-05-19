import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getMyCart,
  removeCartItem,
  updateCartItem,
} from '../../services/cartService'
import { formatPrice } from '../../utils/formatPrice'

function Cart() {
  const [cart, setCart] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadCart() {
    try {
      setLoading(true)
      const data = await getMyCart()
      setCart(data)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  async function handleQuantityUpdate(cartItemId, quantity) {
    if (Number(quantity) < 1) {
      setMessage('Quantity must be at least 1')
      return
    }

    try {
      setMessage('')

      await updateCartItem(cartItemId, {
        quantity: Number(quantity),
      })

      await loadCart()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update cart item')
    }
  }

  async function handleRemove(cartItemId) {
    try {
      setMessage('')

      await removeCartItem(cartItemId)

      await loadCart()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to remove cart item')
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Loading cart...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Shopping Cart
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            My Cart
          </h1>

          <p className="mt-3 text-slate-600">
            Review your products and proceed to checkout.
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-500 hover:text-blue-600"
        >
          Continue Shopping
        </Link>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-red-700">
          {message}
        </p>
      )}

      {!cart || cart.items.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
            🛒
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Your cart is empty
          </h2>

          <p className="mt-3 text-slate-500">
            Add some products to your cart first.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row"
              >
                <div className="h-36 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:w-36">
                  {item.product?.image ? (
                    <img
                      src={`http://localhost:3000${item.product.image}`}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {item.product?.name}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Unit Price: {formatPrice(item.price)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600">
                        Quantity
                      </span>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          handleQuantityUpdate(item.id, event.target.value)
                        }
                        className="w-24 rounded-2xl border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="rounded-2xl bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-slate-200 pb-5">
              <div className="flex justify-between text-slate-600">
                <span>Total Items</span>
                <span>{cart.items.length}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-700">
                Total
              </span>

              <span className="text-3xl font-extrabold text-slate-900">
                {formatPrice(cart.total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-7 block rounded-2xl bg-blue-600 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart