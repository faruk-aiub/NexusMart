import { Link } from 'react-router-dom'

import { getUser } from '../../utils/tokenHelper'

function CustomerDashboard() {
  const user = getUser()

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#646cff] via-[#7c3aed] to-[#a855f7] p-10 text-white shadow-2xl shadow-violet-300/30">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl"></div>
        <div className="absolute -bottom-20 left-20 h-60 w-60 rounded-full bg-blue-300/20 blur-3xl"></div>

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Customer Panel
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight">
              Welcome, {user?.fullName || 'Customer'}
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-violet-100">
              Explore products, manage your cart, place orders, and track your
              shopping activity from one clean dashboard.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-white/15 p-6 backdrop-blur">
            <p className="text-sm font-medium text-violet-100">Account Status</p>

            <h2 className="mt-2 text-3xl font-extrabold">
              {user?.status || 'Active'}
            </h2>

            <p className="mt-2 text-sm text-violet-100">
              Role: {user?.role || 'customer'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/products"
          className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-3xl transition group-hover:scale-110">
            🛍️
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Browse Products
          </h2>

          <div className="mt-5 h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 w-4/5 rounded-full bg-gradient-to-r from-[#646cff] to-[#a855f7]"></div>
          </div>
        </Link>

        <Link
          to="/cart"
          className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl transition group-hover:scale-110">
            🛒
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">My Cart</h2>

          <div className="mt-5 h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-[#646cff] to-[#a855f7]"></div>
          </div>
        </Link>

        <Link
          to="/checkout"
          className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl transition group-hover:scale-110">
            💳
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">Checkout</h2>

          <div className="mt-5 h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-[#646cff] to-[#a855f7]"></div>
          </div>
        </Link>

        <Link
          to="/my-orders"
          className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-3xl transition group-hover:scale-110">
            📦
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">My Orders</h2>

          <div className="mt-5 h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 w-1/2 rounded-full bg-gradient-to-r from-[#646cff] to-[#a855f7]"></div>
          </div>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200 lg:col-span-2 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-[#646cff] dark:bg-violet-950 dark:text-violet-300">
                Quick Shopping
              </span>

              <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
                Continue shopping faster
              </h2>
            </div>

            <Link
              to="/products"
              className="rounded-2xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-6 py-3 text-center font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
            >
              Explore Products
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <Link
              to="/products"
              className="rounded-2xl bg-slate-50 p-5 transition hover:bg-violet-50 dark:bg-slate-900"
            >
              <p className="text-2xl">🛍️</p>
              <h3 className="mt-3 font-bold text-slate-900">Products</h3>
            </Link>

            <Link
              to="/cart"
              className="rounded-2xl bg-slate-50 p-5 transition hover:bg-violet-50 dark:bg-slate-900"
            >
              <p className="text-2xl">🛒</p>
              <h3 className="mt-3 font-bold text-slate-900">Cart</h3>
            </Link>

            <Link
              to="/my-orders"
              className="rounded-2xl bg-slate-50 p-5 transition hover:bg-violet-50 dark:bg-slate-900"
            >
              <p className="text-2xl">📦</p>
              <h3 className="mt-3 font-bold text-slate-900">Orders</h3>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-xl dark:bg-slate-800">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
            Profile
          </span>

          <h2 className="mt-5 text-3xl font-extrabold">Account Details</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-sm text-slate-300">Name</p>
              <p className="mt-1 font-bold">{user?.fullName || 'N/A'}</p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-sm text-slate-300">Email</p>
              <p className="mt-1 font-bold">{user?.email || 'N/A'}</p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-sm text-slate-300">Phone</p>
              <p className="mt-1 font-bold">{user?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerDashboard