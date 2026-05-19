import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-[#646cff] dark:bg-violet-950 dark:text-violet-300">
            Modern E-Commerce Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Shop smarter with{' '}
            <span className="bg-gradient-to-r from-[#646cff] to-[#a855f7] bg-clip-text text-transparent">
              NexusMart
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Discover quality products, manage your cart, place orders, and track
            everything from one clean and simple e-commerce platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-2xl bg-gradient-to-r from-[#646cff] to-[#a855f7] px-6 py-3 font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:opacity-90"
            >
              Browse Products
            </Link>

            <Link
              to="/register"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-[#646cff] hover:text-[#646cff] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#646cff]/30 blur-3xl"></div>
          <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#a855f7]/30 blur-3xl"></div>

          <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-200 dark:bg-slate-900 dark:shadow-none">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-[#646cff] to-[#a855f7] p-8 text-white">
              <p className="text-sm font-medium text-violet-100">
                Featured Shopping Experience
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Everything you need in one marketplace
              </h2>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  Easy product browsing and category management
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  Cart, checkout, order history, and tracking
                </div>

                <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  Smooth shopping experience with modern design
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home