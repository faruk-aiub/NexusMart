import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllCategories } from '../../services/categoryService'
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../../services/productService'
import { uploadProductImage } from '../../services/uploadService'
import { formatPrice } from '../../utils/formatPrice'

function ManageProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    image: '',
    status: true,
    categoryId: '',
  })

  async function loadData() {
    try {
      setLoading(true)

      const productData = await getAllProducts()
      const categoryData = await getAllCategories()

      setProducts(productData)
      setCategories(categoryData)
    } catch (error) {
      setMessage('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  function handleImageChange(event) {
    setImageFile(event.target.files[0])
  }

  function handleEdit(product) {
    setEditingProduct(product)
    setImageFile(null)

    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      discountPrice: product.discountPrice || '',
      stock: product.stock || '',
      image: product.image || '',
      status: product.status,
      categoryId: product.category?.id || '',
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function resetForm() {
    setEditingProduct(null)
    setImageFile(null)

    setFormData({
      name: '',
      description: '',
      price: '',
      discountPrice: '',
      stock: '',
      image: '',
      status: true,
      categoryId: '',
    })
  }

  async function handleUpdate(event) {
    event.preventDefault()

    if (!editingProduct) {
      return
    }

    try {
      setMessage('')

      let imageUrl = formData.image

      if (imageFile) {
        const uploadData = await uploadProductImage(imageFile)
        imageUrl = uploadData.imageUrl
      }

      await updateProduct(editingProduct.id, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        discountPrice: formData.discountPrice
          ? Number(formData.discountPrice)
          : null,
        stock: Number(formData.stock),
        image: imageUrl,
        status: formData.status,
        categoryId: Number(formData.categoryId),
      })

      setMessage('Product updated successfully')
      resetForm()
      await loadData()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update product')
    }
  }

  async function handleDelete(productId) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?',
    )

    if (!confirmDelete) {
      return
    }

    try {
      setMessage('')

      await deleteProduct(productId)

      setMessage('Product deleted successfully')
      await loadData()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete product')
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            Admin Products
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Manage Products
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total Products</p>
            <p className="text-xl font-extrabold text-slate-900">
              {products.length}
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="flex items-center rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
          >
            Add Product
          </Link>
        </div>
      </div>

      {message && (
        <p className="mb-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
          {message}
        </p>
      )}

      {editingProduct && (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-xl shadow-slate-200">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Update Product
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Editing: {editingProduct.name}
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#646cff] hover:text-[#646cff]"
            >
              Cancel Edit
            </button>
          </div>

          <form onSubmit={handleUpdate} className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#646cff]"
              required
            />

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#646cff]"
              required
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#646cff]"
              required
            />

            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Discount price"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#646cff]"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#646cff]"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              rows="3"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#646cff] md:col-span-2"
            />

            <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
              />
              Active Product
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            No products found
          </h2>
        </div>
      ) : (
        <div className="grid gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="h-12 w-full overflow-hidden rounded-md bg-slate-100 md:w-12">
                    {product.image ? (
                      <img
                        src={`http://localhost:3000${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[9px] text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">
                        {product.name}
                      </h2>

                      {product.status ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                          Inactive
                        </span>
                      )}

                      {product.discountPrice && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                          Sale
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
                        {product.category?.name || 'No Category'}
                      </span>

                      <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                        Stock: {product.stock}
                      </span>

                      <span className="rounded-full bg-purple-50 px-2 py-0.5 font-medium text-purple-700">
                        {product.discountPrice
                          ? formatPrice(product.discountPrice)
                          : formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="rounded-md bg-yellow-500 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="rounded-md bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-red-600"
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

export default ManageProducts