import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getProductById } from '../../services/productService'
import { addItemToCart } from '../../services/cartService'
import { formatPrice } from '../../utils/formatPrice'
import { getToken, getUser } from '../../utils/tokenHelper'

function ProductSingle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [cartLoading, setCartLoading] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        setMessage('Product not found')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  function handleQuantityChange(event) {
    setQuantity(Number(event.target.value))
  }

  async function handleAddToCart() {
    const token = getToken()
    const user = getUser()

    if (!token) {
      navigate('/login')
      return
    }

    if (user?.role !== 'customer') {
      setMessage('Only customer can add product to cart')
      return
    }

    if (quantity < 1) {
      setMessage('Quantity must be at least 1')
      return
    }

    if (quantity > product.stock) {
      setMessage('Quantity cannot be greater than available stock')
      return
    }

    try {
      setCartLoading(true)
      setMessage('')

      await addItemToCart({
        productId: product.id,
        quantity: quantity,
      })

      setMessage('Product added to cart successfully')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add product')
    } finally {
      setCartLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Loading product...</p>
        </div>
      </section>
    )
  }

  if (message && !product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="rounded-2xl bg-red-50 px-5 py-4 text-red-700">
            {message}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:text-blue-600"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="grid gap-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 md:grid-cols-2 md:p-8">
        <div>
          <div className="relative flex h-[430px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-slate-100">
            {product.image ? (
              <img
                src={`http://localhost:3000${product.image}`}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-slate-400">No Image</span>
            )}

            {product.discountPrice && (
              <span className="absolute left-5 top-5 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow">
                Sale
              </span>
            )}

            <span className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow">
              Stock: {product.stock}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-center">
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-1 font-semibold text-blue-700">
                {product.category?.name || 'N/A'}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 font-semibold text-green-700">
                {product.status ? 'Active' : 'Inactive'}
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 p-4 text-center">
              <p className="text-sm text-slate-500">Available</p>
              <p className="mt-1 font-semibold text-purple-700">
                {product.stock} pcs
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {product.category?.name || 'Product'}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900">
            {product.name}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {product.description || 'No description available for this product.'}
          </p>

          <div className="mt-7 flex items-center gap-4">
            {product.discountPrice ? (
              <>
                <span className="text-4xl font-extrabold text-slate-900">
                  {formatPrice(product.discountPrice)}
                </span>

                <span className="text-lg font-medium text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {message && (
            <p className="mt-6 rounded-2xl bg-slate-100 px-5 py-4 text-sm font-medium text-slate-700">
              {message}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={cartLoading || product.stock === 0}
              className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:bg-blue-300"
            >
              {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>

            <Link
              to="/cart"
              className="rounded-2xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              View Cart
            </Link>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900">Why buy from NexusMart?</h3>

            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p>✓ Simple checkout process</p>
              <p>✓ Secure account system</p>
              <p>✓ Real-time cart update</p>
              <p>✓ Order tracking support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSingle