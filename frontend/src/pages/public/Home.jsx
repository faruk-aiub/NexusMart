import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to NexusMart
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          A full-stack e-commerce website built with React, NestJS,
          PostgreSQL, and TypeORM.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          Browse Products
        </Link>
      </div>
    </section>
  )
}

export default Home