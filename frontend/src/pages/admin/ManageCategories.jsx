import { useEffect, useState } from 'react'

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../../services/categoryService'

function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    status: true,
  })

  async function loadCategories() {
    try {
      setLoading(true)
      const data = await getAllCategories()
      setCategories(data)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  function resetForm() {
    setFormData({
      name: '',
      description: '',
      image: '',
      status: true,
    })

    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setMessage('')

      if (editingId) {
        await updateCategory(editingId, formData)
        setMessage('Category updated successfully')
      } else {
        await createCategory(formData)
        setMessage('Category created successfully')
      }

      resetForm()
      await loadCategories()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Category operation failed')
    }
  }

  function handleEdit(category) {
    setEditingId(category.id)

    setFormData({
      name: category.name || '',
      description: category.description || '',
      image: category.image || '',
      status: category.status,
    })
  }

  async function handleDelete(categoryId) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this category?',
    )

    if (!confirmDelete) {
      return
    }

    try {
      setMessage('')

      await deleteCategory(categoryId)

      setMessage('Category deleted successfully')
      await loadCategories()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete category')
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Loading categories...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Admin Categories
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            Manage Categories
          </h1>
        </div>

        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Categories</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">
            {categories.length}
          </p>
        </div>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl bg-slate-100 px-5 py-4 font-medium text-slate-700">
          {message}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200 lg:col-span-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {editingId ? 'Update Category' : 'Add New Category'}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {editingId
                ? 'Edit existing category information.'
                : 'Create a new category for products.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Electronics"
                className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-[#646cff]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write short category description"
                rows="4"
                className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-[#646cff]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="category-image.jpg"
                className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-[#646cff]"
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Active Category
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-6 py-3 font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
              >
                {editingId ? 'Update Category' : 'Create Category'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-[#646cff] hover:text-[#646cff]"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          {categories.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
                📂
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No categories found
              </h2>
            </div>
          ) : (
            <div className="grid gap-5">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:shadow-slate-200"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                        📁
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-bold text-slate-900">
                            {category.name}
                          </h2>

                          {category.status ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              Active
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              Inactive
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {category.description || 'No description available.'}
                        </p>

                        <p className="mt-2 text-xs font-medium text-slate-400">
                          Category ID: {category.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                        className="rounded-2xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                        className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ManageCategories