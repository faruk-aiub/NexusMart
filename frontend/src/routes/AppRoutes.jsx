import { Route, Routes } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import Home from '../pages/public/Home'
import Products from '../pages/public/Products'
import ProductSingle from '../pages/public/ProductSingle'
import Login from '../pages/public/Login'
import Register from '../pages/public/Register'

import CustomerDashboard from '../pages/customer/CustomerDashboard'
import Cart from '../pages/customer/Cart'
import Checkout from '../pages/customer/Checkout'
import MyOrders from '../pages/customer/MyOrders'
import Profile from '../pages/customer/Profile'

import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageProducts from '../pages/admin/ManageProducts'
import AddProduct from '../pages/admin/AddProduct'
import ManageCategories from '../pages/admin/ManageCategories'
import ManageOrders from '../pages/admin/ManageOrders'
import ManageCustomers from '../pages/admin/ManageCustomers'
import Inventory from '../pages/admin/Inventory'

import AdminRoute from './AdminRoute'
import CustomerRoute from './CustomerRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductSingle />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="customer/dashboard"
          element={
            <CustomerRoute>
              <CustomerDashboard />
            </CustomerRoute>
          }
        />

        <Route
          path="cart"
          element={
            <CustomerRoute>
              <Cart />
            </CustomerRoute>
          }
        />

        <Route
          path="checkout"
          element={
            <CustomerRoute>
              <Checkout />
            </CustomerRoute>
          }
        />

        <Route
          path="my-orders"
          element={
            <CustomerRoute>
              <MyOrders />
            </CustomerRoute>
          }
        />

        <Route
          path="profile"
          element={
            <CustomerRoute>
              <Profile />
            </CustomerRoute>
          }
        />

        <Route
          path="admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="admin/categories"
          element={
            <AdminRoute>
              <ManageCategories />
            </AdminRoute>
          }
        />

        <Route
          path="admin/products"
          element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          }
        />

        <Route
          path="admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="admin/orders"
          element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          }
        />

        <Route
          path="admin/inventory"
          element={
            <AdminRoute>
              <Inventory />
            </AdminRoute>
          }
        />

        <Route
          path="admin/customers"
          element={
            <AdminRoute>
              <ManageCustomers />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes