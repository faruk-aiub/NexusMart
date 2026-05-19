import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts, updateProduct } from '../../services/productService'
import { formatPrice } from '../../utils/formatPrice'

function Inventory() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    try {
      setLoading(true)

      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      setMessage('Failed to load inventory data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function getTotalStock() {
    return products.reduce((total, product) => total + Number(product.stock), 0)
  }

  function getLowStockProducts() {
    return products.filter((product) => product.stock > 0 && product.stock <= 5)
  }

  function getOutOfStockProducts() {
    return products.filter((product) => product.stock === 0)
  }

  async function handleStockUpdate(product, newStock) {
    if (Number(newStock) < 0) {
      setMessage('Stock cannot be negative')
      return
    }

    try {
      setMessage('')

      await updateProduct(product.id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        discountPrice: product.discountPrice
          ? Number(product.discountPrice)
          : null,
        stock: Number(newStock),
        image: product.image,
        status: product.status,
        categoryId: product.category?.id,
      })

      setMessage('Stock updated successfully')
      await loadProducts()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update stock')
    }
  }

  async function handleStatusUpdate(product, newStatus) {
    try {
      setMessage('')

      await updateProduct(product.id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        discountPrice: product.discountPrice
          ? Number(product.discountPrice)
          : null,
        stock: Number(product.stock),
        image: product.image,
        status: newStatus,
        categoryId: product.category?.id,
      })

      setMessage('Product status updated successfully')
      await loadProducts()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update status')
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Loading inventory...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
            Admin Inventory
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            Inventory
          </h1>
        </div>

        <Link
          to="/admin/products"
          className="rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
        >
          Manage Products
        </Link>
      </div>

      {message && (
        <p className="mb-6 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
          {message}
        </p>
      )}

      <div className="mb-8 grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            🛍️
          </div>

          <p className="mt-4 text-sm text-slate-500">Total Products</p>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            📦
          </div>

          <p className="mt-4 text-sm text-slate-500">Total Stock</p>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {getTotalStock()}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
            ⚠️
          </div>

          <p className="mt-4 text-sm text-slate-500">Low Stock</p>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {getLowStockProducts().length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl">
            ❌
          </div>

          <p className="mt-4 text-sm text-slate-500">Out of Stock</p>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            {getOutOfStockProducts().length}
          </h2>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            No products found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Add products first to manage inventory.
          </p>

          <Link
            to="/admin/products/add"
            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Stock Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update stock quantity and product availability.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="h-14 w-full overflow-hidden rounded-lg bg-slate-100 md:w-14">
                      {product.image ? (
                        <img
                          src={`http://localhost:3000${product.image}`}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {product.name}
                        </h3>

                        {product.status ? (
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">
                            Inactive
                          </span>
                        )}

                        {product.stock === 0 && (
                          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">
                            Out of Stock
                          </span>
                        )}

                        {product.stock > 0 && product.stock <= 5 && (
                          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-[11px] font-semibold text-yellow-700">
                            Low Stock
                          </span>
                        )}
                      </div>

                      <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700">
                          {product.category?.name || 'No Category'}
                        </span>

                        <span className="rounded-full bg-purple-50 px-2.5 py-0.5 font-medium text-purple-700">
                          {product.discountPrice
                            ? formatPrice(product.discountPrice)
                            : formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600">
                        Stock
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(event) =>
                          handleStockUpdate(product, event.target.value)
                        }
                        className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#646cff]"
                      />
                    </div>

                    <select
                      value={product.status ? 'active' : 'inactive'}
                      onChange={(event) =>
                        handleStatusUpdate(
                          product,
                          event.target.value === 'active',
                        )
                      }
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#646cff]"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <Link
                      to={`/admin/products/${product.id}`}
                      className="rounded-lg bg-gradient-to-r from-[#646cff] to-[#a855f7] px-3 py-2 text-xs font-semibold text-white"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Inventory