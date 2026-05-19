import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../../services/productService'
import { formatPrice } from '../../utils/formatPrice'

function Products() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        setMessage('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-slate-800">
          <p className="text-slate-600">Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="relative mb-8 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#646cff] via-[#7c3aed] to-[#a855f7] px-8 py-7 text-white shadow-xl shadow-violet-300/25">
        <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-white/15 blur-3xl"></div>
        <div className="absolute -bottom-16 left-20 h-44 w-44 rounded-full bg-blue-300/20 blur-3xl"></div>

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              Shop Collection
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight">
              Explore Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">
              Discover your favorite products, compare prices, and continue your
              shopping journey with NexusMart.
            </p>
          </div>

          <div className="w-fit rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
            <p className="text-xs font-medium text-violet-100">
              Available Products
            </p>
            <p className="mt-1 text-2xl font-extrabold">{products.length}</p>
          </div>
        </div>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-red-700">
          {message}
        </p>
      )}

      {products.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-slate-800">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-3xl">
            🛍️
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No products found
          </h2>

          <p className="mt-3 text-slate-500">
            Products will appear here after admin adds them.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800 dark:shadow-none"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {product.image ? (
                    <img
                      src={`http://localhost:3000${product.image}`}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-slate-400">
                      <span className="text-3xl">🛍️</span>
                      <span className="mt-2 text-xs">No Image</span>
                    </div>
                  )}

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {product.discountPrice && (
                      <span className="rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white shadow">
                        Sale
                      </span>
                    )}

                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#646cff] shadow backdrop-blur">
                      {product.category?.name || 'Product'}
                    </span>
                  </div>

                  <span className="absolute right-3 top-3 rounded-full bg-[#646cff] px-3 py-1 text-[11px] font-bold text-white shadow">
                    Stock: {product.stock}
                  </span>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h2 className="line-clamp-1 text-lg font-extrabold text-slate-900 transition hover:text-[#646cff]">
                    {product.name}
                  </h2>
                </Link>

                <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                  {product.description || 'No description available.'}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-xl font-extrabold text-slate-900">
                        {formatPrice(product.discountPrice)}
                      </span>

                      <span className="text-xs font-semibold text-slate-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-extrabold text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="mt-4 block rounded-2xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Products