import { useEffect, useState } from 'react'

import { getCurrentUser } from '../../services/authService'

function CustomerDashboard() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser()
        setUser(data)
      } catch (error) {
        setMessage('Please login again')
      }
    }

    loadUser()
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Customer Dashboard
        </h1>

        {message && <p className="mt-4 text-red-600">{message}</p>}

        {user && (
          <div className="mt-6 space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CustomerDashboard