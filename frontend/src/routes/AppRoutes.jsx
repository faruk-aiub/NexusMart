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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductSingle />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="customer/dashboard" element={<CustomerDashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="profile" element={<Profile />} />

        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/products" element={<ManageProducts />} />
        <Route path="admin/products/add" element={<AddProduct />} />
        <Route path="admin/categories" element={<ManageCategories />} />
        <Route path="admin/orders" element={<ManageOrders />} />
        <Route path="admin/customers" element={<ManageCustomers />} />
        <Route path="admin/inventory" element={<Inventory />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes