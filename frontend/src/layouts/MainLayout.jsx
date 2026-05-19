import { Outlet } from 'react-router-dom'

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="min-h-[80vh]">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout